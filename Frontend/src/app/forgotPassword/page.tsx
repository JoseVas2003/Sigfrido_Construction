'use client'
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import '../Assets/css/forgotPassword.modules.css';
import '../Assets/css/resetRequestPopup.css';
import Navbar, { clicksOut } from '../navbar/navBar';
const crypto = require('crypto');

/* popup functions */
const openPopup = () =>{
    let popup = document.getElementById('popup')!;
    let forgotPasswordForm = document.getElementById("forgotPasswordForm");
    forgotPasswordForm!.style.pointerEvents = "none";
    popup.style.display="flex";
}


export default function page(){

    const [formData, setFormData] = useState({
        email: '',
        token: '',
      });

      const [tokenData, setTokenData] = useState({
        token: ''
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setTokenData({ ...tokenData, [name]: value });
    };

    const [emailError, emailErrorSetter] = useState('');
    const [emailBorder, emailBorderSetter] = useState(false);

    const setEmailBorderNotFocused = () => {
        emailBorderSetter(false);
      }
    
      const setEmailBorderIsFocused = () => {
        emailBorderSetter(true);
      }
    
      const emailErrorMessageClear = () => {
        emailErrorSetter("");
      }

      const createAccountFormClientSideValidationEmail = () => {
        
        let emailErrorInputBorder = document.getElementById("forgotPasswordEmailInput");
        let validEmail = /^[a-zA-Z0-9-_.]+@[a-zA-Z]+\.[a-zA-Z]+$/;
        
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
    
        let emailErrorInputBorder = document.getElementById("forgotPasswordEmailInput");
    
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
    
          if(user.data == null){
             //No User Was Found In The Database
             emailErrorSetter("This Email Is Not Associated With An Account");
             emailErrorInputBorder!.style.border = "3px solid red";
             return false;
         }else{
          return true;
         }
    
        }catch(error){
         const err = error as any;
         console.error("Error response:", err.response?.data || err.message);
        }
      }
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        createAccountFormClientSideValidationEmail();

        if(createAccountFormClientSideValidationEmail() && await checkForExistingUser()){
            var sendButton = document.getElementById("openPopup") as HTMLButtonElement;
            sendButton!.disabled = true;
            let email = formData.email;
            const connection = 'http://localhost:3001/api/users/';
            const resetPassordURL = connection + (email);
    
            let userToken = crypto.randomBytes(16).toString('hex');
    
            tokenData.token = userToken;
            formData.token = userToken;
    
            try{
    
                await axios.put(resetPassordURL, tokenData, {
                    headers: { "Content-Type": "application/json" },
                });
    
    
                await axios.post("http://localhost:3001/api/forgotPasswordEmail/sendLink", formData, {
                    headers: { "Content-Type": "application/json" },
                });

                openPopup();

            }catch(error){
                sendButton!.disabled = false;
                const err = error as any;
                console.error("Error Sending Password Reset Email:", error);
                alert(`Error: ${err.response?.data?.message || err.message}`);
            }
        }
        
    };

    return (
        <div>
            <Navbar/>
            <main id="BODY">
                <div className="Container" onClick= {() => {clicksOut()}}>
                    <form className="forgotPasswordForm" id='forgotPasswordForm' onSubmit={handleSubmit} style={{pointerEvents: 'auto'}}>

                        <p className='forgotPasswordInstructions'>Please Enter The Email Associated With Your Account To Reset Your Password</p>

                        <br></br>
            
                        <label className="forgotPasswordEmailLabel">Email </label> <label className="forgotPasswordEmailAsterisk"> *</label>
                        <div className="forgotPasswordEmailInputContainer">
                             <input 
                             className="forgotPasswordEmailInput" 
                             name="email" 
                             id="forgotPasswordEmailInput" 
                             type="text" 
                             value={formData.email} 
                             onChange={handleChange}
                             onInput={emailErrorMessageClear} 
                             style={{border: emailBorder ? '3px solid #2B96B7' : '2px solid #B4B4B4'}} 
                             onFocus={setEmailBorderIsFocused} 
                             onBlur={setEmailBorderNotFocused}/>
                        </div>

                        <p className="emailError" id='emailError'>{emailError}</p>
    
                        <br></br>
    
                        <div className="sendButtonContainer"> 
                            <button className="sendButton" id="openPopup" type="submit">SEND</button>
                        </div>
                    </form>
                </div>
                <div className="popup" id="popup">
                    <div className="popup-content">
                    <h2>Reset Confirmation Sent</h2>
                    <p><i>Please Check Your Email</i></p>
                    <Link href="../login">
                        <button id="closePopup" className="closeReqPopup">CLOSE</button>
                    </Link>
                    
                    </div>
                </div>
            </main>
        </div> 
                    
    );
};