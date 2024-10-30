import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../authentification/loginSlice';

const store = configureStore({
  reducer: {
    user: loginReducer, 
  },
});

export default store;