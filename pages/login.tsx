import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";
import Layout from "@/components/Layout";
import Link from "next/link";
import axios from "axios";

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const token = useAuthStore((state) => state.token);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("michael.franklin.dev.312@gmail.com");
  const [password, setPassword] = useState("1q2w3e4r!@#$Q");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false); // Prevents multiple redirects

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedToken = useAuthStore.getState().token || sessionStorage.getItem("access_token");
    
    if (storedToken && !isRedirecting) {
      setIsRedirecting(true);
      router.replace("/doctor-dashboard");
    }

    setIsCheckingAuth(false);
  }, [router, isRedirecting]);

  if (isCheckingAuth) return <div className="h-screen flex justify-center items-center">Checking authentication...</div>;

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Login successful:", response.data);

      const token = response.data.access_token;

      // ✅ Store token in Zustand first
      login(token);

      // ✅ Store token in sessionStorage (not localStorage)
      sessionStorage.setItem("access_token", token);

      // ✅ Redirect to doctor dashboard
      router.replace("/doctor-dashboard");
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-0">
          <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="flex justify-center flex-col items-center">
              <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white px-6 py-12 shadow rounded-lg sm:px-12">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:ring-2 focus:ring-indigo-600"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                <div className="mt-4 text-center text-sm">
                  <Link href="#" className="text-indigo-600 hover:text-indigo-800" prefetch={false}>
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
