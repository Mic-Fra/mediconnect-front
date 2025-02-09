
import { Montserrat } from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Layout from '@/components/Layout';


const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '700'], // Optional: Specify weights
  });

export default function Dashboard(){

    return(
        <Layout>
        <div className={`${montserrat.className} max-w-full`}>
            <div className="max-w-7xl mx-auto px-[15px] md:pr-[50px] lg:px-[0px]">
                <div className="flex flex-col pb-[80px] gap-[20px]">
                    <div className="flex text-[42px] font-bold justify-center text-center">
                        Get in Touch
                    </div>
                    <div className="max-w-3xl flex text-lg mb-[30px] justify-center text-center mx-auto">
                        For inquiries or support, reach us at contact@mediconnect.com or call +1 (555) 123-4567. Our office is located at 123 Health St, Suite 100, San Francisco.
                    </div>
                </div>
                <div className="py-[80px]">
                    <div className="flex flex-col p-[10px] gap-[20px]">
                        <div className="text-base flex justify-center md:justify-start">
                            Get in Touch
                        </div>
                        <div className="text-[42px] font-bold flex justify-center text-center md:justify-start">
                            Contact MediConnect
                        </div>
                        <div className="max-w-3xl text-lg flex justify-center text-center md:justify-start md:text-left">
                            Reach out to us for any inquiries or support regarding our healthcare technology solutions.
                        </div> 
                    </div>
                    <div className="flex flex-col p-[10px] gap-[20px] mt-[40px] md:flex-row">
                        <div className="flex-1">
                            <div className="flex justify-center md:justify-start">
                                <FontAwesomeIcon icon={faEnvelope} width={30} height={30} className="text-green-600 mb-[15px]" />
                            </div>
                            <div className="text-3xl text-center font-bold md:text-left">
                                Email Us
                            </div>
                            <div className="text-sm text-center md:text-left">
                                For any questions or support, please email us at
                            </div>
                            <div className="flex justify-center md:justify-start">
                                <Link href="/contact@mediconnect.com." className="text-sm text-[#007bff]">
                                    contact@mediconnect.com.
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-center md:justify-start">
                                <FontAwesomeIcon icon={faPhoneAlt} width={30} height={30} className="text-green-600 mb-[15px]" />
                            </div>                           
                            <div className="text-3xl text-center font-bold md:text-left">
                                Call Us
                            </div>
                            <div className="text-sm text-center md:text-left">
                                You can reach our support team at <span className="text-sm font-bold">+1 (555) 123-4567.</span> We are here to help you.
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-center md:justify-start">
                                <FontAwesomeIcon icon={faMapMarkerAlt} width={30} height={30} className="text-green-600 mb-[15px]" />
                            </div>
                            <div className="text-3xl text-center font-bold md:text-left">
                                Visit Us
                            </div>
                            <div className="text-sm text-center md:text-left">
                                Our office is located at <span className="text-sm font-bold">123 Health St, Suite 100, San Francisco, United States.</span> Feel free to stop by!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    )
}