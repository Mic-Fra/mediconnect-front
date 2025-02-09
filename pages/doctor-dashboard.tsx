import { GetServerSideProps } from 'next';
import axios from 'axios';
import Header1 from "../components/Header1";
import cookie from 'cookie';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Server-side authentication check
export const getServerSideProps: GetServerSideProps = async (context) => {
  let token = null;

  if (context.req.headers.cookie) {
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    token = parsedCookies.access_token;
  }

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    await axios.get('http://192.168.15.78:3000/auth/validate', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { props: {} };
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};

// User interface
interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  upimagePreview: string;
  general?: string[];
  surgical?: string[];
  medical?: string[];
  pediatric?: string[];
  other?: string[];
  isActive: boolean;
}

const DoctorDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Name search
  const [specialtyQuery, setSpecialtyQuery] = useState<string>(''); // Specialty search
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:3000/users/search', {
        params: {
          name: searchQuery || undefined,
          specialty: specialtyQuery || undefined,
          page: currentPage,
          limit: 5,
        },
      });

      setUsers(response.data.data);
      setTotalPages(response.data.lastPage);
    } catch (err) {
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch on dependency change
  useEffect(() => {
    fetchUsers();
  }, [searchQuery, specialtyQuery, currentPage]);

  const toggleActiveStatus = async (userId: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/${userId}/toggle-active`
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isActive: response.data.isActive } : user
        )
      );
    } catch (err) {
      alert('Failed to toggle user active status.');
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      await axios.delete(`http://localhost:3000/users/${userId}`);
      alert('User deleted successfully.');
    } catch (err) {
      alert('Failed to delete user.');
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Header1 />
      <h1 className="text-2xl text-center font-bold my-10">Doctor Dashboard</h1>

      {/* Search Inputs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md flex-1"
        />
        <input
          type="text"
          placeholder="Search by specialty"
          value={specialtyQuery}
          onChange={(e) => setSpecialtyQuery(e.target.value)}
          className="p-2 border rounded-md flex-1"
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Profile</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Specialty</th>
                <th className="border border-gray-300 px-4 py-2">Access</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    <Link href={`/doctor/${user.id}`}>
                      <img
                        src={user.upimagePreview ? `http://localhost:3000${user.upimagePreview}` : '/default-avatar.png'}
                        alt="Profile"
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mx-auto"
                      />
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link href={`/doctor/${user.id}`}>
                      {user.firstname} {user.lastname}
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link href={`mailto:${user.email}`} className="text-blue-500 hover:underline break-words">
                      {user.email}
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                  <td className="border border-gray-300 px-4 py-2 text-left">
                    {[
                      { label: "General", value: user.general },
                      { label: "Surgical", value: user.surgical },
                      { label: "Medical", value: user.medical },
                      { label: "Pediatric", value: user.pediatric },
                      { label: "Other", value: user.other },
                    ].map(({ label, value }) =>
                      value?.length ? <li key={label}>{label}: {value.join(", ")}</li> : null
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => toggleActiveStatus(user.id)}
                      className={`px-4 py-2 rounded ${user.isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button onClick={() => deleteUser(user.id)} className="px-4 py-2 bg-red-500 text-white rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-4 py-2 mx-1 ${
                currentPage === 1
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-4 py-2 mx-1 ${
                currentPage === totalPages
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>     
      )}
    </div>
  );
};

export default DoctorDashboard;
