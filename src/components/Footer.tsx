const columns = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Docs'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Careers', 'Press', 'Partners'],
  },
  {
    title: 'Resources',
    links: ['Community', 'Help Center', 'Templates', 'Guides', 'API'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Security', 'GDPR', 'Cookies'],
  },
]

function SocialIcon({ d }: { d: string }) {
  return (
    <a
      href="#"
      style={{
        width: 36,
        height: 36,
        borderRadius: 8,
        border: '1px solid var(--glass-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--purple)'
        e.currentTarget.style.background = 'rgba(124, 58, 237, 0.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--glass-border)'
        e.currentTarget.style.background = 'transparent'
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    </a>
  )
}

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '64px 24px 32px' }}>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr repeat(4, 1fr);
          gap: 48px;
          margin-bottom: 48px;
        }
        .footer-links-grid {
          display: contents;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 24px 16px !important;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
        }
        @media (max-width: 400px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              marginBottom: 12,
            }}>
              LUMINA
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 240 }}>
              Think Faster. Ship Smarter. Your AI-powered second brain for modern teams.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <SocialIcon d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5 0-.28-.03-.56-.08-.83A7.72 7.72 0 0 0 23 3z" />
              <SocialIcon d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              <SocialIcon d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>
                {col.title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{ fontSize: '0.85rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="footer-bottom" style={{
          borderTop: '1px solid var(--glass-border)',
          paddingTop: 24,
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © 2026 Lumina AI. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Built with ♠ for builders
          </p>
        </div>
      </div>
    </footer>
  )
}
