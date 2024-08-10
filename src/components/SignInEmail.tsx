// src/components/SignInEmail.tsx
import React, { useState } from "react";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignInEmail: React.FC = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSendSignInLink = async () => {
    const actionCodeSettings = {
      url: "https://scissor-b5939.firebaseapp.com", // Make sure this URL is registered in Firebase
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      navigate("/checkEmail"); // Navigate to a page that informs the user to check their email
    } catch (error) {
      console.error("Error sending sign-in link:", error);
    }
  };

  return (
    <div>
      <h1>Sign In with Email</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleSendSignInLink}>Send Sign-In Link</button>
    </div>
  );
};

export default SignInEmail;
