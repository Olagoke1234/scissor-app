import React, { useState, useEffect } from "react";
import { firestore, collection, getDocs } from "../firebase";
import "../styles/styles.css";

interface UrlData {
  id: string;
  longURL: string;
  clicks: number;
}

const AnalyticsDashboard: React.FC = () => {
  const [urlData, setUrlData] = useState<UrlData[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, "urls"));
        const data: UrlData[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<UrlData, "id">),
        }));
        setUrlData(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="AnalyticsDashboard">
      <h2>Analytics Dashboard</h2>
      <table className="Analytics-table">
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urlData.map((data) => (
            <tr key={data.id}>
              <td>
                <a
                  href={`${window.location.origin}/short/${data.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${window.location.origin}/short/${data.id}`}
                </a>
              </td>
              <td>{data.longURL}</td>
              <td>{data.clicks || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsDashboard;
