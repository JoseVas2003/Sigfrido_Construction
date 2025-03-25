'use client'
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '../Assets/css/login.modules.css';
import '../Assets/css/resetSuccessPopup.css';
import Navbar, { clicksOut } from '../navbar/navBar';

/* popup functions */
const openPopup = () =>{
    let popup = document.getElementById('popup')!;

    popup.style.display="flex";
}

const closePopup = () =>{
    let popup = document.getElementById('popup')!;

    popup.style.display="none";
}

export default function page(){

    const {data: session} = useSession();
     const changePage = useRouter();

     if(session){
         changePage.replace('/');
     }

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
      
    const [emailError, emailErrorSetter] = useState('');
    const [passwordError, passwordErrorSetter] = useState('');
    const [emailBorder, emailBorderSetter] = useState(false);
    const [passwordBorder, passwordBorderSetter] = useState(false);
    const [accountError, setAccountError] = useState('');


    const setEmailBorderNotFocused = () => {
        emailBorderSetter(false);
    }

    const setEmailBorderIsFocused = () => {
        emailBorderSetter(true);
    }

    const setPasswordBorderNotFocused = () => {
        passwordBorderSetter(false);
    }

    const setPasswordBorderIsFocused = () => {
        passwordBorderSetter(true);
    }

    const emailErrorMessageClear = () => {
        emailErrorSetter("");
        accountErrorMessageClear();
    }

    const passwordErrorMessageClear = () => {
        passwordErrorSetter("");
        accountErrorMessageClear();
    }

    const accountErrorMessageClear = () => {
        setAccountError("");
    }

    const loginFormClientSideValidationEmail = () => {
        
        let emailErrorInputBorder = document.getElementById("emailInput");
        let validEmail = /^[a-zA-z0-9-_.]+@[a-zA-z]+\.[a-zA-z]+$/;
        
        emailErrorSetter("");
        setAccountError("");

        if(formData.email == "")
        {
            emailErrorSetter("Please Enter Your Email");
            emailErrorInputBorder!.style.border = "3px solid red";
            return false;
        }
        else if(!formData.email.includes("@"))
        {
            emailErrorSetter('Your Email Must Contain "@"');
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

    const loginFormClientSideValidationPassword = () => {

        let passwordErrorInputBorder = document.getElementById("passwordInput");

        passwordErrorSetter("");
        setAccountError("");

        if(formData.password.length < 8)
        {
            passwordErrorSetter("Your Password Must Be At Least 8 Characters");
            passwordErrorInputBorder!.style.border = "3px solid red";
            return false;
        }else{
            return true;
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        loginFormClientSideValidationEmail();
        loginFormClientSideValidationPassword();

        if(loginFormClientSideValidationEmail() && loginFormClientSideValidationPassword())
        {
            console.log("Clientside Validation PASSED");
            let email = formData.email;
            let password = formData.password;
            try{
                const response = await signIn('credentials',{
                    email, password, redirect: false,
                });

                if(response?.error){
                    setAccountError("* Invalid Email or Password *");
                    return;
                }

                changePage.replace('/');
            }catch(error){
                const err = error as any;
                console.error("Error response:", err.response?.data || err.message);
            }
        }
    };
    return (
        <div>
            <Navbar/>
            <main id="BODY">
                <div className="Container" onClick= {() => {clicksOut()}}>
                    <form className="loginForm" id="loginForm" onSubmit={handleSubmit}>

                        <p className="accountError" id='accountError'>{accountError}</p>
            
                        <label className="emailLabel">Email </label> <label className="emailAsterisk"> *</label>
                        <div className="emailInputContainer">
                             <input className="emailInput" name="email" id="emailInput" value={formData.email} type="text" onChange={handleChange} onInput={emailErrorMessageClear} style={{border: emailBorder ? '3px solid #2B96B7' : '2px solid #B4B4B4'}} onFocus={setEmailBorderIsFocused} onBlur={setEmailBorderNotFocused}/>
                        </div>

                        <p className="emailError" id='emailError'>{emailError}</p>
    
                        <br></br>
    
                        <label className="passwordLabel">Password </label> <label className="passwordAsterisk"> *</label>
                        <div className="loginPassword">
                            <input className="passwordInput" name="password" id="passwordInput" value={formData.password} type="password" onChange={handleChange} onInput={passwordErrorMessageClear} style={{border: passwordBorder ? '3px solid #2B96B7' : '2px solid #B4B4B4'}} onFocus={setPasswordBorderIsFocused} onBlur={setPasswordBorderNotFocused}/>
                        </div>

                        <p className="passwordError" id='passwordError'>{passwordError}</p>

                        <br></br>
            
                        <div className="forgotPasswordButtonContainer">
                            <Link href="../forgotPassword"><button className="forgotPasswordButton" id='forgotPasswordButton' >Forgot Password</button></Link>
                        </div>

                        <br></br>

                        <div className="loginButtonContainer" > 
                            <button className="loginButton" id="LoginButton">LOGIN</button>
                        </div>

                        <br></br>

                        <div className="createAccountButtonContainer">
                            <Link href="../createAccount"> <button className="createAccountButton" id='createAccountMenuButton'>Create Account</button></Link>
                        </div>

                    </form>
                </div>
                <div className="popup" id="popup">
                    <div className="popup-content">
                    <h2>Password Reset Successfully</h2>
                    
                    
                        <button id="closePopup" className="closeReqPopup" onClick={() => {closePopup()}}>CLOSE</button>
                    
                    
                    </div>
                </div>
            </main>
        </div> 

    );
};