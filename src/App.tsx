// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import URLShortener from "./components/URLShortener";
import RedirectPage from "./components/RedirectPage";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

const App = () => {
  const location = useLocation();
  const showHeaderFooter = location.pathname !== "/";

  return (
    <div className="App">
      {showHeaderFooter && <Header />}
      <main className="App-main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shortener" element={<URLShortener />} />
          <Route path="/short/:shortURL" element={<RedirectPage />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/404" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
