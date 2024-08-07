import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import URLShortener from "./components/URLShortener";
import QRCodeGenerator from "./components/QRCodeGenerator";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import "./styles/styles.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<URLShortener />} />
            <Route
              path="/qr-code"
              element={<QRCodeGenerator url="http://example.com" />}
            />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
