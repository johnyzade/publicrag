import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const requiresMFA = location.state?.requiresMFA || false; // Get requiresMFA flag

  // Hardcoded email-password pairs for validation
  const validUsers = {
    "test@gmail.com": "Password@123",
    "user@yahoo.com": "User@456",
    "admin@outlook.com": "Admin@789",
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate login process
    setTimeout(() => {
      setLoading(false);

      // Validate input fields
      if (!email || !password) {
        setError("All fields are required.");
        return;
      }

      // Validate email format
      if (!validateEmail(email)) {
        setError("Invalid email format.");
        return;
      }

      // Check if email exists in validUsers and password matches
      if (validUsers[email] && validUsers[email] === password) {
        if (requiresMFA) {
          navigate("/mfa-setup"); // Redirect to MFA setup if required
        } else {
          navigate("/chat"); // Redirect to chat page for regular logins
        }
      } else {
        setError("Invalid email or password."); // Show error for invalid credentials
      }
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Log in to your account</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              backgroundColor: loading ? "#5a6b8c" : "#003366",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        <p style={styles.footer}>
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/")}
            style={styles.link}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #1a2a4f, #2c3e70)", // Darker navy blue gradient
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#f4f6fa", // Light grayish background for the card
    textAlign: "center",
    color: "#333",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#003366", // Navy blue for the title
    fontFamily: "'Merriweather', serif",
  },
  subtitle: {
    fontSize: "16px",
    color: "#555", // Slightly darker gray for the subtitle
    marginBottom: "20px",
    fontFamily: "'Roboto', sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  input: {
    width: "100%",
    maxWidth: "300px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccd6e0",
    fontSize: "14px",
    backgroundColor: "#ffffff", // White background for inputs
    color: "#333",
    fontFamily: "'Roboto', sans-serif",
  },
  button: {
    width: "100%",
    maxWidth: "300px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "transform 0.3s ease, background-color 0.3s ease",
    fontFamily: "'Roboto', sans-serif",
  },
  error: {
    marginTop: "15px",
    color: "#d9534f", // Softer red for error messages
    fontSize: "14px",
  },
  footer: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#555", // Darker gray for footer text
    fontFamily: "'Roboto', sans-serif",
  },
  link: {
    color: "#003366", // Navy blue for links
    textDecoration: "underline",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Login;