import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Engineering Lead',
    company: 'Vercel',
    initials: 'SC',
    color: '#7C3AED',
    quote: 'Lumina completely transformed how our team plans sprints. We went from 3-hour planning sessions to 30 minutes. The AI suggestions are scarily accurate.',
  },
  {
    name: 'Marcus Rivera',
    role: 'Product Manager',
    company: 'Stripe',
    initials: 'MR',
    color: '#3B82F6',
    quote: "I've tried every productivity tool out there. Lumina is the first one that actually understands context. It feels like having a brilliant co-pilot for every project.",
  },
  {
    name: 'Aisha Patel',
    role: 'CTO',
    company: 'Linear',
    initials: 'AP',
    color: '#22c55e',
    quote: 'We rolled Lumina out to our entire 200-person org. Adoption was instant — people genuinely love using it. Our team velocity improved by 40% in the first month.',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardsRef.current) return
    const cards = cardsRef.current.querySelectorAll('.testimonial-card')

    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
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
    <section id="about" ref={sectionRef} className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="section-label">Testimonials</p>
          <h2 className="section-title">
            Loved by <span className="gradient-text">10,000+ teams</span>
          </h2>
        </div>

        <div
          ref={cardsRef}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card glass-card"
              style={{ padding: '32px 28px', opacity: 0 }}
            >
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: 24,
                fontStyle: 'italic',
              }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: t.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    color: 'white',
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {t.role} at {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
