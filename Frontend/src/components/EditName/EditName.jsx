import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { infoUserName } from "../../authentification/loginSlice";
import { updateUserName } from "../../api/api";

const EditName = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.userProfil);
  const token = useSelector((state) => state.user.userToken);

  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userProfile && userProfile.userName) {
      setUserName(userProfile.userName);
    }
  }, [userProfile]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null; // Ne pas afficher le composant si la modal n'est pas ouverte

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (token) {
      try {
        const response = await updateUserName(token, userName);
        console.log("Nom d'utilisateur mis à jour :", response);
        dispatch(infoUserName(userName));
        onClose();
      } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        setError(
          "Une erreur s'est produite lors de la mise à jour du nom d'utilisateur."
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error(
        "Token non trouvé, impossible de mettre à jour le nom d'utilisateur."
      );
      setError(
        "Token non trouvé, impossible de mettre à jour le nom d'utilisateur."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-header">Edit user info</h2>
        <form className="modal-form">
          <div>
            <label htmlFor="userName">Username:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
          </div>
          <div>
            <label htmlFor="firstName">First name:</label>
            <input
              type="text"
              id="firstName"
              value={userProfile.firstName || ""}
              disabled
            />
          </div>
          <div>
            <label htmlFor="lastName">Last name:</label>
            <input
              type="text"
              id="lastName"
              value={userProfile.lastName || ""}
              disabled
            />
          </div>
          <div className="button-group">
            <Button
              buttonText={isLoading ? "Saving..." : "Save"}
              className="edit-button"
              type="button"
              onClick={handleSave}
              disabled={isLoading || userName.trim() === ""}
            />
            <Button
              buttonText="Cancel"
              className="edit-button"
              type="button"
              onClick={onClose}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

EditName.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditName;
