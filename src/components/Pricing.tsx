import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const plans = [
  {
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'For individuals getting started',
    features: [
      '5 AI-generated plans per day',
      'Basic task management',
      '1 project workspace',
      'Community support',
      '500MB storage',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 24,
    yearlyPrice: 19,
    description: 'For professionals who ship fast',
    features: [
      'Unlimited AI generations',
      'Advanced task automation',
      'Unlimited projects',
      'Priority support',
      '50GB storage',
      'Custom integrations',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Team',
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: 'For teams that move together',
    features: [
      'Everything in Pro',
      'Team collaboration hub',
      'Admin & permissions',
      'SSO & SAML',
      '500GB storage',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export default function Pricing() {
  const [yearly, setYearly] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardsRef.current) return
    const cards = cardsRef.current.querySelectorAll('.pricing-card')

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
    <section id="pricing" ref={sectionRef} className="section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="section-label">Pricing</p>
          <h2 className="section-title">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto 32px' }}>
            Start free, upgrade when you're ready. No hidden fees.
          </p>

          {/* Toggle */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '6px 8px' }}>
            <button
              onClick={() => setYearly(false)}
              style={{
                padding: '8px 20px',
                borderRadius: 8,
                fontSize: '0.85rem',
                fontWeight: 600,
                color: !yearly ? 'white' : 'var(--text-muted)',
                background: !yearly ? 'var(--purple)' : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              style={{
                padding: '8px 20px',
                borderRadius: 8,
                fontSize: '0.85rem',
                fontWeight: 600,
                color: yearly ? 'white' : 'var(--text-muted)',
                background: yearly ? 'var(--purple)' : 'transparent',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              Yearly
              <span style={{
                background: 'rgba(34, 197, 94, 0.15)',
                color: '#22c55e',
                padding: '2px 8px',
                borderRadius: 6,
                fontSize: '0.7rem',
                fontWeight: 700,
              }}>
                -20%
              </span>
            </button>
          </div>
        </div>

        <div
          ref={cardsRef}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'start' }}
        >
          {plans.map((plan, i) => (
            <div
              key={i}
              className="pricing-card glass-card"
              style={{
                padding: '36px 32px',
                opacity: 0,
                position: 'relative',
                borderColor: plan.highlighted ? 'var(--border-glow)' : undefined,
                boxShadow: plan.highlighted ? '0 0 40px rgba(124, 58, 237, 0.1)' : undefined,
              }}
            >
              {plan.highlighted && (
                <div
                  style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, var(--purple), var(--blue))',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '4px 16px',
                    borderRadius: 20,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Most Popular
                </div>
              )}

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 4 }}>{plan.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 20 }}>{plan.description}</p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 24 }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 700 }}>
                  ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                {plan.monthlyPrice > 0 && (
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/mo</span>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                {plan.features.map((feature, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>

              <button
                className={plan.highlighted ? 'btn-glow' : 'btn-ghost'}
                style={{ width: '100%' }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
