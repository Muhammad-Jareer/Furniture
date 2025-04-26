"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/supabase/client";
import {
  login,
  signUp,
  signOut as logout,
  getLoggedInUser,
  signInWithGoogle,
} from "../../supabase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const upsertUserProfile = async (user) => {
    if (!user) return;

    let firstName = "User";
    let lastName = "";
    const metadata = user.user_metadata || {};

    if (metadata.first_name) firstName = metadata.first_name;
    if (metadata.last_name) lastName = metadata.last_name;

    if (!metadata.first_name && !metadata.last_name && metadata.full_name) {
      const nameParts = metadata.full_name.trim().split(" ");
      if (nameParts.length > 0) firstName = nameParts[0];
      if (nameParts.length > 1) lastName = nameParts.slice(1).join(" ");
    }

    try {
      const { error } = await supabase.from("user_table").upsert(
        [{
          id: user.id,
          email: user.email,
          first_name: firstName,
          last_name: lastName,
          role: metadata.role || "user",
        }],
        { onConflict: "id" }
      );
      if (error) console.error("Upsert error:", error);
    } catch (err) {
      console.error("Unexpected error during upsert:", err);
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      setIsLoading(true);
      try {
        const { user, error } = await getLoggedInUser();
        if (error) {
          setUser(null);
          return;
        }

        if (user) {
          setUser(user);
          await upsertUserProfile(user);
        }
      } catch (err) {
        console.error("Unexpected error during initialization:", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          setUser(session.user);
          await upsertUserProfile(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const { error } = await logout();
    if (error) {
      console.error("Error signing out:", error);
      return { error };
    }

    setUser(null);
    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, signUp, signOut, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
