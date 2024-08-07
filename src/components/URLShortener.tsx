import React, { useState } from "react";
import { firestore, collection, addDoc } from "../firebase";
import "../styles/styles.css";

const URLShortener: React.FC = () => {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");

  const handleShorten = async () => {
    if (!longURL) {
      alert("Please enter a URL.");
      return;
    }

    try {
      const docRef = await addDoc(collection(firestore, "urls"), {
        longURL,
        clicks: 0,
      });
      setShortURL(`${window.location.origin}/short/${docRef.id}`);
      setLongURL(""); // Clear the input after submission
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="URLShortener">
      <h2>URL Shortener</h2>
      <input
        className="URL-input"
        type="text"
        value={longURL}
        onChange={(e) => setLongURL(e.target.value)}
        placeholder="Enter URL"
      />
      <button className="URL-button" onClick={handleShorten}>
        Shorten URL
      </button>
      {shortURL && (
        <p>
          Short URL:{" "}
          <a
            className="URL-link"
            href={shortURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortURL}
          </a>
        </p>
      )}
    </div>
  );
};

export default URLShortener;
