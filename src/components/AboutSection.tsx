import {motion} from 'motion/react';
import {ABOUT_CHAPTERS, PROFILE_DATA} from '../data/portfolioData';

export function AboutSection() {
  return (
    <section id="about" className="section section--deep">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
        >
          <span className="section-kicker">About Me</span>
          <h2 className="section-title">
            Crafting responsive interfaces in Figma &amp; React—backed by solid PHP &amp; Laravel
            architecture.
          </h2>
          <p className="section-subtitle">
            Grounded in Computer Science fundamentals and shaped by full-stack delivery across
            healthcare, e-commerce, booking, and custom CMS systems.
          </p>
        </motion.div>

        <div className="about__grid">
          <div className="about__story">
            {ABOUT_CHAPTERS.map((chapter, index) => (
              <motion.article
                key={chapter.number}
                className="about-chapter"
                initial={{opacity: 0, y: 18}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.2}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="about-chapter__header">
                  <span className="about-chapter__num">{chapter.number}.</span>
                  <h3 className="about-chapter__title">{chapter.heading}</h3>
                </div>
                <p className="about-chapter__body">{chapter.body}</p>
              </motion.article>
            ))}
          </div>

          <motion.aside
            className="about__summary-card"
            aria-label="Developer profile summary"
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1]}}
          >
            <h3 className="about__summary-title">Profile Snapshot</h3>
            <dl className="about-meta-list">
              <div className="about-meta-item">
                <dt className="about-meta-item__label">Location</dt>
                <dd className="about-meta-item__value">{PROFILE_DATA.location}</dd>
              </div>
              <div className="about-meta-item">
                <dt className="about-meta-item__label">Current Role</dt>
                <dd className="about-meta-item__value">Software Developer Trainer at Aptech</dd>
              </div>
              <div className="about-meta-item">
                <dt className="about-meta-item__label">Core Engineering</dt>
                <dd className="about-meta-item__value">PHP · Laravel · MySQL · React.js</dd>
              </div>
              <div className="about-meta-item">
                <dt className="about-meta-item__label">UI/UX &amp; Design</dt>
                <dd className="about-meta-item__value">Figma · Wireframing · Prototyping · Canva</dd>
              </div>
              <div className="about-meta-item">
                <dt className="about-meta-item__label">Career Focus</dt>
                <dd className="about-meta-item__value">
                  Full-stack engineering &amp; UI/UX delivery for forward-thinking international teams
                </dd>
              </div>
            </dl>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
