'use client'
import '../Assets/css/meetTheOwner.css';
import Image from "next/image";
import ownerPic from './VasquezOwner.jpg';
import Footer from '../footer/footer';

import Navbar from "../navbar/navBar";
import {clicksOut} from '../navbar/navBar'

export default function page(){
    return <html>
    
    <body> 
    <Navbar />
    <div onClick= {() => {clicksOut()}}>
      {/*Owner Section*/} 
        <div className="page_title">Meet The Owner</div>
        <div className="wrapper">
            <div className="owner_profile">
            
              <Image src={ownerPic} 
              alt="owner picture"
              width={400}
              height={400}/> 
              <div className="owner_name">Sigfrido Vasquez</div>
              <div className="owner_email">Email: Sigfridovasquez123@gmail.com</div>
              <div className="owner_phone">Phone: (831) 800-4627</div>   
            
            </div>
            <div className="owner_bio">
              <p>I am Sigfrido Vasquez. I hail from Oaxaca Mexico, but have spent the last 15 years in the U.S.A. At the age of thirteen, after the death of my dad, I started working different jobs including mechanic, bus driver, fieldhand and window cleaner, Seemingly very natural progression, my entry into construction industry came when my family member decided to train me in the construction trade. Since then, I have been passionate about the craft.</p>
              <p>Work trips allow me to be in Salinas most of the time, however, Monterey and Greenfield are also within reach on some projects. After being in the industry for over 20 years, I am now an expert in home remodeling and participate in all phases of erection of a building – from concrete forms, to trusses and everything in between. And when it comes to specialized tasks like electrical or plumbing, I trust a few reliable professionals so as to never compromise quality on any job.</p>
              <p>All challenges are the same for me, I don’t believe there is a single one that I cannot solve for any of the tasks assigned.</p>
            </div>
          </div>
          {/*Dev Section*/}
          <div className="dev_head">The Dev Team</div>
          <div className='dev_desc'>
            <div>This website was originally developed by a team of students from California State Unversity, Sacramento, named <i>Coding Hornets</i>. Here are their names and LinkedIns:</div>
          </div>
          <div className="wrapper">
            <div className="dev_container">
            
            <div className="dev_content">
              <div className='dev_name'>Jose Vasquez</div>
              <a href='http://linkedin.com/in/josevasquez1280'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>

            </div>
            <div className="dev_container">

            <div className="dev_content">
            <div className='dev_name'>Tanner Stuhr</div>
            <a href='https://www.linkedin.com/in/tannerstuhr/'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>

            </div>
            <div className="dev_container">


            <div className="dev_content">
            <div className='dev_name'>Galileo Perez</div>
            <a href='https://www.linkedin.com/in/galileoperez'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>
              
              
            </div>
          </div>
          <div className="wrapper">
            <div className="dev_container">


            <div className="dev_content">
            <div className='dev_name'>Thanh Nguyen</div>
            <a href='https://www.linkedin.com/in/thanh-nguyen3n'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>
            
            </div>
            <div className="dev_container">


            <div className="dev_content">
            <div className='dev_name'>Nathan Kovak</div>
            <a href='https://www.linkedin.com/in/nathan-kovak-b79552338/'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>

            </div>
            <div className="dev_container">


            <div className="dev_content">
            <div className='dev_name'>Jomel Sotelo</div>
            <a href='https://www.linkedin.com/in/jomelsotelo/'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>

            </div>
          </div>
          <div className="wrapper">
            <div className="dev_container">


            <div className="dev_content">
            <div className='dev_name'>Mitchell Kouiyoth</div>
            <a href='https://www.linkedin.com/in/mitchell-kouiyoth'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>
            
            </div>
            <div className="dev_container">


            <div className="dev_content">
            <div className='dev_name'>Jose Avalos</div>
            <a href='https://www.linkedIn.com/in/java925'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>

            </div>
            <div className="dev_container">


            <div className="dev_content">
            <div className='dev_name'>Jordan Dawson</div>
            <a href='https://www.linkedin.com/in/jordan-dawson-89967429b/'>
                <div className='text-center text-blue-600 visited:text-purple-600'>LinkedIn</div>
                </a>
            </div>

            </div>
          </div>
          </div>
          <Footer />
    </body>
</html>
}