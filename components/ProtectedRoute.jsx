"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login"); // redirect if not logged in
    }
  }, [user, isLoading, router]);

  if (isLoading) return <p className="text-center">Loading...</p>;

  return user ? children : null; // Show content only if user is authenticated
};

export default ProtectedRoute;
