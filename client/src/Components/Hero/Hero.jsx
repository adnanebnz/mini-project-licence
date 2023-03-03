import React from 'react';
import "./hero.css"
import hero from "../../assets/test.jpg"
import Typewriter from "typewriter-effect"
import { useNavigate } from 'react-router-dom';
const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-section" id='hero'>
      <div className="hero-background">
        <img src={hero} alt="Hiking" />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">Découvrez la beauté de la nature</h1>
        <p className="hero-subtitle">Avec nous vous allez vivres des aventures inoubliables!</p>
        <div className='typewriter'>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: ['Une nouvelle aventure vous attend', 'Rejoignez nous maintenant!'],
              delay: 60
            }
            }
          />
        </div>
        <br />
        <div className='button-wrapper'>
          <button className="cta-button" onClick={() => navigate('/randos')}>Réservez maintenant</button>
          <button className="cta-button" onClick={() => navigate('/boutique')}>Visiter la Boutique</button>
        </div>
      </div>
    </div >
  );
};

export default Hero;
