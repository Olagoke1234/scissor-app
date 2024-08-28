import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../firebase";
import "../styles/styles.css";

// Type for URL data
interface UrlData {
  shortURL: string;
  longURL: string;
  clickCount: number;
}

const AnalyticsDashboard: React.FC = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUrls = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "urls"));
        if (isMounted) {
          const urlsData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              shortURL: data.shortURL || "N/A",
              longURL: data.longURL || "N/A",
              clickCount: data.clickCount ?? 0,
            };
          });
          setUrls(urlsData);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching URLs: ", error);
          setError((error as Error).message); // Type assertion
          setLoading(false);
        }
      }
    };

    fetchUrls();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="AnalyticsDashboard">
      <h2 className="Analytics-title">Analytics Dashboard</h2>
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
              <td>{url.clickCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsDashboard;
