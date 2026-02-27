import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
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
    <section ref={sectionRef} className="section-padding" style={{ position: 'relative' }}>
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 400,
        background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative' }}>
        <div ref={contentRef} style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto', opacity: 0 }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: 20,
          }}>
            Ready to{' '}
            <span className="gradient-text">think faster?</span>
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: 36,
          }}>
            Join thousands of teams already shipping smarter with Lumina AI.
          </p>

          <form
            onSubmit={e => e.preventDefault()}
            style={{
              display: 'flex',
              gap: 12,
              maxWidth: 460,
              margin: '0 auto 16px',
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: '14px 18px',
                borderRadius: 12,
                border: '1px solid var(--glass-border)',
                background: 'var(--glass-bg)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--purple)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--glass-border)')}
            />
            <button className="btn-glow" type="submit">
              Get Started Free
            </button>
          </form>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            No credit card required. Free forever.
          </p>
        </div>
      </div>
    </section>
  )
}
