// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/supabase/client";

// export const GoogleUserHandler = () => {
//   const [loading, setLoading] = useState(true); // Loading state to wait for session

//   useEffect(() => {
//     const handleUserInsert = async () => {
//       const { data: { session }, error: sessionError } = await supabase.auth.getSession();

//       if (sessionError) {
//         console.error("Session Error:", sessionError);
//         setLoading(false); // Stop loading if there's an error
//         return;
//       }

//       const user = session?.user;
//       if (!user || user.app_metadata?.provider !== "google") {
//         setLoading(false); // Stop loading if the user is not logged in with Google
//         return;
//       }
      

//       // Check if the user exists in user_table
//       const { data, error } = await supabase
//         .from("user_table")
//         .select("id")
//         .eq("id", user.id)
//         .maybeSingle();

//       if (error && error.code !== 'PGRST116') {
//         console.error("Error fetching user data:", error);
//         setLoading(false); // Stop loading if there's an error
//         return;
//       }

//       if (!data) {
//         // Insert the user if not found
//         const { error: insertError } = await supabase.from("user_table").insert([
//           {
//             id: user.id,
//             email: user.email,
//             first_name: user.user_metadata.full_name?.split(" ")[0] || "Google",
//             last_name: user.user_metadata.full_name?.split(" ")[1] || "User",
//             role: "user",
//           },
//         ]);

//         if (insertError) {
//           console.error("Error inserting user:", insertError);
//         }
//       }

//       setLoading(false); // Stop loading once the process is done
//     };

//     handleUserInsert();
//   }, []);

//   if (loading) {
//     return null; // Optionally, return a loading spinner or some indication
//   }

//   return null; // You don't need to render anything from this component
// };
