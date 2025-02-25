'use client'
import axios from "axios";
import { useState } from 'react';
import '../Assets/css/createAccount.modules.css';
import Navbar from '../navbar/navBar';

import { clicksOut } from '../navbar/navBar';

export default function createUser(){

     // State to hold form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  });

  const[confirmPasswordValue, setConfirmPasswordValue] = useState('');

  const [firstNameError, firstNameErrorSetter] = useState('');
  const [firstNameBorder, firstNameBorderSetter] = useState(false);

  const [lastNameError, lastNameErrorSetter] = useState('');
  const [lastNameBorder, lastNameBorderSetter] = useState(false);

  const [phoneNumberError, phoneNumberErrorSetter] = useState('');
  const [phoneNumberBorder, phoneNumberBorderSetter] = useState(false);

  const [emailError, emailErrorSetter] = useState('');
  const [emailBorder, emailBorderSetter] = useState(false);

  const [passwordError, passwordErrorSetter] = useState('');
  const [passwordBorder, passwordBorderSetter] = useState(false);

  const [confirmPasswordError, confirmPasswordErrorSetter] = useState('');
  const [confirmPasswordBorder, confirmPasswordBorderSetter] = useState(false);

  const setFirstNameBorderNotFocused = () => {
    firstNameBorderSetter(false);
  }

  const setFirstNameBorderIsFocused = () => {
    firstNameBorderSetter(true);
  }

  const firstNameErrorMessageClear = () => {
    firstNameErrorSetter("");
  }

  const setLastNameBorderNotFocused = () => {
    lastNameBorderSetter(false);
  }

  const setLastNameBorderIsFocused = () => {
    lastNameBorderSetter(true);
  }

  const lastNameErrorMessageClear = () => {
    lastNameErrorSetter("");

  }

  const setPhoneNumberBorderNotFocused = () => {
    phoneNumberBorderSetter(false);
  }

  const setPhoneNumberBorderIsFocused = () => {
    phoneNumberBorderSetter(true);
  }

  const phoneNumberErrorMessageClear = () => {
    phoneNumberErrorSetter("");
  }

  const setEmailBorderNotFocused = () => {
    emailBorderSetter(false);
  }

  const setEmailBorderIsFocused = () => {
    emailBorderSetter(true);
  }

  const emailErrorMessageClear = () => {
    emailErrorSetter("");
  }

  const setPasswordBorderNotFocused = () => {
    passwordBorderSetter(false);
  }

  const setPasswordBorderIsFocused = () => {
    passwordBorderSetter(true);
  }

  const passwordErrorMessageClear = () => {
    passwordErrorSetter("");

  }

  const setConfirmPasswordBorderNotFocused = () => {
    confirmPasswordBorderSetter(false);
  }

  const setConfirmPasswordBorderIsFocused = () => {
    confirmPasswordBorderSetter(true);
  }

  const confirmPasswordErrorMessageClear = () => {
    confirmPasswordErrorSetter("");
  }

  const createAccountFormClientSideValidationFirstName = () => {

    let firstNameErrorInputBorder = document.getElementById("firstNameInput");
    let validNames = /^[a-zA-Z-]+$/;

    firstNameErrorSetter("");

    if(formData.firstName == "")
    {
        firstNameErrorSetter("Please Enter Your First Name");
        firstNameErrorInputBorder!.style.border = "3px solid red";
        return false;
    }else if(!validNames.test(formData.firstName)){
      firstNameErrorSetter("First Name Can Only Contain Letters");
      firstNameErrorInputBorder!.style.border = "3px solid red";
      return false;
    }else if(formData.firstName.length > 20){
      firstNameErrorSetter("Please Enter 20 Characters or Less");
      firstNameErrorInputBorder!.style.border = "3px solid red";
      return false;
    }else{
        return true;
    }
  }

  const createAccountFormClientSideValidationLastName = () => {

    let lastNameErrorInputBorder = document.getElementById("lastNameInput");
    let validNames = /^[a-zA-Z-]+$/;

    lastNameErrorSetter("");

    if(formData.lastName == "")
    {
        lastNameErrorSetter("Please Enter Your Last Name");
        lastNameErrorInputBorder!.style.border = "3px solid red";
        return false;
    } else if(!validNames.test(formData.lastName)){
        lastNameErrorSetter("Last Name Can Only Contain Letters");
        lastNameErrorInputBorder!.style.border = "3px solid red";
        return false;
    }else if(formData.lastName.length > 20){
      lastNameErrorSetter("Please Enter 20 Characters or Less");
      lastNameErrorInputBorder!.style.border = "3px solid red";
      return false;
    }else{
        return true;
    }
  }

  const createAccountFormClientSideValidationPhoneNumber = () => {

    let phoneNumberErrorInputBorder = document.getElementById("phoneNumberInput");
    let validPhoneNumber = /^[0-9]+$/;

    phoneNumberErrorSetter("");

    if(formData.phone == "")
    {
        phoneNumberErrorSetter("Please Enter Your Phone Number");
        phoneNumberErrorInputBorder!.style.border = "3px solid red";
        return false;
    }else if(!validPhoneNumber.test(formData.phone)){
      phoneNumberErrorSetter("Your Phone Number Must Only Contain Numbers");
      phoneNumberErrorInputBorder!.style.border = "3px solid red";
      return false;
    }else if(formData.phone.length != 10){
      phoneNumberErrorSetter("Your Phone Number Must Be 10 Characters");
      phoneNumberErrorInputBorder!.style.border = "3px solid red";
      return false;
    }else{
        return true;
    }
  }

  const createAccountFormClientSideValidationEmail = () => {
        
    let emailErrorInputBorder = document.getElementById("createAcountEmailInput");
    let validEmail = /^[a-zA-Z0-9-_]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    
    emailErrorSetter("");

    if(formData.email == "")
    {
        emailErrorSetter("Please Enter Your Email");
        emailErrorInputBorder!.style.border = "3px solid red";
        return false;
    }
    else if(!formData.email.includes("@"))
    {
        emailErrorSetter("Your Email Must Contain an '@' Symbol");
        emailErrorInputBorder!.style.border = "3px solid red";

        return false;
    }
    else if(!validEmail.test(formData.email))
    {
        emailErrorSetter("Please Enter A Valid Email");
        emailErrorInputBorder!.style.border = "3px solid red";
        return false;
    }else{
      return true;
    }  
  }

  const checkForExistingUser = async () => {

    let emailErrorInputBorder = document.getElementById("createAcountEmailInput");

    emailErrorSetter("");
    let email = formData.email;
    const connection = 'http://localhost:3001/api/users/';
    const authenticationURL = connection + (email);

    try{
     const user = await axios.get(authenticationURL, {
         headers: {
           'Content-Type': 'application/json',
         },
       });

      if(user.data != null){
         //User Was Found In The Database
         emailErrorSetter("Your Email Is Already Associated With An Account, Please Enter a New Email");
         emailErrorInputBorder!.style.border = "3px solid red";
         return false;
     }else{
      return true;
     }

    }catch(error){
     const err = error;
     console.error("Error response:", err.response?.data || err.message);
    }
  }

  const createAccountFormClientSideValidationPassword = () => {

    let passwordErrorInputBorder = document.getElementById("createAccountPasswordInput");
    let specialCharacters = /[!#$%^&*]/;
    let capitalLetter = /[A-Z]/;

    passwordErrorSetter("");

    if(formData.password == "") {
      passwordErrorSetter("Please Enter Your Password");
      passwordErrorInputBorder!.style.border = "3px solid red";
      return false;
    }
    else if(formData.password.length < 8){
        passwordErrorSetter("Your Password Must Be At Least 8 Characters");
        passwordErrorInputBorder!.style.border = "3px solid red";
        return false;
    }else if(formData.password.length > 20){
        passwordErrorSetter("Your Password Must Be Less Than 20 Characters");
        passwordErrorInputBorder!.style.border = "3px solid red";
        return false;
    }
    else if(!specialCharacters.test(formData.password))
    {
        passwordErrorSetter("Your Password Must Contain At Least 1 Special Character");
        passwordErrorInputBorder!.style.border = "3px solid red";
        return false;
    }
    else if(!capitalLetter.test(formData.password))
    {
        passwordErrorSetter("Your Password Must Contain At Least 1 Capital Letter");
        passwordErrorInputBorder!.style.border = "3px solid red";
        return false;
    }else{
        return true;
    }
  }

  const createAccountFormClientSideValidationConfirmPassword = () => {

    let confirmPasswordErrorInputBorder = document.getElementById("confirmPasswordInput");

    confirmPasswordErrorSetter("");

    if(confirmPasswordValue == "")
    {
       confirmPasswordErrorSetter("Please Confirm Your Password");
       confirmPasswordErrorInputBorder!.style.border = "3px solid red";
        return false;
    }else if (confirmPasswordValue != formData.password){
      confirmPasswordErrorSetter("Your Passwords Don't Match");
      confirmPasswordErrorInputBorder!.style.border = "3px solid red";
      return false;
    }else{
        return true;
    }
  }

  let usersName = formData.firstName;

  // Handle change in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //Handle form submission using Axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    createAccountFormClientSideValidationFirstName();
    createAccountFormClientSideValidationLastName();
    createAccountFormClientSideValidationPhoneNumber();
    createAccountFormClientSideValidationEmail();
    createAccountFormClientSideValidationPassword();
    createAccountFormClientSideValidationConfirmPassword();

    if(createAccountFormClientSideValidationEmail()){
      checkForExistingUser();
    }

    if(createAccountFormClientSideValidationEmail() && createAccountFormClientSideValidationPassword()
    && createAccountFormClientSideValidationConfirmPassword() && createAccountFormClientSideValidationPhoneNumber()
    && createAccountFormClientSideValidationFirstName() && createAccountFormClientSideValidationLastName()
    && await checkForExistingUser())
    {
      console.log("Submitting form with data:", formData); // Debugging log
  
      try {
        const response = await axios.post('http://localhost:3001/api/users', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("Response from server:", response.data); // Debugging log
        alert('Account created successfully!');
        } catch (error) {
        const err = error as any;
        console.error("Error response:", err.response?.data || err.message); // Debugging log
        alert(`Error: ${err.response?.data?.message || err.message}`);
      }
    }

  };
  return (
    <div>
      <Navbar />
      <main>
        <div className="Container" onClick={() => { clicksOut(); }}>
          <form className="createAccountForm" onSubmit={handleSubmit}>
            <label className="firstNameLabel">First Name</label>
            <label className="firstNameAsterisk"> *</label>
            <label className="lastNameLabel">Last Name</label>
            <label className="lastNameAsterisk"> *</label>

            <div className="nameContainer">
              <input
                className="firstNameInput"
                id='firstNameInput'
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange} 
                onInput={firstNameErrorMessageClear} 
                style={{border: firstNameBorder ? '3px solid #2B96B7' : '2px solid #B4B4B4'}} 
                onFocus={setFirstNameBorderIsFocused} 
                onBlur={setFirstNameBorderNotFocused}
                
              />
              <input
                className="lastNameInput"
                id='lastNameInput'
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange} 
                onInput={lastNameErrorMessageClear} 
                style={{border: lastNameBorder ? '3px solid #2B96B7' : '2px solid #B4B4B4'}} 
                onFocus={setLastNameBorderIsFocused} 
                onBlur={setLastNameBorderNotFocused}
               
              />
            </div>

            <p className="firstNameError">{firstNameError}</p>
            <p className="lastNameError">{lastNameError}</p>

            <br />

            <label className="phoneNumberLabel">Phone Number</label>
            <label className="phoneNumberAsterisk"> *</label>

            <div className="phoneNumberInputContainer">
              <input
                className="phoneNumberInput"
                id='phoneNumberInput'
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange} 
                onInput={phoneNumberErrorMessageClear} 
                style={{border: phoneNumberBorder ? '3px solid #2B96B7' : '2px solid #B4B4B4'}} 
                onFocus={setPhoneNumberBorderIsFocused} 
                onBlur={setPhoneNumberBorderNotFocused}
                
              />
            </div>

            <p className="phoneNumberError">{phoneNumberError}</p>

            <br />

            <label className="createAccountEmailLabel">Email</label>
            <label className="createAccountEmailAsterisk"> *</label>

            <div className="emailInputContainer">
              <input
                className="createAcountEmailInput"
                id='createAcountEmailInput'
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange} 
                onInput={emailErrorMessageClear} 
                style={{border: emailBorder ? '3px solid #2B96B7' : '2px solid #B4B4B4'}} 
                onFocus={setEmailBorderIsFocused} 
                onBlur={setEmailBorderNotFocused}
              />
            </div>

            <p className="emailError">{emailError}</p>

            <br />

            <label className="createAccountPasswordLabel">Password</label>
            <label className="createAccountPasswordAsterisk"> *</label>

            <div className="passwordContainer">
              <input
                className="createAccountPasswordInput"
                id='createAccountPasswordInput'
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange} 
                onInput={passwordErrorMessageClear} 
                style={{border: passwordBorder ? '3px solid #2B96B7' : '2px solid #B4B4B4'}} 
                onFocus={setPasswordBorderIsFocused} 
                onBlur={setPasswordBorderNotFocused}
                
              />
            </div>

            <p className="passwordError">{passwordError}</p>

            <br />

            <label className="confirmPasswordLabel">Confirm Password </label> <label className="confirmPasswordAsterisk"> *</label>


            <div className="confirmPasswordContainer">
                <input 
                className="confirmPasswordInput" 
                id='confirmPasswordInput'
                type="password"
                name="confirmPassword"
                value={confirmPasswordValue}
                onChange={(e) => setConfirmPasswordValue(e.target.value)} 
                onInput={confirmPasswordErrorMessageClear} 
                style={{border: confirmPasswordBorder ? '3px solid #2B96B7' : '2px solid #B4B4B4'}} 
                onFocus={setConfirmPasswordBorderIsFocused} 
                onBlur={setConfirmPasswordBorderNotFocused}
                />
            </div>

            <p className="confirmPasswordError">{confirmPasswordError}</p>



            <br />

            <div className="CreateAccountButtonContainer">
              <button className="CreateAccountButton" type="submit">Create Account</button>
            </div>

            <br />
          </form>
        </div>
      </main>
    </div>
  );
}