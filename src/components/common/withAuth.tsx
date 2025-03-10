"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "./Loaders/Loader";

export default function withAuth(Components: React.ComponentType<any>) {
  return function ProtectedComponent(props: any) {
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
      setIsMounted(true);
      const token = localStorage.getItem("accessToken");


      if (!token) {
        router.push("/login");
      }

      setIsLoading(false);
    }, []);

    // Show a loading indicator while the token is being checked
    if (isLoading || !isMounted) {
      return <Loader />;
    }

    return <Components {...props} />;
  };
}
