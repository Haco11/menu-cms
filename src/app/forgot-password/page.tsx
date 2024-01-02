"use client";
import { useState } from "react";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import styles from "./ForgotPassword.module.css"; // Make sure to adjust the import path based on your project structure

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleResetEmail = () => {
    sendPasswordResetEmail(auth, email);
  };

  const isButtonDisabled = !email;

  return (
    <div className={styles["forgot-password-container"]}>
      <div className={styles["forgot-password-content"]}>
        <div className={styles["logo-container"]}>
          <h2 className={styles["title"]}>Forgot Password</h2>
        </div>

        <div className={styles["form-container"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="email" className={styles["label"]}>
              Email address
            </label>
            <div className={styles["input-container"]}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles["input"]}
              />
            </div>
          </div>

          <button
            onClick={handleResetEmail}
            disabled={isButtonDisabled}
            className={styles["reset-button"]}>
            Send Forgot Password Email
          </button>
        </div>
      </div>
    </div>
  );
}
