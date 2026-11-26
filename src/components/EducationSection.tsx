import {Award, GraduationCap} from 'lucide-react';
import {motion} from 'motion/react';
import {CERTIFICATIONS, EDUCATION} from '../data/portfolioData';

export function EducationSection() {
  return (
    <section id="education" className="section section--deep">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
        >
          <span className="section-kicker">Education &amp; Certifications</span>
          <h2 className="section-title">Academic Background &amp; Credentials</h2>
          <p className="section-subtitle">
            Formal computer science education paired with verified technical certifications in SQL
            and Python.
          </p>
        </motion.div>

        <div className="credentials__split">
          <div>
            <h3 className="credentials-block__heading">Education</h3>
            <div className="credentials__grid">
              {EDUCATION.map((edu, index) => (
                <motion.article
                  key={edu.id}
                  className="credential-card"
                  initial={{opacity: 0, y: 18}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, amount: 0.2}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="credential-card__icon" aria-hidden="true">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <div className="credential-card__meta">
                      {edu.duration} · {edu.field}
                    </div>
                    <h4 className="credential-card__title">{edu.degree}</h4>
                    <p className="credential-card__subtitle">{edu.institution}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div>
            <h3 className="credentials-block__heading">Certifications</h3>
            <div className="credentials__grid">
              {CERTIFICATIONS.map((cert, index) => (
                <motion.article
                  key={cert.id}
                  className="credential-card"
                  initial={{opacity: 0, y: 18}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, amount: 0.2}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="credential-card__icon" aria-hidden="true">
                    <Award size={22} />
                  </div>
                  <div>
                    <div className="credential-card__meta">Issued by {cert.issuer}</div>
                    <h4 className="credential-card__title">{cert.title}</h4>
                    <p className="credential-card__subtitle">{cert.context}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
