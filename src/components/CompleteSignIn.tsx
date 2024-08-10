// src/components/CompleteSignIn.tsx
import React, { useEffect } from "react";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const CompleteSignIn: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const completeSignIn = async () => {
      try {
        const url = window.location.href;
        const email = window.localStorage.getItem("emailForSignIn");

        if (isSignInWithEmailLink(auth, url)) {
          if (!email) {
            navigate("/"); // Redirect if no email found
            return;
          }

          await signInWithEmailLink(auth, email, url);
          window.localStorage.removeItem("emailForSignIn");
          navigate("/dashboard"); // Redirect after successful sign-in
        }
      } catch (error) {
        console.error("Error completing sign-in:", error);
      }
    };

    completeSignIn();
  }, [auth, navigate]);

  return <div>Completing sign-in...</div>;
};

export default CompleteSignIn;
