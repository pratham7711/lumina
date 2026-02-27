import { useEffect, useRef, useState } from 'react'
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
  const [activeIndex, setActiveIndex] = useState(0)

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

  const prev = () => setActiveIndex(i => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setActiveIndex(i => (i + 1) % testimonials.length)

  return (
    <section id="about" ref={sectionRef} className="section-padding">
      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .testimonials-carousel {
          display: none;
        }
        @media (max-width: 768px) {
          .testimonials-grid {
            display: none !important;
          }
          .testimonials-carousel {
            display: block;
          }
        }
        .carousel-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .carousel-btn:hover {
          border-color: var(--purple);
          background: rgba(124, 58, 237, 0.1);
        }
        .carousel-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--glass-border);
          transition: all 0.2s;
          cursor: pointer;
        }
        .carousel-dot.active {
          background: var(--purple-light);
          width: 20px;
          border-radius: 3px;
        }
      `}</style>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="section-label">Testimonials</p>
          <h2 className="section-title">
            Loved by <span className="gradient-text">10,000+ teams</span>
          </h2>
        </div>

        {/* Desktop: 3-col grid */}
        <div ref={cardsRef} className="testimonials-grid">
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
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: t.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.8rem', color: 'white',
                }}>
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

        {/* Mobile: carousel */}
        <div className="testimonials-carousel">
          <div className="glass-card" style={{ padding: '28px 24px', marginBottom: 24 }}>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: 24,
              fontStyle: 'italic',
            }}>
              "{testimonials[activeIndex].quote}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: testimonials[activeIndex].color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.8rem', color: 'white',
                flexShrink: 0,
              }}>
                {testimonials[activeIndex].initials}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{testimonials[activeIndex].name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <button className="carousel-btn" onClick={prev} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className={`carousel-dot${i === activeIndex ? ' active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
            <button className="carousel-btn" onClick={next} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
