import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,

      // ✅ Login Function (Calls Backend API)
      login: async (email, password) => {
        try {
          const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            throw new Error("Invalid credentials");
          }

          const data = await response.json();
          set({ token: data.token });

          // ✅ Store token in localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem("auth-token", data.token);
          }
        } catch (error) {
          throw error;
        }
      },

      // ✅ Logout Function (Removes Token)
      logout: () => {
        set({ token: null });
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth-storage"); // ✅ Removes token from storage
        }
      },
    }),
    {
      name: "auth-storage", // ✅ Key for storing token in localStorage
      getStorage: () => (typeof window !== "undefined" ? localStorage : undefined),
    }
  )
);
