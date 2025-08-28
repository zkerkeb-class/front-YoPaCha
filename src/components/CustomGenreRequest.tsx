import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomGenreRequest.css';

interface CustomGenreRequestProps {}

const CustomGenreRequest: React.FC<CustomGenreRequestProps> = () => {
  const navigate = useNavigate();
  const [customGenre, setCustomGenre] = useState<string>('');
  const [generatedStory, setGeneratedStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const generateCustomStory = async () => {
    if (!customGenre.trim()) {
      setError('Veuillez décrire votre genre personnalisé');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/generate-custom-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instructions: customGenre }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération de l\'histoire');
      }

      const data = await response.json();
      setGeneratedStory(data.story);
    } catch (err) {
      setError('Impossible de générer l\'histoire. Vérifiez que le service Stories-AI-Service est en cours d\'exécution.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetGenerator = () => {
    setCustomGenre('');
    setGeneratedStory('');
    setError('');
  };

  return (
    <div className="custom-genre-request">
      <header className="custom-header">
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          ← Retour à l'accueil
        </button>
        <h1>Genre Personnalisé</h1>
        <p>Décrivez votre genre d'histoire idéal et laissez l'IA créer quelque chose d'unique</p>
      </header>

      <div className="custom-content">
        <div className="genre-description">
          <label htmlFor="custom-genre">Décrivez votre genre :</label>
          <textarea
            id="custom-genre"
            value={customGenre}
            onChange={(e) => setCustomGenre(e.target.value)}
            placeholder="Ex: Une histoire mêlant mystère et comédie, se déroulant dans un café parisien où les serveurs sont des détectives amateurs..."
            className="genre-textarea"
            rows={6}
            disabled={isLoading}
          />
          <div className="character-count">
            {customGenre.length}/500 caractères
          </div>
        </div>

        <div className="examples-section">
          <h3>Exemples d'inspiration :</h3>
          <ul className="examples-list">
            <li>Un thriller psychologique dans l'espace</li>
            <li>Une comédie romantique avec des super-héros</li>
            <li>Un conte de fée moderne dans une ville cyberpunk</li>
            <li>Un mystère policier dans un monde de magie</li>
            <li>Une histoire d'aventure sous-marine avec des créatures mythiques</li>
          </ul>
        </div>

        <div className="action-buttons">
          <button
            onClick={generateCustomStory}
            disabled={isLoading || !customGenre.trim()}
            className="generate-button"
          >
            {isLoading ? 'Génération en cours...' : 'Générer mon histoire'}
          </button>
          
          {generatedStory && (
            <button
              onClick={resetGenerator}
              className="reset-button"
            >
              Nouveau genre
            </button>
          )}
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {generatedStory && (
          <div className="story-display">
            <h3>Votre histoire personnalisée :</h3>
            <div className="story-content">
              {generatedStory}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomGenreRequest;