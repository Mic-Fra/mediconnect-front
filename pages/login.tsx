import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import Layout from "@/components/Layout";
import Link from "next/link";
import axios from "axios";
import Cookies from 'js-cookie';

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const token = useAuthStore((state) => state.token);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('michael.franklin.dev.312@gmail.com');
  const [password, setPassword] = useState('1q2w3e4r!@#$Q');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      }, { withCredentials: true });
  
      // const { access_token, refresh_token } = response.data;
  
      // console.log('here', response, access_token, refresh_token)
  
      // // Set the tokens in cookies, without the httpOnly flag on the client-side
      // // Note: This is just for example, don't use this for sensitive data like access tokens in real apps.
      // Cookies.set('access_token', access_token); 
      // Cookies.set('refresh_token', refresh_token);
  
      // Redirect to the dashboard after a successful login
      router.push('/doctor-dashboard');
    } catch (err) {
      setError('Invalid email or password');
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

                  
                  <button onClick={handleLogin}
                  className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:ring-2 focus:ring-indigo-600"
                  >Login</button>

                  {error && <p>{error}</p>}


                <div className="mt-4 text-center text-sm">
                  <Link href="#" className="text-indigo-600 hover:text-indigo-800">
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
