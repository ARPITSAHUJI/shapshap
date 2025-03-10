"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
  <div>
    <h1>Home</h1>
  </div>
  );
}
export default Home