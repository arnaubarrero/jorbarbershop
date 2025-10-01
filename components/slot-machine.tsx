"use client"

import React, { useState, useRef, useEffect } from "react"
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.min.css"

const symbols = [
  "🍀", "💈", "✂️", "💵", "🧔", "🎲", "💎"
]

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)]
}

function getInitialSlots() {
  return [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]
}

export default function SlotMachine() {
  const [slots, setSlots] = useState(getInitialSlots())
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [leverDown, setLeverDown] = useState(false)
  const [phone, setPhone] = useState<string | null>(null)
  const leverTimeout = useRef<NodeJS.Timeout | null>(null)
  const askPhone = async () => {
    const { value: phoneValue } = await Swal.fire({
      title: 'Introduce tu número de teléfono',
      input: 'tel',
      inputLabel: 'Solo lo usaremos si ganas',
      inputPlaceholder: 'Ejemplo: 612345678',
      confirmButtonText: 'Continuar',
      allowOutsideClick: false,
      allowEscapeKey: false,
      background: '#18181b',
      color: '#fff',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off',
        style: 'background:#222;color:#fff;border-radius:8px;padding:8px 12px;'
      },
      customClass: {
        popup: 'swal2-dark',
        confirmButton: 'bg-primary text-white rounded px-6 py-2',
        title: 'text-white',
        input: 'text-white',
      },
      didOpen: () => {
        const input = Swal.getInput();
        if (input) input.focus();
      },
      preConfirm: (value) => {
        if (!value || !/^\d{9}$/.test(value)) {
          Swal.showValidationMessage('Introduce un número válido de 9 dígitos')
        }
        return value
      }
    })
    if (phoneValue) {
      setPhone(phoneValue)
      localStorage.setItem('jor_phone', phoneValue)
    } else {
      await askPhone()
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('jor_phone')
    if (!stored) {
      askPhone()
    } else {
      setPhone(stored)
    }
    // eslint-disable-next-line
  }, [])

  const spin = () => {
    if (spinning || !phone) {
      if (!phone) askPhone()
      return
    }
    setLeverDown(true)
    setSpinning(true)
    setResult(null)
    if (leverTimeout.current) clearTimeout(leverTimeout.current)
    leverTimeout.current = setTimeout(() => setLeverDown(false), 500)
    let spins = 20
    let interval = setInterval(() => {
      setSlots([getRandomSymbol(), getRandomSymbol(), getRandomSymbol()])
      spins--
      if (spins === 0) {
        clearInterval(interval)
        setTimeout(() => {
          const final = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]
          setSlots(final)
          setSpinning(false)
          if (final[0] === final[1] && final[1] === final[2]) {
            setResult("¡Felicidades! Has ganado un corte gratis ✂️")
            localStorage.removeItem('jor_phone')
            setPhone(null)
          } else {
            setResult("Sigue probando tu suerte...")
          }
        }, 200)
      }
    }, 80)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative flex flex-row items-center">
        {/* Palanca decorativa a la izquierda */}
        <div className="absolute -left-16 top-16 flex flex-col items-center z-10 select-none">
          <div
            className={`w-4 h-24 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full shadow-inner border-2 border-gray-400 origin-top transition-transform duration-300 ${leverDown ? 'rotate-[60deg]' : 'rotate-0'}`}
            style={{ transitionTimingFunction: 'cubic-bezier(.4,2,.6,1)' }}
          />
          <div className={`w-10 h-10 bg-red-600 rounded-full border-4 border-white shadow-lg mt-[-10px] flex items-center justify-center ${leverDown ? 'scale-90' : 'scale-100'} transition-transform duration-300`} />
        </div>
        {/* Marco y luces */}
        <div className="relative bg-gradient-to-b from-yellow-400 via-yellow-200 to-yellow-500 rounded-3xl p-2 shadow-2xl border-4 border-yellow-500 max-w-full">
          {/* Luces superiores */}
          <div className="absolute left-1/2 -top-6 -translate-x-1/2 flex gap-2 z-10">
            {[...Array(7)].map((_, i) => (
              <span key={i} className={`w-4 h-4 rounded-full ${spinning ? 'bg-red-400 animate-pulse' : 'bg-yellow-300'} border-2 border-white shadow`} />
            ))}
          </div>
          {/* Slot interior */}
          <div className="bg-black rounded-2xl px-8 py-8 md:px-12 md:py-10 flex flex-col items-center relative">
            <div className="flex gap-4 mb-8">
              {slots.map((s, i) => (
                <div
                  key={i}
                  className="w-20 h-24 md:w-28 md:h-32 flex items-center justify-center text-5xl md:text-7xl bg-white/80 rounded-lg border-4 border-gray-300 shadow-inner mx-1 transition-all duration-200"
                  style={{ filter: spinning ? "blur(2px)" : "none" }}
                >
                  {s}
                </div>
              ))}
            </div>
            <button
              className="px-10 py-3 bg-gradient-to-b from-red-500 to-red-700 text-white rounded-full font-bold text-lg shadow-lg hover:from-red-600 hover:to-red-800 transition disabled:opacity-50 border-2 border-white"
              onClick={spin}
              disabled={spinning}
              style={{ boxShadow: '0 4px 24px 0 rgba(255,0,0,0.2)' }}
            >
              {spinning ? "Girando..." : "Jugar"}
            </button>
            {result && (
              <div className="mt-8 text-center text-yellow-200 text-xl font-semibold animate-fade-in drop-shadow-lg">
                {result}
              </div>
            )}
          </div>
          {/* Luces inferiores */}
          <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 flex gap-2 z-10">
            {[...Array(7)].map((_, i) => (
              <span key={i} className={`w-4 h-4 rounded-full ${spinning ? 'bg-red-400 animate-pulse' : 'bg-yellow-300'} border-2 border-white shadow`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
