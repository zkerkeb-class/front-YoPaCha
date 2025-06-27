import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StoryGenerator.css';

interface StoryGeneratorProps {}

const StoryGenerator: React.FC<StoryGeneratorProps> = () => {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [generatedStory, setGeneratedStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const genres = [
    'Horreur', 'Comique', 'Romance', 'Fantasy', 
    'Science-fiction', 'Aventure', 'Policier', 'Réconfortant'
  ];

  const generateStory = async () => {
    if (!selectedGenre) {
      setError('Veuillez sélectionner un genre');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genre: selectedGenre }),
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
    setSelectedGenre('');
    setGeneratedStory('');
    setError('');
  };

  return (
    <div className="story-generator">
      <header className="generator-header">
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          ← Retour à l'accueil
        </button>
        <h1>Générateur d'Histoires</h1>
        <p>Choisissez un genre et laissez l'IA créer une histoire unique pour vous</p>
      </header>

      <div className="generator-content">
        <div className="genre-selection">
          <label htmlFor="genre-select">Sélectionnez un genre :</label>
          <select
            id="genre-select"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="genre-dropdown"
          >
            <option value="">-- Choisir un genre --</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="action-buttons">
          <button
            onClick={generateStory}
            disabled={isLoading || !selectedGenre}
            className="generate-button"
          >
            {isLoading ? 'Génération en cours...' : 'Générer une histoire'}
          </button>
          
          {generatedStory && (
            <button
              onClick={resetGenerator}
              className="reset-button"
            >
              Nouvelle histoire
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
            <h3>Votre histoire :</h3>
            <div className="story-content">
              {generatedStory}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryGenerator;