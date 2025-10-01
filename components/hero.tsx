"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export function Hero() {
  const [selectedLocation, setSelectedLocation] = useState<"esplugas" | "cornella">("esplugas")

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 md:px-6 text-center relative z-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance">Jor Barbershop</h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          Cortes profesionales y estilo moderno en el corazón de Barcelona
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant={selectedLocation === "esplugas" ? "default" : "outline"} onClick={() => setSelectedLocation("esplugas")} className="flex items-center gap-2" >
            <MapPin className="w-4 h-4" />
            Esplugas
          </Button>
          <Button variant={selectedLocation === "cornella" ? "default" : "outline"} onClick={() => setSelectedLocation("cornella")} className="flex items-center gap-2" >
            <MapPin className="w-4 h-4" />
            Cornellà
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          {selectedLocation === "esplugas" ? (
            <p>📍 Carrer Principal 123, Esplugas de Llobregat</p>
          ) : (
            <p>📍 Avinguda Catalunya 456, Cornellà de Llobregat</p>
          )}
        </div>

        <div className="flex flex-col gap-4 justify-center items-center mt-6">
          {selectedLocation === "esplugas" && (
            <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-lg shadow" >
              <a href="https://booksy.com/es-es/31400_jor-barbershop-esplugues_barberia_48788_esplugues-de-llobregat#ba_s=sh_1" target="_blank" rel="noopener noreferrer">
                Reservar en Esplugas
              </a>
            </Button>
          )}
          {selectedLocation === "cornella" && (
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-lg shadow"
            >
              <a
                href="https://booksy.com/es-es/100820_jor-barbershop-cornella_barberia_48776_cornella-de-llobregat#ba_s=sh_1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reservar en Cornellà
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
