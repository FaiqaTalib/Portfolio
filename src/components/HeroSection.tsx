import {ArrowRight, Code2, Download, Figma, Github, Mail, Server} from 'lucide-react';
import {motion} from 'motion/react';
import {useEffect, useState} from 'react';
import {HERO_PILLARS, HERO_TYPER_ROLES, PROFILE_DATA} from '../data/portfolioData';
import {downloadCvPdf} from '../utils/downloadCvPdf';

function getPillarIcon(id: string) {
  if (id === 'frontend') return <Code2 size={20} />;
  if (id === 'backend') return <Server size={20} />;
  return <Figma size={20} />;
}

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activePillar, setActivePillar] = useState(0);

  // Smooth typewriter loop across roles
  useEffect(() => {
    const currentRole = HERO_TYPER_ROLES[roleIndex];
    let timeoutId: number;

    if (!isDeleting && displayedText === currentRole) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 1700);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % HERO_TYPER_ROLES.length);
    } else {
      const nextLength = displayedText.length + (isDeleting ? -1 : 1);
      const speed = isDeleting ? 40 : 78;
      timeoutId = window.setTimeout(() => {
        setDisplayedText(currentRole.slice(0, nextLength));
      }, speed);
    }

    return () => window.clearTimeout(timeoutId);
  }, [displayedText, isDeleting, roleIndex]);

  // Smooth auto-highlighting discipline deck
  useEffect(() => {
    const interval = window.setInterval(() => {
      setActivePillar((prev) => (prev + 1) % HERO_PILLARS.length);
    }, 3200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero-glow hero-glow--one" aria-hidden="true" />
      <div className="hero-glow hero-glow--two" aria-hidden="true" />

      <div className="container hero__container">
        <div className="hero__grid">
          <motion.div
            initial={{opacity: 0, y: 24}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.65, ease: [0.16, 1, 0.3, 1]}}
          >
            <h1 className="hero__title">{PROFILE_DATA.name}</h1>

            <div className="hero__typer-line" aria-live="polite">
              <span>{displayedText}</span>
              <span className="typer-caret" aria-hidden="true" />
            </div>

            <p className="hero__intro">{PROFILE_DATA.heroIntro}</p>

            <div className="hero__actions">
              <a href="#projects" className="btn btn--gold">
                Explore My Work
                <ArrowRight size={18} />
              </a>
              <button type="button" className="btn btn--outline" onClick={downloadCvPdf}>
                <Download size={18} />
                Download CV
              </button>
              <a href="#contact" className="btn btn--outline">
                <Mail size={18} />
                Let&apos;s Connect
              </a>
              <a
                href={PROFILE_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline"
              >
                <Github size={18} />
                GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-orbit-stage"
            initial={{opacity: 0, scale: 0.96}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.7, delay: 0.14, ease: [0.16, 1, 0.3, 1]}}
          >
            <div className="orbit-ring orbit-ring--outer" aria-hidden="true" />
            <div className="orbit-ring orbit-ring--inner" aria-hidden="true" />

            <div className="pillar-deck">
              {HERO_PILLARS.map((pillar, index) => (
                <motion.div
                  key={pillar.id}
                  className={`pillar-card ${activePillar === index ? 'pillar-card--active' : ''}`}
                  animate={{
                    x: activePillar === index ? -6 : 0,
                    scale: activePillar === index ? 1.02 : 1,
                  }}
                  transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
                  onMouseEnter={() => setActivePillar(index)}
                >
                  <div className="pillar-card__icon" aria-hidden="true">
                    {getPillarIcon(pillar.id)}
                  </div>
                  <div>
                    <div className="pillar-card__title">{pillar.title}</div>
                    <div className="pillar-card__meta">{pillar.meta}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
