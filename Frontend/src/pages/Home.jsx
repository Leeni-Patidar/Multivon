import Navbar from "../components/Navbar"
import HeroSection from "../components/HeroSection"
import WhyChooseUs from "../components/WhyChooseUs"
import About from "../components/About"
import Projects from "../components/Projects"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection/>
      <WhyChooseUs />
      <About />
      <Projects />
      <Testimonials />
      <Footer />
    </>
  )
}

export default Home
