import type {ProjectPreviewType} from '../data/portfolioData';

interface ProjectPreviewProps {
  type: ProjectPreviewType;
  title: string;
}

export function ProjectPreview({type, title}: ProjectPreviewProps) {
  if (type === 'vaccination') {
    return (
      <div className="blueprint-card" aria-hidden="true">
        <div className="blueprint-card__bar">
          <span>RBAC Portal · Patient Registry</span>
          <span className="blueprint-card__accent">PHP · MySQL</span>
        </div>
        <div className="blueprint-rows">
          <div className="blueprint-row">
            <span>Patient Schedule #104</span>
            <span>Dose 02</span>
            <span className="blueprint-card__accent">Verified</span>
          </div>
          <div className="blueprint-row">
            <span>Patient Schedule #105</span>
            <span>Dose 01</span>
            <span className="blueprint-card__accent">Scheduled</span>
          </div>
          <div className="blueprint-row">
            <span>Admin Session Guard</span>
            <span>RBAC</span>
            <span className="blueprint-card__accent">Active</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'ecommerce') {
    return (
      <div className="blueprint-card" aria-hidden="true">
        <div className="blueprint-card__bar">
          <span>Laravel Storefront &amp; Admin</span>
          <span className="blueprint-card__accent">Sanctum · Eloquent</span>
        </div>
        <div className="blueprint-cards-mini">
          <div className="blueprint-mini-box">
            <span>Catalog</span>
            <div className="blueprint-mini-line" />
            <span className="blueprint-card__accent">Indexed</span>
          </div>
          <div className="blueprint-mini-box">
            <span>Cart State</span>
            <div className="blueprint-mini-line" />
            <span className="blueprint-card__accent">Checkout</span>
          </div>
          <div className="blueprint-mini-box">
            <span>Orders</span>
            <div className="blueprint-mini-line" />
            <span className="blueprint-card__accent">Middleware</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'cinema') {
    const seats = [
      0, 0, 1, 1, 0, 0, 2, 2,
      0, 2, 2, 1, 1, 0, 0, 0,
      0, 0, 0, 2, 2, 2, 0, 0,
    ];
    return (
      <div className="blueprint-card" aria-hidden="true">
        <div className="blueprint-card__bar">
          <span>Showtime Seat Matrix</span>
          <span className="blueprint-card__accent">Concurrency-Safe</span>
        </div>
        <div className="blueprint-grid-seats">
          {seats.map((state, idx) => (
            <div
              key={idx}
              className={`blueprint-seat ${
                state === 1
                  ? 'blueprint-seat--active'
                  : state === 2
                    ? 'blueprint-seat--taken'
                    : ''
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'lawfirm') {
    return (
      <div className="blueprint-card" aria-hidden="true">
        <div className="blueprint-card__bar">
          <span>Custom PHP CMS · Legal Practice</span>
          <span className="blueprint-card__accent">Sanitized Input</span>
        </div>
        <div className="blueprint-cards-mini">
          <div className="blueprint-mini-box">
            <span>Practice Areas</span>
            <div className="blueprint-mini-line" />
            <span className="blueprint-card__accent">Published</span>
          </div>
          <div className="blueprint-mini-box">
            <span>Attorneys</span>
            <div className="blueprint-mini-line" />
            <span className="blueprint-card__accent">Profiles</span>
          </div>
          <div className="blueprint-mini-box">
            <span>Intake</span>
            <div className="blueprint-mini-line" />
            <span className="blueprint-card__accent">Validated</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'wellness') {
    return (
      <div className="blueprint-card" aria-hidden="true">
        <div className="blueprint-card__bar">
          <span>Modular React UI Architecture</span>
          <span className="blueprint-card__accent">Hooks · ~30% Faster</span>
        </div>
        <div className="blueprint-rows">
          <div className="blueprint-row">
            <span>&lt;ProgramCard /&gt;</span>
            <span>useState</span>
            <span className="blueprint-card__accent">Reusable</span>
          </div>
          <div className="blueprint-row">
            <span>&lt;SessionFilter /&gt;</span>
            <span>useEffect</span>
            <span className="blueprint-card__accent">Synced</span>
          </div>
          <div className="blueprint-row">
            <span>&lt;LayoutShell /&gt;</span>
            <span>Responsive</span>
            <span className="blueprint-card__accent">Modular</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blueprint-card" aria-hidden="true">
      <div className="blueprint-card__bar">
        <span>GitHub Source Repository</span>
        <span className="blueprint-card__accent">Public Repo</span>
      </div>
      <div className="blueprint-rows">
        <div className="blueprint-row">
          <span>{title}</span>
          <span>git</span>
          <span className="blueprint-card__accent">FaiqaTalib</span>
        </div>
      </div>
    </div>
  );
}
