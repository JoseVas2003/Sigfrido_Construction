'use client'

import { useState, useEffect } from 'react';
import {useSession} from 'next-auth/react';
import axios from 'axios';

import Image from 'next/image';
import Navbar from "../navbar/navBar";
import "../Assets/css/ClientDashboard.modules.css"
import Link from "next/link";
import "../Assets/css/ClientDashboardProfile.modules.css";

// Sidebar images
import Message from '../Assets/clientDashboardIcons/Message.png';
import Question from '../Assets/clientDashboardIcons/Question.png';
import Settings from '../Assets/clientDashboardIcons/Setting_line_light@3x.png';
import Signout from '../Assets/clientDashboardIcons/Sign_out_squre.png';

// Static image
import Construction from '../Assets/clientStaticImages/Construction-static.jpg';

export default function page(){
  // Grabbing user info
  const {data: session, status} = useSession();
  const names = session?.user?.name;
  const initial = names?.charAt(0);
  const email = session?.user?.email;

  // Setting up states
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetching user info from backend when email is available
  useEffect(() => {
    if (email) {
      // Fetching user info from server
      const fetchUserInfo = async () => {
        try {
          const connection = 'http://localhost:3001/api/users/';
          const userDatabaseURL = `${connection}${email}`;
  
          const { data } = await axios.get(userDatabaseURL, {
            headers: { "Content-Type": "application/json" },
          });
  
          setPhoneNumber(formatPhoneNumber(data.phone) || 'N/A'); //Changing format of phone number
          setLastName(data.lastName || '');
        } catch (error) {
          console.error("Error Getting User", error);
          setPhoneNumber('Error fetching');
          setLastName('Error fetching');
        } finally {
          setLoading(false); // Sett loading as false after fetch attempt
        }
      };

      fetchUserInfo();
    }
  }, [email]);
  

  // Function to change phone number format
  const formatPhoneNumber = (phone: string | null): string => {
    if (!phone) return 'N/A';
    const phoneStr = phone.replace(/\D/g, ''); // Remove all non-numeric characters
    if (phoneStr.length === 10) {
      // Format 10-digit phone number as (123) 456-7890
      return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
    } else {
      return phone;
    }
  };
   
  return (
    <div>
      {/* Top navbar */}
      <Navbar/>

      {/* Main container */}
      <div className="container">

        {/* Left profile bar */}
        <div className="Left_profile_bar">
        <div className="Circle">{initial}</div>
          <h1>Welcome back, {names}!</h1>
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

        {/* Body next to profile bar */}
        <div className="Body">

          {/* Splitting information box and buttons from image */}
          <div className="TopSection">
            <div className="ProfileInfoBox">
              <h2 className="ProfileTitle">Profile Information</h2>
              <p><strong>Full Name:</strong> {names} {lastName}</p>
              <p><strong>Phone Number:</strong> {phoneNumber}</p>
              <p><strong>Email:</strong> {email}</p>
            </div>
            <div className="SettingsOptions">
              <div className="SettingsBox">
              <strong>Change Password</strong>
              </div>
              <div className="SettingsBox"> <strong>Change Phone Number</strong> </div>
              <div className="SettingsBox"> <strong>Delete Account</strong> </div>
            </div>
          </div>

          {/* Static image */}
          <div className="ConstructionImage">
            <Image src={Construction} alt="Construction image" />
          </div>
        </div>
      </div>
    </div>
  );
}