import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateToken } from '../../redux/slice/auth';
import { useNavigate } from 'react-router-dom';
import '../signInForm/signInForm.css'

function SignIn() {
  const [email, setEmail] = useState('tony@stark.com'); // État local pour l'email
  const [password, setPassword] = useState('password123'); // État local pour le mot de passe
  const [error, setError] = useState(null); // État pour afficher les erreurs

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Envoie les données de l'utilisateur
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        dispatch(updateToken(data.body.token)); // Met à jour le token dans Redux
        navigate('/profile'); // Redirige vers la page utilisateur
      } else {
        setError(data.message || 'Erreur de connexion'); 
      }
    } catch (err) {
      setError('Erreur de réseau...');
    }
  };

  return (
    <div className="bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Met à jour l'état avec la saisie
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Met à jour l'état avec la saisie
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit" name="Login">
            Sign In
          </button>
          {error && (
            <div className="error-message">
              <br />
              {error}
            </div>
          )}
        </form>
      </section>
    </div>
  );
}

export default SignIn;


