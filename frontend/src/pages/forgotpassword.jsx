import { useState } from "react";
import API from "../services/api";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  // STEP 1 → Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();

    try {

      await API.post("/auth/send-otp", { email });

      setMessage("OTP sent to your email.");
      setStep(2);

    } catch (error) {
  console.error(error);
  setMessage("Invalid OTP or error.");
}
  };

  // STEP 2 → Verify OTP + Reset Password
  const resetPassword = async (e) => {
    e.preventDefault();

    try {

      await API.post("/auth/reset-password", {
        email,
        otp,
        password: newPassword
      });

      setMessage("Password reset successfully.");

      setStep(1);
      setOtp("");
      setNewPassword("");

    } catch (error) {
  console.error(error);
  setMessage("Invalid OTP or error.");
}
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">

        <h2>Reset Password with OTP</h2>

        {message && (
          <div className="info-message">
            {message}
          </div>
        )}

        {/* STEP 1 → SEND OTP */}
        {step === 1 && (
          <form onSubmit={sendOtp}>

            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className="forgot-btn">
              Send OTP
            </button>

          </form>
        )}

        {/* STEP 2 → RESET PASSWORD */}
        {step === 2 && (
          <form onSubmit={resetPassword}>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <button type="submit" className="forgot-btn">
              Reset Password
            </button>

          </form>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;