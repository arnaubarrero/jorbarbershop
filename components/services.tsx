"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Scissors, Radar as Razor, Sparkles, Clock } from "lucide-react"

const services = {
  esplugas: [
    {
      icon: Scissors,
      name: "Corte de Pelo + Lavado + Peinado",
      price: "15,00 €",
      duration: "30 min",
      description: "Corte, lavado y peinado profesional.",
    },
    {
      icon: Scissors,
      name: "Corte Jubilado",
      price: "11,00 €",
      duration: "30 min",
      description: "Corte especial para jubilados.",
    },
    {
      icon: Razor,
      name: "Corte de Pelo + Barba",
      price: "24,00 €",
      duration: "1h",
      description: "Corte de pelo y arreglo de barba.",
    },
    {
      icon: Razor,
      name: "Arreglar Barba - Ritual Toalla",
      price: "13,00 €",
      duration: "30 min",
      description: "Arreglo de barba con ritual de toalla caliente.",
    },
    {
      icon: Razor,
      name: "Arreglar Barba - Sin Ritual Toalla",
      price: "11,00 €",
      duration: "30 min",
      description: "Arreglo de barba sin ritual de toalla.",
    },
    {
      icon: Scissors,
      name: "Corte Niño - Hasta 10 Años",
      price: "13,00 €",
      duration: "30 min",
      description: "Corte para niños hasta 10 años.",
    },
    {
      icon: Razor,
      name: "Corte + Barba Jubilado",
      price: "22,00 €",
      duration: "1h",
      description: "Corte y barba para jubilados.",
    },
  ],
  cornella: [
    {
      icon: Scissors,
      name: "Corte de Pelo + Lavado + Peinado",
      price: "13,00 €",
      duration: "30 min",
      description: "Corte, lavado y peinado profesional.",
    },
    {
      icon: Razor,
      name: "Corte de Pelo + Barba",
      price: "22,00 €",
      duration: "1h",
      description: "Corte de pelo y arreglo de barba.",
    },
    {
      icon: Scissors,
      name: "Corte Niño - Hasta 10 Años",
      price: "12,50 €",
      duration: "30 min",
      description: "Corte para niños hasta 10 años.",
    },
    {
      icon: Razor,
      name: "Corte + Barba Jubilado",
      price: "18,00 €",
      duration: "1h",
      description: "Corte y barba para jubilados.",
    },
    {
      icon: Razor,
      name: "Arreglar Barba - Ritual Toalla",
      price: "12,00 €",
      duration: "30 min",
      description: "Arreglo de barba con ritual de toalla caliente.",
    },
    {
      icon: Razor,
      name: "Arreglar Barba - Sin Ritual Toalla",
      price: "10,00 €",
      duration: "30 min",
      description: "Arreglo de barba sin ritual de toalla.",
    },
    {
      icon: Scissors,
      name: "Corte Jubilado",
      price: "10,00 €",
      duration: "30 min",
      description: "Corte especial para jubilados.",
    },
  ],
}

export function Services() {
  const [selectedLocation, setSelectedLocation] = useState<"esplugas" | "cornella">("esplugas")
  const currentServices = services[selectedLocation]
  const booksyUrls: Record<string, string> = {
    esplugas:
      "https://booksy.com/es-es/31400_jor-barbershop-esplugues_barberia_48788_esplugues-de-llobregat#ba_s=sh_1",
    cornella:
      "https://booksy.com/es-es/100820_jor-barbershop-cornella_barberia_48776_cornella-de-llobregat#ba_s=sh_1",
  }

  return (
    <section className="py-16 px-4 md:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Nuestros Servicios
          </h2>
          <p className="text-muted-foreground text-lg mb-8 text-pretty max-w-2xl mx-auto">
            Precios y servicios disponibles en nuestros locales
          </p>

          <div className="flex justify-center mb-10">
            <div className="bg-card/30 backdrop-blur-md rounded-full p-2 border border-border/50">
              <div className="flex gap-2">
                <Button
                  variant={selectedLocation === "esplugas" ? "default" : "ghost"}
                  onClick={() => setSelectedLocation("esplugas")}
                  className={`rounded-full px-6 py-2 text-base font-medium transition-all duration-300 ${
                    selectedLocation === "esplugas"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  Esplugas
                </Button>
                <Button
                  variant={selectedLocation === "cornella" ? "default" : "ghost"}
                  onClick={() => setSelectedLocation("cornella")}
                  className={`rounded-full px-6 py-2 text-base font-medium transition-all duration-300 ${
                    selectedLocation === "cornella"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  Cornellà
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {currentServices.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="group bg-card/20 backdrop-blur-md border border-border/30 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {service.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{service.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{service.price}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-4">
                  <p className="text-muted-foreground text-sm leading-relaxed text-pretty mb-3">
                    {service.description}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <a href={booksyUrls[selectedLocation]} target="_blank" rel="noopener noreferrer">
                      Reservar
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
