'use client'

import { useState, useEffect, useRef } from 'react';
import {useSession} from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {signOut} from 'next-auth/react';

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

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordBorder, setPasswordBorder] = useState(false);
  const [oldPasswordDelete, setoldPasswordDelete] = useState('');

  const [currentPhone, setCurrentPhone] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [confirmNewPhone, setConfirmNewPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [phoneBorder, setPhoneBorder] = useState(false);

  const [updatedPassword, setUpdatedPassword] = useState({
    password: ''
  });
  const [updatedPhone, setUpdatedPhone] = useState({
    phone: ''
  });

  // Ref for button popup
  const passwordPopupRef = useRef<HTMLDivElement | null>(null);
  const phonePopupRef = useRef<HTMLDivElement | null>(null);
  const deletePopupRef = useRef<HTMLDivElement | null>(null);

  const handleChangePassword = () => {
    setShowPasswordPopup(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setPasswordError('');
    setPasswordBorder(false);
  };
  const handleChangePhone = () => {
    setShowPhonePopup(true);
    setCurrentPhone('');
    setNewPhone('');
    setConfirmNewPhone('');
    setPhoneError('');
    setPhoneBorder(false);
  };
  const handleDeleteAccount = () => {
    setShowDeletePopup(true);
    setoldPasswordDelete('');
    setPasswordError('');
    setPasswordBorder(false);
  };  

  const validatePasswordChange = async () => {
    let isValid = true;
    setPasswordError('');
    setPasswordBorder(false);

    let specialCharacters = /[!#$%^&*]/;
    let capitalLetter = /[A-Z]/;

    // Check if all fields are filled
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError("All fields are required.");
      setPasswordBorder(true);
      return false;
    }

    // Validate new password constraints
    if (newPassword.length < 8) {
      setPasswordError("Your Password Must Be At Least 8 Characters");
      setPasswordBorder(true);
      return false;
    } 
    if (newPassword.length > 20) {
      setPasswordError("Your Password Must Be Less Than 20 Characters");
      setPasswordBorder(true);
      return false;
    }
    if (!specialCharacters.test(newPassword)) {
      setPasswordError("Your Password Must Contain At Least 1 Special Character (!#$%^&*)");
      setPasswordBorder(true);
      return false;
    }
    if (!capitalLetter.test(newPassword)) {
      setPasswordError("Your Password Must Contain At Least 1 Capital Letter");
      setPasswordBorder(true);
      return false;
    }

    // Check if new passwords match
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.");
      setPasswordBorder(true);
      return false;
    }

    const connection = 'http://localhost:3001/api/users/';
    const userURL = connection + (email);

    try {
      // Verify current password with the backend
      const user = await axios.get(userURL, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let userCurrent = user.data.password;

      if (userCurrent != currentPassword) {
        setPasswordError("Current password is incorrect.");
        setPasswordBorder(true);
        return false;
      } 
    } catch (error) {
      setPasswordError("Error verifying password.");
      setPasswordBorder(true);
      return false;
    }

    return true;
  };

  const handleConfirmPasswordChange = async () => {
    if (await validatePasswordChange()) {
      const connection = 'http://localhost:3001/api/users/';
      const resetPasswordURL = connection + (email);
      updatedPassword.password = newPassword;

      try {
        await axios.put(resetPasswordURL, updatedPassword, {
          headers: { "Content-Type": "application/json" },
        });
        setShowPasswordPopup(false);
        setShowPasswordSuccess(true);
      }catch(error){
        console.log(error);
      }

      setTimeout(() => setShowPasswordSuccess(false), 3000);
    }
  };

  const validatePhoneChange = async () => {
    setPhoneError('');
    setPhoneBorder(false);

    if (!currentPhone || !newPhone || !confirmNewPhone) {
      setPhoneError("All fields are required.");
      setPhoneBorder(true);
      return false;
    }

    if (newPhone !== confirmNewPhone) {
      setPhoneError("New phone number does not match.");
      setPhoneBorder(true);
      return false;
    }

    const connection = 'http://localhost:3001/api/users/';
    const userURL = connection + (email);

    try {
      // Verify current phone with the backend
      const user = await axios.get(userURL, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let userCurrent = user.data.phone;

      if (userCurrent != currentPhone) {
        setPhoneError("Current phone number is incorrect.");
        setPhoneBorder(true);
        return false;
      } 
    } catch (error) {
      setPhoneError("Error verifying phone number.");
      setPhoneBorder(true);
      return false;
    }

    return true;
  }

  const handleConfirmPhoneChange = async () => {
    if (await validatePhoneChange()){
      const connection = 'http://localhost:3001/api/users/';
      const resetPhoneURL = connection + (email);
      updatedPhone.phone = newPhone;

      try{
        await axios.put(resetPhoneURL, updatedPhone, {
          headers: { "Content-Type": "application/json" },
        });
        setShowPhonePopup(false);
        setShowPhoneSuccess(true);
      }catch(error){
        console.log(error);
      }
    }

    setTimeout(() => setShowPhoneSuccess(false), 3000);
  };

  const handleConfirmDelete = async() => {
    const router = useRouter();
    const connection = 'http://localhost:3001/api/users/';
    const userURL = connection + (email);
    let userID = '';

    try {
      // Verify current password with the backend
      const user = await axios.get(userURL, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let userCurrent = user.data.password;
      userID = user.data._id;

      if (userCurrent != oldPasswordDelete) {
        setPasswordError("Current password is incorrect.");
        setPasswordBorder(true);
        return false;
      }
      setShowDeletePopup(false);
      setShowDeleteSuccess(true);
    } catch (error) {
      setPasswordError("Error verifying password.");
      setPasswordBorder(true);
      return false;
    }

    const connections = 'http://localhost:3001/api/users/';
    const usersURL = connections + (userID);

    try {
      await axios.delete(usersURL, {
      headers: {
        'Content-Type': 'application/json',
        },
      });
    } catch(error){
      console.log(error);
    }
    setTimeout(() => {
      signOut();
      router.push('/');
    }, 3000);
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
      if (deletePopupRef.current && !deletePopupRef.current.contains(event.target as Node)) {
        setShowDeletePopup(false);
      }
    };

    if (showPasswordPopup || showPhonePopup || showDeletePopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPasswordPopup, showPhonePopup, showDeletePopup]);
   
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
            <Link href="../">
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
              <div className="SettingsBox" onClick={handleDeleteAccount}> <strong>Delete Account</strong> </div>
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
          <input
            type="password"
            placeholder="Enter old password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={{ border: passwordBorder ? "1px solid red" : "" }}
          />

            <h2 className="PopupTitle">New Password</h2>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ border: passwordBorder ? "1px solid red" : "" }}
          />

            <h2 className="PopupTitle">Confirm New Password</h2>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            style={{ border: passwordBorder ? "1px solid red" : "" }}
          />

          {passwordError && <p className="error-text">{passwordError}</p>}

          <button className="PopupButton" onClick={handleConfirmPasswordChange}>
            Confirm
          </button>
          </div>
        </div>
      )}


      {/* Phone number popup */}
      {showPhonePopup && (
        <div className="PopupOverlay">
          <div ref={phonePopupRef} className="PopupBox">
            <h2 className="PopupTitle">Enter Old Phone Number</h2>
            <input
              type="phone"
              placeholder="Enter old phone number"
              value={currentPhone}
              onChange={(e) =>
                setCurrentPhone(e.target.value)}
              style={{ border: phoneBorder ? "1px solid red" : "" }}
            />

            <h2 className="PopupTitle">Enter New Phone Number</h2>
            <input 
              type="phone"
              placeholder="Enter new phone number"
              value={newPhone}
              onChange={(e) =>
                setNewPhone(e.target.value)}
              style={{ border: phoneBorder ? "1px solid red" : "" }}
            />

            <h2 className="PopupTitle">Confirm New Phone Number</h2>
            <input 
              type="phone"
              placeholder="Confirm new phone number"
              value={confirmNewPhone}
              onChange={(e) =>
                setConfirmNewPhone(e.target.value)}
              style={{ border: phoneBorder ? "1px solid red" : "" }} 
            />

            {phoneError && <p className="error-text">{phoneError}</p>}

            <button className="PopupButton" onClick={handleConfirmPhoneChange}>Confirm</button>
          </div>
        </div>
      )}

      {/* Delete account popup */}
      {showDeletePopup && (
        <div className="PopupOverlay">
          <div ref={deletePopupRef} className="PopupBox">
            <h2 className="PopupTitle">Delete Account</h2>
            <input 
              onChange={(e) => setoldPasswordDelete(e.target.value)}
              value={oldPasswordDelete}
              type="password"
              placeholder="Enter Current Password"
              style={{ borderColor: passwordBorder ? 'red' : 'initial' }}
            />
            {passwordError && <p style={{ color: 'red', fontSize: '14px' }}>{passwordError}</p>}

            <button className="PopupButton" onClick={handleConfirmDelete} style={{ backgroundColor: 'red', color: 'white' }}>
              Delete Account
            </button>
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

      {/* Success message for account delete */}
      {showDeleteSuccess && (
        <div className="SuccessPopupOverlay">
          <div className="SuccessPopupBox">
            <h2 className="SuccessMessage" style={{ fontWeight: 'bold' }}>
              Account Deleted Successfully!
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}