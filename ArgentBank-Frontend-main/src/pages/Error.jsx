import React from 'react';
import { Link } from 'react-router-dom';
import '../components/error/error.css';
import Smiley from '../components/error/emoticon.jpg'


function Error() {
  return (
    <div className="error-page">
      <img src={Smiley} alt="Smiley confus" className="smiley-image" />
      <h1>404</h1>
      <p>Oups ! Erreur de connexion.</p>
      <Link to="/login" className="retour-signIn">
      &#x2192;&nbsp;Retournez sur la page de connexion 
      </Link>
    </div>
  );
}

export default Error;
