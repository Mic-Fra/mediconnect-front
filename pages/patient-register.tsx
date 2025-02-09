import Layout from "@/components/Layout"
import Image from "next/image"
import { useState } from "react";
import axios from "axios";

export default function PatientRegister(){
        const [formData, setFormData] = useState<{ [key: string]: string | [] }>({
            firstname: "",
            lastname: "",
            birthdate: "",
            sex: "",
            height: "",
            weight: "",
            marital: "",
            phone: "",
            email: "",
            clinicAddress1: "",
            clinicAddress2: "",
            city: "",
            state: "",
            postalCode: "",
            medications: "",
            emergfirstname: "",
            emerglastname: "",
            relationship: "",
            emergnumber: "",
            upimagePreview: "",
        });

    const [selectedOption1, setSelectedOption1] = useState("option1");
    const [selectedOption2, setSelectedOption2] = useState("option1");
    const [selected, setSelected] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
           // Dynamically update the field based on the name attribute
        }));
      };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            setFile(selectedFile);
	    const imageUrl = URL.createObjectURL(selectedFile);
            setFormData((prev) => ({ ...prev, imagePreview: imageUrl }));
        }
    };

    const handleSexChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption1(e.target.value);
        setFormData((prev) => ({
            ...prev,
            sex: e.target.value, // Set selected sex option in form data
        }));
    };
    
    // Update marital status in form data
    const handleMaritalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption2(e.target.value);
        setFormData((prev) => ({
            ...prev,
            marital: e.target.value, // Set selected marital option in form data
        }));
    };

    // Inside your form component
    const handleMedicationChange = (value: string) => {
        setSelected(value);  // Update selected state
        setFormData((prev) => ({
            ...prev,
            medications: value,  // Update formData with the selected value
        }));
    };
     
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();  // Prevent default form submission behavior

        if (!file) {
            alert('Please select an image.');
            return;
          }
      
          const formDataToSend = new FormData();
          formDataToSend.append('file', file);
      
          try {
            // Upload image to the backend
            const response = await axios.post('http://localhost:3000/patients/upload', formDataToSend, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
      
            // Handle successful image upload
            const uploadedImageUrl = response.data.url;
            setImageUrl(uploadedImageUrl);  // Set the returned image URL
      
            // You can now save the image URL in your form data or database
            const finalFormData = {
                ...formData,
                upimagePreview: uploadedImageUrl, // Attach the image URL
              };

            const formResponse = await axios.post('http://localhost:3000/patients/register', finalFormData, {
            headers: {
                'Content-Type': 'application/json',
            },
            });

            setTimeout(() => {
                setFormData({
                    firstname: "",
                    lastname: "",
                    birthdate: "",
                    sex: "",
                    height: "",
                    weight: "",
                    marital: "",
                    phone: "",
                    email: "",
                    clinicAddress1: "",
                    clinicAddress2: "",
                    city: "",
                    state: "",
                    postalCode: "",
                    medications: "",
                    emergfirstname: "",
                    emerglastname: "",
                    relationship: "",
                    emergnumber: "",
                    upimagePreview: "",
                        });
            }, 3000);
      
            // Reset the form or handle other form logic here
            console.log('Form submitted successfully:', formResponse.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error uploading image or submitting form:', error);
      alert('Failed to submit the form.');
    }
  };


    return(
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="max-w-full">
                    <div className="max-w-7xl mx-auto px-[15px] flex flex-col gap-[40px] md:pr-[50px] lg:px-[0px]">
                        <div className="flex flex-row justify-center gap-[80px] py-[40px]">
                            <div className="flex-1">
                                <Image src="/paregister.png" width={700} height={700} alt="regist" />
                            </div>
                            <div className="flex-1 flex flex-col justify-center gap-[10px]">
                                <div className="text-[42px] font-bold">
                                    New Patient
                                </div>
                                <div className="text-[42px] font-bold">
                                    Enrollment
                                </div>
                                <div className="text-lg">
                                    Dr.Name
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col py-[40px] gap-[10px]">
                            <div className="text-lg font-bold text-center md:text-left">
                                Profile Picture
                            </div>
                            <div className="flex flex-col">
                                <div className="flex-1">
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleImageChange}
                                        accept="image/*" // To allow only image files
                                        className="border rounded-lg p-1 max-w-xs "
                                    />
                                </div>
                                {/* Display Image Preview */}
                                {formData.imagePreview && (
                                    <div className="flex-1">
                                        <img src={formData.imagePreview} alt="Preview" className="max-w-xs" priority />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col grid-1 gap-[10px]">
                            <div className="text-lg font-bold text-center md:text-left">
                                Name
                            </div>
                            <div className="flex flex-row gap-[10px]">
                                <div className="flex flex-1 flex-col gap-[10px]">
                                    <input
                                    type="text"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    className="border rounded-lg p-2 w-full"
                                    />
                                    <div className="text-left text-sm">
                                        First Name
                                    </div>
                                </div>  
                                <div className="flex flex-1 flex-col gap-[10px]">
                                    <input
                                    type="text"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    className="border rounded-lg p-2 w-full"
                                    />
                                    <div className="text-left text-sm">
                                        Last Name
                                    </div>
                                </div>
                            </div>    
                        </div>
                        <div className="flex flex-row grid-1 gap-[10px]">
                            <div className="flex flex-col flex-1 gap-[10px]">
                                <div className="text-lg font-bold text-center md:text-left">
                                    Date of Birth
                                </div>              
                                <div className="flex flex-col gap-[10px]">
                                    <input
                                    type="Date"
                                    name="birthdate"
                                    value={formData.birthdate}
                                    onChange={handleChange}
                                    placeholder="MM-DD-YYYY"
                                    className="border rounded-lg p-2 w-full"
                                    />
                                    <div className="text-left text-sm">
                                        Date
                                    </div>
                                </div> 
                            </div> 
                            <div className="flex flex-col flex-1 gap-[10px]">
                                <div className="text-lg font-bold text-center md:text-left">
                                    Sex
                                </div>              
                                <div className="flex flex-col gap-[10px]">
                                    <select
                                        name="sex"
                                        value={selectedOption1}
                                        onChange={handleSexChange}
                                        className="border rounded-lg p-2 w-full h-[44px]"
                                        >
                                        <option value="option1">Please Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>      
                        </div>
                        <div className="flex flex-row grid-1 gap-[10px]">
                            <div className="flex flex-col flex-1 gap-[10px]">
                                <div className="text-lg font-bold text-center md:text-left">
                                    Height(inches)
                                </div>
                                <div className="flex flex-row gap-[10px]">
                                    <div className="flex flex-1 flex-col gap-[10px]">
                                        <input
                                        type="text"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        className="border rounded-lg p-2 w-full"
                                        />
                                    </div>
                                </div> 
                            </div> 
                            <div className="flex flex-col flex-1 gap-[10px]">
                                <div className="text-lg font-bold text-center md:text-left">
                                    Weight(pounds)
                                </div>
                                <div className="flex flex-row gap-[10px]">
                                    <div className="flex flex-1 flex-col gap-[10px]">
                                        <input
                                        type="text"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        className="border rounded-lg p-2 w-full"
                                        />
                                    </div>
                                </div> 
                            </div>      
                        </div>
                        <div className="flex flex-row grid-1 gap-[10px]">
                            <div className="flex flex-col flex-1 gap-[10px]">
                                <div className="text-lg font-bold text-center md:text-left">
                                    Marital Status
                                </div>              
                                <div className="flex flex-col gap-[10px]">
                                    <select
                                        value={selectedOption2}
                                        onChange={handleMaritalChange}
                                        className="border rounded-lg p-2 w-full h-[44px]"
                                        >
                                        <option value="option1">Please Select</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div> 
                            <div className="flex-1">
                                
                            </div>      
                        </div>
                        <div className="flex flex-row gap-[10px]">
                            <div className="flex flex-col flex-1 gap-[10px]">
                                <div className="text-lg font-bold text-center md:text-left">
                                    Contact Number
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="(000)000-0000"
                                    maxLength={10} // Limit to 10 digits
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                            <div className="flex flex-col flex-1 gap-[10px]">
                                <div className="text-lg font-bold text-center md:text-left">
                                    Email
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="ex:example@example.com"
                                    onChange={handleChange}
                                    className="border rounded-lg p-2 w-full"
                                    />
                                <div className="text-sm text-left">
                                    example@example.com
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col py-[40px] gap-[10px]">
                            <div className="text-lg font-bold text-center md:text-left">
                                Address
                            </div>
                            <input
                                type="text"
                                id="clinicAddress1"
                                name="clinicAddress1"
                                value={formData.clinicAddress1}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-lg w-full"
                            />
                            <div className="text-sm mb-[10px]">
                                Street Address
                            </div>
                            <input
                                type="text"
                                id="clinicAddress2"
                                name="clinicAddress2"
                                value={formData.clinicAddress2}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-lg w-full"
                            />
                            <div className="text-sm">
                                Street Address Line 2
                            </div>
                            <div className="grid grid-cols-2 gap-[20px]">
                                <div className="flex flex-col gap-[10px]">
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder=""
                                        className="p-2 border border-gray-300 rounded-lg w-full"
                                    />
                                    <div className="text-sm">
                                        City
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[10px]">
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder=""
                                        className="p-2 border border-gray-300 rounded-lg w-full"
                                    />
                                    <div className="text-sm">
                                        State/Province
                                    </div>
                                </div>
                            </div>
                            <div className="">
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                placeholder=""
                                maxLength={10} // You can adjust the max length depending on the postal code format
                                className="p-2 border border-gray-300 rounded-lg w-full"
                            />
                                <div className="text-sm">
                                    Postal/Zip Code
                                </div>
                            </div>
                        
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <div className="text-base font-semibold text-center md:text-left">
                                Taking  any medications, currently?
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="medications"
                                    value="yes"
                                    checked={selected === "yes"}
                                    onChange={() => handleMedicationChange("yes")}
                                    className="mr-2"
                                />
                                Yes
                                </label>
                                <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="medications"
                                    value="no"
                                    checked={selected === "no"}
                                    onChange={() => handleMedicationChange("no")}
                                    className="mr-2"
                                />
                                No
                                </label>
                            </div>
                        </div>
                        <div className="text-2xl font-bold py-[40px]">
                            In case of emergency
                        </div>
                    
                        <div className="flex flex-col grid-1 gap-[10px]">
                            <div className="text-lg font-bold text-center md:text-left">
                                Emergency Contact:
                            </div>
                            <div className="flex flex-row gap-[10px]">
                                <div className="flex flex-1 flex-col gap-[10px]">
                                    <input
                                    type="text"
                                    name="emergfirstname"
                                    value={formData.emergfirstname}
                                    onChange={handleChange}
                                    className="border rounded-lg p-2 w-full"
                                    />
                                    <div className="text-left text-sm">
                                        First Name
                                    </div>
                                </div>  
                                <div className="flex flex-1 flex-col gap-[10px]">
                                    <input
                                    type="text"
                                    name="emerglastname"
                                    value={formData.emerglastname}
                                    onChange={handleChange}
                                    className="border rounded-lg p-2 w-full"
                                    />
                                    <div className="text-left text-sm">
                                        Last Name
                                    </div>
                                </div>
                            </div>    
                        </div>
                        <div className="flex flex-row grid-1 gap-[10px]">
                                <div className="flex flex-col flex-1 gap-[10px]">
                                    <div className="text-lg font-bold text-center md:text-left">
                                        Relationship
                                    </div>
                                    <div className="flex flex-row gap-[10px]">
                                        <div className="flex flex-1 flex-col gap-[10px]">
                                            <input
                                            type="text"
                                            name="relationship"
                                            value={formData.relationship}
                                            onChange={handleChange}
                                            className="border rounded-lg p-2 w-full"
                                            />
                                        </div>
                                    </div> 
                                </div> 
                                <div className="flex flex-col flex-1 gap-[10px]">
                                    <div className="text-lg font-bold text-center md:text-left">
                                        Contact Number
                                    </div>
                                    <div className="flex flex-row gap-[10px]">
                                    <div className="flex flex-1 flex-col gap-[10px]">
                                        <input
                                        type="text"
                                        name="emergnumber"
                                        placeholder="(000) 000-0000"
                                        value={formData.emergnumber}
                                        maxLength={10}
                                        onChange={handleChange}
                                        className="border rounded-lg p-2 w-full"
                                        />
                                    </div>
                                </div> 
                            </div>      
                        </div>
                        <div className="content-center">
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    
                                    className="px-8 py-2 border text-white bg-[#0A1551] shadow-lg rounded-lg"
                                >
                                    Submit
                                </button>
                            </div>
                            <div className="flex justify-center">
                                {/* Display Success Message */}
                                {success && <div className="text-green-500">{success}</div>}

                                {/* Display Error Message */}
                                {error && <div className="text-red-500">{error}</div>}
                            </div>                 
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    )
}