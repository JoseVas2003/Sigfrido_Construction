"use client";

import Image from "next/image";
import Link from "next/link";
import "../app/Assets/css/HomePage.css";
import service1 from "../app/Assets/homepageImages/blueprint.png";
import house from "../app/Assets/homepageImages/Custom-home.png";
import service2 from "../app/Assets/homepageImages/diary.png";
import service5 from "../app/Assets/homepageImages/excavator.png";
import service6 from "../app/Assets/homepageImages/house-frame.png";
import service3 from "../app/Assets/homepageImages/school-material.png";
import service4 from "../app/Assets/homepageImages/workers.png";
import Footer from "../app/footer/footer";
import Navbar from "../app/navbar/navBar";

export default function Home() {

  return (
    <div className="page-container">
      {/* Section for Header */}
      <Navbar />

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

      {/* Footer Section */}
      <Footer></Footer>
     
    </div>
  );
}
