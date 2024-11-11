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
            <div>
                <div className="Left_profile_bar">
                    <div className="Circle">J</div>
                    <h1>Welcome back, John!</h1>
                    
                    <div className="SideButtons">
                        <a href="../faq">
                            <Image src={Question} alt="" height={25} width={25} />
                            F.A.Q.
                        </a>

                        <a href="../contactPage">
                            <Image src={Message} alt="" height={25} width={25} />
                            Contact Us
                        </a>
                            
                        <a href="../clientsettings">
                            <Image src={Settings} alt="" height={25} width={25} />
                            Settings
                        </a>

                        <a href="../home">
                            <Image src={Signout} alt="" height={25} width={25} />
                            Logout
                        </a>

                    </div>
                </div>
            </div>

        </div>
    );
}