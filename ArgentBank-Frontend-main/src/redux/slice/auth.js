///*********************** CONNEXION  ************************///

import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({ //fonction spéciale toolkit pour state initial, actions et reducer
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    updateToken: (state, action) => { 
      state.token = action.payload; // Met à jour le token lors de la connexion
    },
    logout: (state) => { 
      state.token = null; // Supprime le token lors de la déconnexion
  },
},
});

export const { updateToken, logout } = authSlice.actions;

export default authSlice.reducer;



