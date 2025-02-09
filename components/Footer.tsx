import React from "react";
import Link from "next/link";
import { Montserrat } from 'next/font/google';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'], // Optional: Specify weights
});


const Footer = () => {
    return (
      <footer className={`${montserrat.className} max-w-full border-b-gray-300 border-b-[1.5px]`}>
        <div className="max-w-7xl py-[80px] flex flex-col gap-[20px] mx-auto px-[15px] md:pr-[50px] lg:px-[0px]">
          <div className="flex flex-col justify-between gap-[20px] md:flex-row">
            <div className="w-[96px]"></div>
            <div className="content-center flex justify-center">
                <nav className="nav-menu flex flex-row items-center">
                  <Link href="/for-doctors" className="text-sm font-normal px-[18px] text-center hover:text-[#007bff]">
                    For Doctors
                  </Link>
                  <Link href="/contact-us" className="text-sm font-normal px-[18px] text-center hover:text-[#007bff]">
                    Contact Us
                  </Link>
                </nav>
            </div>
            <div className="content-center">
              <div className="flex justify-center">
                <nav className="nav-menu flex flex-row  concent-center gap-[24px]">
                  <Link href="/" className="text-base font-normal text-center">
                    <FaFacebookF className="h-4 w-4 hover:text-[#007bff]" />
                  </Link>
                  <Link href="/" className="text-base font-normal text-center">
                    <FaLinkedinIn className="h-4 w-4 hover:text-[#007bff]" />
                  </Link>
                  <Link href="/" className="text-base font-normal text-center">
                    <FaTwitter className="h-4 w-4 hover:text-[#007bff]" />
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          <div>
            <hr className="my-[0px] border-gray-700" />
          </div>
          <div className="flex flex-col gap-[20px] justify-center md:flex-row">
            <div className="flex justify-center text-center text-sm">
              <p>&copy; {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
            </div>
            <div className="flex justify-center">
              <div className="px-[18px] text-sm">
                <Link href="/" className="flex justify-center hover:text-[#007bff]">Terms & Conditions</Link>
              </div>
              <div className="px-[18px] text-sm">
                <Link href="/" className="flex justify-center hover:text-[#007bff]">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  