import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from '../../public/assets/argentBankLogo.png';
import { useSelector } from 'react-redux';
// Gestion Déconnexion 
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slice/auth'; // import action logout
import { useNavigate } from 'react-router-dom'; // Pour la redirection Page Accueil

export default function Header() {
  const navigateOut = useNavigate(); // Pour rediriger l'utilisateur
  const dispatch = useDispatch(); // Pour exécuter les actions Redux
  const token = useSelector(store => store.auth.token)// Récupération du token
  const user = useSelector(store => store.user)// Récupération des données utilisateur

   // Fonction pour gérer la déconnexion
   const handleSignOut = () => {
    console.log('User signed out'); // Ajoutez ce log
    dispatch(logout()); // Supprime le token du Redux store
    navigateOut('/'); // Redirige vers la page d'accueil
  };
  
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {!token && <Link className="main-nav-item" to="/login">
          <i className="fa fa-user-circle" aria-hidden="true"></i>
          Sign In
        </Link>}
        {token &&
        <>
          <Link className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i>
            {user.userName}
          </Link>
          <button className="main-nav-item sign-out-button" onClick={handleSignOut}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
        </>
        }
      </div>
    </nav>
  );
}
