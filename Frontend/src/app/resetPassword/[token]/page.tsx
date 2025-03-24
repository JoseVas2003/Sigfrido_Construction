'use client'
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '../../Assets/css/resetPassword.modules.css';
import Navbar, { clicksOut } from '../../navbar/navBar';

export default function page({params}: any){

    let usersToken = params.token;
    console.log(usersToken);
    const changePage = useRouter();

    if(usersToken == ""){
        changePage.replace('/');
    }

    const [formData, setFormData] = useState({
        password: '',
        token: '',
      });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

    };

    const [passwordError, passwordErrorSetter] = useState('');
    const [passwordBorder, passwordBorderSetter] = useState(false);


    const [confirmPasswordError, confirmPasswordErrorSetter] = useState('');
    const [confirmPasswordBorder, confirmPasswordBorderSetter] = useState(false);

    const[confirmPasswordValue, setConfirmPasswordValue] = useState('');
  
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

      const resetPasswordtFormClientSideValidationPassword = () => {

        let passwordErrorInputBorder = document.getElementById("resetPasswordInput");
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
            passwordErrorSetter("Password Requires At Least 1 Special Character");
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
    
      const resetPasswordFormClientSideValidationConfirmPassword = () => {
    
        let confirmPasswordErrorInputBorder = document.getElementById("resetPasswordConfirmInput");
    
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        resetPasswordtFormClientSideValidationPassword();
        resetPasswordFormClientSideValidationConfirmPassword();

        if(resetPasswordtFormClientSideValidationPassword() && resetPasswordFormClientSideValidationConfirmPassword() 
        && usersToken != "")
        {
            const connection = 'http://localhost:3001/api/resetPassword/';
            const resetPassordURL = connection + (usersToken);
            formData.token = "";
    
            const passwordHashSalt = await bcrypt.genSalt();
            const usersHashedPassword = await bcrypt.hash(formData.password, passwordHashSalt);
      
            formData.password = usersHashedPassword;

            try{
    
                await axios.put(resetPassordURL, formData, {
                    headers: { "Content-Type": "application/json" },
                });
                
                
                changePage.replace('/login');
                //openPopup();
    
            }catch(error){
                const err = error as any;
                console.error("Error Updating Users Password:", error);
                alert(`Error: ${err.response?.data?.message || err.message}`);
            }
        }
        

    };
    return (
        <div>
            <Navbar/>
            <main id="BODY">
                <div className="Container" onClick= {() => {clicksOut()}}>
                    <form className="resetPasswordForm" onSubmit={handleSubmit}>
            
                        <label className="newPasswordLabel">New Password </label> <label className="newPasswordAsterisk"> *</label>
                        <div className="newPasswordInputContainer">
                             <input 
                             className="newPasswordInput" 
                             name="password" 
                             type="password" 
                             id='resetPasswordInput'
                             value={formData.password} 
                             onChange={handleChange}
                             onInput={passwordErrorMessageClear} 
                             style={{border: passwordBorder ? '3px solid #2B96B7' : '2px solid #B4B4B4'}} 
                             onFocus={setPasswordBorderIsFocused} 
                             onBlur={setPasswordBorderNotFocused}/>
                        </div>

                        <p className="passwordError" id='passwordError'>{passwordError}</p>
    
                        <br></br>
    
                        <label className="confirmPasswordLabel">Confirm Password </label> <label className="confirmPasswordAsterisk"> *</label>
                        <div className="confirmPasswordContainer">
                            <input 
                            className="confirmPasswordInput" 
                            type="password"
                            id='resetPasswordConfirmInput'
                            onChange={(e) => setConfirmPasswordValue(e.target.value)} 
                            onInput={confirmPasswordErrorMessageClear} 
                            style={{border: confirmPasswordBorder ? '3px solid #2B96B7' : '2px solid #B4B4B4'}} 
                            onFocus={setConfirmPasswordBorderIsFocused} 
                            onBlur={setConfirmPasswordBorderNotFocused}/>
                        </div>

                        <p className="confirmPasswordError" id='confirmPasswordError'>{confirmPasswordError}</p>

                        <br></br>

                        <div className="saveButtonContainer"> 
                            <button className="saveButton" id='saveButton'>SAVE</button>
                        </div>

                    </form>
                </div>
            </main>
        </div> 
                    
    );
};