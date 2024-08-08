import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../firebase";
import "../styles/styles.css";

const AnalyticsDashboard: React.FC = () => {
  const [urls, setUrls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "urls"));
        const urlsData = querySnapshot.docs.map((doc) => doc.data());
        setUrls(urlsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching URLs: ", error);
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="AnalyticsDashboard">
      <h2>Analytics Dashboard</h2>
      <table className="Analytics-table">
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Long URL</th>
            <th>Click Count</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, index) => (
            <tr key={index}>
              <td>
                <a href={url.longURL} target="_blank" rel="noopener noreferrer">
                  {url.shortURL}
                </a>
              </td>
              <td>
                <a href={url.longURL} target="_blank" rel="noopener noreferrer">
                  {url.longURL}
                </a>
              </td>
              <td>{url.clickCount || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsDashboard;
