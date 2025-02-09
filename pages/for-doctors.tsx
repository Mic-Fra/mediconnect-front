  "use client";
  import { Montserrat } from "next/font/google";
  import Image from "next/image";
  import Link from "next/link";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
  import DoctorCard from "../components/DoctorCard";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import Layout from "@/components/Layout";

  const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
  });

  interface User {
    id: string;
    firstname: string;
    lastname: string;
    upimagePreview: string;
    general?: string[];
    surgical?: string[];
    medical?: string[];
    pediatric?: string[];
    other?: string[];
    isActive: boolean;
  }

  export default function ForDoctors() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>(''); // For name search
    const [specialtyQuery, setSpecialtyQuery] = useState<string>(''); // For specialty search
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Fetch users with optional search query
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
    
      try {
        const response = await axios.get('http://localhost:3000/users/search-isactive', {
          params: {
            name: searchQuery || undefined,
            specialty: specialtyQuery || undefined,
            page: currentPage,
            limit: 4,
          },
        });
    
        const sanitizedUsers = response.data.data
          .filter((user: User) => user.isActive) // Filter for active users
          .map((user: User) => ({
            ...user,
            general: user.general || [],
            surgical: user.surgical || [],
            medical: user.medical || [],
            pediatric: user.pediatric || [],
            other: user.other || [],
          }));
    
        setUsers(sanitizedUsers);
        setTotalPages(response.data.lastPage);
      } catch (err) {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    // Fetch users when searchQuery, specialtyQuery, or currentPage changes
    useEffect(() => {
      fetchUsers();
    }, [searchQuery, specialtyQuery, currentPage]);

    const handlePageChange = (page: number) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
      }
    };

    return (
      <Layout>
        <div className={`${montserrat.className} max-w-full`}>
          {/* Find Your Doctor Section */}
          <div id="find" className="max-w-7xl flex flex-col gap-[20px] py-[80px] mx-auto px-[15px] md:pr-[50px] lg:px-[0px]">
            <div className="max-w-3xl text-[42px] text-center font-bold md:text-left">Find Your Doctor</div>
            <div className="max-w-3xl text-lg text-center md:text-left">
              Explore our comprehensive directory to search for doctors by name or specialty, ensuring the best care.
            </div>
          </div>
            {/* Doctor List */}
          <div className="max-w-7xl flex flex-col gap-6 py-6 mx-auto px-6 lg:px-0">
            <div className="flex flex-wrap gap-4 mb-4">
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
            <div className="grid grid-cols-4 gap-6">
              {users.length > 0 ? (
                users.map((user) => (
                  <DoctorCard
                    key={user.id}
                    firstname={user.firstname}
                    lastname={user.lastname}
                    upimagePreview={user.upimagePreview || "/default-avatar.png"}
                    general={user.general || []}
                    surgical={user.surgical || []}
                    medical={user.medical || []}
                    pediatric={user.pediatric || []}
                    other={user.other || []}
                  />
                ))
              ) : (
                <div className="col-span-4 text-center text-gray-500">No active doctors found.</div>
              )}
            </div>
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
          <div  className="max-w-7xl flex flex-col gap-[20px] py-[80px] mx-auto px-[15px] md:pr-[50px] lg:px-[0px]">
            <div className="text-base text-center md:text-left">
              Find Your Doctor
            </div>
            <div className="text-[42px] font-bold text-center md:text-left">
              Explore Our Doctor Directory
            </div>
            <div className="text-base text-center md:text-left">
              Easily search for qualified doctors based on specialties and qualifications to find the right healthcare provider for your needs.
            </div>
            <div className="h-[31px]">
              <hr className="my-[15px] border-gray-700" />
            </div>
            <div className="flex flex-col gap-[20px] md:flex-row">
              <div className="flex flex-col flex-1 gap-[20px] justify-center">
                <div className="text-2xl font-bold text-center md:text-left">
                  Search by Specialty
                </div>
                <div className="text-sm text-center md:text-left">
                  Our directory allows you to filter doctors by their specialties, ensuring you find the right expert for your health concerns quickly and efficiently.
                </div>
                <div className="flex flex-col gap-[10px] md:flex-row">
                  <div className="flex flex-row gap-[5px]">
                    <div className="text-green-600">
                      #
                    </div>
                    <div className="text-sm content-center">
                      General Practice
                    </div>
                  </div>
                  <div className="flex flex-row gap-[5px]">
                    <div className="text-green-600">
                      #
                    </div>
                    <div className="text-sm content-center">
                      Pediatrics
                    </div>
                  </div>
                  <div className="flex flex-row gap-[5px]">
                    <div className="text-green-600">
                      #
                    </div>
                    <div className="text-sm content-center">
                      Cardiology
                    </div>
                  </div> 
                </div>
                <div className="flex justify-center md:justify-start">
                  <Link href="#find" className="flex flex-row text-[#007bff] gap-[10px]">
                      <div className="text-base my-[12px]">
                        View Directory
                      </div>
                      <div className="my-[12px] content-center">
                        <FontAwesomeIcon icon={faAngleRight} height={15} width={15}  />
                      </div>
                  </Link>
                </div>
              </div>
              <div className="flex-1">
                <Image src="/medll.png" alt="Medll" width={620} height={465} />
              </div>
            </div>
            <div className="h-[31px]">
              <hr className="my-[15px] border-gray-700" />
            </div>
            <div className="flex flex-col gap-[20px] md:flex-row">
              <div className="flex flex-col flex-1 gap-[20px] justify-center">
                <div className="text-2xl font-bold text-center md:text-left">
                  Registered Physicians
                </div>
                <div className="text-sm text-center md:text-left">
                  All our registered physicians are thoroughly vetted and qualified, ensuring you receive top-notch medical care tailored to your needs.
                </div>
                <div className="flex flex-col gap-[10px] md:flex-row">
                  <div className="flex flex-row gap-[5px]">
                    <div className="text-green-600">
                      #
                    </div>
                    <div className="text-sm content-center">
                      Internal Medicine
                    </div>
                  </div>
                  <div className="flex flex-row gap-[5px]">
                    <div className="text-green-600">
                      #
                    </div>
                    <div className="text-sm content-center">
                      Gynecology
                    </div>
                  </div>
                  <div className="flex flex-row gap-[5px]">
                    <div className="text-green-600">
                      #
                    </div>
                    <div className="text-sm content-center">
                      Oncology
                    </div>
                  </div> 
                </div>
                <div className="flex justify-center md:justify-start">
                  <Link href="#find" className="flex flex-row text-[#007bff] gap-[10px]">
                      <div className="text-base my-[12px]">
                        Find Doctors
                      </div>
                      <div className="my-[12px] content-center">
                        <FontAwesomeIcon icon={faAngleRight} height={15} width={15}  />
                      </div>
                  </Link>
                </div>
              </div>
              <div className="flex-1">
                <Image src="/registered.png" alt="Medll" width={620} height={465} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
