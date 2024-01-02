"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "../firebaseConfig";
import styles from "./Signup.module.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const router = useRouter();

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const isSignUpDisabled =
    !email || !password || !passwordAgain || password !== passwordAgain;

  return (
    <div className={styles["signup-container"]}>
      <div className={styles["signup-form"]}>
        <h2 className={styles["signup-title"]}>Sign up</h2>

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

        <div className={styles["form-group"]}>
          <label htmlFor="password" className={styles["label"]}>
            Password
          </label>
          <div className={styles["input-container"]}>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles["input"]}
            />
          </div>
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="passwordAgain" className={styles["label"]}>
            Password Again
          </label>
          <div className={styles["input-container"]}>
            <input
              id="passwordAgain"
              name="passwordAgain"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPasswordAgain(e.target.value)}
              required
              className={styles["input"]}
            />
          </div>
        </div>

        <button
          disabled={isSignUpDisabled}
          onClick={signup}
          className={styles["signup-button"]}>
          Sign Up
        </button>

        <p className={styles["signup-link"]}>
          Already have an account?{" "}
          <button
            onClick={() => router.push("/signin")}
            className={styles["signup-link-button"]}>
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
