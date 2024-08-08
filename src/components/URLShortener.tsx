// URLShortener.tsx
import React, { useState } from "react";
import { db, collection, addDoc } from "../firebase";
import "../styles/styles.css";
import QRCodeGenerator from "./QRCodeGenerator";

const URLShortener: React.FC = () => {
  const [longURL, setLongURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [customURL, setCustomURL] = useState("");

  const generateShortURL = async (url: string, custom?: string) => {
    const baseURL = window.location.origin; // Using the app's base URL

    if (custom && custom.match(/^https?:\/\//)) {
      // If the custom URL is a fully qualified URL
      return custom;
    }

    // Use custom URL as a path segment if it's not a fully qualified URL
    return `${baseURL}/short/${
      custom || Math.random().toString(36).substr(2, 5)
    }`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!longURL) return;

    const newShortURL = await generateShortURL(longURL, customURL);
    setShortURL(newShortURL);

    try {
      await addDoc(collection(db, "urls"), {
        longURL,
        shortURL: newShortURL,
        clickCount: 0, // Initialize click count
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
        <input
          type="text"
          value={customURL}
          onChange={(e) => setCustomURL(e.target.value)}
          placeholder="Enter qualified custom URL (optional)"
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
              href={longURL}
              target="_blank"
              rel="noopener noreferrer"
              className="URL-link"
            >
              {shortURL}
            </a>
          </p>
          <QRCodeGenerator url={longURL} />
        </>
      )}
    </div>
  );
};

export default URLShortener;
