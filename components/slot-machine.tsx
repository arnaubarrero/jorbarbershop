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
  const [animatingSlots, setAnimatingSlots] = useState([false, false, false])
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
      background: '#1a1a1a',
      color: '#fff',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off',
        style: 'background:#2a2a2a;color:#fff;border-radius:8px;padding:12px 16px;border:2px solid #444;'
      },
      customClass: {
        popup: 'swal2-dark',
        confirmButton: 'bg-gradient-to-b from-yellow-400 to-yellow-600 text-black font-bold rounded-lg px-8 py-3 hover:from-yellow-500 hover:to-yellow-700',
        title: 'text-white text-2xl',
        input: 'text-white text-lg',
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
  }, [])

  const spin = () => {
    if (spinning || !phone) {
      if (!phone) askPhone()
      return
    }

    setLeverDown(true)
    setSpinning(true)
    setResult(null)
    setAnimatingSlots([true, true, true])

    if (leverTimeout.current) clearTimeout(leverTimeout.current)
    leverTimeout.current = setTimeout(() => setLeverDown(false), 400)

    const durations = [2000, 2500, 3000]
    const finalSlots = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]

    durations.forEach((duration, index) => {
      let spins = 0
      const maxSpins = Math.floor(duration / 80)

      const interval = setInterval(() => {
        setSlots(prev => {
          const newSlots = [...prev]
          newSlots[index] = getRandomSymbol()
          return newSlots
        })
        spins++

        if (spins >= maxSpins) {
          clearInterval(interval)
          setTimeout(() => {
            setSlots(prev => {
              const newSlots = [...prev]
              newSlots[index] = finalSlots[index]
              return newSlots
            })
            setAnimatingSlots(prev => {
              const newAnimating = [...prev]
              newAnimating[index] = false
              return newAnimating
            })

            if (index === 2) {
              setSpinning(false)
              setTimeout(() => {
                if (finalSlots[0] === finalSlots[1] && finalSlots[1] === finalSlots[2]) {
                  setResult("¡Felicidades! Has ganado un corte gratis ✂️")
                  Swal.fire({
                    title: '¡JACKPOT!',
                    html: `<div class="text-6xl mb-4">${finalSlots[0]}</div><p class="text-xl">¡Has ganado un corte gratis!</p>`,
                    icon: 'success',
                    background: '#1a1a1a',
                    color: '#fff',
                    confirmButtonText: 'Reclamar premio',
                    customClass: {
                      popup: 'swal2-dark',
                      confirmButton: 'bg-gradient-to-b from-green-400 to-green-600 text-white font-bold rounded-lg px-8 py-3',
                    }
                  })
                  localStorage.removeItem('jor_phone')
                  setPhone(null)
                } else {
                  setResult("Sigue probando tu suerte...")
                }
              }, 300)
            }
          }, 100)
        }
      }, 80)
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="relative flex flex-row items-start justify-center w-full max-w-6xl">
        {/* Palanca mejorada */}
        <div className="absolute left-0 top-32 md:top-40 lg:-left-20 flex flex-col items-center z-20 select-none">
          <div className="relative">
            <div
              className={`w-5 h-32 md:w-6 md:h-40 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 rounded-full shadow-2xl border-2 border-gray-500 origin-top transition-all duration-500 relative overflow-hidden ${leverDown ? 'rotate-[45deg]' : 'rotate-0'}`}
              style={{
                transitionTimingFunction: leverDown ? 'cubic-bezier(.4,2,.6,1)' : 'cubic-bezier(.2,0,.2,1)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5), inset -2px 0 4px rgba(255,255,255,0.3), inset 2px 0 4px rgba(0,0,0,0.3)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
            <div
              className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-b from-red-500 via-red-600 to-red-800 rounded-full border-4 border-yellow-400 shadow-2xl mt-[-8px] flex items-center justify-center transition-all duration-300 relative overflow-hidden ${leverDown ? 'scale-95 shadow-inner' : 'scale-100'}`}
              style={{
                boxShadow: leverDown
                  ? 'inset 0 4px 8px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)'
                  : '0 6px 20px rgba(239,68,68,0.6), inset 0 -2px 4px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full" />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent rounded-b-full" />
            </div>
          </div>
        </div>

        {/* Máquina principal */}
        <div className="relative w-full max-w-2xl">
          {/* Marco exterior con efecto 3D */}
          <div className="relative bg-gradient-to-b from-yellow-500 via-yellow-400 to-yellow-600 rounded-3xl p-1 shadow-2xl border-8 border-yellow-600"
            style={{
              boxShadow: '0 20px 60px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -2px 8px rgba(0,0,0,0.3)'
            }}
          >
            {/* Brillo superior del marco */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/30 to-transparent rounded-t-3xl pointer-events-none" />

            {/* Luces superiores mejoradas */}
            <div className="absolute left-1/2 -top-8 -translate-x-1/2 flex gap-2 md:gap-3 z-10">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="relative">
                  <span
                    className={`block w-5 h-5 md:w-6 md:h-6 rounded-full border-3 border-gray-800 shadow-lg transition-all duration-300 ${spinning
                        ? 'bg-gradient-to-br from-red-300 via-red-500 to-red-700 animate-pulse'
                        : 'bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400'
                      }`}
                    style={{
                      boxShadow: spinning
                        ? '0 0 20px rgba(239,68,68,0.8), inset 0 2px 4px rgba(255,255,255,0.4)'
                        : '0 2px 8px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.4)',
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                  {spinning && (
                    <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75" style={{ animationDelay: `${i * 0.1}s` }} />
                  )}
                </div>
              ))}
            </div>

            {/* Panel superior decorativo */}
            <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-t-2xl px-4 py-3 md:px-8 md:py-4 border-b-4 border-yellow-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
              <div className="text-center relative z-10">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 tracking-wider drop-shadow-lg"
                  style={{
                    textShadow: '0 2px 10px rgba(250,204,21,0.5), 0 0 30px rgba(250,204,21,0.3)',
                    fontFamily: 'Impact, sans-serif'
                  }}
                >
                  BARBER SLOT
                </h1>
              </div>
            </div>

            {/* Área de slots */}
            <div className="bg-gradient-to-b from-gray-950 via-black to-gray-950 rounded-b-2xl px-4 py-8 md:px-12 md:py-12 flex flex-col items-center relative overflow-hidden">
              {/* Efecto de luz ambiental */}
              <div className="absolute inset-0 bg-gradient-radial from-yellow-900/20 via-transparent to-transparent opacity-50" />

              {/* Ventanas de los slots con marco realista */}
              <div className="relative mb-8 md:mb-10">
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-2xl transform -rotate-1"
                  style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.8)' }}
                />
                <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-3 md:p-4 border-4 border-yellow-700"
                  style={{ boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)' }}
                >
                  <div className="flex gap-2 md:gap-4">
                    {slots.map((s, i) => (
                      <div
                        key={i}
                        className="relative w-24 h-32 md:w-32 md:h-44 lg:w-40 lg:h-52 flex items-center justify-center bg-gradient-to-b from-gray-100 to-white rounded-xl border-4 border-gray-400 shadow-2xl overflow-hidden"
                        style={{
                          filter: animatingSlots[i] ? "blur(3px)" : "none",
                          transition: "filter 0.2s",
                          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.4)'
                        }}
                      >
                        {/* Efecto de cristal */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-300/20 to-transparent pointer-events-none" />

                        {/* Símbolo */}
                        <span
                          className={`text-6xl md:text-7xl lg:text-8xl transition-all duration-200 relative z-10 ${animatingSlots[i] ? 'scale-110' : 'scale-100'}`}
                          style={{
                            filter: animatingSlots[i] ? 'blur(2px)' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                            animation: animatingSlots[i] ? 'slot-spin 0.08s linear infinite' : 'none'
                          }}
                        >
                          {s}
                        </span>

                        {/* Líneas de movimiento cuando gira */}
                        {animatingSlots[i] && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-slide-down" />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-slide-down-delayed" />
                          </>
                        )}

                        {/* Reflejo de cristal */}
                        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón de jugar mejorado */}
              <button
                className="relative px-12 py-4 md:px-16 md:py-5 bg-gradient-to-b from-red-500 via-red-600 to-red-800 text-white rounded-full font-black text-xl md:text-2xl shadow-2xl transition-all duration-200 disabled:opacity-50 border-4 border-yellow-400 group overflow-hidden"
                onClick={spin}
                disabled={spinning}
                style={{
                  boxShadow: spinning
                    ? 'inset 0 4px 12px rgba(0,0,0,0.6), 0 4px 20px rgba(239,68,68,0.4)'
                    : '0 8px 30px rgba(239,68,68,0.6), inset 0 -4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)',
                  transform: spinning ? 'translateY(2px)' : 'translateY(0)',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <span className="relative z-10 tracking-wider">
                  {spinning ? "GIRANDO..." : "JUGAR"}
                </span>
              </button>

              {/* Resultado con animación */}
              {result && (
                <div className="mt-8 text-center relative">
                  <div
                    className="text-lg md:text-2xl font-bold text-yellow-400 animate-bounce px-6 py-3 bg-black/50 rounded-xl border-2 border-yellow-500 backdrop-blur-sm"
                    style={{
                      textShadow: '0 0 20px rgba(250,204,21,0.8), 0 2px 4px rgba(0,0,0,0.8)',
                      animation: 'bounce 1s ease-in-out infinite, glow 2s ease-in-out infinite'
                    }}
                  >
                    {result}
                  </div>
                </div>
              )}
            </div>

            {/* Luces inferiores mejoradas */}
            <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 flex gap-2 md:gap-3 z-10">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="relative">
                  <span
                    className={`block w-5 h-5 md:w-6 md:h-6 rounded-full border-3 border-gray-800 shadow-lg transition-all duration-300 ${spinning
                        ? 'bg-gradient-to-br from-red-300 via-red-500 to-red-700 animate-pulse'
                        : 'bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400'
                      }`}
                    style={{
                      boxShadow: spinning
                        ? '0 0 20px rgba(239,68,68,0.8), inset 0 2px 4px rgba(255,255,255,0.4)'
                        : '0 2px 8px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.4)',
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                  {spinning && (
                    <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75" style={{ animationDelay: `${i * 0.1}s` }} />
                  )}
                </div>
              ))}
            </div>

            {/* Sombra inferior del marco */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent rounded-b-3xl pointer-events-none" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slot-spin {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes slide-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes slide-down-delayed {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(250,204,21,0.5), 0 0 40px rgba(250,204,21,0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(250,204,21,0.8), 0 0 60px rgba(250,204,21,0.5);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.3s linear infinite;
        }

        .animate-slide-down-delayed {
          animation: slide-down 0.3s linear infinite;
          animation-delay: 0.15s;
        }
      `}</style>
    </div>
  )
}
