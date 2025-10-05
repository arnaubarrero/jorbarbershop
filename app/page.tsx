
"use client"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { ImageCarousel } from "@/components/image-carousel"
import { Reviews } from "@/components/reviews"
import { Footer } from "@/components/footer"
import { FloatingBubbles } from "@/components/floating-bubbles"

export default function Home() {
  return (
    <main className="min-h-screen relative texture-overlay">
      <FloatingBubbles />
      <Hero />
      <Services />
      <ImageCarousel />
      <Reviews />
      <Footer />
    </main>
  )
}
