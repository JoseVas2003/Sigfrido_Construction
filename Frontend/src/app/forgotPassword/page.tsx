'use client'
import '../Assets/css/forgotPassword.modules.css';
import '../Assets/css/resetRequestPopup.css';
import Navbar from '../navbar/navBar';
import Link from 'next/link';
import { useState } from 'react';
import {clicksOut} from '../navbar/navBar'
import axios from 'axios';

/* popup functions */
const openPopup = () =>{
    let popup = document.getElementById('popup')!;

    popup.style.display="flex";
}



export default function page(){

    const [formData, setFormData] = useState({
        email: ''
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await axios.post("http://localhost:3001/api/forgotPasswordEmail/sendLink", formData, {
                headers: { "Content-Type": "application/json" },
            });
        }catch(error){
            console.error("Error Sending Password Reset Email:", error);
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div>
            <Navbar/>
            <main id="BODY">
                <div className="Container" onClick= {() => {clicksOut()}}>
                    <form className="forgotPasswordForm" onSubmit={handleSubmit}>

                        <p className='forgotPasswordInstructions'>Please Enter The Email Associated With Your Account To Reset Your Password</p>

                        <br></br>
            
                        <label className="forgotPasswordEmailLabel">Email </label> <label className="forgotPasswordEmailAsterisk"> *</label>
                        <div className="forgotPasswordEmailInputContainer">
                             <input className="forgotPasswordEmailInput" name="email" id="forgotPasswordEmailInput" type="text" value={formData.email} onChange={handleChange}/>
                        </div>
    
                        <br></br>
    
                        <div className="sendButtonContainer"> 
                            <button className="sendButton" id="openPopup" type="button" onClick={() => {openPopup()}}>SEND</button>
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