// pages/logout.tsx
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear cookies when user logs out
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');

    // Redirect to login page
    router.push('/login');
  }, [router]);

  return <div>Logging out...</div>;
};

export default Logout;
