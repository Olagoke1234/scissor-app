import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import URLShortener from "./components/URLShortener";
import RedirectPage from "./components/RedirectPage";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="App-main">
          <Routes>
            <Route path="/" element={<URLShortener />} />
            <Route path="/short/:shortURL" element={<RedirectPage />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/404" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
