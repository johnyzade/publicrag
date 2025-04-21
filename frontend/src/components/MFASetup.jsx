import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MFASetup = () => {
  const [regionalCode, setRegionalCode] = useState(""); // Stores the regional code
  const [actualNumber, setActualNumber] = useState(""); // Stores the actual phone number
  const [otpSent, setOtpSent] = useState(false); // Tracks if OTP is sent
  const [otp, setOtp] = useState(""); // Stores the OTP entered by the user
  const [error, setError] = useState(""); // Tracks errors
  const [loading, setLoading] = useState(false); // Tracks loading state
  const navigate = useNavigate();

  // Regional code validation function
  const validateRegionalCode = (code) => {
    const regionalCodeRegex = /^\+\d{1,4}$/; // Starts with + and 1-4 digits
    return regionalCodeRegex.test(code);
  };

  // Actual number validation function
  const validateActualNumber = (number) => {
    const actualNumberRegex = /^\d{6,15}$/; // 6-15 digits
    return actualNumberRegex.test(number);
  };

  // Handles sending OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    setError("");

    // Validate regional code
    if (!regionalCode) {
      setError("Regional code is required.");
      console.log("Error: Regional code is missing");
      return;
    }

    if (!validateRegionalCode(regionalCode)) {
      setError("Invalid regional code. It must start with '+' and contain 1-4 digits.");
      console.log("Error: Invalid regional code");
      return;
    }

    // Validate actual number
    if (!actualNumber) {
      setError("Phone number is required.");
      console.log("Error: Phone number is missing");
      return;
    }

    if (!validateActualNumber(actualNumber)) {
      setError("Invalid phone number. It must contain 6-15 digits.");
      console.log("Error: Invalid phone number");
      return;
    }

    setLoading(true);
    console.log("Sending OTP to phone number:", `${regionalCode} ${actualNumber}`);

    // Simulate sending OTP
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      alert("OTP has been sent to your phone number!");
      console.log("OTP sent successfully");
    }, 1000);
  };

  // Handles verifying OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError("");

    // Validate OTP
    if (!otp) {
      setError("OTP is required for verification.");
      console.log("Error: OTP is missing");
      return;
    }

    setLoading(true);
    console.log("Verifying OTP:", otp);

    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);

      if (otp === "123456") {
        alert("MFA has been successfully enabled!");
        console.log("MFA enabled successfully");
        navigate("/login"); // Redirect to login page after enabling MFA
      } else {
        setError("Invalid OTP. Please try again.");
        console.log("Error: Invalid OTP");
      }
    }, 1000);
  };

  // Handles skipping MFA setup
  const handleSkip = () => {
    console.log("Skipping MFA setup, redirecting to /login");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Set Up MFA</h1>
        <p style={styles.subtitle}>
          Multi-Factor Authentication (MFA) adds an extra layer of security to your account. You can skip this step if you prefer.
        </p>
        {!otpSent ? (
          <form onSubmit={handleSendOtp} style={styles.form}>
            <div style={styles.phoneInputContainer}>
              <input
                type="text"
                placeholder="Regional Code (e.g., +1)"
                value={regionalCode}
                onChange={(e) => setRegionalCode(e.target.value)}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Phone Number (e.g., 1234567890)"
                value={actualNumber}
                onChange={(e) => setActualNumber(e.target.value)}
                style={styles.input}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                backgroundColor: loading ? "#5a6b8c" : "#003366",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} style={styles.form}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
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
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </form>
        )}
        {error && <p style={styles.error}>{error}</p>}
        {!otpSent && (
          <button onClick={handleSkip} style={styles.skipButton}>
            Skip MFA Setup
          </button>
        )}
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
  phoneInputContainer: {
    display: "flex",
    gap: "10px",
    width: "100%",
    maxWidth: "300px",
  },
  input: {
    flex: 1,
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
  skipButton: {
    marginTop: "15px",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#003366", // Navy blue for skip button
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    fontFamily: "'Roboto', sans-serif",
  },
  error: {
    marginTop: "15px",
    color: "#d9534f", // Softer red for error messages
    fontSize: "14px",
  },
};

export default MFASetup;