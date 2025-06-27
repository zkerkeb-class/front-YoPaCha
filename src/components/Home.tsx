import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const genres = [
    'Horreur', 'Comique', 'Romance', 'Fantasy', 
    'Science-fiction', 'Aventure', 'Policier', 'Réconfortant'
  ];

  const handleGenreClick = () => {
    navigate('/generator');
  };

  return (
    <div className="home">
      <header className="hero-section">
        <h1>Stories AI</h1>
        <p className="hero-subtitle">
          Faites générer de courtes histoires avec l'aide de l'IA
        </p>
      </header>

      <main className="main-content">
        <section className="genres-section">
          <h2>Genres Disponibles</h2>
          <div className="genres-grid">
            {genres.map((genre, index) => (
              <div 
                key={index} 
                className="genre-card clickable"
                onClick={handleGenreClick}
              >
                <h3>{genre}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="custom-genre-section">
          <h2>Genre Personnalisé</h2>
          <p>
            Vous avez une idée spécifique ? Créez votre propre genre d'histoire 
            et laissez notre IA donner vie à votre imagination.
          </p>
          <button 
            className="cta-button"
            onClick={handleGenreClick}
          >
            Créer mon genre
          </button>
        </section>

        <section className="subscription-section">
          <h2>Abonnement</h2>
          <p>
            Choisissez un forfait en fonction du nombre d'histoires que vous souhaitez faire générer
          </p>
          <button className="cta-button premium">S'abonner</button>
        </section>
      </main>

      <footer className="footer">
        <p>Propulsé par Stories-AI-Service</p>
      </footer>
    </div>
  );
};

export default Home;