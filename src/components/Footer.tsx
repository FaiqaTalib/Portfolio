import {PROFILE_DATA} from '../data/portfolioData';
import {NAV_ITEMS} from './Navbar';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          © {new Date().getFullYear()} {PROFILE_DATA.name} · {PROFILE_DATA.title} ·{' '}
          {PROFILE_DATA.location}
        </p>

        <nav className="footer__links" aria-label="Footer navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="footer__link">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
