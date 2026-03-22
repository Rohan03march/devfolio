import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import TechStack3D from '../components/TechStack3D';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Projects limit={3} />
      <TechStack3D />
      <Experience />
      <Contact />
    </main>
  );
};

export default Home;
