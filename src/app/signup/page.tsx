"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useRouter } from "next/navigation";
import styles from "./Signup.module.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const router = useRouter();

  const signup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Access user information from userCredential
      const userId = userCredential.user.uid;
      const userEmail = userCredential.user.email;

      // Add the user to the "users" collection in Firestore
      const usersCollection = collection(db, "users");
      const userDocRef = await addDoc(usersCollection, {
        uid: userId,
        email: userEmail,
      });

      console.log("User added to Firestore with document ID:", userDocRef.id);

      // Navigate to another page after successful signup
      router.push("/signin");
    } catch (error) {
      console.error("Error signing up:", error);
    }
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
