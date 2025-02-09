"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/router";
import axios from 'axios';
import { useEffect } from 'react';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    try {
      await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
      console.log("User logged out");
      router.push('/login'); // Redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  

    return(
        <header className="max-w-full border-b-gray-300 border-b-[1.5px]">
          <div className="max-w-7xl flex-row justify-center py-[12px] lg:justify-between lg:px-[0px] hidden lg:flex mx-auto">
            <div className="w-[232px] content-center">
              <Link href="/">
                <Image src="/mediConnect.png" alt="mediConnect" width={464} height={100} priority  />
              </Link>
            </div>
            <div className="content-center">
              <nav className="nav-menu flex flex-row h-12 justify-between items-center">
                <Link href="/for-doctors" className="text-sm font-normal px-[18px] py-[13px] text-center hover:text-[#007bff]">
                  For Doctors
                </Link>
                <Link href="/contact-us" className="text-sm font-normal px-[18px] py-[13px] text-center hover:text-[#007bff]">
                  Contact Us
                </Link>
                <Link href="/doctor-dashboard" className="text-sm font-normal px-[18px] py-[13px] text-center hover:text-[#007bff]">
                  Doctor Manager
                </Link>
                <Link href="/patient-dashboard" className="text-sm font-normal px-[18px] py-[13px] text-center hover:text-[#007bff]">
                  Patient Manager
                </Link>
                
              </nav>
            </div>
            <div className="justify-between gap-[20px] hidden lg:flex">           
            <div className="flex flex-col justify-center">
              <button
                  onClick={handleLogout}
                  className="box-border border-2 border-[#007bff] text-base text-white bg-[#007bff] rounded px-[24px] py-[12px] hover:opacity-80"
                >
                  Logout
              </button>
            </div>
            </div>
          </div>
          <div className="relative max-w-full flex justify-center py-[12px] px-[15px] lg:hidden gap-[20px] border-b-gray-300 border-b-[0.5px]">
            <div className="w-[232px]">
              <Image src="/mediConnect.png" alt="mediConnect" width={464} height={100} priority  />
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-[33px] flex justify-center items-center"
              aria-expanded={isOpen}
            >
            {isOpen ? (
              <XMarkIcon className="h-8 w-8 text-black" />
            ) : (
            <Bars3Icon className="h-8 w-8 text-black" />
            )}
          </button>
          <div className="flex flex-col justify-center">
              <button
                  onClick={handleLogout}
                  className="box-border border-2 border-[#007bff] text-base text-white bg-[#007bff] rounded px-[24px] py-[12px] hover:opacity-80"
                >
                  Logout
              </button>
            </div>
          {isOpen && (
          <ul className="absolute left-0 mt-[60px] w-full bg-white shadow-lg">
            <li className="">
              <Link href="/for-doctors" className="text-base font-normal px-[20px] py-[10px] flex justify-center">For Doctors</Link>
            </li>
            <li className="">
              <Link href="/contact-us" className="text-base font-normal px-[20px] py-[10px] flex justify-center">Contact Us</Link>
            </li>
            <li className="">
              <Link href="/doctor-dashboard" className="text-base font-normal px-[20px] py-[10px] flex justify-center">Doctor Manager</Link>
            </li>
            <li className="">
              <Link href="/patient-dashboard" className="text-base font-normal px-[20px] py-[10px] flex justify-center">Patient Manager</Link>
            </li>
            
          </ul>
        )}
          </div>
        </header>
    )
}

export default Header;