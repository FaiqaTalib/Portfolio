import {
  Check,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import {motion} from 'motion/react';
import {type FormEvent, useState} from 'react';
import {PROFILE_DATA} from '../data/portfolioData';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_DATA.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE_DATA.email}`;
    }
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = 'Please enter your name.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!subject.trim()) nextErrors.subject = 'Please add a brief subject.';
    if (message.trim().length < 10) {
      nextErrors.message = 'Please enter a message of at least 10 characters.';
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitted(true);
    const mailtoHref = `mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${subject.trim()}`,
    )}&body=${encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    )}`;
    window.location.href = mailtoHref;
  };

  return (
    <section id="contact" className="section section--surface">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
        >
          <span className="section-kicker">Contact</span>
          <h2 className="section-title">Let&apos;s Build Something Meaningful</h2>
          <p className="section-subtitle">
            Open to full-stack software engineering, React &amp; PHP roles, and UI/UX design
            collaborations. Reach out directly or send a message below.
          </p>
        </motion.div>

        <div className="contact__grid">
          <motion.div
            className="contact__cta-box"
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
          >
            <p className="contact__lead">
              Whether you are hiring a PHP, Laravel, and React.js developer, seeking UI/UX product
              design in Figma, or looking for technical training expertise, I would be glad to
              connect.
            </p>

            <div className="contact__list">
              <div className="contact-item">
                <div className="contact-item__left">
                  <div className="contact-item__icon" aria-hidden="true">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="contact-item__label">Email</div>
                    <a href={`mailto:${PROFILE_DATA.email}`} className="contact-item__value">
                      {PROFILE_DATA.email}
                    </a>
                  </div>
                </div>
                <button type="button" className="contact-item__action" onClick={handleCopyEmail}>
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  {copiedEmail ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="contact-item">
                <div className="contact-item__left">
                  <div className="contact-item__icon" aria-hidden="true">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="contact-item__label">Phone</div>
                    <a
                      href={`tel:${PROFILE_DATA.phone.replace(/[^+\d]/g, '')}`}
                      className="contact-item__value"
                    >
                      {PROFILE_DATA.phone}
                    </a>
                  </div>
                </div>
                <a
                  href={`tel:${PROFILE_DATA.phone.replace(/[^+\d]/g, '')}`}
                  className="contact-item__action"
                >
                  Call
                </a>
              </div>

              <div className="contact-item">
                <div className="contact-item__left">
                  <div className="contact-item__icon" aria-hidden="true">
                    <Github size={18} />
                  </div>
                  <div>
                    <div className="contact-item__label">GitHub</div>
                    <a
                      href={PROFILE_DATA.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-item__value"
                    >
                      {PROFILE_DATA.githubHandle}
                    </a>
                  </div>
                </div>
                <a
                  href={PROFILE_DATA.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item__action"
                >
                  <ExternalLink size={14} />
                  Open
                </a>
              </div>

              <div className="contact-item">
                <div className="contact-item__left">
                  <div className="contact-item__icon" aria-hidden="true">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <div className="contact-item__label">LinkedIn (Editable Placeholder)</div>
                    <a
                      href={PROFILE_DATA.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-item__value"
                    >
                      {PROFILE_DATA.linkedinDisplay}
                    </a>
                  </div>
                </div>
                <a
                  href={PROFILE_DATA.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item__action"
                >
                  <ExternalLink size={14} />
                  Profile
                </a>
              </div>

              <div className="contact-item">
                <div className="contact-item__left">
                  <div className="contact-item__icon" aria-hidden="true">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="contact-item__label">Location</div>
                    <span className="contact-item__value">{PROFILE_DATA.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1]}}
          >
            <h3 className="contact-form__title">Send a Message</h3>
            <p className="contact-form__subtitle">
              Share details about your role, project, or collaboration below.
            </p>

            {submitted && (
              <div className="form-success" role="status">
                Thank you, {name}. Your email client has been prepared with your inquiry.
              </div>
            )}

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="contact-name" className="form-field__label">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className="form-field__input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ayesha Khan"
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="contact-email" className="form-field__label">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="form-field__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-subject" className="form-field__label">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                className="form-field__input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Software Developer Opportunity"
              />
              {errors.subject && <span className="form-error">{errors.subject}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="contact-message" className="form-field__label">
                Message
              </label>
              <textarea
                id="contact-message"
                className="form-field__textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
              />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>

            <div className="contact-form__footer">
              <button type="submit" className="btn btn--gold">
                <Send size={16} />
                Send Message
              </button>
              {submitted && (
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => {
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                    setSubmitted(false);
                    setErrors({});
                  }}
                >
                  Reset Form
                </button>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
