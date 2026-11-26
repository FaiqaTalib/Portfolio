import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Star,
  X,
} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import {useEffect, useState} from 'react';
import {PROFILE_DATA, PROJECTS, type ProjectItem} from '../data/portfolioData';
import {useGithubRepos} from '../hooks/useGithubRepos';
import {ProjectPreview} from './ProjectPreview';

export function ProjectsSection() {
  const {enrichedProjects, githubAsProjects, hasLiveRepos} = useGithubRepos(PROJECTS);
  const [viewMode, setViewMode] = useState<'cv' | 'github'>('cv');
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const displayedProjects =
    viewMode === 'github' && hasLiveRepos ? githubAsProjects : enrichedProjects;
  const total = displayedProjects.length;

  useEffect(() => {
    setActiveIndex(0);
  }, [viewMode]);

  useEffect(() => {
    if (isHovered || activeProject || total <= 1) return;

    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [isHovered, activeProject, total]);

  useEffect(() => {
    if (!activeProject) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeProject]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  const currentProject = displayedProjects[activeIndex];
  const prevProject = displayedProjects[prevIndex];
  const nextProject = displayedProjects[nextIndex];

  const renderCardContent = (project: ProjectItem, isPrimary: boolean) => (
    <>
      <div className="project-card__preview">
        <ProjectPreview type={project.previewType} title={project.title} />
      </div>

      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="project-card__stack">{project.stack.join(' · ')}</span>
          {typeof project.stars === 'number' && project.stars > 0 && (
            <span className="project-card__stats">
              <Star
                size={13}
                style={{display: 'inline', verticalAlign: '-2px', marginRight: '4px'}}
              />
              {project.stars}
            </span>
          )}
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__summary">{project.summary}</p>

        {isPrimary && (
          <div className="project-card__actions">
            <button
              type="button"
              className="btn btn--gold"
              onClick={() => setActiveProject(project)}
            >
              View Project
              <ExternalLink size={16} />
            </button>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              <Github size={16} />
              {project.matchedRepoName ? 'View Repo' : 'GitHub'}
            </a>
          </div>
        )}
      </div>
    </>
  );

  return (
    <section id="projects" className="section section--surface">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
        >
          <span className="section-kicker">Featured Projects</span>
          <h2 className="section-title">Selected Engineering Work</h2>
          <p className="section-subtitle">
            Full-stack platforms and modular front-end applications synced with GitHub
            repositories—hover to inspect or step through the stage below.
          </p>
        </motion.div>

        <div className="projects__toolbar">
          <div className="projects__mode-tabs" role="tablist" aria-label="Project source view">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'cv'}
              className={`projects__mode-tab ${
                viewMode === 'cv' ? 'projects__mode-tab--active' : ''
              }`}
              onClick={() => setViewMode('cv')}
            >
              Featured Projects ({enrichedProjects.length})
            </button>
            {hasLiveRepos && (
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'github'}
                className={`projects__mode-tab ${
                  viewMode === 'github' ? 'projects__mode-tab--active' : ''
                }`}
                onClick={() => setViewMode('github')}
              >
                GitHub Repositories ({githubAsProjects.length})
              </button>
            )}
            <a
              href={PROFILE_DATA.githubReposUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="projects__mode-tab"
            >
              All Repos on GitHub ↗
            </a>
          </div>

          <div className="carousel-controls">
            <button
              type="button"
              className="carousel-arrow"
              onClick={handlePrev}
              aria-label="Previous project"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="carousel-arrow"
              onClick={handleNext}
              aria-label="Next project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {currentProject && (
          <div
            className="stage-slider"
            aria-roledescription="carousel"
            aria-label="Featured Projects Perspective Slider"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {total > 1 ? (
              <article
                className="stage-card stage-card--side"
                onClick={handlePrev}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handlePrev();
                }}
                aria-label={`Previous project: ${prevProject.title}`}
              >
                {renderCardContent(prevProject, false)}
              </article>
            ) : (
              <div />
            )}

            <AnimatePresence mode="wait" custom={direction}>
              <motion.article
                key={currentProject.id}
                custom={direction}
                className="stage-card stage-card--active"
                initial={{opacity: 0, x: direction > 0 ? 52 : -52, scale: 0.96}}
                animate={{opacity: 1, x: 0, scale: 1}}
                exit={{opacity: 0, x: direction > 0 ? -52 : 52, scale: 0.96}}
                transition={{duration: 0.42, ease: [0.16, 1, 0.3, 1]}}
              >
                {renderCardContent(currentProject, true)}
              </motion.article>
            </AnimatePresence>

            {total > 2 ? (
              <article
                className="stage-card stage-card--side"
                onClick={handleNext}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleNext();
                }}
                aria-label={`Next project: ${nextProject.title}`}
              >
                {renderCardContent(nextProject, false)}
              </article>
            ) : (
              <div />
            )}
          </div>
        )}

        <div className="carousel-pagination" aria-label="Project slider pagination">
          {displayedProjects.map((proj, index) => (
            <button
              key={proj.id}
              type="button"
              className={`carousel-dot ${activeIndex === index ? 'carousel-dot--active' : ''}`}
              aria-label={`Show ${proj.title}`}
              aria-current={activeIndex === index ? 'true' : undefined}
              onClick={() => {
                setDirection(index >= activeIndex ? 1 : -1);
                setActiveIndex(index);
              }}
            />
          ))}
          <span className="carousel-status">
            {activeIndex + 1} / {total}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className="modal-dialog"
              initial={{opacity: 0, scale: 0.95, y: 14}}
              animate={{opacity: 1, scale: 1, y: 0}}
              exit={{opacity: 0, scale: 0.95, y: 14}}
              transition={{duration: 0.26, ease: [0.16, 1, 0.3, 1]}}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="modal-dialog__media">
                <ProjectPreview type={activeProject.previewType} title={activeProject.title} />
                <button
                  type="button"
                  className="modal-dialog__close"
                  aria-label="Close project details"
                  onClick={() => setActiveProject(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-dialog__content">
                <div className="modal-dialog__stack">{activeProject.stack.join(' · ')}</div>
                <h3 id="project-modal-title" className="modal-dialog__title">
                  {activeProject.title}
                </h3>
                <p className="modal-dialog__summary">{activeProject.summary}</p>

                <h4 className="modal-dialog__heading">Key Engineering Highlights</h4>
                <ul className="modal-dialog__list">
                  {activeProject.highlights.map((item) => (
                    <li key={item} className="modal-dialog__list-item">
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="modal-dialog__footer">
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--gold"
                  >
                    <Github size={16} />
                    {activeProject.matchedRepoName
                      ? `Open ${activeProject.matchedRepoName} on GitHub`
                      : 'View on GitHub'}
                  </a>
                  {!activeProject.isLivePlaceholder && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--outline"
                    >
                      <ExternalLink size={16} />
                      Live Preview
                    </a>
                  )}
                  <button
                    type="button"
                    className="btn btn--outline"
                    onClick={() => setActiveProject(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
