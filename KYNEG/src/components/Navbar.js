import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../image/kyn_logo_transparent.png';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // عشان نعرف الصفحة الحالية

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Product', path: '/product' },
    { name: 'Contact us', path: '/contact' },
    { name: 'About us', path: '/about' },
  ];

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        .navbar {
          background-color: #000;
          color: #fff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }

        .navbar-container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .navbar-content { display: flex; justify-content: space-between; align-items: center; height: 64px; }
        .logo-container { flex: 1; display: flex; justify-content: center; }
        .logo { height: 40px; width: auto; }
        .nav-menu { display: none; gap: 2rem; }

        .nav-link {
          color: #d1d5db;
          text-decoration: none;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 0.375rem;
          transition: all 0.3s;
          border-bottom: 2px solid transparent;
        }

        .nav-link:hover { color: #fff; background-color: #1f2937; }
        .nav-link.active { color: #fff; border-bottom: 2px solid #fff; }

        .menu-button {
          position: absolute;
          right: 1rem;
          background: none;
          border: none;
          color: #d1d5db;
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
.logo {
  height: 100px; /* نفس ارتفاع navbar */
  width: auto;  /* يحافظ على نسبة العرض للارتفاع */
}

        .menu-button:hover { color: #fff; }
        .menu-icon { width: 24px; height: 24px; }
        .mobile-menu { padding-bottom: 1rem; }
        .mobile-menu-links { display: flex; flex-direction: column; gap: 0.5rem; }
        .mobile-menu .nav-link { font-size: 1rem; }
        .page-spacer { height: 64px; }

        @media (min-width: 768px) {
          .logo-container { flex: none; justify-content: flex-start; }
          .navbar-content { justify-content: flex-start; }
          .nav-menu { display: flex; flex: 1; justify-content: center; }
          .menu-button { display: none; }
          .mobile-menu { display: none !important; }
        }
      `
      }
      
      </style>

      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            {/* Logo */}

<div className="logo-container">
  <Link to="/">
    <img src={Logo} alt="Logo" className="logo" />
  </Link>
</div>


            {/* Desktop Menu */}
            <div className="nav-menu">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="menu-button">
              {isOpen ? (
                <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="mobile-menu">
              <div className="mobile-menu-links">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer */}
      <div className="page-spacer"></div>
    </>
  );
}
