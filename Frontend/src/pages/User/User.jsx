import { useSelector } from "react-redux";
import { useState } from "react";
import AccountList from "../../components/AccountList/AccountList";
import Button from "../../components/Button/Button";
import EditName from "../../components/EditName/EditName";

const User = () => {
  // Récupérer le nom d'utilisateur et l'état d'authentification depuis Redux
  const userProfile = useSelector((state) => state.user.userProfil);
  const isAuthenticated = useSelector((state) => !!state.user.userToken);
  //console.log("User Profile: ", userProfile);
  //console.log("Is Authenticated: ", isAuthenticated);
  // État pour gérer l'édition du nom
  const [isEditing, setIsEditing] = useState(false);

  // Fonction pour ouvrir/fermer l'édition du nom
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  // Vérifier si l'utilisateur est authentifié
  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>;
  }

  if (!userProfile) {
    return <div>Loading user profile...</div>;
  }

  return (
    <main className="main bg-dark2">
      <div className="header">
        <h1 className="title-header">
          Welcome back
          <br />
          {userProfile.userName}!
        </h1>

        {!isEditing && (
          <Button
            className="edit-button"
            buttonText={"Edit Name"}
            onClick={handleEditClick}
          />
        )}

        {isEditing && <EditName isOpen={isEditing} onClose={handleCloseEdit} />}
      </div>

      <AccountList />
    </main>
  );
};

export default User;
