import { useEffect, useState } from 'react'

const navStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  padding: '0 24px',
  transition: 'all 0.3s ease',
}

const innerStyle: React.CSSProperties = {
  maxWidth: 1200,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 72,
}

const linksStyle: React.CSSProperties = {
  display: 'flex',
  gap: 32,
  alignItems: 'center',
}

const linkStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  color: 'var(--text-secondary)',
  transition: 'color 0.2s',
  fontWeight: 500,
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        ...navStyle,
        background: scrolled ? 'rgba(5, 5, 16, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
      }}
    >
      <div style={innerStyle}>
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

        <div style={linksStyle}>
          <a href="#features" style={linkStyle} onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
            Features
          </a>
          <a href="#pricing" style={linkStyle} onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
            Pricing
          </a>
          <a href="#about" style={linkStyle} onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
            About
          </a>
          <button
            className="btn-glow"
            style={{ padding: '10px 22px', fontSize: '0.85rem' }}
          >
            Get Early Access
          </button>
        </div>
      </div>
    </nav>
  )
}
