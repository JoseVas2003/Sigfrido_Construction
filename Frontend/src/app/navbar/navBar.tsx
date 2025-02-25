'use client'
import '../Assets/css/HeaderBar.modules.css';
import Image from 'next/image';
import Logo from '../Assets/headerBarImages/SeniorLogo.png';
import Menue from '../Assets/headerBarImages/menuOpen.png';
import Close from '../Assets/headerBarImages/menuClose.png';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {signOut} from 'next-auth/react';
import {useSession} from 'next-auth/react';
import axios from 'axios';


const Navbar = () =>{

    const [displayedImage, imageSetter] = useState(true);
    const {data: session, status} = useSession();

    useEffect(() => {
        const imageToggle = () => {
            imageSetter(switchImage => ! switchImage)
        }

        window.addEventListener('menuImageToggle', imageToggle);

        return () => {
            window.removeEventListener('menuImageToggle', imageToggle);
        };
    }, []);

    return(
        <div>
            <nav className="headerBar">
                <div>
                    <Image src={Logo} className='companyLogo' alt='' width={0} height={0}></Image>
                </div>

                 <div className="companyName">
                    <h1> Sigfrido Vasquez Construction</h1>
                </div>

                <div className="menuButtonLocation">
                    <button type="button" onClick={() => {menuClicked()}}><Image id="MenueB" className="menuButton" src={displayedImage ? Menue : Close} alt='' width={0} height={0}/></button>
                </div>
            </nav>
             
            <div className="navMenuBar" id="navMenuBar" style={{visibility: 'hidden'}}>

                <div className="navMenuBarItems">
                    <Link href="../">
                        <button type="button" className="menuePageButtons">Home</button>
                    </Link>

                    <Link href="../portfolio">
                        <button type="button" className="menuePageButtons">Portfolio</button>
                    </Link>

                    <Link href="../meetTheOwner">
                        <button type="button" className="menuePageButtons">Meet The Owner</button>
                    </Link>

                    <Link href="../reviews">
                        <button type="button" className="menuePageButtons">Reviews</button>
                    </Link>

                    {session?.user?.admin? (
                        <Link href="../adminDashboard">
                            <button type="button" className="menuePageButtons">Dashboard</button>
                        </Link>
                    ) : (
                        <Link href="../clientDashboard">
                            <button type="button" className="menuePageButtons">Dashboard</button>
                        </Link>
                    )}

                    {session? (
                        <Link href="../">
                            <button onClick={() => {signOut()}} type="button" className="menuePageButtons">Logout</button>
                        </Link>
                    ) :(
                        <Link href="../login">
                        <button type="button" className="menuePageButtons">Login</button>
                    </Link>
                    )}


                </div>
            </div>
        </div>
    );
};

const menuClicked = () =>{

    let navMenuBar = document.getElementById("navMenuBar");
  
    if (navMenuBar?.style.visibility == "hidden") {
      navMenuBar.style.visibility = "visible";

      const menuButtonClicked = new Event('menuImageToggle');
      window.dispatchEvent(menuButtonClicked);

    } else if (navMenuBar?.style.visibility == "visible"){
      navMenuBar.style.visibility  = "hidden";

      const menuButtonClicked = new Event('menuImageToggle');
      window.dispatchEvent(menuButtonClicked);
    }
};

export function clicksOut()
{
  let navMenuBar = document.getElementById("navMenuBar"); 

  if (navMenuBar?.style.visibility == "visible") {
    navMenuBar.style.visibility = "hidden";

    const outsideClicked = new Event('menuImageToggle');
    window.dispatchEvent(outsideClicked);
  } 
};

export default Navbar;