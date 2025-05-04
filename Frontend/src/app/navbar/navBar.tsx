'use client'
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../Assets/css/HeaderBar.modules.css';
import Logo from '../Assets/headerBarImages/SeniorLogo.png';
import Close from '../Assets/headerBarImages/menuClose.png';
import Menue from '../Assets/headerBarImages/menuOpen.png';


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
                    <Link href="../">
                        <Image src={Logo} className='companyLogo' alt='' width={0} height={0} ></Image>
                    </Link>
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
                        <button type="button" className="menuePageButtons" id='homeButton'>Home</button>
                    </Link>

                    <Link href="../portfolio">
                        <button type="button" className="menuePageButtons" id='portfolioButton'>Portfolio</button>
                    </Link>

                    <Link href="../meetTheOwner">
                        <button type="button" className="menuePageButtons" id='meetTheOwnerButton'>Meet The Owner</button>
                    </Link>

                    <Link href="../reviews">
                        <button type="button" className="menuePageButtons" id='reviewsButton'>Reviews</button>
                    </Link>

                    {(session?.user as any)?.admin ? (
                        <Link href="../adminDashboard">
                            <button type="button" id='dashboardButton'className="menuePageButtons">Dashboard</button>
                        </Link>
                    ) : (!(session?.user as any)?.admin) ? (
                        <Link href="../clientDashboard">
                            <button type="button" className="menuePageButtons" id='dashboardButton'>Dashboard</button>
                        </Link>
                    ) : (
                        <Link href="../clientDashboard">
                            <button type="button" className="menuePageButtons" id='dashboardButton'>Dashboard</button>
                        </Link>  
                    )}

                    {session? (
                        <Link href="../">
                            <button onClick={() => {signOut()}} type="button" className="menuePageButtons" id='logoutButton'>Logout</button>
                        </Link>
                    ) :(
                        <Link href="../login">
                        <button type="button" className="menuePageButtons" id='loginButton'>Login</button>
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