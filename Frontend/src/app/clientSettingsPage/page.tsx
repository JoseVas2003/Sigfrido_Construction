'use client'

import { useState, useEffect, useRef } from 'react';
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

  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);

  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [showPhoneSuccess, setShowPhoneSuccess] = useState(false);

  // Ref for password popup
  const passwordPopupRef = useRef<HTMLDivElement | null>(null);
  const phonePopupRef = useRef<HTMLDivElement | null>(null);

  const handleChangePassword = () => setShowPasswordPopup(true);
  const handleChangePhone = () => setShowPhonePopup(true);

  const handleConfirmPasswordChange = () => {
    setShowPasswordPopup(false); // Hide the password popup
    setShowPasswordSuccess(true); // Show the success message

    // Hide the success message after 3 seconds
    setTimeout(() => setShowPasswordSuccess(false), 3000);
  };

  const handleConfirmPhoneChange = () => {
    setShowPhonePopup(false);
    setShowPhoneSuccess(true);
    setTimeout(() => setShowPhoneSuccess(false), 3000);
  };

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

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (passwordPopupRef.current && !passwordPopupRef.current.contains(event.target as Node)) {
        setShowPasswordPopup(false);
      }
      if (phonePopupRef.current && !phonePopupRef.current.contains(event.target as Node)) {
        setShowPhonePopup(false);
      }
    };

    if (showPasswordPopup || showPhonePopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPasswordPopup, showPhonePopup]);
   
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
              <div className="SettingsBox" onClick={handleChangePassword}>
              <strong>Change Password</strong>
              </div>
              <div className="SettingsBox" onClick={handleChangePhone}> <strong>Change Phone Number</strong> </div>
              <div className="SettingsBox"> <strong>Delete Account</strong> </div>
            </div>
          </div>

          {/* Static image */}
          <div className="ConstructionImage">
            <Image src={Construction} alt="Construction image" />
          </div>
        </div>
      </div>

      {/* Password popup */}
      {showPasswordPopup && (
        <div className="PopupOverlay">
          <div ref={passwordPopupRef} className="PopupBox">
            <h2 className="PopupTitle">Old Password</h2>
            <input type="password" placeholder="Enter old password" />

            <h2 className="PopupTitle">New Password</h2>
            <input type="password" placeholder="Enter new password" />

            <button className="PopupButton" onClick={handleConfirmPasswordChange}>Confirm</button>
          </div>
        </div>
      )}

      {/* Phone number popup */}
      {showPhonePopup && (
        <div className="PopupOverlay">
          <div ref={phonePopupRef} className="PopupBox">
            <h2 className="PopupTitle">Enter New Phone Number</h2>
            <input type="text" placeholder="Enter new phone number" />

            <h2 className="PopupTitle">Confirm New Phone Number</h2>
            <input type="text" placeholder="Confirm new phone number" />

            <button className="PopupButton" onClick={handleConfirmPhoneChange}>Confirm</button>
          </div>
        </div>
      )}

      {/* Success message for Password Change */}
      {showPasswordSuccess && (
        <div className="SuccessPopupOverlay">
          <div className="SuccessPopupBox">
            <h2 className="SuccessMessage" style={{ fontWeight: 'bold' }}>
              Password Has Been Changed Successfully!
            </h2>
          </div>
        </div>
      )}

      {/* Success message for Phone Number Change */}
      {showPhoneSuccess && (
        <div className="SuccessPopupOverlay">
          <div className="SuccessPopupBox">
            <h2 className="SuccessMessage" style={{ fontWeight: 'bold' }}>
              Phone Number Has Been Changed Successfully!
            </h2>
          </div>
        </div>
      )}

    </div>
  );
}