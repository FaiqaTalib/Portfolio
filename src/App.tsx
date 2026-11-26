import {MotionConfig, motion, useScroll, useSpring} from 'motion/react';
import {AboutSection} from './components/AboutSection';
import {BackToTop} from './components/BackToTop';
import {ContactSection} from './components/ContactSection';
import {EducationSection} from './components/EducationSection';
import {ExperienceSection} from './components/ExperienceSection';
import {Footer} from './components/Footer';
import {HeroSection} from './components/HeroSection';
import {NAV_ITEMS, Navbar} from './components/Navbar';
import {ProjectsSection} from './components/ProjectsSection';
import {SkillsSection} from './components/SkillsSection';
import {useActiveSection} from './hooks/useActiveSection';

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export default function App() {
  const activeSection = useActiveSection(SECTION_IDS);
  const {scrollYProgress} = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="scroll-progress" style={{scaleX}} aria-hidden="true" />
      <Navbar activeSection={activeSection} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
