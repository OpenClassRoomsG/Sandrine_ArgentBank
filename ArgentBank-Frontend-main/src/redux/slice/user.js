///*********************** METTRE A JOUR LE PROFILE ************************///

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({ //fonction spéciale toolkit pour state initial, actions et reducer
  name: 'user',
  initialState: {
    email: '',
    userName: '',
    firstName: '',
    lastName: '',
  },
  reducers: {
    updateUser: (state, action) => { 
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;



