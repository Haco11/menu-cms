"use client";
import styles from "./page.module.css";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  return (
    <main className={styles.main}>
      <div>
        <h1> {session?.data?.user?.email}</h1>
      </div>
      <button onClick={() => signOut()}>Logout</button>
    </main>
  );
}
