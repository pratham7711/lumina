import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function FakeDashboard() {
  return (
    <div
      style={{
        background: '#0c0c1d',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        height: 420,
        fontSize: '0.75rem',
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          borderRight: '1px solid rgba(255,255,255,0.06)',
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.85rem', marginBottom: 16, color: 'var(--purple-light)' }}>
          ◆ Lumina
        </div>
        {['Dashboard', 'Projects', 'Tasks', 'Analytics', 'Team', 'Settings'].map((item, i) => (
          <div
            key={item}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              color: i === 0 ? 'white' : 'var(--text-muted)',
              background: i === 0 ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
              fontWeight: i === 0 ? 600 : 400,
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Overview</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ padding: '4px 10px', borderRadius: 6, background: 'rgba(124,58,237,0.15)', color: 'var(--purple-light)', fontSize: '0.7rem' }}>This Week</div>
            <div style={{ padding: '4px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', fontSize: '0.7rem' }}>This Month</div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { label: 'Tasks Completed', value: '247', change: '+12%', color: '#22c55e' },
            { label: 'Team Velocity', value: '94.2%', change: '+3.1%', color: '#22c55e' },
            { label: 'Active Projects', value: '18', change: '+2', color: 'var(--blue-light)' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: 6 }}>{stat.label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>{stat.value}</span>
                <span style={{ color: stat.color, fontSize: '0.7rem', fontWeight: 600 }}>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Fake chart */}
        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 10, padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: 12 }}>Productivity Trend</span>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 6 }}>
            {[40, 55, 45, 70, 60, 85, 75, 90, 82, 95, 88, 98].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  borderRadius: '4px 4px 0 0',
                  background: `linear-gradient(to top, var(--purple), var(--blue))`,
                  opacity: 0.4 + (i / 12) * 0.6,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FloatingBadge({ text, color, style }: { text: string; color: string; style: React.CSSProperties }) {
  return (
    <div
      className="glass-card floating-badge"
      style={{
        position: 'absolute',
        padding: '8px 16px',
        borderRadius: 20,
        fontSize: '0.8rem',
        fontWeight: 600,
        color,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        animation: 'badgeFloat 3s ease-in-out infinite',
        ...style,
      }}
    >
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
      {text}
    </div>
  )
}

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const dashRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dashRef.current) return
    gsap.fromTo(dashRef.current,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === sectionRef.current) t.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="section-padding" style={{ position: 'relative' }}>
      <style>{`
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .floating-badge {
          z-index: 2;
        }
        .showcase-wrapper {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .floating-badge {
            display: none !important;
          }
          .showcase-wrapper {
            max-width: 100% !important;
          }
        }
        @media (max-width: 600px) {
          .showcase-dashboard {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
          .showcase-sidebar {
            display: none !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .floating-badge {
            animation: none !important;
          }
        }
      `}</style>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="section-label">Product</p>
          <h2 className="section-title">
            Your second brain, <span className="gradient-text">supercharged</span>
          </h2>
        </div>

        <div ref={dashRef} className="showcase-wrapper" style={{ opacity: 0 }}>
          <FakeDashboard />

          <FloatingBadge
            text="98% accuracy"
            color="#22c55e"
            style={{ top: -16, right: -20, animationDelay: '0s' }}
          />
          <FloatingBadge
            text="10x faster"
            color="var(--purple-light)"
            style={{ bottom: 40, left: -30, animationDelay: '1s' }}
          />
          <FloatingBadge
            text="Real-time sync"
            color="var(--blue-light)"
            style={{ top: 80, left: -40, animationDelay: '2s' }}
          />
        </div>
      </div>
    </section>
  )
}
