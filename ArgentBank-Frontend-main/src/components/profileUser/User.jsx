import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slice/user';
import '../profileUser/user.css'


export default function User() {
  const token = useSelector(store => store.auth.token)
  const user = useSelector((store) => store.user); // Récupérer les données de l'utilisateur
  const navigate = useNavigate();
  const dispatch = useDispatch();

   // État pour gérer l'affichage du formulaire
   const [isEditing, setIsEditing] = useState(false);

   // Champs du formulaire
   const [userName, setUserName] = useState('');

  useEffect(() => {
    if (!token) {
      return navigate('/');
    }

    async function getUser() {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  
      const data = await response.json();
      dispatch(updateUser(data.body)); // Mise à jour du store avec les données utilisateur

       // Initialiser les champs du formulaire avec les données utilisateur
       setUserName(data.body.userName);
    }
    
    getUser();
}, [token, navigate, dispatch]);

// Fonction pour gérer la soumission du formulaire
const handleSave = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userName }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(updateUser(data.body)); // Mettre à jour l'utilisateur dans Redux
      setIsEditing(false); // Fermer le formulaire
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

return (
    <main className="maincontainer"> 
     {/* Message de bienvenue */}     
     {!isEditing && (
        <div className="headerUser">
          <h1>Welcome back<br />{user?.firstName} {user?.lastName}!</h1>
             <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
            </div>
            
          )}
        
    
{isEditing && (
        // Formulaire d'édition
        <form className="edit-form" onSubmit={handleSave}>
          <h2>Edit User Info</h2>
          <div className="input-group">
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" value={user?.firstName || ''} disabled />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" value={user?.lastName || ''} disabled />
          </div>
          <div className="button-group">
            <button type="submit" className="save-button">Save</button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      </main>
    );
  }
