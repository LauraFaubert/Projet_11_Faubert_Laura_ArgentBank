import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logUser, getUserProfile } from "../api/api";

// Action asynchrone pour se connecter
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await logUser(email, password);
      if (response.token) {
        localStorage.setItem("token", response.token); // Stockage du token
        console.log("Token from localStorage:", localStorage.getItem("token"));
        return response.token;
      } else {
        return rejectWithValue("Erreur de connexion");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Action asynchrone pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await getUserProfile(token);
      if (response.status === 200) {
        console.log("Profil utilisateur récupéré :", response.body);
        return response.body;

      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userToken: null,
  userProfil: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action) {
      state.userToken = action.payload; 
      state.isAuthenticated = true;
    },
    logout(state) {
      state.userToken = null;
      state.userProfil = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    infoUserName(state, action) {
      if (state.userProfil) {
        state.userProfil.userName = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userToken = action.payload;
        state.isAuthenticated = true;
        state.error = null; 
        console.log("Connexion réussie. Token:", state.userToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload; 
        console.error("Échec de la connexion :", action.payload);
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userProfil = action.payload;
        state.error = null; 
        console.log("Profil utilisateur mis à jour :", state.userProfil);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.userProfil = null;
        state.error = action.payload;
        console.error("Échec de la récupération du profil :", action.payload);
      });
  },
});

export const { logout, infoUserName } = loginSlice.actions;
export default loginSlice.reducer;
