import "./App.css";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import Physiology from "./pages/Physiology/Physiology";
import Learn from "./pages/Learn/Learn";
import Tutorials from "./pages/Tutorials/Tutorials";
import { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectionPractice from "./pages/SelectionPractice/SelectionPractice";
import loadable from "@loadable/component";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import AboutUs from "./pages/AboutUs/AboutUs";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Container from "./components/Container/Container";

const WorkoutPractice = loadable(() =>
  import("./pages/Practice/workout/workout-Practice")
);

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // 🔥 Save mode in localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      
      {/* 🌙 DARK MODE TOGGLE BUTTON */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                zIndex: 1000,
                padding: "10px 15px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                background: darkMode 
                  ? "linear-gradient(135deg, #1e293b, #0f172a)" 
                  : "#ff8999",
                color: "white",
                boxShadow: "0px 5px 20px rgba(0,0,0,0.3)"
              }}
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      <Router>
        <AuthProvider>
          <Routes>

            <Route
              path="/workout-practice"
              element={
                <PrivateRoute>
                  <Container>
                    <WorkoutPractice />
                  </Container>
                </PrivateRoute>
              }
            />

            <Route
              path="/physiology"
              element={
                <PrivateRoute>
                  <Container>
                    <Physiology />
                  </Container>
                </PrivateRoute>
              }
            />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route
              path="/selection-practice"
              element={
                <PrivateRoute>
                  <Container>
                    <SelectionPractice />
                  </Container>
                </PrivateRoute>
              }
            />

            <Route
              path="/learn"
              element={
                <PrivateRoute>
                  <Container>
                    <Learn />
                  </Container>
                </PrivateRoute>
              }
            />

            <Route
              path="/tutorials"
              element={
                <PrivateRoute>
                  <Container>
                    <Tutorials />
                  </Container>
                </PrivateRoute>
              }
            />

            <Route
              path="/about"
              element={
                <PrivateRoute>
                  <Container>
                    <AboutUs />
                  </Container>
                </PrivateRoute>
              }
            />

            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Container>
                    <Dashboard />
                  </Container>
                </PrivateRoute>
              }
            />

          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;