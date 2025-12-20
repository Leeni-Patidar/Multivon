import { useEffect, useState } from "react"
import ConsultationForm from "./ConsultationForm"

import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.webp";
import image3 from "../assets/image3.jpg";

const images = [image1, image2, image3];


const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="relative w-full h-[100vh] overflow-hidden">
      
      {/* Slideshow Image */}
      <img
        src={images[currentIndex]}
        alt="Slideshow"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex items-center justify-end">
        
        {/* Consultation Form (Right Side) */}
        <div className="w-full max-w-md">
          <ConsultationForm />
        </div>

      </div>
    </section>
  )
}

export default HeroSection
