import React, { useState } from "react";
import { db, collection, addDoc } from "../firebase"; // Ensure correct path
import "../styles/styles.css";
import QRCodeGenerator from "./QRCodeGenerator";

const URLShortener: React.FC = () => {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");

  const generateShortURL = async (url: string) => {
    // Simulate short URL generation
    return `${window.location.origin}/short/${Math.random()
      .toString(36)
      .substr(2, 5)}`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!longURL) return;

    const newShortURL = await generateShortURL(longURL);
    setShortURL(newShortURL);

    try {
      await addDoc(collection(db, "urls"), {
        longURL,
        shortURL: newShortURL,
      });
      alert("URL shortened and saved!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="URLShortener">
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
          placeholder="Enter long URL"
          className="URL-input"
        />
        <button type="submit" className="URL-button">
          Shorten URL
        </button>
      </form>
      {shortURL && (
        <>
          <p>
            Short URL:{" "}
            <a
              href={longURL} // Should point to longURL
              target="_blank"
              rel="noopener noreferrer"
              className="URL-link"
            >
              {shortURL}
            </a>
          </p>
          <QRCodeGenerator url={shortURL} /> {/* Pass shortURL here */}
        </>
      )}
    </div>
  );
};

export default URLShortener;
