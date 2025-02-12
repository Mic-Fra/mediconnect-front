"use client";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"], // Optional: Specify weights
});

interface DoctorCardProps {
  firstname: string;
  lastname: string;
  upimagePreview: string;
  general?: string[];  // ✅ Optional Props with default values
  surgical?: string[];
  medical?: string[];
  pediatric?: string[];
  other?: string[];
}

export default function UserCard({
  firstname,
  lastname,
  upimagePreview,
  general = [], // ✅ Default empty array to prevent `.length` error
  surgical = [],
  medical = [],
  pediatric = [],
  other = [],
}: DoctorCardProps) {
  return (
    <Link href="">
      <div
        className={`${montserrat.className} max-w-full min-h-[550px] lg:min-h-[450px] flex flex-col bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-md hover:shadow-lg transition-all`}
      >
        {/* Image Section */}
        <div className="w-full flex justify-center mb-4 ">
        <img
          src={upimagePreview ? `http://localhost:3000${upimagePreview}` : "/default-avatar.png"} // Fallback if image URL is invalid
          alt="Profile"
          className="w-30 h-30 md:w-40 md:h-40 rounded-full object-cover mx-auto"
        />
        </div>

        {/* Doctor Information Section */}
        <div className="text-sm text-white space-y-2 flex-1 overflow-auto">
          <div className="text-xl text-center font-bold flex flex-col">
            {firstname} {lastname}
          </div>
          <div className="text-left">
            <ul>
              {general.length > 0 && <li>General: {general.join(", ")}</li>}
              {surgical.length > 0 && <li>Surgical: {surgical.join(", ")}</li>}
              {medical.length > 0 && <li>Medical: {medical.join(", ")}</li>}
              {pediatric.length > 0 && <li>Pediatric: {pediatric.join(", ")}</li>}
              {other.length > 0 && <li>Other: {other.join(", ")}</li>}
            </ul>
          </div>
          
        </div>
      </div>
    </Link>
  );
}

/**
 * 🔹 Extracted `SpecialtyList` component for cleaner code
 */
const SpecialtyList = ({ title, items }: { title: string; items: string[] }) => (
  <div className="flex flex-col">
    <span className="font-semibold">{title}:</span>
    <ul className="list-disc list-inside ">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);
