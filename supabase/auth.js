"use client"
import { syncWishlistWithSupabase } from "@/app/context/WishlistContext";
import { supabase } from "./client"
import { syncCartWithSupabase } from "./cart_items";

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
  console.log("[auth.login] pre‐sync local cart:", localStorage.getItem("cart_items"));
  
  if(user) {
    await syncWishlistWithSupabase(user.id);
    await syncCartWithSupabase(user.id)
    console.log("[auth.login] syncCartWithSupabase returned");
  }

  return { user, error: null }; 
};

// get the current logegd-in user
export const getLoggedInUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      if (error.message === "Auth session missing!") {
        console.warn("No user session found (user not logged in).");
        return { user: null };
      } else {
        console.error("Error fetching user:", error.message);
        return { error };
      }
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
  
  if (error) throw error;

  const user = data.user;
  console.log("[auth.signInWithGoogle] pre‐sync local cart:", localStorage.getItem("cart_items"));
  
  if(user) {
    await syncWishlistWithSupabase(user.id);
    await syncCartWithSupabase(user.id)
    console.log("[auth.signInWithGoogle] syncCartWithSupabase done");
  }
  
  return data
}


