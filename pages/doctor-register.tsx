'use client'
import React, { useState } from 'react';
import { Montserrat } from 'next/font/google';
import axios from "axios";
import Layout from '@/components/Layout';

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '700'], // Optional: Specify weights
  });

export default function DocRegister(){
    const [imagePreview, setImagePreview] = useState<string>("");
    const [upimagePreview, setUpimagePreview] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [formData, setFormData] = useState<{ [key: string]: string | [] }>({
        firstname: "",
        lastname: "",
        birthdate: "",
        email: "",
        phone: "",
        gender: "",
        clinicName: "",
        clinicAddress1: "",
        clinicAddress2: "",
        city: "",
        state: "",
        postalCode: "",
        education: "",
        work: "",
        surgeries: "",
        country: "",
        imagePreview: "",
        upimagePreview: "",
        general: [],  // Reset the selections
        surgical: [],
        medical: [],
        pediatric: [],
        other: [],
    });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value, // Dynamically update the field based on the name attribute
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
            const response = await axios.post('http://localhost:3000/users/upload', formDataToSend, {
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

            const formResponse = await axios.post('http://localhost:3000/users/register', finalFormData, {
            headers: {
                'Content-Type': 'application/json',
            },
            });

            setTimeout(() => {
                setFormData({
                    firstname: "",
                    lastname: "",
                    birthdate: "",
                    email: "",
                    phone: "",
                    gender: "",
                    clinicName: "",
                    clinicAddress1: "",
                    clinicAddress2: "",
                    city: "",
                    state: "",
                    postalCode: "",
                    education: "",
                    work: "",
                    surgeries: "",
                    country: "",
                    imagePreview: "",
                    upimagePreview: "",
                    general: [],  // Reset the selections
                    surgical: [],
                    medical: [],
                    pediatric: [],
                    other: [],  // Reset the image preview
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
    
    const general = [
        { id: 1, name: 'General Practitioner (GP) / Family Medicine' },
        { id: 2, name: 'Internal Medicine' },
      ];

    const surgical = [
        { id: 3, name: 'General Surgery' },
        { id: 4, name: 'Orthopedic Surgery' },
        { id: 5, name: 'Cardiothoracic Surgery' },
        { id: 6, name: 'Neurosurgery' },
        { id: 7, name: 'Plastic Surgery' },
        { id: 8, name: 'Pediatric Surgery' }
    ] 

    const medical = [
        { id: 9, name: 'Cardiology' },
        { id: 10, name: 'Neurology' },
        { id: 11, name: 'Endocrinology' },
        { id: 12, name: 'Pulmonology' },
        { id: 13, name: 'Gastroenterology' },
        { id: 14, name: 'Rheumatology' },
        { id: 15, name: 'Infectious Disease' },
        { id: 16, name: 'Hematology' },
        { id: 17, name: 'Oncology' },
        { id: 18, name: 'Nephrology' },
        { id: 19, name: 'Dermatology' },
        { id: 20, name: 'Ophthalmology' },
        { id: 21, name: 'Psychiatry' },
        { id: 22, name: 'Urology' },
        { id: 23, name: 'Obstetrics and Gynecology (OB/GYN)' }
    ]

    const pediatric = [
        { id: 24, name: 'Pediatrics' },
        { id: 25, name: 'Pediatric Cardiology' },
        { id: 26, name: 'Pediatric Neurology' }
    ]

    const other = [
        { id: 27, name: 'Anesthesiology' },
        { id: 28, name: 'Radiology' },
        { id: 29, name: 'Pathology' },
        { id: 30, name: 'Rehabilitation Medicine (Physiatry)' },
        { id: 31, name: 'Emergency Medicine' },
        { id: 32, name: 'Geriatrics' },
        { id: 33, name: 'Allergy and Immunology' }
    ] 

      // Handle checkbox selection
      const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, itemName: string, category: string) => {
        const updatedSelections = e.target.checked
            ? [...formData[category], itemName]  // Save the name, not the ID
            : formData[category].filter((name: string) => name !== itemName); // Remove by name
    
        setFormData((prev: any) => ({
            ...prev,
            [category]: updatedSelections, // Update the correct category array with names
        }));
    };
    
    return(
        <Layout>
        <form onSubmit={handleSubmit}>
        <div className={`${montserrat.className} max-w-full`}>
            <div className="max-w-7xl mx-auto px-[15px] md:pr-[50px] lg:px-[0px]">
                <div className="flex flex-col py-[80px]">
                    <div className="flex justify-center text-[42px] font-bold">
                        Doctor Information Form
                    </div>
                    <div className="flex justify-center text-lg">
                        All information is strictly confidential on this form.
                    </div>
                </div>
                <div className="h-[31px]">
                    <hr className="my-[15px] border-gray-700" />
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
                                <img src={formData.imagePreview} alt="Preview" className="max-w-xs" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-[20px] py-[40px] md:grid-cols-2">
                    <div className="flex flex-col grid-1 gap-[10px]">
                        <div className="text-lg font-bold text-center md:text-left">
                            Full Name
                        </div>
                        <div className="flex flex-row gap-[10px]">
                            <div className="flex-1 flex-col gap-[5px]">
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
                            <div className="flex-1 flex-col gap-[5px]">
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
                    <div className="flex flex-col grid-1 gap-[10px]">
                        <div className="text-lg font-bold text-center md:text-left">
                            Birthdate
                        </div>
                        <input
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        placeholder="MM-DD-YYYY"
                        className="border rounded-lg p-2 w-full"
                        />
                    </div>
                    <div className="flex flex-col grid-1 gap-[10px]">
                        <div className="text-lg font-bold text-center md:text-left">
                            Email
                        </div>
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@example.com"
                        className="border rounded-lg p-2 w-full"
                        />                       
                    </div>
                    <div className="flex flex-col grid-1 gap-[10px]">
                        <div className="text-lg font-bold text-center md:text-left">
                            Phone Number
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
                        <div className="text-sm text-left">
                            Please enter a vaild phone number.
                        </div>
                    </div>
                </div>
                <div className="py-[40px]">
                    <div className="text-lg font-bold text-center md:text-left">
                        Gender
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="flex justify-start">
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                                Male
                        </div>
                        <div className="flex justify-start">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                                Female
                        </div>
                    </div>
                </div>
                <div className="flex flex-col py-[40px] gap-[10px]">
                    <div className="text-lg font-bold text-center md:text-left">
                        Current Clinic Name
                    </div>
                    <input
                        type="text"
                        id="clinicName"
                        name="clinicName"
                        value={formData.clinicName}
                        onChange={handleChange}
                        placeholder="Enter clinic name"
                        className="p-2 border border-gray-300 rounded-lg w-full"
                    />
                </div>
                <div className="flex flex-col py-[40px] gap-[10px]">
                    <div className="text-lg font-bold text-center md:text-left">
                        Current Clinic Address
                    </div>
                    <input
                        type="text"
                        id="clinicAddress1"
                        name="clinicAddress1"
                        value={formData.clinicAddress1}
                        onChange={handleChange}
                        placeholder="Enter clinic name"
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
                        placeholder="Enter clinic name"
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
                <div className="felx flex-col gap-[10px] py-[40px]">
                    <div className="text-lg font-bold">
                        Please mention about your education
                    </div>
                    <div className="">
                    <textarea
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        placeholder="Type here..."
                        className="p-2 border border-gray-300 rounded-lg w-full h-[150px] resize-none"
                    />
                    </div>
                </div>
                <div className="py-[40px]">
                    <div className="text-lg font-bold">
                        Which clinics did you work before? Please list them all.
                    </div>
                    <div className="">
                    <textarea
                        name="work"
                        value={formData.work}
                        onChange={handleChange}
                        placeholder="Type here..."
                        className="p-2 border border-gray-300 rounded-lg w-full h-[150px] resize-none"
                    />
                    </div>
                </div>
                <div className="py-[40px]">
                    <div className="text-lg font-bold">
                        Which countries or cities did you work before? Please list them all.
                    </div>
                    <div className="">
                    <textarea
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Type here..."
                        className="p-2 border border-gray-300 rounded-lg w-full h-[150px] resize-none"
                    />
                    </div>
                </div>
                <div className="py-[40px]">
                    <div className="text-lg font-bold">
                        Please mention the surgeries in general that you have operated before.
                    </div>
                    <div className="">
                    <textarea
                        name="surgeries"
                        value={formData.surgeries}
                        onChange={handleChange}
                        placeholder="Type here..."
                        className="p-2 border border-gray-300 rounded-lg w-full h-[150px] resize-none"
                    />
                    </div>
                </div>
                <div className="flex flex-col py-[40px] gap-[10px]">
                    <div className="text-lg font-bold">
                        Select the Specialties.
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <div className="grid-1 flex flex-col gap-[20px]">
                        <div className="flex flex-col gap-[5px]">
                            <div className="text-base font-semibold underline text-gray-500">
                            General Medicine
                            </div>
                            <div className="mx-2">
                            {general.map((item) => (
                                <div key={item.id}>
                                    <input
                                        type="checkbox"
                                        checked={formData.general.includes(item.name)}  // Check if the name is in the selected list
                                        onChange={(e) => handleCheckboxChange(e, item.name, "general")}
                                        className="mr-2"   // Pass the name and category
                                    />
                                    {item.name}
                                </div>
                            ))}

                            </div>
                        </div>
                        <div className="flex flex-col gap-[5px]">
                            <div className="text-base font-semibold underline text-gray-500">
                            Surgical Specialties
                            </div>
                            <div className="mx-2">
                            {surgical.map((item) => (
                                <div key={item.id}>
                                    <input
                                        type="checkbox"
                                        checked={formData.surgical.includes(item.name)}  // Check if the name is in the selected list
                                        onChange={(e) => handleCheckboxChange(e, item.name, "surgical")}
                                        className="mr-2"   // Pass the name and category
                                    />
                                    {item.name}
                                </div>
                            ))}

                            </div>
                        </div>
                        <div className="flex flex-col gap-[5px]">
                            <div className="text-base font-semibold underline text-gray-500">
                            Other Specialized Fields
                            </div>
                            <div className="mx-2">
                            {other.map((item) => (
                                <div key={item.id}>
                                    <input
                                        type="checkbox"
                                        checked={formData.other.includes(item.name)}  // Check if the name is in the selected list
                                        onChange={(e) => handleCheckboxChange(e, item.name, "other")}
                                        className="mr-2"   // Pass the name and category
                                    />
                                    {item.name}
                                </div>
                            ))}
                            </div>
                        </div>
                        </div>

                        <div className="grid-1 flex flex-col gap-[10px]">
                        <div className="flex flex-col gap-[5px]">
                            <div className="text-base font-semibold underline text-gray-500">
                            Medical Specialties
                            </div>
                            <div className="mx-2">
                            {medical.map((item) => (
                                <div key={item.id}>
                                    <input
                                        type="checkbox"
                                        checked={formData.medical.includes(item.name)}  // Check if the name is in the selected list
                                        onChange={(e) => handleCheckboxChange(e, item.name, "medical")}
                                        className="mr-2"   // Pass the name and category
                                    />
                                    {item.name}
                                </div>
                            ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[5px]">
                            <div className="text-base font-semibold underline text-gray-500">
                            Pediatric Specialties
                            </div>
                            <div className="mx-2">
                            {pediatric.map((item) => (
                                <div key={item.id}>
                                    <input
                                        type="checkbox"
                                        checked={formData.pediatric.includes(item.name)}  // Check if the name is in the selected list
                                        onChange={(e) => handleCheckboxChange(e, item.name, "pediatric")}
                                        className="mr-2"  // Pass the name and category
                                    />
                                    {item.name}
                                </div>
                            ))}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                  
                <div className="content-center">
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            
                            className="px-8 py-2 border text-white bg-[#F52068] shadow-lg rounded-lg"
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