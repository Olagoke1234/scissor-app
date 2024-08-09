import React, { useEffect } from "react";
import { db, doc, updateDoc, increment, getDoc } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";

const RedirectPage: React.FC = () => {
  const { shortURL } = useParams<{ shortURL: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      if (!shortURL) {
        console.error("No short URL provided!");
        navigate("/404");
        return;
      }

      try {
        const docRef = doc(db, "urls", shortURL);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const longURL = docSnap.data()?.longURL;

          if (longURL) {
            console.log(`Updating click count for short URL: ${shortURL}`);
            await updateDoc(docRef, {
              clickCount: increment(1),
            });
            console.log(`Redirecting to: ${longURL}`);
            window.location.href = longURL;
          } else {
            console.error("Long URL not found!");
            navigate("/404");
          }
        } else {
          console.error("No such document!");
          navigate("/404");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        navigate("/404");
      }
    };

    handleRedirect();
  }, [shortURL, navigate]);

  return null;
};

export default RedirectPage;
