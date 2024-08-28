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
          const data = docSnap.data();
          const longURL = data?.longURL;
          const currentClickCount = data?.clickCount ?? 0;

          console.log(`Current click count: ${currentClickCount}`);

          if (longURL) {
            // Initialize clickCount if it doesn't exist
            if (data?.clickCount === undefined) {
              console.log("Initializing clickCount to 0");
              await updateDoc(docRef, { clickCount: 0 });
            }

            // Increment clickCount
            console.log(`Updating click count for short URL: ${shortURL}`);
            await updateDoc(docRef, { clickCount: increment(1) });

            // Redirect to the long URL
            console.log(`Redirecting to: ${longURL}`);
            window.location.href = longURL;
          } else {
            console.error("Long URL not found!");
            navigate("/404"); // Redirect to 404 if longURL is undefined
          }
        } else {
          console.error("No such document!");
          navigate("/404"); // Redirect to 404 if document does not exist
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        navigate("/404"); // Redirect to 404 on error
      }
    };

    handleRedirect();
  }, [shortURL, navigate]);

  return null; // No need to render anything
};

export default RedirectPage;
