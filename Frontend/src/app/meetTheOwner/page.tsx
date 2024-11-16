'use client'
import './meetTheOwner.css';
import Image from "next/image";
import ownerPic from './VasquezOwner.jpg';

import Navbar from "../navbar/navBar";
import {clicksOut} from '../navbar/navBar'

export default function page(){
    return <html>
    
    <body> 
    <Navbar />
    <div onClick= {() => {clicksOut()}}> 
        <div className="text-[#333] text-[48px] mt-[10px] text-center font-[inter] font-semibold">Meet The Owner</div>
        <div className="wrapper">
            <div className="max-w-[400px] min-w-[400px] max-h-[550px] text-[24px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] ">
            
              <Image src={ownerPic} 
              alt="owner picture"
              width={400}
              height={400}/> 
              <div className="text-[24px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] text-center font-[inter]">Sigfrido Vasquez</div>
              <div className="text-[18px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter]">Email: Sigfridovasquez123@gmail.com</div>
              <div className="text-[18px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter]">Phone: (831) 800-4627</div>   
            
            </div>
            <div className="text-[24px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter] min-w-[400px] max-w-[900px]">
              <p className='mx-[15px] indent-4'>I am Sigfrido Vasquez. I hail from Oaxaca Mexico, but have spent the last 15 years in the U.S.A. At the age of thirteen, after the death of my dad, I started working different jobs including mechanic, bus driver, fieldhand and window cleaner, Seemingly very natural progression, my entry into construction industry came when my family member decided to train me in the construction trade. Since then, I have been passionate about the craft.</p>
              <p className='mx-[15px] indent-4'>Work trips allow me to be in Salinas most of the time, however, Monterey and Greenfield are also within reach on some projects. After being in the industry for over 20 years, I am now an expert in home remodeling and participate in all phases of erection of a building – from concrete forms, to trusses and everything in between. And when it comes to specialized tasks like electrical or plumbing, I trust a few reliable professionals so as to never compromise quality on any job.</p>
              <p className='mx-[15px] indent-4'>All challenges are the same for me, I don’t believe there is a single one that I cannot solve for any of the tasks assigned.</p>
            </div>
          </div>
          <div className="text-[48px] text-center pt-[48px] font-[inter] text-[#333]">The Dev Team</div>
          <div className='text-[24px] font-[inter] text-[#333] mx-[3em] my-[1em]'>
            <div>This website was originally developed by a team of students from California State Unversity, Sacramento, named <i>Coding Hornets</i>. Here are their names and LinkedIns:</div>
          </div>
          <div className="wrapper">
            <div className="text-[24px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter] min-w-[250px] max-w-[250px]">
            
            <div className="text-[18px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter]">
              <div className='text-center text-[24px]'>Jose Vasquez</div>
              <a href='http://linkedin.com/in/josevasquez1280'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>

            </div>
            <div className="text-[24px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter] min-w-[250px] max-w-[250px]">

            <div className="text-[18px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter]">
            <div className='text-center text-[24px]'>Tanner Stuhr</div>
            <a href='https://www.linkedin.com/in/tannerstuhr/'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>

            </div>
            <div className="text-[24px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter] min-w-[250px] max-w-[250px]">


            <div className="text-[18px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter]">
            <div className='text-center text-[24px]'>Galileo Perez</div>
            <a href='https://www.linkedin.com/in/galileoperez'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>
              
              
            </div>
          </div>
          <div className="wrapper">
            <div className="text-[24px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter] min-w-[250px] max-w-[250px]">


            <div className="text-[18px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter]">
            <div className='text-center text-[24px]'>Thanh Nguyen</div>
            <a href='https://www.linkedin.com/in/thanh-nguyen3n'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>
            
            </div>
            <div className="text-[24px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter] min-w-[250px] max-w-[250px]">


            <div className="text-[18px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter]">
            <div className='text-center text-[24px]'>Nathan Kovak</div>
            <a href='https://www.linkedin.com/in/nathan-kovak-b79552338/'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>

            </div>
            <div className="text-[24px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter] min-w-[250px] max-w-[250px]">


            <div className="text-[18px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter]">
            <div className='text-center text-[24px]'>Jomel Sotelo</div>
            <a href='https://www.linkedin.com/in/jomelsotelo/'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>

            </div>
          </div>
          <div className="wrapper">
            <div className="text-[24px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter] min-w-[250px] max-w-[250px]">


            <div className="text-[18px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter]">
            <div className='text-center text-[24px]'>Mitchell Kouiyoth</div>
            <a href='https://www.linkedin.com/in/mitchell-kouiyoth'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>
            
            </div>
            <div className="text-[24px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter] min-w-[250px] max-w-[250px]">


            <div className="text-[18px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter]">
            <div className='text-center text-[24px]'>Jose Avalos</div>
            <a href='https://www.linkedIn.com/in/java925'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>

            </div>
            <div className="text-[24px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter] min-w-[250px] max-w-[250px]">


            <div className="text-[18px] text-[black] bg-[white] m-[.4em] p-[.3em] rounded-[3px] flex-[1] font-[inter]">
            <div className='text-center text-[24px]'>Jordan Dawson</div>
            <a href='https://www.linkedin.com/in/jordan-dawson-89967429b/'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>

            </div>
          </div>
          </div>
    </body>
</html>
}