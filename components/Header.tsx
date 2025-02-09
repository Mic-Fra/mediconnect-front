"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'], // Optional: Specify weights
});


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Function to handle click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);  // Close the menu if clicked outside
      }
    };

    // Add event listener to handle clicks outside
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    return(
        <header className={`${montserrat.className} sticky top-0 z-50 max-w-full bg-white border-b-gray-300 border-b-[1.5px]`}>
          <div className="max-w-7xl flex-row justify-center py-[12px] lg:justify-between lg:px-[0px] hidden lg:flex mx-auto">
            <div className="w-[232px] content-center">
              <Link href="/">
                <Image src="/mediConnect.png" alt="mediConne" width={400} height={100} priority    />
              </Link>
            </div>
            <div className="content-center">
              <nav className="nav-menu flex flex-row h-12 justify-between items-center">
                <Link href="/for-doctors" className="text-base font-normal px-[18px] py-[13px] text-center hover:text-[#007bff]">
                  For Doctors
                </Link>
                <Link href="/contact-us" className="text-base font-normal px-[18px] py-[13px] text-center hover:text-[#007bff]">
                  Contact Us
                </Link>
              </nav>
            </div>
            {/* Registration Button */}
          <div className="flex justify-center">
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Register</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/doctor-register">Register as Doctor</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/patient-register">Register as Patient</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          </div>
          <div className="relative max-w-full flex justify-center py-[12px] px-[15px] lg:hidden gap-[20px] border-b-gray-300 border-b-[0.5px]">
            <div className="w-[232px]">
              <Image src="/mediConnect.png" alt="mediConnect" width={464} height={100} priority  />
            </div>
            <button
              ref={buttonRef}
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

            {isOpen && (
              <ul
                ref={menuRef}
                className={`${montserrat.className} absolute left-0 mt-[60px] w-full z-10 bg-white shadow-lg`}
              >
                <li>
                  <Link href="/for-doctors" className="text-base font-normal px-[20px] py-[10px] flex justify-center">For Doctors</Link>
                </li>
                <li>
                  <Link href="/contact-us" className="text-base font-normal px-[20px] py-[10px] flex justify-center">Contact Us</Link>
                </li>
              </ul>
            )}
          </div>
        </header>
    )
}

export default Header;