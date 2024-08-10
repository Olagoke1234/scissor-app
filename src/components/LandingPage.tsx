import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import "../styles/styles.css"; // Make sure to import the correct CSS file

const LandingPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign-up and sign-in
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/shortener");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/shortener");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/shortener");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="landing-page">
      <div className="content">
        <h1>Welcome to Scissor</h1>
        <p>Shorten your URLs quickly and easily.</p>
        <div className="auth-form">
          <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
            <input
              type="email"
              className="auth-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="auth-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="auth-button">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <button
            onClick={handleGoogleSignIn}
            className="auth-button google-signin"
          >
            {isSignUp ? "Sign Up with Google" : "Sign In with Google"}
          </button>
          <p className="toggle-message">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <span onClick={() => setIsSignUp(false)}>Sign In</span>
              </>
            ) : (
              <>
                Not registered?{" "}
                <span onClick={() => setIsSignUp(true)}>Sign Up</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
