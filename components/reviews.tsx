"use client"


import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    name: "Carlos M.",
    rating: 5,
    comment:
      "Excelente servicio, siempre salgo muy contento. Los profesionales son muy atentos y el ambiente es genial.",
    location: "Esplugas",
  },
  {
    name: "Miguel R.",
    rating: 5,
    comment: "La mejor barbería de la zona. Corte perfecto y precios muy justos. Totalmente recomendable.",
    location: "Cornellà",
  },
  {
    name: "David L.",
    rating: 5,
    comment: "Llevo años viniendo aquí y nunca me han decepcionado. Profesionalidad y calidad en cada visita.",
    location: "Esplugas",
  },
  {
    name: "Jordi P.",
    rating: 5,
    comment: "Ambiente familiar y trato cercano. Se nota que les gusta lo que hacen. Mi barbería de confianza.",
    location: "Cornellà",
  },
  {
    name: "Alex S.",
    rating: 5,
    comment: "Cortes modernos y clásicos, siempre adaptándose a lo que pides. Muy profesionales y puntuales.",
    location: "Esplugas",
  },
  {
    name: "Marc T.",
    rating: 5,
    comment: "Calidad-precio insuperable. Siempre consiguen el corte exacto que tengo en mente. Muy recomendable.",
    location: "Cornellà",
  },
]

export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  return (
    <section className="py-16 px-4 md:px-6 relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-muted-foreground text-lg text-pretty max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación
          </p>
        </div>

        <div className="relative overflow-hidden rounded-lg bg-card/20 backdrop-blur-sm">
          <div className="relative h-64 md:h-72">
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${
                  index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Card className="group bg-card/20 backdrop-blur-md border border-border/30 shadow-xl shadow-primary/10 overflow-hidden relative w-full max-w-xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <Quote className="w-5 h-5 text-primary/50" />
                    </div>
                    <p className="text-foreground text-sm leading-relaxed mb-4 text-pretty">"{review.comment}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.location}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">{review.name.charAt(0)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={goToPrevious}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={goToNext}
            aria-label="Siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary" : "bg-white/30"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir a la opinión ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-card/10 backdrop-blur-sm rounded-2xl p-6 border border-border/20 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-2xl font-bold text-primary">4.9</span>
            </div>
            <p className="text-muted-foreground">Basado en más de 200 reseñas verificadas</p>
          </div>
        </div>
      </div>
    </section>
  )
}
