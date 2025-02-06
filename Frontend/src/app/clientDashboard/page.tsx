'use client'
import Image from 'next/image';
import Navbar from "../navbar/navBar";
import "../Assets/css/ClientDashboard.modules.css"
import Link from "next/link";
import Message from '../Assets/clientDashboardIcons/Message.png';
import Question from '../Assets/clientDashboardIcons/Question.png';
import Settings from '../Assets/clientDashboardIcons/Setting_line_light@3x.png';
import Signout from '../Assets/clientDashboardIcons/Sign_out_squre.png';
import Bathroom from '../Assets/clientStaticImages/Bathroom-static.jpg';
import House from '../Assets/clientStaticImages/House-static.jpg';
import Kitchen from '../Assets/clientStaticImages/Kitchen-static.jpg';

export default function page(){
    const projects = [
        { type: 'Bathroom', dateStarted: '2025-01-10', cost: 1500, expectedCompletion: '2025-02-10' },
        { type: 'House', dateStarted: '2025-01-15', cost: 3500, expectedCompletion: '2025-03-01' },
        { type: 'Kitchen', dateStarted: '2025-01-12', cost: 2000, expectedCompletion: '2025-02-25' },
      ];

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
                <div className="Body">
                    <h1 className="UpcomingText">Upcoming Contracts</h1>
                    <div className="ImageRow">
                        <div className="ProjectItem">
                        <Image src={Bathroom} alt="Project 1" className="ProjectImage" />
                        <p className="ProjectName">Bathroom</p>
                        </div>
                        <div className="ProjectItem">
                        <Image src={House} alt="Project 2" className="ProjectImage" />
                        <p className="ProjectName">House</p>
                        </div>
                        <div className="ProjectItem">
                        <Image src={Kitchen} alt="Project 3" className="ProjectImage" />
                        <p className="ProjectName">Kitchen</p>
                        </div>
                    </div>

                    <div className="GridList">
                        <div className="GridItem GridItemHeader">Type</div>
                        <div className="GridItem GridItemHeader">Date Started</div>
                        <div className="GridItem GridItemHeader">Cost</div>
                        <div className="GridItem GridItemHeader">Expected Completion</div>

                        {projects.map((project, index) => (
                            <>
                                <div className="GridItem">{project.type}</div>
                                <div className="GridItem">{new Date(project.dateStarted).toLocaleDateString()}</div>
                                <div className="GridItem">${project.cost}</div>
                                <div className="GridItem">{new Date(project.expectedCompletion).toLocaleDateString()}</div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}