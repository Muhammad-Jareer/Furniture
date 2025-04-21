"use client"

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
  
    try {
      const { data, error } = await supabase
        .from("user_table")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();
  
      // ✅ User already exists
      if (data) return;
  
      // ❌ Some other unexpected error
      if (error && error.code !== "PGRST116") {
        console.error("Error checking user existence:", error);
        return;
      }
  
      // ✅ If no data and no critical error, insert the user
      const { error: insertError } = await supabase.from("user_table").insert([
        {
          id: user.id,
          email: user.email,
          first_name: user.user_metadata?.full_name?.split(" ")[0] || "Google",
          last_name: user.user_metadata?.full_name?.split(" ")[1] || "User",
          role: "user",
        },
      ]);
  
      if (insertError) {
        console.error("Error inserting user:", insertError);
      }
    } catch (err) {
      console.error("Unexpected error during upsert:", err);
    }
  };
  

  useEffect(() => {
    const initializeUser = async () => {
      setIsLoading(true);
      const { user, error } = await getLoggedInUser();
      if (error) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      if (user) {
        setUser(user);
        await upsertUserProfile(user);
      }

      setIsLoading(false);
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
    // call your imported Supabase helper (aliased as `logout`)
    const { error } = await logout();
  
    if (error) {
      console.error("Error signing out:", error);
      return { error };
    }
  
    // clear local state
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
