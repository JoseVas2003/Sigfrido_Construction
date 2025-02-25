import Image from "next/image";
import Link from "next/link";
import Logo from "../../app/Assets/headerBarImages/SeniorLogo.png";
import "../Assets/css/Footer.css";

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-container">
          <ul className="footer-links">
            <Link href="../services">
              <button type="button">About</button>
            </Link>
            <Link href="../contactPage">
              <button type="button">Contact</button>
            </Link>
            <Link href="../reviews">
              <button type="button">Review</button>
            </Link>
            <Link href="../portfolio">
              <button type="button">Portfolio</button>
            </Link>
            <Link href="../faq">
              <button type="button">FAQ</button>
            </Link>
          </ul>
          <Image
            src={Logo}
            alt="Company Logo"
            className="footer-logo"
            width={70}
            height={70}
          />
          <p>&copy; 2025 Sigfrido Vasquez Construction. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
