import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from 'next/script'
import "./globals.css"

export const metadata: Metadata = {
  title: "Jor Barbershop - Esplugas & Cornellà",
  description: "Barbería profesional en Esplugas y Cornellà. Cortes modernos y clásicos.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        {/* Google AdSense - carga asíncrona global */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7101792626537818"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} relative min-h-screen`}>
        {/* Fondo de barbería */}
        <div className="fixed inset-0 -z-10">
          <img
            src="/modern-barber-shop-interior-with-dark-aesthetic.jpg"
            alt="Barbería fondo"
            className="w-full h-full object-cover"
            draggable="false"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
