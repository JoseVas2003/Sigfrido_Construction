'use client'
import '../Assets/css/login.modules.css';
import '../Assets/css/resetSuccessPopup.css';
import Navbar from '../navbar/navBar';
import Link from 'next/link';
import {clicksOut} from '../navbar/navBar'

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

    return (
        <div>
            <Navbar/>
            <main id="BODY">
                <div className="Container" onClick= {() => {clicksOut()}}>
                    <form className="loginForm">
            
                        <label className="emailLabel">Email </label> <label className="emailAsterisk"> *</label>
                        <div className="emailInputContainer">
                             <input className="emailInput" type="email"/>
                        </div>
    
                        <br></br>
    
                        <label className="passwordLabel">Password </label> <label className="passwordAsterisk"> *</label>
                        <div className="loginPassword">
                            <input className="passwordInput" type="password"/>
                        </div>
            
                        <div className="forgotPasswordButtonContainer">
                            <Link href="../forgotPassword"><button className="forgotPasswordButton" >Forgot Password</button></Link>
                        </div>

                        <br></br>

                        <div className="loginButtonContainer"> <button className="loginButton">LOGIN</button>
                        </div>

                        <br></br>

                        <div className="createAccountButtonContainer">
                            <Link href="../createAccount"> <button className="createAccountButton">Create Account</button></Link>
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