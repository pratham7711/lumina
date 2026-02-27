import { useEffect, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav'
// Hero loads eagerly — it's above the fold and must paint immediately
import Hero from './components/Hero'

// Below-fold sections are lazy-loaded so their JS is fetched
// only after Hero has rendered (during idle time / on scroll)
const Features     = lazy(() => import('./components/Features'))
const Showcase     = lazy(() => import('./components/Showcase'))
const Pricing      = lazy(() => import('./components/Pricing'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const CTA          = lazy(() => import('./components/CTA'))
const Footer       = lazy(() => import('./components/Footer'))

gsap.registerPlugin(ScrollTrigger)

/** Section-level shimmer while a lazy component chunk downloads */
function SectionSkeleton({ height = 400 }: { height?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        height,
        background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%)',
        backgroundSize: '400% 100%',
        animation: 'luminaShimmer 1.8s ease-in-out infinite',
      }}
    />
  )
}

export default function App() {
  useEffect(() => {
    gsap.fromTo(
      '#root',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
  }, [])

  return (
    <>
      <style>{`
        @keyframes luminaShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <Nav />

      {/* Hero is critical — renders synchronously */}
      <Hero />

      {/* Below-fold sections stream in as their chunks download */}
      <Suspense fallback={<SectionSkeleton height={500} />}>
        <Features />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={600} />}>
        <Showcase />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={500} />}>
        <Pricing />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={400} />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={300} />}>
        <CTA />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={200} />}>
        <Footer />
      </Suspense>
    </>
  )
}
