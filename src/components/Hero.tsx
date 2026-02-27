import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const PARTICLES = [
  { id: 0, size: 3, x: 15, y: 20, dur: 7, delay: 0 },
  { id: 1, size: 2, x: 80, y: 15, dur: 5, delay: 1 },
  { id: 2, size: 4, x: 65, y: 70, dur: 8, delay: 2 },
  { id: 3, size: 2, x: 30, y: 80, dur: 6, delay: 0.5 },
  { id: 4, size: 3, x: 90, y: 50, dur: 9, delay: 3 },
  { id: 5, size: 2, x: 45, y: 30, dur: 5, delay: 1.5 },
  { id: 6, size: 3, x: 10, y: 60, dur: 7, delay: 2.5 },
  { id: 7, size: 2, x: 70, y: 90, dur: 6, delay: 0.8 },
  { id: 8, size: 4, x: 55, y: 10, dur: 8, delay: 3.5 },
  { id: 9, size: 2, x: 25, y: 45, dur: 5, delay: 1.2 },
]

const BAR_HEIGHTS = [40, 65, 45, 80, 55, 90, 70]
const SIDEBAR_ITEMS = ['Dashboard', 'Analytics', 'Projects', 'Team', 'Settings']
const STATS = [
  { label: 'Revenue', value: '$48.2K', change: '+12%', up: true },
  { label: 'Users', value: '10.4K', change: '+8%', up: true },
  { label: 'Churn', value: '1.2%', change: '-0.3%', up: false },
]
const ACTIVITY = [
  { action: 'New deployment pushed', time: '2m ago', dot: '#22c55e' },
  { action: 'AI workflow triggered', time: '8m ago', dot: '#8B5CF6' },
]

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth <= 768

    if (prefersReducedMotion || isMobile) {
      // Instant reveal on mobile / reduced motion
      ;[badgeRef, headlineRef, subtextRef, ctaRef, mockupRef, scrollRef].forEach(r => {
        if (r.current) r.current.style.opacity = '1'
      })
      headlineRef.current?.querySelectorAll('.hero-word').forEach(el => {
        (el as HTMLElement).style.opacity = '1'
      })
      return
    }

    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(badgeRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    )

    const words = headlineRef.current?.querySelectorAll('.hero-word')
    if (words?.length) {
      tl.fromTo(words,
        { opacity: 0, y: 60, rotateX: -15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
        '-=0.2'
      )
    }

    tl.fromTo(subtextRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.2'
    )

    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )

    tl.fromTo(mockupRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.7'
    )

    tl.fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.1'
    )
  }, [])

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      padding: '0 24px',
    }}>
      <style>{`
        @keyframes meshMove {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(30px, -20px) scale(1.02); }
          66%  { transform: translate(-20px, 30px) scale(0.98); }
          100% { transform: translate(10px, -10px) scale(1.01); }
        }
        @keyframes gridDrift {
          0%   { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.35; }
          50%       { transform: translateY(-18px) scale(1.2); opacity: 0.8; }
        }
        @keyframes mockupFloat {
          0%, 100% { transform: perspective(1200px) rotateY(-12deg) rotateX(5deg) translateY(0px); }
          50%       { transform: perspective(1200px) rotateY(-12deg) rotateX(5deg) translateY(-14px); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%       { transform: translateY(6px); opacity: 0.3; }
        }
        .mockup-float {
          animation: mockupFloat 5s ease-in-out infinite;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 64px;
          padding-top: 100px;
          padding-bottom: 60px;
        }
        .hero-cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .hero-scroll-indicator {
          display: flex;
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            padding-top: 100px !important;
            padding-bottom: 48px !important;
          }
          .mockup-float {
            animation: none !important;
            transform: none !important;
          }
          .hero-mockup-outer {
            max-width: 480px;
            margin: 0 auto;
          }
        }
        @media (max-width: 600px) {
          .hero-grid {
            gap: 36px !important;
          }
          .hero-cta-row {
            flex-direction: column;
            gap: 10px;
          }
          .hero-cta-row .btn-glow,
          .hero-cta-row .btn-ghost {
            width: 100%;
            justify-content: center;
          }
          .hero-scroll-indicator {
            display: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .mockup-float {
            animation: none !important;
          }
        }
      `}</style>

      {/* ── Background ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        {/* Gradient blobs */}
        <div style={{
          position: 'absolute', width: '150%', height: '150%', top: '-25%', left: '-25%',
          background: `
            radial-gradient(ellipse 700px 600px at 20% 30%, rgba(124,58,237,0.16) 0%, transparent 70%),
            radial-gradient(ellipse 500px 500px at 78% 60%, rgba(59,130,246,0.11) 0%, transparent 70%),
            radial-gradient(ellipse 400px 400px at 50% 85%, rgba(139,92,246,0.09) 0%, transparent 70%)
          `,
          animation: 'meshMove 20s ease-in-out infinite alternate',
        }} />

        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          animation: 'gridDrift 8s linear infinite',
        }} />

        {/* Floating particles — hidden on mobile for perf */}
        {PARTICLES.map(p => (
          <div key={p.id} style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.id % 2 === 0 ? 'rgba(139,92,246,0.75)' : 'rgba(96,165,250,0.65)',
            animation: `particleFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
            boxShadow: `0 0 ${p.size * 4}px ${p.id % 2 === 0 ? 'rgba(139,92,246,0.5)' : 'rgba(96,165,250,0.4)'}`,
          }} />
        ))}
      </div>

      {/* ── Main grid ── */}
      <div className="container hero-grid" style={{ position: 'relative', zIndex: 2 }}>

        {/* ── Left: copy ── */}
        <div>
          {/* Animated badge */}
          <div ref={badgeRef} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100,
            background: 'rgba(124,58,237,0.12)',
            border: '1px solid rgba(124,58,237,0.38)',
            fontSize: '0.82rem', fontWeight: 600, color: 'var(--purple-light)',
            marginBottom: 24, opacity: 0,
          }}>
            ✨ Now with AI-powered workflows
          </div>

          {/* Headline */}
          <div ref={headlineRef}>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 6vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              marginBottom: 24,
              letterSpacing: '-0.025em',
            }}>
              <div>
                <span className="hero-word" style={{ display: 'inline-block', opacity: 0 }}>Build</span>{' '}
                <span className="hero-word" style={{ display: 'inline-block', opacity: 0 }}>
                  <span className="gradient-text">Faster.</span>
                </span>
              </div>
              <div>
                <span className="hero-word" style={{ display: 'inline-block', opacity: 0 }}>Ship</span>{' '}
                <span className="hero-word" style={{ display: 'inline-block', opacity: 0 }}>
                  <span className="gradient-text">Smarter.</span>
                </span>
              </div>
              <div>
                <span className="hero-word" style={{ display: 'inline-block', opacity: 0 }}>Scale</span>{' '}
                <span className="hero-word" style={{ display: 'inline-block', opacity: 0 }}>
                  <span className="gradient-text">Effortlessly.</span>
                </span>
              </div>
            </h1>
          </div>

          {/* Subheadline */}
          <p ref={subtextRef} style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', color: 'var(--text-secondary)',
            lineHeight: 1.65, maxWidth: 460, marginBottom: 36, opacity: 0,
          }}>
            The all-in-one platform that supercharges your team's productivity.{' '}
            Automate workflows, ship faster, and grow without limits.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="hero-cta-row" style={{ opacity: 0 }}>
            <button
              className="btn-glow"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }}
            >
              Start Free Trial
            </button>
            <button className="btn-ghost">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch Demo
            </button>
          </div>

          {/* Social proof */}
          <div style={{
            marginTop: 32, display: 'flex', alignItems: 'center', gap: 12,
            fontSize: '0.8rem', color: 'var(--text-muted)',
          }}>
            <div style={{ display: 'flex' }}>
              {['#7C3AED', '#3B82F6', '#8B5CF6', '#60A5FA'].map((c, i) => (
                <div key={i} style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: c, border: '2.5px solid var(--bg-primary)',
                  marginLeft: i > 0 ? -9 : 0,
                }} />
              ))}
            </div>
            <span>
              Trusted by <strong style={{ color: 'var(--text-secondary)' }}>10,000+</strong> teams worldwide
            </span>
          </div>
        </div>

        {/* ── Right: 3D browser mockup ── */}
        <div
          className="hero-mockup-outer"
          style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {/* Glow beneath */}
          <div style={{
            position: 'absolute', bottom: -40, left: '50%',
            transform: 'translateX(-50%)',
            width: '65%', height: 70,
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.55) 0%, transparent 70%)',
            filter: 'blur(26px)',
            zIndex: 0,
            pointerEvents: 'none',
          }} />

          {/* GSAP fade-in wrapper */}
          <div ref={mockupRef} style={{ width: '100%', opacity: 0, position: 'relative', zIndex: 1 }}>

            {/* CSS float + tilt wrapper */}
            <div className="mockup-float" style={{
              width: '100%', maxWidth: 520,
              background: 'rgba(9,9,20,0.98)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: `
                0 32px 72px rgba(0,0,0,0.6),
                0 0 0 1px rgba(255,255,255,0.05),
                inset 0 1px 0 rgba(255,255,255,0.09),
                0 0 80px rgba(124,58,237,0.1)
              `,
            }}>

              {/* Browser chrome */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                padding: '11px 14px',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                {/* Traffic lights */}
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
                </div>
                {/* URL bar */}
                <div style={{
                  flex: 1, background: 'rgba(255,255,255,0.06)',
                  borderRadius: 6, padding: '4px 10px',
                  fontSize: '0.68rem', color: 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  app.lumina.io/dashboard
                </div>
              </div>

              {/* Dashboard body */}
              <div style={{ display: 'flex', height: 312 }}>

                {/* Sidebar */}
                <div style={{
                  width: 118, flexShrink: 0,
                  background: 'rgba(255,255,255,0.02)',
                  borderRight: '1px solid rgba(255,255,255,0.05)',
                  padding: '14px 10px',
                }}>
                  <div style={{
                    fontWeight: 700, fontSize: '0.68rem', color: '#8B5CF6',
                    marginBottom: 16, paddingLeft: 4,
                  }}>
                    ◈ Lumina
                  </div>
                  {SIDEBAR_ITEMS.map((item, i) => (
                    <div key={i} style={{
                      padding: '5px 8px', borderRadius: 6,
                      fontSize: '0.63rem',
                      color: i === 0 ? '#f0f0f5' : 'var(--text-muted)',
                      background: i === 0 ? 'rgba(124,58,237,0.28)' : 'transparent',
                      marginBottom: 2,
                    }}>
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div style={{ flex: 1, padding: '14px', overflow: 'hidden' }}>
                  {/* Section header */}
                  <div style={{ marginBottom: 11 }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
                      Overview
                    </div>
                    <div style={{ fontSize: '0.57rem', color: 'var(--text-muted)' }}>Last 30 days</div>
                  </div>

                  {/* Stat cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
                    {STATS.map((stat, i) => (
                      <div key={i} style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: 7, padding: '8px 7px',
                      }}>
                        <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', marginBottom: 3 }}>{stat.label}</div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{stat.value}</div>
                        <div style={{ fontSize: '0.5rem', color: stat.up ? '#22c55e' : '#f87171' }}>{stat.change}</div>
                      </div>
                    ))}
                  </div>

                  {/* Bar chart */}
                  <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 8, padding: '10px', marginBottom: 10,
                  }}>
                    <div style={{ fontSize: '0.54rem', color: 'var(--text-muted)', marginBottom: 8 }}>Monthly Revenue</div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 54 }}>
                      {BAR_HEIGHTS.map((h, i) => (
                        <div key={i} style={{
                          flex: 1,
                          height: `${h}%`,
                          background: i === 5
                            ? 'linear-gradient(to top, #7C3AED, #60A5FA)'
                            : 'rgba(124,58,237,0.35)',
                          borderRadius: '3px 3px 0 0',
                        }} />
                      ))}
                    </div>
                  </div>

                  {/* Activity feed */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {ACTIVITY.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.57rem' }}>
                        <div style={{
                          width: 5, height: 5, borderRadius: '50%',
                          background: item.dot, flexShrink: 0,
                        }} />
                        <span style={{ color: 'var(--text-secondary)', flex: 1 }}>{item.action}</span>
                        <span style={{ color: 'var(--text-muted)' }}>{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div ref={scrollRef} className="hero-scroll-indicator" style={{
        position: 'absolute', bottom: 32, left: '50%',
        transform: 'translateX(-50%)',
        flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: 0,
      }}>
        <span style={{
          fontSize: '0.7rem', color: 'var(--text-muted)',
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          Scroll
        </span>
        <div style={{
          width: 20, height: 32, borderRadius: 10,
          border: '1.5px solid var(--text-muted)',
          display: 'flex', justifyContent: 'center', paddingTop: 6,
        }}>
          <div style={{
            width: 3, height: 8, borderRadius: 2,
            background: 'var(--text-muted)',
            animation: 'scrollBounce 2s ease-in-out infinite',
          }} />
        </div>
      </div>
    </section>
  )
}
