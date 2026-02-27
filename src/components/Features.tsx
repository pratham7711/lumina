import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const features = [
  {
    icon: '✍️',
    title: 'AI Writing',
    description: 'Generate polished copy, docs, and emails in your voice. Context-aware and always on-brand.',
  },
  {
    icon: '⚡',
    title: 'Smart Tasks',
    description: 'Automatically break down goals into actionable tasks with deadlines, priorities, and dependencies.',
  },
  {
    icon: '🔄',
    title: 'Team Sync',
    description: 'Real-time collaboration with intelligent conflict resolution and automatic status updates.',
  },
  {
    icon: '📊',
    title: 'Analytics',
    description: 'Deep insights into team productivity with custom dashboards and automated weekly reports.',
  },
  {
    icon: '🔗',
    title: 'Integrations',
    description: 'Connect with Slack, GitHub, Notion, Linear, and 200+ tools out of the box.',
  },
  {
    icon: '🎙️',
    title: 'Voice Commands',
    description: 'Capture ideas hands-free. Voice-to-task conversion with natural language understanding.',
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardsRef.current) return
    const cards = cardsRef.current.querySelectorAll('.feature-card')

    gsap.fromTo(cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
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
    <section
      id="features"
      ref={sectionRef}
      className="section-padding"
      style={{ position: 'relative' }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p className="section-label">Features</p>
          <h2 className="section-title">
            Everything you need to <span className="gradient-text">move fast</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Lumina AI combines the power of artificial intelligence with intuitive design to supercharge your workflow.
          </p>
        </div>

        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card glass-card"
              style={{
                padding: '32px 28px',
                transition: 'all 0.3s ease',
                cursor: 'default',
                opacity: 0,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.transform = 'translateY(-6px)'
                el.style.borderColor = 'var(--border-glow)'
                el.style.boxShadow = '0 8px 40px rgba(124, 58, 237, 0.12)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.transform = 'translateY(0)'
                el.style.borderColor = 'var(--glass-border)'
                el.style.boxShadow = 'none'
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'rgba(124, 58, 237, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  marginBottom: 20,
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 10 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
