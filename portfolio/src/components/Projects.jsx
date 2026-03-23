import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

import iskconImg from '../assets/projectsImages/ISKCONpilgrimage.jpg';
import bookImg from '../assets/projectsImages/Bookmarathon.jpg';
import expenseSplitterImg from '../assets/projectsImages/expensesplitter.jpg';
import hypekartImg from '../assets/projectsImages/hypekart.jpg';
import huddleImg from '../assets/projectsImages/huddle.jpg';
import expenseTrackerImg from '../assets/projectsImages/expensetracker.jpg';
import ironrootImg from '../assets/projectsImages/ironnrootfitness.png';
import makeawishImg from '../assets/projectsImages/makeawish.png';
import sourceoneImg from '../assets/projectsImages/sourceone.png';
import amsImg from '../assets/projectsImages/ams.png';

const projects = [
  {
    title: 'ISKCON Pilgrimage',
    description:
      'A comprehensive mobile application designed to enhance the pilgrimage experience for devotees. The app serves as a digital companion, providing seamless access to temple information, darshan schedules, festival details, and community features.',
    tech: ['REACT_NATIVE', 'Firebase', 'Notify', 'RAZORPAY'],
    image: iskconImg,
    id: 'BP-08',
    stability: '99.4%',
    live: 'https://play.google.com/store/search?q=iskcon+pilgrimage&c=apps&hl=en_IN'
  },
  {
    title: 'Brihat Mridanga',
    description:
      'A comprehensive mobile application designed to enhance the book marathon experience for devotees. The app serves as a digital companion, providing seamless access to book marathon information, schedules, and community features.',
    tech: ['REACT_NATIVE', 'Firebase', 'Notify', 'RAZORPAY'],
    image: bookImg,
    id: 'BP-08',
    stability: '99.4%',
    live: 'https://play.google.com/store/apps/details?id=org.iskblr.brihat.mridanga&hl=en_IN'
  },
  {
    title: 'Expense Splitter',
    description:
      'Built an expense splitter app to manage shared expenses, calculate balances, and track payments between multiple users in real time.',
    tech: ['REACT NATIVE', 'Firebase', 'Cloudnary'],
    image: expenseSplitterImg,
    id: 'BP-08',
    stability: '99.4%',
    github: 'https://github.com/Rohan03march/expenseSpitter'
  },
  {
    title: 'HYPEKART',
    description:
      'Full-featured e-commerce mobile app with authentication, product management, cart, orders and Razorpay payments using Clerk and Supabase.',
    tech: ['REACT_NATIVE', 'SUPABASE', 'CLERK', 'RAZORPAY'],
    image: hypekartImg,
    id: 'BP-08',
    stability: '99.4%',
    github: 'https://github.com/yourusername/hypekart',
  },
  {
    title: 'Huddle',
    description:
      'Developed a social media application called Huddle where users can create profiles, share posts, upload images, like and comment on posts, and connect with other users. The app focuses on clean UI, real-time interactions, and smooth user experience.',
    tech: ['REACT Native', 'Convex', 'Clerk'],
    image: huddleImg,
    id: 'BP-24',
    stability: '99.9%',
    github: 'https://github.com/Rohan03march/Huddle-',
  },
  {
    title: 'Expense tracker',
    description:
      'Developed an expense tracker application to help users record daily expenses, categorize spending, and track overall financial activity with a simple and user-friendly interface.',
    tech: ['REACT Native', 'firebase', 'Cloudnary'],
    image: expenseTrackerImg,
    id: 'BP-24',
    stability: '99.9%',
    github: 'https://github.com/Rohan03march/expenseTrackerApp',
  },
  {
    title: 'Ironnrootfitness',
    description:
      'Developed a fitness business website for Ironnrootfitness to showcase training programs, services, and contact information. The website helps users explore fitness plans and connect with the trainer online.',
    tech: ['REACT Native', 'firebase', 'Cloudnary'],
    image: ironrootImg,
    id: 'BP-24',
    stability: '99.9%',
    github: 'https://github.com/Rohan03march/Ironnrootfitness',
    live: 'https://ironnrootfitness.com',
  },
  {
    title: 'Make a wish',
    description:
      'Developed an online chocolate e-commerce website where users can browse products, place orders, and make secure payments. The platform includes product listings, cart functionality, and online payment integration.',
    tech: ['Nextjs', 'Typescript', 'MongoDB', 'Cloudnary', 'razorpay'],
    image: makeawishImg,
    id: 'BP-24',
    stability: '99.9%',
    github: 'https://github.com/Rohan03march/makeawish',
    live: 'https://mymakeawish.vercel.app'
  },
  {
    title: 'Source One',
    description:
      'Developed a company website for a manpower and recruitment firm to showcase services, company information, and contact details, helping clients connect and explore recruitment solutions.',
    tech: ['HTML', 'CSS', 'JAVASCRIPT'],
    image: sourceoneImg,
    id: 'BP-24',
    stability: '99.9%',
    github: 'https://github.com/Rohan03march/SourceoneWeb',
    live: 'https://sourceone.in'
  },
  {
    title: 'AMS',
    description:
      'Developed a social media application called Huddle where users can create profiles, share posts, upload images, like and comment on posts, and connect with other users. The app focuses on clean UI, real-time interactions, and smooth user experience.',
    tech: ['HTML', 'CSS', 'JAVASCRIPT', 'firebase', 'razorpay'],
    image:
      './src/assets/projectsImages/ams.png',
    id: 'BP-24',
    stability: '99.9%',
    github: 'https://github.com/Rohan03march/AMS',
    live: 'https://assethub-one.vercel.app'
  },
];

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: index * 0.1,
    }}
    className="hologram-card technical-border"
    style={{
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}
  >
    <div className="scanner-line" />

    {/* Image */}
    <div
      style={{
        height: 'clamp(280px, 45vh, 250px)',
        overflow: 'hidden',
        position: 'relative',
        borderBottom: '1px solid rgba(0, 245, 255, 0.1)',
      }}
    >
      <img
        src={project.image}
        alt={project.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, transparent 60%, rgba(2, 2, 4, 0.8))',
        }}
      />

      {/* Top Label */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >

      </div>

      {/* Icons */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          display: 'flex',
          gap: '0.8rem',
        }}
      >
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hologram-card"
            style={{
              padding: '0.5rem',
              background: 'rgba(2, 2, 4, 0.6)',
              border: '1px solid rgba(0, 245, 255, 0.3)',
            }}
          >
            <Github size={16} style={{ color: '#00f5ff' }} />
          </a>
        )}

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="hologram-card"
            style={{
              padding: '0.5rem',
              background: 'rgba(2, 2, 4, 0.6)',
              border: '1px solid rgba(0, 245, 255, 0.3)',
            }}
          >
            <ExternalLink size={16} style={{ color: '#00f5ff' }} />
          </a>
        )}
      </div>
    </div>

    {/* Content */}
    <div
      style={{
        padding: '1.5rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.8rem',
        }}
      >
        <h3
          className="mono"
          style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff' }}
        >
          {project.title}
        </h3>
        <span
          className="mono"
          style={{ fontSize: '0.6rem', color: '#00f5ff', opacity: 0.6 }}
        >
          STBL_{project.stability}
        </span>
      </div>

      <p
        style={{
          color: 'var(--text-secondary)',
          marginBottom: '1.5rem',
          fontSize: '0.85rem',
          lineHeight: '1.6',
          flex: 1,
        }}
      >
        {project.description}
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          borderTop: '1px solid rgba(0, 245, 255, 0.05)',
          paddingTop: '1rem',
        }}
      >
        {project.tech.map((t) => (
          <span
            key={t}
            className="mono"
            style={{
              padding: '2px 8px',
              background: 'rgba(0, 245, 255, 0.05)',
              border: '1px solid rgba(0, 245, 255, 0.1)',
              fontSize: '0.6rem',
              color: '#00f5ff',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Projects = ({ limit }) => {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section
      id="projects"
      className="section container"
      style={{ position: 'relative' }}
    >
      <div
        style={{
          marginBottom: '5rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <Shield size={16} style={{ color: '#00f5ff' }} />
          <span
            className="mono"
            style={{
              color: '#00f5ff',
              fontWeight: 800,
              letterSpacing: '0.3em',
              fontSize: '0.7rem',
            }}
          >
            INTELLIGENCE_REPOSITORY
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: '#fff',
          }}
        >
          Classified{' '}
          <span className="text-glow" style={{ color: '#00f5ff' }}>
            Projects.
          </span>
        </h2>
      </div>

      <div
        className="projects-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
        }}
      >
        {displayedProjects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
          />
        ))}
      </div>

      {limit && (
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <Link
            to="/projects"
            className="hologram-card technical-border"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.2rem 3rem',
              color: '#00f5ff',
              fontWeight: 800,
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontSize: '0.8rem',
              background: 'rgba(0, 245, 255, 0.05)',
              boxShadow: '0 0 20px rgba(0, 245, 255, 0.1)',
            }}
          >
            Access_Full_Archives <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </section>
  );
};

export default Projects;