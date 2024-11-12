'use client'
import '../Assets/css/resetPassword.modules.css';
import Navbar from '../navbar/navBar';
import Link from 'next/link';
import {clicksOut} from '../navbar/navBar'


export default function page(){

    return (
        <div>
            <Navbar/>
            <main id="BODY">
                <div className="Container" onClick= {() => {clicksOut()}}>
                    <form className="resetPasswordForm">
            
                        <label className="newPasswordLabel">New Password </label> <label className="newPasswordAsterisk"> *</label>
                        <div className="newPasswordInputContainer">
                             <input className="newPasswordInput" type="password"/>
                        </div>
    
                        <br></br>
    
                        <label className="confirmPasswordLabel">Confirm Password </label> <label className="confirmPasswordAsterisk"> *</label>
                        <div className="confirmPasswordContainer">
                            <input className="confirmPasswordInput" type="password"/>
                        </div>

                        <br></br>

                        <div className="saveButtonContainer"> <button className="saveButton">SAVE</button>
                        </div>

                    </form>
                </div>
            </main>
        </div> 
                    
    );
};