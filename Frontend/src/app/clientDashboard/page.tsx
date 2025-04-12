'use client'

import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useState } from 'react';
import "../Assets/css/ClientDashboard.modules.css";
import Navbar from "../navbar/navBar";

// Icon images
import Message from '../Assets/clientDashboardIcons/Message.png';
import Question from '../Assets/clientDashboardIcons/Question.png';
import Settings from '../Assets/clientDashboardIcons/Setting_line_light@3x.png';
import Download from '../Assets/clientDashboardIcons/Download.png'

// Static images
import Bathroom from '../Assets/clientStaticImages/Bathroom-static.jpg';
import Bedroom from '../Assets/clientStaticImages/Bedroom-Static.jpg';
import InActiveProject from '../Assets/clientStaticImages/ConstructionHat-static.jpg';
import Floor from '../Assets/clientStaticImages/Floor-static.jpg';
import House from '../Assets/clientStaticImages/House-static.jpg';
import Kitchen from '../Assets/clientStaticImages/Kitchen-static.jpg';
import LivingRoom from '../Assets/clientStaticImages/LivingRoom-Static.jpg';
import Roof from '../Assets/clientStaticImages/Roof-static.jpg';
import Shed from '../Assets/clientStaticImages/Shed-static.jpg';

interface Projects {
  _id: string;
  customerName: string;
  email: string;
  projectType: string;
  dateStarted: string;
  estimatedCost: number;
  expectedCompletion: string;
  quote: object;
  createdAt: string;
} 

const handleDownloadQuote = (project) => {
  const quoteContent = `
    Name: ${project.customerName}
    Email: ${project.email}
    Project Type: ${project.projectType}
    Date Started: ${new Date(project.dateStarted).toLocaleDateString()}
    Estimated Cost: $${project.estimatedCost}
    Expected Completion: ${new Date(project.expectedCompletion).toLocaleDateString()}
  `;

  const blob = new Blob([quoteContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `Quote-${project.projectType}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default function page(){
  const {data: session, status} = useSession();
  const names = session?.user?.name;
  const initial = names?.charAt(0);
  const email = session?.user?.email;

  const [projects, setProjects] = useState<Projects[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  
  useEffect(() => {
    if (!email) return;
    (async () => {
      try {
        console.log(email);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/inProgressProjects/${email}`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    })();
  }, [email]);
  
  return (
    <div>
      {/* Top navbar */}
      <Navbar/>

      {/* Main container */}
      <div className="container">

        {/* Left profile bar */}
        <div className="Left_profile_bar">
          <div className="Circle">{initial}</div>
          <h1>Welcome back,</h1>
          <h1>{names}!</h1>
          <div className="SideButtons">
            <Link href="../faq">
              <Image src={Question} alt="FAQ Icon" height={25} width={25} />
              F.A.Q.
            </Link>
            <Link href="../contactPage">
              <Image src={Message} alt="Message Icon" height={25} width={25} />
              Contact Us
            </Link>
            <Link href="../clientSettingsPage" id='clientSettingsButton'>
              <Image src={Settings} alt="Settings Icon" height={25} width={25} />
              Settings
            </Link>
          </div>
        </div>

        {/* Body next to profile bar */}
        <div className="Body">
          <h1 className="BodyTitles">Upcoming Contracts</h1>
          <div className="ImageRow">
            {[...projects
              .sort((a, b) => new Date(a.expectedCompletion).getTime() - new Date(b.expectedCompletion).getTime())
              .slice(0, 3), 
              ...Array(Math.max(0, 3 - projects.length)).fill(null)]
            .map((project, index) => {
              let projectImage = InActiveProject;
              let projectType = "";
              let expectedCompletion = "";

              if (project) {
                if (project.projectType === "Bathroom") projectImage = Bathroom;
                else if (project.projectType === "Bedroom") projectImage = Bedroom;
                else if (project.projectType === "Floor") projectImage = Floor;
                else if (project.projectType === "House") projectImage = House;
                else if (project.projectType === "Kitchen") projectImage = Kitchen;
                else if (project.projectType === "Living Room") projectImage = LivingRoom;
                else if (project.projectType === "Roof") projectImage = Roof;
                else if (project.projectType === "ADU") projectImage = Shed;

                projectType = project.projectType;
                expectedCompletion = new Date(project.expectedCompletion).toLocaleDateString();
              }

              return (
                <div className={`ProjectItem ${project ? "" : "InactiveProject"}`} key={project ? project._id : `inactive-${index}`}>
                <Image src={projectImage} alt={projectType || 'Inactive Project'} className="ProjectImage" />
                {project && (
                  <div className="ProjectOverlay">
                    <p className="OverlayText">Expected Date: {expectedCompletion}</p>
                  </div>
                )}
                {project && <p className="ProjectName">{projectType}</p>}
                </div>
              );
            })}
          </div>
          
          <hr className="SeparatorLine" />
          <h1 className='BodyTitles'>Contract History</h1>
          
          {/* Project list */}
          <div className="GridList">
            <div className="GridItem GridItemHeader">Type</div>
            <div className="GridItem GridItemHeader">Date Started</div>
            <div className="GridItem GridItemHeader">Cost</div>
            <div className="GridItem GridItemHeader">Expected Completion</div>
            <div className="GridItem GridItemHeader">Download</div>

            {projects.map((project) => (
              <>
              <div className="GridItem">{project.projectType}</div>
              <div className="GridItem">{new Date(project.dateStarted).toLocaleDateString()}</div>
              <div className="GridItem">${project.estimatedCost}</div>
              <div className="GridItem">{new Date(project.expectedCompletion).toLocaleDateString()}</div>
              <div className="GridItem">
                <Image 
                  src={Download} 
                  alt="Download Icon" 
                  height={25} 
                  width={25}
                  onClick={() => handleDownloadQuote(project)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              </>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}