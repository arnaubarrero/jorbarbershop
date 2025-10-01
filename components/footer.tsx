"use client"
import { Instagram } from "lucide-react"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 py-12 px-4 md:px-6 relative z-10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className="font-bold text-primary">📞 935047814</span>
            <span className="text-muted-foreground">Esplugues</span>
          </div>
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className="font-bold text-primary">📞 930884224</span>
            <span className="text-muted-foreground">Cornellà</span>
          </div>
        </div>

        <a href="https://www.instagram.com/jorbarbershop/#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-lg font-semibold" >
          <Instagram className="w-6 h-6" />
          @jorbarbershop
        </a>
        <div className="text-xs text-muted-foreground text-center md:text-right mt-4 md:mt-0">
          &copy; {year} Jor Barbershop. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
