import Link from "next/link"
import Image from "next/image"
import { Montserrat } from 'next/font/google';
import TextEffect from "./TextEffect"


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'], // Optional: Specify weights
});

export default function Home(){
  return(
    <div className={`${montserrat.className} max-w-full`}>
      {/* {Welcome to} */}
      <div className="max-w-7xl flex flex-col mx-auto gap-[20px] py-[80px] px-[15px] md:pr-[50px] lg:px-[0px] md:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-[20px]">
          <div className="my-[32.16px] text-5xl font-bold text-center -mr-10 md:text-left flex flex-col gap-[5px]">
            
            <div className="flex flex-wrap justify-center md:justify-start">
              <span className="text-3xl sm:text-5xl">Welcome to</span>
              <div className="flex flex-row justify-center">
                <TextEffect text="M" />
                <TextEffect text="e" />
                <TextEffect text="d" />
                <TextEffect text="i" />
                <TextEffect text="C" />
                <TextEffect text="o" />
                <TextEffect text="n" />
                <TextEffect text="n" />
                <TextEffect text="e" />
                <TextEffect text="c" />
                <TextEffect text="t" />
              </div>
            </div>
            <span className="content-center text-3xl sm:text-5xl">Healthcare</span>
          </div>

          <div className="my-[10px] text-xl text-center md:text-left">
            At MediConnect, we revolutionize healthcare registration by providing a seamless and efficient system for both doctors and patients. Our platform ensures easy access and management of healthcare services.
          </div>
          <div className="flex flex-col items-center gap-[20px] md:flex-row md:justify-start">
              <Link href="/for-patients" className="box-border border-2 border-[#007bff] text-base text-white bg-[#007bff] rounded px-[24px] py-[12px] hover:opacity-80">
                Learn More
              </Link>           
              <Link href="/for-doctors" className="border-2 border-[#007bff] text-[#007bff] rounded px-[24px] py-[12px] hover:bg-[#007bff] hover:text-white">  
                Get Started
              </Link>      
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <Image src="/healthcare.png" alt="healthcare" height={600} width={600} />
        </div>
      </div>
      {/* {About} */}
      <div className="max-w-7xl py-[80px] mx-auto flex flex-col gap-[20px] px-[15px] md:pr-[50px] lg:px-[0px]">
        <div className="flex gap-[20px] flex-col md:flex-row">
          <div className="flex flex-1 justify-center font-bold text-[28px] md:justify-start md:text-[42px]">
            About MediConnect
          </div>
          <div className="flex-1 text-lg">
            MediConnect is dedicated to streamlining hospital registration processes for both doctors and patients. Founded in 2023, our mission is to enhance accessibility and efficiency in healthcare through innovative technology. We value innovation, accessibility, efficiency, and integrity, ensuring that our solutions meet the evolving needs of healthcare providers. Our team comprises experienced professionals, including Dr. Sarah Thompson, our Chief Medical Officer, who brings over 15 years of healthcare experience, and John Smith, our Lead Software Engineer, who is passionate about healthcare technology. Together, we strive to create user-friendly solutions that benefit all stakeholders in the healthcare system.
          </div>
        </div>
        <div className="mt-[40px]">
          <Image src="/about.png" alt="about" width={1280} height={720} />
        </div>
      </div>
      {/* {Join} */}
      <div className="bg-gray-200">
        <div className="max-w-7xl py-[80px] flex flex-col mx-auto gap-[20px] px-[15px] md:pr-[50px] lg:px-[0px] md:flex-row">
          <div className="flex-1 font-bold text-[42px] justify-start">
            <div className="mr-[30px] text-center md:text-left">
              Join Our Network of Trusted Healthcare Professionals
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[20px]">
            <div className="text-lg mb-[10px] text-center md:text-left">
              MediConnect offers a seamless registration process for doctors, allowing you to showcase your specialties and connect with patients effortlessly. Upload your photo and list multiple specialties to enhance your profile visibility.
            </div>
            <div className="flex flex-col gap-[20px] md:flex-row">
              <div className="flex flex-col gap-[20px]">
                <div className="text-3xl font-bold text-center md:text-left">
                  Registration Form
                </div>
                <div className="text-sm text-center md:text-left">
                  Complete the form with your details and specialties.
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="text-3xl font-bold text-center md:text-left">
                  Admin Review
                </div>
                <div className="text-sm text-center md:text-left">
                  Our admin team will review and approve your registration.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {Effort} */}
      <div className="bg-black">
        <div className="max-w-7xl py-[80px] flex flex-col mx-auto gap-[20px] px-[15px] md:pr-[50px] lg:px-[0px] md:flex-row">
          <div className="flex-1 font-bold text-[42px] justify-start">
            <div className="mr-[30px] text-center text-white md:text-left">
              Effortless Patient Self-Registration
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[20px]">
            <div className="text-lg mb-[10px] text-center text-white md:text-left">
              Our system allows patients to easily self-register, ensuring quick access to healthcare services. With a user-friendly interface, patients can upload their photo and complete the registration form in just a few steps.
            </div>
            <div className="flex flex-col gap-[20px] md:flex-row">
              <div className="flex flex-col gap-[20px]">
                <div className="text-3xl font-bold text-center text-white md:text-left">
                  Quick Setup
                </div>
                <div className="text-sm text-center text-white md:text-left">
                  Register in minutes with our simple form.
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="text-3xl font-bold text-center text-white md:text-left">
                  Secure Access
                </div>
                <div className="text-sm text-center text-white md:text-left">
                  Your data is protected with top security measures.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {Learn more} */}
      <div className="bg-black flex flex-col gap-[20px] py-[80px] px-[15px] md:pr-[50px] lg:px-[0px]">
        <div className="max-w-7xl flex flex-col mx-auto gap-[20px] md:flex-row">
          <div className="flex-1 font-bold text-[42px] justify-start">
            <div className="mr-[30px] text-center text-white md:text-left">
              Explore Our Comprehensive Doctor Directory
            </div>
          </div>
          <div className="flex-1">
            <div className="mr-[30px] text-center text-white md:text-left">
              Discover a wide range of healthcare professionals registered with MediConnect. Our directory allows you to search by name or specialty, ensuring you find the right doctor to meet your healthcare needs. With detailed profiles and easy navigation, connecting with the right professional has never been easier.
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col justify-between pt-[40px] gap-[20px] md:flex-row">
          <div className="flex-1 flex-col bg-gray-500 bg-opacity-40">
            <div className="w-full">
              <Image src="/learn1.png" alt="learn1" width={1200} height={1200} />
            </div>
            <div className="p-[26px]">
              <div className="">
                <div className="text-2xl mb-[16px] text-white text-center md:text-left">
                  User-Friendly Doctor Search
                </div>
                <div className="text-sm mb-[20px] text-white text-center md:text-left">
                  Our directory offers a seamless search experience, allowing users to find doctors by name or specialty. This ensures patients can easily connect with the right healthcare professional.
                </div>
              </div>
              <div className="flex flex-row pt-[20px] justify-center">
                <Link href="/" className="box-border border-2 border-white text-base text-white bg- bg-gray-500 bg-opacity-40 rounded px-[24px] py-[12px] duration-300 ease-in-out hover:bg-white hover:text-gray-500">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 flex-col bg-gray-500 bg-opacity-40">
            <div className="w-full">
              <Image src="/learn2.png" alt="learn2" width={1200} height={1200} />
            </div>
            <div className="p-[26px]">
              <div className="">
                <div className="text-2xl mb-[16px] text-white text-center md:text-left">
                  Effortless Profile Management
                </div>
                <div className="text-sm mb-[20px] text-white text-center md:text-left">
                  Doctors can easily manage their profiles, update their specialties, and upload photos, ensuring their information is always current and accessible to patients.
                </div>
              </div>
              <div className="flex flex-row pt-[20px] justify-center">
                <Link href="/" className="box-border border-2 border-white text-base text-white bg- bg-gray-500 bg-opacity-40 rounded px-[24px] py-[12px] duration-300 ease-in-out hover:bg-white hover:text-gray-500">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 flex-col bg-gray-500 bg-opacity-40">
            <div className="w-full">
              <Image src="/learn3.png" alt="learn3" width={1200} height={1200} />
            </div>
            <div className="p-[26px]">
              <div className="">
                <div className="text-2xl mb-[16px] text-white text-center md:text-left">
                  Patient-Centric Interface
                </div>
                <div className="text-sm mb-[20px] text-white text-center md:text-left">
                  Our platform is designed with patients in mind, offering an intuitive interface that makes finding and connecting with healthcare providers straightforward and efficient.
                </div>
              </div>
              <div className="flex flex-row pt-[20px] justify-center">
                <Link href="/" className="box-border border-2 border-white text-base text-white bg- bg-gray-500 bg-opacity-40 rounded px-[24px] py-[12px] duration-300 ease-in-out hover:bg-white hover:text-gray-500">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {Efficient Patient} */}
      <div className="bg-white">
        <div className="max-w-7xl py-[80px] flex flex-col mx-auto gap-[20px] px-[15px] md:pr-[50px] lg:px-[0px] md:flex-row">
          <div className="flex-1 font-bold text-[42px] justify-start">
            <div className="mr-[30px] text-center  md:text-left">
              Efficient Patient Search Directory
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[20px]">
            <div className="text-lg mb-[10px] text-center  md:text-left">
              Our Patient Directory allows admins to quickly search and locate patient information by name, ensuring seamless management of patient records. This tool enhances the efficiency of healthcare operations and supports better patient care.
            </div>
            <div className="flex flex-col gap-[20px] md:flex-row">
              <div className="flex flex-col gap-[20px]">
                <div className="text-3xl font-bold text-center  md:text-left">
                  Quick Setup
                </div>
                <div className="text-sm text-center  md:text-left">
                  Find patients swiftly using our intuitive search feature.
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="text-3xl font-bold text-center md:text-left">
                  Secure Access
                </div>
                <div className="text-sm text-center  md:text-left">
                  Ensure patient data is accessed safely and securely
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {Admin Review} */}
      <div className="bg-black">
        <div className="max-w-7xl py-[80px] flex flex-col mx-auto gap-[20px] px-[15px] md:pr-[50px] lg:px-[0px] md:flex-row">
          <div className="flex-1 font-bold text-[42px] justify-start">
            <div className="mr-[30px] text-center text-white md:text-left">
              Efficient Admin Review Process for Registrations
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[20px]">
            <div className="text-lg mb-[10px] text-center text-white md:text-left">
              Our admin review process ensures that all doctor and patient registrations are thoroughly evaluated. This guarantees that only qualified professionals and genuine patients are part of our system, maintaining the integrity and reliability of MediConnect.
            </div>
            <div className="flex flex-col gap-[20px] md:flex-row">
              <div className="flex flex-col gap-[20px]">
                <div className="text-3xl font-bold text-center text-white md:text-left">
                  Doctor Review
                </div>
                <div className="text-sm text-center text-white md:text-left">
                  Admins verify doctor credentials, ensuring they meet all necessary requirements.
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="text-3xl font-bold text-center text-white md:text-left">
                  Patient Review
                </div>
                <div className="text-sm text-center text-white md:text-left">
                  Patient registrations are checked for accuracy, ensuring seamless access to care.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}