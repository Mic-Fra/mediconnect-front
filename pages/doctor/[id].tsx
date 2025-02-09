import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header1 from "@/components/Header1"

const DoctorDetail = () => {
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  const handleBack = () => {
    router.push("/doctor-dashboard");
  };

  useEffect(() => {
    if (!id) return;

    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setDoctor(response.data);
      } catch (err) {
        console.error(err);
        setError("Error fetching doctor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full flex flex-col gap-10 max-w-7xl mx-auto p-4">
      <Header1 />
      <div className="flex justify-end">
        <button
          onClick={handleBack}
          className="box-border border-2 border-[#007bff] text-base text-white bg-[#007bff] rounded px-[24px] py-[12px] hover:opacity-80"
        >
          Back
        </button>
      </div>
      <div className="w-full flex flex-col gap-10 max-w-4xl mx-auto p-4">  
        <div className="bg-cyan-100 opacity-80 p-6 rounded-lg shadow-lg">
          <div className="flex flex-row gap-4 mb-4 justify-around">
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold mb-4 text-center">
                {doctor?.firstname} {doctor?.lastname}
              </h1>
              <img
                src={doctor?.upimagePreview ? `http://localhost:3000${doctor.upimagePreview}` : '/default-profile.png'}
                alt="Profile"
                className="w-60 h-60 rounded-full object-cover"
              />
            </div>          
            <div className="flex flex-col justify-center gap-[5px]">
              <p><strong>Birthdate:</strong> {doctor?.birthdate}</p>
              <p><strong>Email:</strong> {doctor?.email}</p>
              <p><strong>Phone:</strong> {doctor?.phone}</p>
              <p><strong>Current Clinic Name:</strong> {doctor?.clinicName}</p>
              <p><strong>Street Address:</strong> {doctor?.clinicAddress1}</p>
              <p><strong>Street Address Line 2:</strong> {doctor?.clinicAddress2}</p>
              <p><strong>City:</strong> {doctor?.city}</p>
              <p><strong>State/Province:</strong> {doctor?.state}</p>
              <p><strong>Postal/Zip Code:</strong> {doctor?.postalCode}</p>
              <p><strong>Education:</strong> {doctor?.education}</p>
              <p><strong>Work Review:</strong> {doctor?.work}</p>
              <p><strong>Country and Cities in working:</strong> {doctor?.country}</p>
              <p><strong>Surgeries :</strong> {doctor?.surgeries}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-2xl">Specialties</p>
              <div className="ml-5">
                {doctor?.general?.length > 0 && <SpecialtyList title="General Medicine" items={doctor?.general || []} />}
                {doctor?.surgical?.length > 0 && <SpecialtyList title="Surgical Specialties" items={doctor?.surgical || []} />}
                {doctor?.medical?.length > 0 && <SpecialtyList title="Medical Specialties" items={doctor?.medical || []} />}
                {doctor?.pediatric?.length > 0 && <SpecialtyList title="Pediatric Specialties" items={doctor?.pediatric || []} />}
                {doctor?.other?.length > 0 && <SpecialtyList title="Other Specialized Fields" items={doctor?.other || []} />}
              </div>
            </div>
          </div>
        </div>
      </div>    
    </div>
  );
};

const SpecialtyList = ({ title, items = [] }: { title: string; items: string[] }) => (
  <div className="flex flex-col">
    <span className="font-semibold">{title}:</span>
    <ul className="list-disc list-inside pl-4">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

export default DoctorDetail;
