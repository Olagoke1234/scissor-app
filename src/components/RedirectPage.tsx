import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, doc, getDoc } from "../firebase"; // Ensure correct path
import "../styles/styles.css";

const RedirectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        console.log("Fetching document for ID:", id); // Log the ID
        const docRef = doc(db, "urls", id || "");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const longURL = docSnap.data().longURL;
          console.log("Document found, redirecting to:", longURL);
          window.location.href = longURL;
        } else {
          console.log("Document not found, redirecting to 404");
          navigate("/404"); // Handle URL not found
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        navigate("/404"); // Handle errors
      }
    };

    fetchAndRedirect();
  }, [id, navigate]);

  return null; // This component does not render anything
};

export default RedirectPage;
