import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header1 from "@/components/Header1"

const PatientDetail = () => {
  const [patient, setPatient] = useState<any>(null); // State for doctor data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const handleBack = () => {
    router.push("/patient-dashboard"); // ✅ Redirects to login page
  };

  useEffect(() => {
    if (!id) return; // Wait for the id to be available

    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/patients/${id}`);
        setPatient(response.data);
      } catch (err) {
        setError("Error fetching patient details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full max-w-7xl flex flex-col gap-10 mx-auto p-4">
      <Header1 />
      <div className="flex justify-end">
          <button
              onClick={handleBack}
              className="box-border border-2 border-[#007bff] text-base text-white bg-[#007bff] rounded px-[24px] py-[12px] hover:opacity-80"
            >
              Back
          </button>
      </div>
      <div className="w-full max-w-4xl flex flex-col gap-10 mx-auto p-4">
        
        <div className="bg-cyan-100 opacity-80 p-6 rounded-lg shadow-lg">
          
          

          <div className="flex gap-4 mb-4 justify-around">
          <div className=" flex flex-col justify-center">
              <h1 className="text-2xl text-center font-bold mb-4">
              {patient.firstname} {patient.lastname} 
              </h1>
              <img
              src={`http://localhost:3000${patient.upimagePreview}`}
              alt="Profile"
              className="w-60 h-60 rounded-full object-cover"
            />
          </div>
            
            <div className="flex flex-col justify-center gap-[10px]">
              <p><strong>Birthdate:</strong> {patient.birthdate}</p>
              <div className="flex flex-row gap-[20px]">
                  <p><strong>Height:</strong> {patient.height}</p>
                  <p><strong>Weight:</strong> {patient.weight}</p>
              </div>
              <p><strong>Marital Status:</strong> {patient.marital}</p>
              <p><strong>Email:</strong> {patient.email}</p>
              <p><strong>Phone:</strong> {patient.phone}</p>
              <p><strong>Street Address:</strong> {patient.clinicAddress1}</p>
              <p><strong>Street Address Line 2:</strong> {patient.clinicAddress2}</p>
              <p><strong>City:</strong> {patient.city}</p>
              <p><strong>State/Province:</strong> {patient.state}</p>
              <p><strong>Postal/Zip Code:</strong> {patient.postalCode}</p>
              <p><strong>Taking any medications, currently?</strong> {patient.medications}</p>
              <p><strong>Emergency Contact Name:</strong> {patient.emergfirstname} {patient.emerglastname}</p>
              <p><strong>Relationship:</strong> {patient.relationship}</p>
              <p><strong>Contact Number :</strong> {patient.emergnumber}</p>
              

            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};


export default PatientDetail;
