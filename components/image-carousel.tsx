"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  {
    src: "/img1.jpg",
    alt: "Interior moderno de barbería",
  },
  {
    src: "/img2.jpg",
    alt: "Barbero profesional cortando cabello",
  },
  {
    src: "/img3.jpg",
    alt: "Arreglo de barba profesional",
  },
  {
    src: "/img4.jpg",
    alt: "Herramientas de barbería vintage",
  },
  {
    src: "/img5.jpg",
    alt: "Cliente satisfecho con su nuevo corte de cabello",
  },
  {
    src: "/img6.jpg",
    alt: "Ambiente acogedor de barbería",
  },
]

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  return (
    <section className="py-20 px-4 md:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Nuestro Trabajo</h2>
          <p className="text-muted-foreground text-lg text-pretty">
            Descubre la calidad y profesionalidad de Jor Barbershop
          </p>
        </div>

        <div className="relative overflow-hidden rounded-lg bg-card/20 backdrop-blur-sm">
          <div className="relative h-64 md:h-96">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover carousel-fade"
                />
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={goToNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-primary" : "bg-white/30"
                  }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
