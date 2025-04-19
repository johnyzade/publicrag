import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // New state for role selection
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    const allowedDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com"];
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }
    const domain = email.split("@")[1];
    if (!allowedDomains.includes(domain)) {
      return `Email domain must be one of: ${allowedDomains.join(", ")}`;
    }
    return "";
  };

  // Password validation function
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");

    // Validate all fields
    if (!fullName || !email || !password || !role) {
      setError("All fields are required, including role selection.");
      return;
    }

    // Validate email
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    // Validate password
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    // If all validations pass
    console.log("User Registered:", { fullName, email, password, role });
    navigate("/email-verification", { state: { requiresMFA: true } }); // Pass requiresMFA flag
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create an Account</h1>
        <p style={styles.subtitle}>Sign up to access legal resources</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          {emailError && <p style={styles.error}>{emailError}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          {passwordError && <p style={styles.error}>{passwordError}</p>}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.select}
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="Admin">Admin</option>
            <option value="Citizen">Citizen</option>
            <option value="Law Student">Law Student</option>
            <option value="Lawyer">Lawyer</option>
          </select>
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        <p style={styles.footer}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={styles.link}
          >
            Log in
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
  select: {
    width: "100%",
    maxWidth: "300px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccd6e0",
    fontSize: "14px",
    backgroundColor: "#ffffff", // White background for select
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
    backgroundColor: "#003366", // Navy blue button
    transition: "transform 0.3s ease, background-color 0.3s ease",
    cursor: "pointer",
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

export default Registration;