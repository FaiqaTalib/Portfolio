import {motion} from 'motion/react';
import {EXPERIENCES} from '../data/portfolioData';

export function ExperienceSection() {
  return (
    <section id="experience" className="section section--obsidian">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
        >
          <span className="section-kicker">Professional Experience</span>
          <h2 className="section-title">Industry &amp; Mentorship Journey</h2>
          <p className="section-subtitle">
            Combining full-stack technical instruction at Aptech with agile remote Python delivery.
          </p>
        </motion.div>

        <ol className="timeline">
          {EXPERIENCES.map((exp, index) => (
            <motion.li
              key={exp.id}
              className="timeline-item"
              initial={{opacity: 0, y: 24}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.2}}
              transition={{
                duration: 0.55,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="timeline-item__node" aria-hidden="true" />
              <article className="timeline-card">
                <div className="timeline-card__header">
                  <h3 className="timeline-card__role">{exp.role}</h3>
                  <span className="timeline-card__duration">{exp.duration}</span>
                </div>
                <p className="timeline-card__company">
                  {exp.company} · {exp.location}
                </p>

                <ul className="timeline-card__list">
                  {exp.responsibilities.map((item) => (
                    <li key={item} className="timeline-card__item">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
