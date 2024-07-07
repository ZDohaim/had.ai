import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import GiftGenerator from "./GiftGenerator";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <img
                  className="logo"
                  src="/logo_test.png"
                  alt="had.ai temp logo"
                  width="150"
                  height="150"
                />
                <h1 className="text">Had.ai</h1>
                <h2 className="text">إكتشف اسهل وافضل طريقة لشراء</h2>
                <h2 className="text">هدايا تفرح من تحب</h2>
                <button className="enter-button">
                  <Link to="/gift-generator">ابدا الان</Link>
                </button>
              </div>
            }
          />
          <Route path="/gift-generator" element={<GiftGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
