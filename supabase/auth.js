"use client"
import { syncCartWithSupabase } from "@/app/context/CartContext";
import { syncWishlistWithSupabase } from "@/app/context/WishlistContext";
import { supabase } from "./client"

// Sign up with email/password
export const signUp = async ({ email, password, data }) => {
  const { data: userData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: data?.first_name,
        last_name: data?.last_name,
        role: data?.role || "user",
      },
    },
  });

  if (signUpError) {
    if (signUpError.message === "User already registered") {
      return {
        error: new Error("This email is already in use. Please log in or use another."),
      };
    }
    return { error: signUpError };
  }

  const user = userData?.user;

  if (!user || !user.id) {
    return { error: new Error("User object is missing after signup") };
  }

  // ❌ Don't insert/upsert here anymore — let AuthContext handle that

  return { user, error: null };
};



// Login with email/password
export const login = async ({ email, password }) => {
  let { data, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    if (loginError.message.includes("Invalid login credentials")) {
      return { error: { message: "Email or password is incorrect." } };
    }
    return { error: loginError };
  }

  const user = data.user;
  await syncWishlistWithSupabase(user.id);
  // await syncCartWithSupabase(user.id);  

  return { user, error: null }; 
};

// get the current logegd-in user
export const getLoggedInUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error.message);
      return { error };
    }

    if (!user) {
      console.warn("No user session found.");
      return { user: null };
    }

    return { user };
  } catch (err) {
    console.error("Unexpected error fetching user:", err.message);
    return { user: null, error: err };
  }
};


//signout user
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
    return { error };
  }

  return { message: "Logged out successfully" };
};

// Login with Google OAuth
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000",
    },
  })
  if (error) {
    console.error("Google sign-in error:", error)
    return null
  }
  const user = data.user;
  
  await syncWishlistWithSupabase(user.id);
  // await syncCartWithSupabase(user.id);
  
  return data
}


