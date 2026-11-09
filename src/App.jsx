import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import BackgroundGlow from './components/BackgroundGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import CareerOpportunities from './components/CareerOpportunities';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';
import Toast from './components/Toast';
import Reveal from './components/Reveal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  const handleShowToast = useCallback((toastData) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast(toastData);
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 4500);
  }, []);

  const handleCloseToast = useCallback(() => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-clip bg-[#0A0A0A] text-[#FFFFFF] selection:bg-[#007BA7]/40 selection:text-white">
      <BackgroundGlow />
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1"
      >
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        <Reveal>
          <About />
        </Reveal>

        <Reveal>
          <Skills />
        </Reveal>

        <Reveal>
          <Projects onSelectProject={(project) => setSelectedProject(project)} />
        </Reveal>

        <Reveal>
          <Education />
        </Reveal>

        <Reveal>
          <CareerOpportunities />
        </Reveal>

        <Reveal>
          <Contact onShowToast={handleShowToast} />
        </Reveal>
      </motion.main>

      <Footer />

      {/* Modals & Notifications */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onShowToast={handleShowToast}
      />

      <Toast toast={toast} onClose={handleCloseToast} />
    </div>
  );
}
