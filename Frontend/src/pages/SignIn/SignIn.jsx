import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, loginUser } from "../../authentification/loginSlice";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    ////console.log("Password:", password); // Vérifiez que le mot de passe
    // Connexion avec Redux
    dispatch(loginUser({ email, password }));
    //console.log("Token from localStorage:", localStorage.getItem("token"));
  };

  const { userToken } = useSelector((state) => state.user) || {}; // Accéder directement à userToken

  useEffect(() => {
    if (userToken) {
      dispatch(fetchUserProfile(userToken));
      navigate("/user");
    }
  }, [userToken, dispatch, navigate]);

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon
            icon={faCircleUser}
            className="fa fa-user-circle sign-in-icon"
          ></FontAwesomeIcon>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <Button
              buttonText={"Sign In"}
              className={"sign-in-button"}
            ></Button>
          </form>
          {status === "loading" && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </section>
      </main>
    </>
  );
}

export default SignIn;
