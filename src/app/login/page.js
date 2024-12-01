"use client";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    // Add login logic here
    router.push("/search");
  };

  return (
    <main>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
    </main>
  );
}