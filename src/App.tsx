import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import Showcase from './components/Showcase'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // Page load fade-in
    gsap.fromTo(
      '#root',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
  }, [])

  return (
    <>
      <Nav />
      <Hero />
      <Features />
      <Showcase />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  )
}
