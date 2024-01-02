// Signin.jsx

"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./Signin.module.css"; // Import the CSS file

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <h2 className={styles.title}>Sign in to your account</h2>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formField}>
            <label htmlFor="email" className={styles.label}>
              Email address
            </label>
            <div className={styles.inputContainer}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formField}>
            <div className={styles.passwordField}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.forgotPassword}>
                <div
                  onClick={() => router.push("/forgot-password")}
                  className={styles.forgotPasswordLink}>
                  Forgot password?
                </div>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.submitButtonContainer}>
            <button
              onClick={() =>
                signIn("credentials", {
                  email,
                  password,
                  redirect: true,
                  callbackUrl: "/",
                })
              }
              disabled={!email || !password}
              className={styles.submitButton}>
              Sign in
            </button>
          </div>
        </div>

        <p className={styles.signupLink}>
          Not a member?
          <button
            onClick={() => router.push("signup")}
            className={styles.signupButton}>
            Sign Up
          </button>
        </p>
      </div>
    </>
  );
}
