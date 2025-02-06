'use client'
import Image from 'next/image';
import Navbar from "../navbar/navBar";
import "../Assets/css/ClientDashboard.modules.css"
import Link from "next/link";
import Message from '../Assets/clientDashboardIcons/Message.png';
import Question from '../Assets/clientDashboardIcons/Question.png';
import Settings from '../Assets/clientDashboardIcons/Setting_line_light@3x.png';
import Signout from '../Assets/clientDashboardIcons/Sign_out_squre.png';
export default function page(){
  return (
    <div>
      <Navbar/>
      <div className="container">
        <div className="Left_profile_bar">
        <div className="Circle">J</div>
                    <h1>Welcome back, John!</h1>
                    <div className="SideButtons">
                        <Link href="../faq">
                            <Image src={Question} alt="FAQ Icon" height={25} width={25} />
                            F.A.Q.
                        </Link>
                        <Link href="../contactPage">
                            <Image src={Message} alt="Message Icon" height={25} width={25} />
                            Contact Us
                        </Link>
                        <Link href="../clientSettingsPage">
                            <Image src={Settings} alt="Settings Icon" height={25} width={25} />
                            Settings
                        </Link>
                        <Link href="../home">
                            <Image src={Signout} alt="Logout Icon" height={25} width={25} />
                            Logout
                        </Link>
                    </div>
        </div>
      </div>
    </div>
  );
}