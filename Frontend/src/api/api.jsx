const API_URL = "http://localhost:3001/api/v1";

// Fonction pour la connexion utilisateur

export const logUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.json();
    console.log("API Login Response:", data); // Ajoutez cette ligne pour voir ce que renvoie l'API
    return data.body;
  } catch (error) {
    return { error: error.message };
  }
};

// Fonction pour récupérer le profil utilisateur
export const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${API_URL}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération du profil :", error);
    throw error;
  }
};

// Fonction pour modifier le nom d'utilisateur
export const updateUserName = async (token, newUserName) => {
  try {
    const response = await fetch(`${API_URL}/user/profile`, {
      method: "PUT", // Utiliser PUT pour mettre à jour
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: newUserName }), // Envoie le nouveau nom d'utilisateur
    });

    if (!response.ok) {
      throw new Error(`Erreur API, statut : ${response.status}`); // Gérer les erreurs
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du nom d'utilisateur :",
      error
    );
    throw error; // Propager l'erreur pour la gestion
  }
};
