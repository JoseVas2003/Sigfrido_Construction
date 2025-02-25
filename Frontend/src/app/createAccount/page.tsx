'use client'
import '../Assets/css/createAccount.modules.css';
import Navbar from '../navbar/navBar';
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';
import {clicksOut} from '../navbar/navBar'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function createUser(){

  const {data: session, status} = useSession();
  const changePage = useRouter();

  if(session){
      changePage.replace('/');
  }

     // State to hold form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    admin: false,
  });

  let usersName = formData.firstName;

  // Handle change in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //Handle form submission using Axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData); // Debugging log
  
    try {
      const response = await axios.post('http://localhost:3001/api/users', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("Response from server:", response.data); // Debugging log
      //alert('Account created successfully!');
      openPopup();
    } catch (error) {
      const err = error as any;
      console.error("Error response:", err.response?.data || err.message); // Debugging log
      alert(`Error: ${err.response?.data?.message || err.message}`);
  }
  };

  const openPopup = () => {

    let successPopup = document.getElementById("successPopup");
    let createAccountForm = document.getElementById("createAccountForm");
    if (successPopup?.style.visibility == "hidden" && createAccountForm?.style.pointerEvents == "auto") {
      successPopup.style.visibility = "visible";
      createAccountForm.style.pointerEvents = "none";
    }
  };

  return (
    <div>
      <Navbar />
      <main>
        <div className="Container" onClick={() => { clicksOut();}}>
          <form className="createAccountForm" onSubmit={handleSubmit} id="createAccountForm" style={{pointerEvents: 'auto'}}>
            <label className="firstNameLabel">First Name</label>
            <label className="firstNameAsterisk"> *</label>
            <label className="lastNameLabel">Last Name</label>
            <label className="lastNameAsterisk"> *</label>

            <div className="nameContainer">
              <input
                className="firstNameInput"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                className="lastNameInput"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <br />

            <label className="phoneNumberLabel">Phone Number</label>
            <label className="phoneNumberAsterisk"> *</label>

            <div className="phoneNumberInputContainer">
              <input
                className="phoneNumberInput"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <br />

            <label className="createAccountEmailLabel">Email</label>
            <label className="createAccountEmailAsterisk"> *</label>

            <div className="emailInputContainer">
              <input
                className="createAcountEmailInput"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <br />

            <label className="createAccountPasswordLabel">Password</label>
            <label className="createAccountPasswordAsterisk"> *</label>

            <div className="passwordContainer">
              <input
                className="createAccountPasswordInput"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <br />

            <label className="confirmPasswordLabel">Confirm Password </label> <label className="confirmPasswordAsterisk"> *</label>


            <div className="confirmPasswordContainer">
                <input className="confirmPasswordInput" type="password"/>
            </div>

            <br />

            <div className="CreateAccountButtonContainer">
              <button className="CreateAccountButton" type="submit">Create Account</button>
            </div>

            <br />
          </form>

          <div className="successPopup" id="successPopup" style={{visibility: 'hidden'}}>
              <p className="accountCreatedSuccessMessage">Welcome, {usersName}!</p>
              <p className="accountCreatedSuccessMessage">Your Account Was Created Successfully!</p>
              <br></br>
              <div className="successHomeButtonContainer">
                <Link href="../">
                  <button className="successHomeButton">HOME</button>
                </Link>
              </div>
          </div>
        </div>
      </main>
    </div>
  );
}