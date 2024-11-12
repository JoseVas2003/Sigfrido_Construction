'use client'
import '../Assets/css/forgotPassword.modules.css';
import Navbar from '../navbar/navBar';
import Link from 'next/link';
import {clicksOut} from '../navbar/navBar'


export default function page(){

    return (
        <div>
            <Navbar/>
            <main id="BODY">
                <div className="Container" onClick= {() => {clicksOut()}}>
                    <form className="forgotPasswordForm">

                        <p className='forgotPasswordInstructions'>Please Enter The Email Associated With Your Account To Reset Your Password</p>

                        <br></br>
            
                        <label className="forgotPasswordEmailLabel">Email </label> <label className="forgotPasswordEmailAsterisk"> *</label>
                        <div className="forgotPasswordEmailInputContainer">
                             <input className="forgotPasswordEmailInput" type="email"/>
                        </div>
    
                        <br></br>
    
                        <div className="sendButtonContainer"> 
                            <button className="sendButton">SEND</button>
                        </div>
                    </form>
                </div>
            </main>
        </div> 
                    
    );
};