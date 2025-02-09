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

// Patient interface
interface Patient {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  upimagePreview: string;
  isActive: boolean;
}

const PatientDashboard = () => {
  const [users, setUsers] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch patients
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:3000/patients/search', {
        params: {
          name: searchQuery || undefined,
          page: currentPage,
          limit: 5,
        },
      });

      setUsers(response.data.data);
      setTotalPages(response.data.lastPage);
    } catch (err) {
      setError('Failed to fetch patients.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchQuery, currentPage]);

  const toggleActiveStatus = async (userId: string) => {
    try {
      const response = await axios.patch(`http://localhost:3000/patients/${userId}/toggle-active`);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isActive: response.data.isActive } : user
        )
      );
    } catch (err) {
      alert('Failed to toggle active status.');
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      await axios.delete(`http://localhost:3000/patients/${userId}`);
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
      <h1 className="text-2xl text-center font-bold my-6">Patient Dashboard</h1>

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
              <tr className="bg-gray-100 text-sm sm:text-base">
                <th className="border border-gray-300 px-4 py-2">Profile</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="text-center text-sm sm:text-base">
                  <td className="border border-gray-300 px-4 py-2">
                    <Link href={`/patient/${user.id}`}>
                      <img
                        src={user.upimagePreview ? `http://localhost:3000${user.upimagePreview}` : '/default-avatar.png'}
                        alt="Profile"
                        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover mx-auto"
                      />
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link href={`/patient/${user.id}`}>
                      {user.firstname} {user.lastname}
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link href={`mailto:${user.email}`} className="text-blue-500 hover:underline break-words">
                      {user.email}
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => toggleActiveStatus(user.id)}
                      className={`px-3 py-1 rounded ${
                        user.isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 mx-1 ${
            currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 mx-1 ${
            currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PatientDashboard;
