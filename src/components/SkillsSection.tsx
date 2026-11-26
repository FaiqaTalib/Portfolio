import {
  Code2,
  Database,
  Figma,
  GitBranch,
  Globe,
  Layers,
  Layout,
  Server,
  Terminal,
  Wrench,
} from 'lucide-react';
import {motion} from 'motion/react';
import {useState} from 'react';
import {SKILL_CATEGORIES, SKILLS, type SkillItem} from '../data/portfolioData';

function getSpecificIcon(name: string, category: SkillItem['category']) {
  if (name.includes('Figma') || name.includes('UI/UX')) return <Figma size={20} />;
  if (name.includes('Git')) return <GitBranch size={20} />;
  if (name.includes('WordPress')) return <Globe size={20} />;
  if (name.includes('VS Code')) return <Terminal size={20} />;

  switch (category) {
    case 'Programming Languages':
      return <Code2 size={20} />;
    case 'Frontend & UI/UX':
      return <Layout size={20} />;
    case 'Backend Development':
      return <Server size={20} />;
    case 'Database':
      return <Database size={20} />;
    case 'Tools & Design':
      return <Wrench size={20} />;
    default:
      return <Layers size={20} />;
  }
}

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredSkills =
    selectedCategory === 'All'
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === selectedCategory);

  const midpoint = Math.ceil(filteredSkills.length / 2);
  const firstRow = filteredSkills.slice(0, midpoint);
  const secondRow = filteredSkills.slice(midpoint);

  const renderTrack = (items: SkillItem[], reverse = false) => {
    const repeated = [...items, ...items, ...items, ...items];
    return (
      <div
        className={`skills-marquee__track ${reverse ? 'skills-marquee__track--reverse' : ''}`}
      >
        {repeated.map((skill, idx) => (
          <article key={`${skill.name}-${idx}`} className="skill-slide-card">
            <div className="skill-card__top">
              <div className="skill-card__icon" aria-hidden="true">
                {getSpecificIcon(skill.name, skill.category)}
              </div>
              <span className="skill-card__category">{skill.category}</span>
            </div>
            <h3 className="skill-card__name">{skill.name}</h3>
            <p className="skill-card__detail">{skill.detail}</p>
          </article>
        ))}
      </div>
    );
  };

  return (
    <section id="skills" className="section section--obsidian">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
        >
          <span className="section-kicker">Skills &amp; Expertise</span>
          <h2 className="section-title">Technical &amp; UI/UX Toolkit</h2>
          <p className="section-subtitle">
            Full-stack development, relational database architecture, and UI/UX design in Figma—hover
            any card to inspect or filter by discipline below.
          </p>
        </motion.div>

        <div className="skills__filter-bar" role="tablist" aria-label="Filter skills by category">
          {SKILL_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category}
              className={`skills__filter-btn ${
                selectedCategory === category ? 'skills__filter-btn--active' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="skills-marquee" aria-label="Technical skills showcase slider">
        <div className="skills-marquee__stack">
          {renderTrack(firstRow, false)}
          {secondRow.length > 0 && renderTrack(secondRow, true)}
        </div>
      </div>
    </section>
  );
}
