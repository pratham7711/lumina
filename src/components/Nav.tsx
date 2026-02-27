import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#about', label: 'About' },
  ]

  return (
    <>
      <style>{`
        .nav-links-desktop {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 8px;
          cursor: pointer;
          background: none;
          border: none;
        }
        .nav-hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all 0.25s ease;
        }
        .nav-hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .nav-hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .nav-hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }
        .nav-mobile-overlay {
          display: none;
        }
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none;
          }
          .nav-hamburger {
            display: flex;
          }
          .nav-mobile-overlay {
            display: flex;
            position: fixed;
            inset: 0;
            top: 72px;
            background: rgba(5, 5, 16, 0.97);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            z-index: 99;
            padding: 32px 24px;
            border-top: 1px solid var(--glass-border);
            transition: opacity 0.25s ease;
          }
          .nav-mobile-overlay.hidden {
            display: none;
          }
          .nav-mobile-link {
            width: 100%;
            text-align: center;
            padding: 16px;
            font-size: 1.1rem;
            color: var(--text-secondary);
            border-radius: 12px;
            transition: all 0.2s;
          }
          .nav-mobile-link:hover {
            background: rgba(124, 58, 237, 0.08);
            color: white;
          }
          .nav-mobile-cta {
            width: 100%;
            margin-top: 16px;
          }
        }
      `}</style>

      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 24px',
          transition: 'all 0.3s ease',
          background: scrolled || menuOpen ? 'rgba(5, 5, 16, 0.9)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
          borderBottom: scrolled || menuOpen ? '1px solid var(--glass-border)' : '1px solid transparent',
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 72,
        }}>
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'var(--text-primary)',
            }}
          >
            LUMINA
          </a>

          {/* Desktop links */}
          <div className="nav-links-desktop">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', transition: 'color 0.2s', fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </a>
            ))}
            <button className="btn-glow" style={{ padding: '10px 22px', fontSize: '0.85rem' }}>
              Get Early Access
            </button>
          </div>

          {/* Hamburger */}
          <button
            className={`nav-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`nav-mobile-overlay${menuOpen ? '' : ' hidden'}`}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="nav-mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <button
          className="btn-glow nav-mobile-cta"
          onClick={() => setMenuOpen(false)}
        >
          Get Early Access
        </button>
      </div>
    </>
  )
}
