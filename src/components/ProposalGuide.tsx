import { useEffect, useRef, useState } from "react"
import { Lottie } from "lottie-react"
import { X } from "lucide-react"
import { GUIDE_INTRO, GUIDE_TOPICS } from "../config/partnership"
import { HEART_PULSE, TYPING_DOTS } from "../data/lottie"

const NAVY = "#1B3A6B"
const BLUE = "#4A7AB5"
const MIST = "#C8DCF0"

const TYPING_DELAY_MS = 700
const TYPE_INTERVAL_MS = 14

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/*  Guia flutuante no canto superior direito: explica cada seção e rola até ela.  */
export default function ProposalGuide() {
  const [open, setOpen]         = useState(false)
  const [hint, setHint]         = useState(false)
  const [topicId, setTopicId]   = useState<string | null>(null)
  const [typing, setTyping]     = useState(false)
  const [typed, setTyped]       = useState("")
  const timers                  = useRef<number[]>([])
  const bodyRef                 = useRef<HTMLDivElement>(null)

  const topic = GUIDE_TOPICS.find((item) => item.id === topicId) ?? null

  useEffect(() => {
    const id = window.setTimeout(() => setHint(true), 2500)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    timers.current.forEach((id) => window.clearInterval(id))
    timers.current = []
    setTyped("")
    if (!topic) return

    if (reduceMotion()) {
      setTyping(false)
      setTyped(topic.text)
      return
    }

    setTyping(true)
    const start = window.setTimeout(() => {
      setTyping(false)
      let index = 0
      const tick = window.setInterval(() => {
        index += 1
        setTyped(topic.text.slice(0, index))
        if (index >= topic.text.length) window.clearInterval(tick)
      }, TYPE_INTERVAL_MS)
      timers.current.push(tick)
    }, TYPING_DELAY_MS)
    timers.current.push(start)

    return () => {
      window.clearTimeout(start)
      timers.current.forEach((id) => window.clearInterval(id))
    }
  }, [topic])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [typed, typing])

  const openGuide = () => {
    setHint(false)
    setOpen(true)
  }

  const goToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) section.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" })
  }

  return (
    <>
      <style>{`
        @keyframes guide-in   { from { opacity: 0; transform: translateY(-10px) scale(0.97) } to { opacity: 1; transform: none } }
        @keyframes guide-hint { from { opacity: 0; transform: translateX(8px) } to { opacity: 1; transform: none } }
        @keyframes guide-ring { 0% { transform: scale(1); opacity: 0.55 } 100% { transform: scale(1.9); opacity: 0 } }
        @keyframes guide-line { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
        .guide-panel { animation: guide-in 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.2) both }
        .guide-hint  { animation: guide-hint 0.4s ease both }
        .guide-ring  { animation: guide-ring 2.2s ease-out infinite }
        .guide-line  { animation: guide-line 0.3s ease both }
        .guide-chip:hover { background: ${NAVY} !important; color: white !important }
        @media (prefers-reduced-motion: reduce) { .guide-panel, .guide-hint, .guide-ring, .guide-line { animation: none } }
      `}</style>

      <div className="fixed right-4 top-4 z-50 flex flex-col items-end gap-3" style={{ fontFamily: "Inter, Poppins, sans-serif" }}>
        {!open && (
          <div className="flex flex-col items-end gap-2">
            <button onClick={openGuide} aria-label="Abrir o guia da proposta" className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg"
              style={{ border: `2px solid ${BLUE}` }}>
              <span className="guide-ring absolute inset-0 rounded-full" style={{ border: `2px solid ${BLUE}` }} />
              <Lottie src={HEART_PULSE} loop autoplay={!reduceMotion()} style={{ width: 34, height: 34 }} />
            </button>
            {hint && (
              <button onClick={openGuide} className="guide-hint rounded-xl bg-white px-3 py-2 text-sm font-medium shadow-lg"
                style={{ color: NAVY, border: `1px solid ${MIST}` }}>
                Quer que eu explique a proposta?
              </button>
            )}
          </div>
        )}

        {open && (
          <div className="guide-panel flex w-[340px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            style={{ border: `1px solid ${MIST}`, maxHeight: "min(72vh, 620px)" }}>
            <div className="flex items-center gap-3 px-4 py-3 text-white" style={{ background: NAVY }}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
                <Lottie src={HEART_PULSE} loop autoplay={!reduceMotion()} style={{ width: 24, height: 24 }} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ fontFamily: "Poppins, Inter, sans-serif" }}>Guia da proposta</p>
                <p className="text-[11px] opacity-70">Explico cada parte em poucas linhas</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Fechar o guia" className="rounded-full p-1.5 transition hover:bg-white/15">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={bodyRef} className="flex flex-col gap-3 overflow-y-auto px-4 py-4 text-sm" style={{ color: "#2F3A4A" }}>
              <div className="guide-line max-w-[92%] rounded-2xl rounded-tl-md px-3.5 py-2.5 leading-relaxed" style={{ background: "#f0f6ff" }}>
                {GUIDE_INTRO}
              </div>
              <div className="flex flex-wrap gap-2">
                {GUIDE_TOPICS.map((item) => (
                  <button key={item.id} onClick={() => setTopicId(item.id)}
                    className="guide-chip rounded-full px-3 py-1.5 text-xs font-medium transition"
                    style={item.id === topicId
                      ? { background: NAVY, color: "white", border: `1px solid ${NAVY}` }
                      : { background: "white", color: NAVY, border: `1px solid ${MIST}` }}>
                    {item.label}
                  </button>
                ))}
              </div>
              {topic && (
                <div className="guide-line flex flex-col gap-2">
                  <div className="self-end rounded-2xl rounded-tr-md px-3.5 py-2 text-white" style={{ background: BLUE }}>{topic.label}</div>
                  <div className="max-w-[92%] rounded-2xl rounded-tl-md px-3.5 py-2.5 leading-relaxed" style={{ background: "#f0f6ff", minHeight: 42 }}>
                    {typing ? <Lottie src={TYPING_DOTS} loop style={{ width: 44, height: 18 }} /> : typed}
                  </div>
                  {!typing && typed.length === topic.text.length && (
                    <button onClick={() => goToSection(topic.id)} className="guide-line self-start text-xs font-semibold underline underline-offset-4" style={{ color: NAVY }}>
                      Me leva até lá
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
