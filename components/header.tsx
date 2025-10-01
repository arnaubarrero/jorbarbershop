"use client"


import { Star } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors cursor-pointer bg-transparent border-none p-0"
          onClick={() => router.push("/win")}
          type="button"
        >
          <Star className="w-5 h-5 fill-current" />
          <span className="text-sm font-medium">Gana un corte gratis</span>
        </button>
      </div>
    </header>
  )
}
