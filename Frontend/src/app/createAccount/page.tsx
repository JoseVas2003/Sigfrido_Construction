'use client'
import '../Assets/css/createAccount.modules.css';
import Navbar from '../navbar/navBar';
import {clicksOut} from '../navbar/navBar'

export default function page(){
    return (
        <div>
            <Navbar/>
            <main>
                <div className="Container" onClick= {() => {clicksOut()}}>
                    <form className="createAccountForm">

                        <label className="firstNameLabel">First Name </label> <label className="firstNameAsterisk"> *</label> <label className="lastNameLabel">Last Name </label> <label className="lastNameAsterisk"> *</label>

                        <div className="nameContainer">
                            <input className="firstNameInput" type="text"/>
                            <input className="lastNameInput" type="text"/>
                        </div>
                        
                        <br></br>

                        <label className="phoneNumberLabel">Phone Number </label> <label className="phoneNumberAsterisk"> *</label>

                        <div className="phoneNumberInputContainer">
                            <input className="phoneNumberInput" type="tel"/>
                        </div>

                        <br></br>
        
                        <label className="createAccountEmailLabel">Email </label> <label className="createAccountEmailAsterisk"> *</label>

                        <div className="emailInputContainer">
                            <input className="createAcountEmailInput" type="email"/>
                        </div>

                        <br></br>

                        <label className="createAccountPasswordLabel">Password </label> <label className="createAccountPasswordAsterisk"> *</label>

                        <div className="passwordContainer">
                            <input className="createAccountPasswordInput" type="password"/>
                        </div>

                        <br></br>

                        <label className="confirmPasswordLabel">Confirm Password </label> <label className="confirmPasswordAsterisk"> *</label>

                        <div className="confirmPasswordContainer">
                            <input className="confirmPasswordInput" type="password"/>
                        </div>
            
                        <br></br>

                        <div className="CreateAccountButtonContainer"> 
                            <button className="CreateAccountButton">Create Account</button>
                        </div>

                        <br></br>
                    </form>
                </div>
            </main>
        </div> 
                
    );
}