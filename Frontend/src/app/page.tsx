"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "../app/Assets/css/HomePage.css";
import Logo from "../app/Assets/headerBarImages/SeniorLogo.png";
import service1 from "../app/Assets/homepageImages/blueprint.png";
import house from "../app/Assets/homepageImages/Custom-home.png";
import service2 from "../app/Assets/homepageImages/diary.png";
import service5 from "../app/Assets/homepageImages/excavator.png";
import service6 from "../app/Assets/homepageImages/house-frame.png";
import service3 from "../app/Assets/homepageImages/school-material.png";
import service4 from "../app/Assets/homepageImages/workers.png";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="page-container">
      {/* Section for Header */}
      <header className="header">
        <nav className="nav-bar">
          <div className="logo-container">
            <Image src={Logo} alt="Company Logo" width={100} height={100} />
          </div>
          <div className="nav-links">
            <Link href="#services">
              <button className="nav-link">Services</button>
            </Link>
            <Link href="../portfolio" className="nav-link">
              <button className="nav-link">Portfolio</button>
            </Link>
            <Link href="../reviews" className="nav-link">
              <button className="nav-link">Review</button>
            </Link>
            <Link href="../meetTheOwner" className="nav-link">
              <button className="nav-link">About Us</button>
            </Link>
          </div>
          <Link href="../login" className="sign-in-link">
            <button className="nav-link">Sign in →</button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Sigfrido Vasquez</h1>
          <h1 className="hero-title">Construction</h1>
          <p className="hero-description">
            At Sigfrido Vasquez Construction, we bring your vision to life with
            precision and passion. Our team specializes in transforming spaces
            through expert craftsmanship, attention to detail, and a dedication
            to delivering exceptional results. Whether you're building your
            dream home, renovating an existing space, or expanding your
            business, we're here to make the process seamless and rewarding.
            Let's build something amazing together.
          </p>
          <Link href="../login">
          <button className="cta-button">Get Started</button>
          </Link>
        </div>
        <div className="hero-image-container">
        <div className="background-box"></div>
          <Image src={house} alt="Landing Page" className="hero-image" width={650} height={500} />
        </div>
      </section>

      <hr className="section-separator" />

      {/* Services Section */}
      <section id="services" className="services-section">
        <h2 className="section-title">Our Services</h2>
        <div className="services-content">
          <div className="service-card">
            <Image src={service1} alt="service1" width={80} height={80} />
            <h1 className="service-title">Pre-Construction Services</h1>
            <p className="service-description">
              Project planning and budgeting, feasibility studies, design
              consultation, etc.
            </p>
          </div>
          <div className="service-card">
            <Image src={service2} alt="service2" width={80} height={80} />
            <h1 className="service-title">Project Planning</h1>
            <p className="service-description">
              Focus on budgeting, site selection, and planning.
            </p>
          </div>
          <div className="service-card">
            <Image src={service3} alt="service3" width={80} height={80} />
            <h1 className="service-title">Design Consultation</h1>
            <p className="service-description">
              Design planning and zoning support.
            </p>
          </div>
          <div className="service-card">
            <Image src={service4} alt="service4" width={80} height={80} />
            <h1 className="service-title">General Contracting</h1>
            <p className="service-description">
              Comprehensive project management and construction services.
            </p>
          </div>
          <div className="service-card">
            <Image src={service5} alt="service5" width={80} height={80} />
            <h1 className="service-title">Site Preparation</h1>
            <p className="service-description">
              Site preparation, excavation, and foundational work.
            </p>
          </div>
          <div className="service-card">
            <Image src={service6} alt="service6" width={80} height={80} />
            <h1 className="service-title">Structural and Finishing</h1>
            <p className="service-description">
              Includes framing, roofing, masonry, and paving.
            </p>
          </div>
        </div>
      </section>

      <hr className="section-separator" />

      {/* Section for Footer */}
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
          <p>&copy; 2024 Sigfrido Vasquez Construction. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
