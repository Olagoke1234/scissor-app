import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "../firebase"; // Ensure correct path
import "../styles/styles.css";

interface UrlData {
  id: string;
  longURL: string;
  shortURL?: string; // Optional short URL property
}

const AnalyticsDashboard: React.FC = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const snapshot = await getDocs(collection(db, "urls"));
        const data: UrlData[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<UrlData, "id">),
        }));
        setUrls(data);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="AnalyticsDashboard">
      <h1>Analytics Dashboard</h1>
      <table className="Analytics-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Long URL</th>
            <th>Short URL</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url.id}>
              <td>{url.id}</td>
              <td>
                <a href={url.longURL} target="_blank" rel="noopener noreferrer">
                  {url.longURL}
                </a>
              </td>
              <td>
                {url.shortURL ? (
                  <a
                    href={url.longURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {url.shortURL}
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsDashboard;
