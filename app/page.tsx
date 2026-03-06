import Image from "next/image";
import Hero from "./components/hero";
import About from "./components/About";
import Project from "./components/Project";
import Skill from "./components/Skill";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      <Project/>
      {/* <Skill/> */}
      <Contact/>
      <Footer/>
   </div>
    
      
  );
}
