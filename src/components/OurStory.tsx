import { Heart, Plane, Dog, Infinity, MapPin, Calendar } from "lucide-react"
import StickyReveal from "./Reveal"
import { useNavigate } from "react-router-dom"

const FUN_FACTS = [
  { icon: Plane,    title: "Três Países",   text: "Viagens inesquecíveis, perrengues engraçados e muita milha acumulada juntos." },
  { icon: Dog,      title: "Oliver e Luna", text: "A adoção que transformou nossa rotina e encheu a casa de pelos e alegria." },
  { icon: Infinity, title: "Um Futuro",     text: "A certeza absoluta de que somos o porto seguro um do outro." },
]

const TIMELINE_EVENTS = [
  { date: "Out, 2018", title: "Aquele jantar",   text: "Era pra ser só um café, mas a conversa fluiu por horas. Ali ficou claro que não seria mais um encontro.", side: "top" },
  { date: "Mar, 2019", title: "Primeira viagem", text: "Decidimos viajar juntos pela primeira vez. Cada detalhe confirmava que éramos perfeitos um para o outro.", side: "bottom" },
  { date: "Dez, 2020", title: "Nosso lar",       text: "Mudamos juntos e transformamos quatro paredes em um lar cheio de vida, amor e Oliver.", side: "top" },
  { date: "Jun, 2022", title: "Oliver e Luna",   text: "Adotamos nossos dois companheiros de vida. A casa nunca mais foi a mesma.", side: "bottom" },
  { date: "Out, 2024", title: "O pedido",        text: "Na mesma praça onde tudo começou, ele pediu em casamento.", side: "top" },
  { date: "Out, 2025", title: "Casamento",       text: "E agora, queremos celebrar tudo isso com as pessoas que amamos.", side: "bottom" },
]

export default function OurStory() {
  const navigate = useNavigate()

  return (
    <div className="relative flex flex-col w-full overflow-x-hidden font-sans text-slate-800 dark:text-slate-100">

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }

        /* Timeline mobile: linha vertical à esquerda */
        .timeline-mobile-line::before {
          content: '';
          position: absolute;
          left: 13px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #fda4af, #fecdd3, transparent);
        }
      `}</style>

      {/* ─── BANNER ───────────────────────────────────────── */}
      <div className="sticky top-0 z-50 w-full overflow-hidden bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 py-2 shadow-md md:py-2.5">
        <div className="animate-marquee flex items-center whitespace-nowrap text-white">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.25em] md:mx-10 md:gap-4 md:text-[11px] md:tracking-[0.3em]">
              <span className="text-rose-200/60">✦</span>
              celebrando o amor de
              <span className="rounded-full border border-white/30 bg-white/10 px-3 py-0.5 font-bold tracking-widest md:px-4">
                Luís & Nathalia
              </span>
              04 · 10 · 2025
              <span className="text-rose-200/60">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── SEÇÃO 1 — HERO ───────────────────────────────── */}
      <StickyReveal index={0}>
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 scale-105 bg-cover bg-center" style={{ backgroundImage: 'url("img2.JPG")' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/75" />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <div className="mb-5 flex items-center gap-3 opacity-70">
              <div className="h-[1px] w-8 bg-rose-300 md:w-12" />
              <Heart className="h-3.5 w-3.5 fill-rose-300 text-rose-300 md:h-4 md:w-4" />
              <div className="h-[1px] w-8 bg-rose-300 md:w-12" />
            </div>

            <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.4em] text-rose-200 md:text-[10px]">
              A nossa história
            </p>

            {/* Texto menor no mobile para não cortar */}
            <h1 className="mb-4 font-serif text-[2.8rem] font-bold leading-tight text-white drop-shadow-2xl sm:text-4xl md:text-5xl">
              Luís & Nathalia
            </h1>

            <div className="mt-3 flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
              <span className="flex items-center gap-1.5 text-xs font-light tracking-widest text-white/80 md:text-sm">
                <Calendar className="h-3 w-3 text-rose-300 md:h-3.5 md:w-3.5" />
                04 de Outubro, 2025
              </span>
              <span className="hidden text-white/30 sm:block">·</span>
              <span className="flex items-center gap-1.5 text-xs font-light tracking-widest text-white/80 md:text-sm">
                <MapPin className="h-3 w-3 text-rose-300 md:h-3.5 md:w-3.5" />
                Araguaína, TO
              </span>
            </div>
          </div>

          <div className="animate-float absolute bottom-8 flex flex-col items-center gap-2">
            <span className="text-[8px] uppercase tracking-[0.4em] text-white/50 md:text-[9px]">Deslize</span>
            <div className="flex h-8 w-4 items-start justify-center rounded-full border border-white/30 p-1 md:h-9 md:w-5">
              <div className="h-1.5 w-1 animate-bounce rounded-full bg-white/60" />
            </div>
          </div>
        </div>
      </StickyReveal>

      {/* ─── SEÇÃO 2 — CITAÇÃO ────────────────────────────── */}
      <StickyReveal index={1}>
        <section className="flex min-h-screen w-full items-center justify-center bg-[#fdf9f6] px-6 py-20 dark:bg-slate-900">
          <div className="flex max-w-xl flex-col items-center text-center">
            <span className="mb-2 select-none font-serif text-6xl leading-none text-rose-200 dark:text-rose-900/60 md:text-7xl">"</span>
            {/* Fonte menor no mobile para caber melhor */}
            <p className="font-serif text-lg leading-[1.9] text-slate-600 dark:text-slate-400 md:text-2xl">
              Foi nos detalhes mais simples que construímos o nosso maior amor.
              Cada pequena escolha nos guiou até o altar.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-[1px] w-8 bg-rose-200 md:w-10" />
              <Heart className="h-3.5 w-3.5 fill-rose-300 text-rose-300" />
              <div className="h-[1px] w-8 bg-rose-200 md:w-10" />
            </div>
            <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.3em] text-rose-400">
              Luís e Nathalia
            </p>
          </div>
        </section>
      </StickyReveal>

      {/* ─── SEÇÃO 3 — TIMELINE ───────────────────────────── */}
      <StickyReveal index={2}>
        <section className="flex min-h-screen w-full items-center overflow-hidden bg-white py-20 dark:bg-slate-800/90">
          <div className="mx-auto w-full max-w-6xl px-5 md:px-6">

            <div className="mb-12 text-center md:mb-20">
              <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.4em] text-rose-400">Nossa jornada</p>
              <h2 className="font-serif text-2xl font-bold text-slate-700 dark:text-white md:text-4xl">Como Tudo Começou</h2>
              <div className="mx-auto mt-3 h-[1px] w-14 bg-rose-200" />
            </div>

            {/* ── Desktop: horizontal ── */}
            <div className="relative hidden md:block">
              <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-rose-200 to-transparent dark:via-rose-900/50" />
              <div className="grid grid-cols-6">
                {TIMELINE_EVENTS.map((event, i) => (
                  <div key={i} className="relative flex flex-col items-center">
                    {event.side === "top" ? (
                      <>
                        <div className="mb-4 flex h-36 flex-col items-center justify-end px-2 text-center">
                          <span className="mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-rose-400">{event.date}</span>
                          <h4 className="mb-1 font-serif text-sm font-semibold leading-tight text-slate-700 dark:text-white">{event.title}</h4>
                          <p className="text-[10px] leading-relaxed text-slate-400 dark:text-slate-500">{event.text}</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-8 w-[1px] bg-rose-200 dark:bg-rose-900/50" />
                          <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 shadow-md shadow-rose-200/60">
                            <Heart className="h-3 w-3 fill-white text-white" />
                          </div>
                          <div className="h-8 w-[1px] bg-transparent" />
                        </div>
                        <div className="h-36" />
                      </>
                    ) : (
                      <>
                        <div className="h-36" />
                        <div className="flex flex-col items-center">
                          <div className="h-8 w-[1px] bg-transparent" />
                          <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-rose-300 bg-white shadow-md dark:bg-slate-800">
                            <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                          </div>
                          <div className="h-8 w-[1px] bg-rose-200 dark:bg-rose-900/50" />
                        </div>
                        <div className="mt-4 flex h-36 flex-col items-center px-2 text-center">
                          <span className="mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-rose-400">{event.date}</span>
                          <h4 className="mb-1 font-serif text-sm font-semibold leading-tight text-slate-700 dark:text-white">{event.title}</h4>
                          <p className="text-[10px] leading-relaxed text-slate-400 dark:text-slate-500">{event.text}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Mobile: vertical com linha e cards ── */}
            <div className="relative timeline-mobile-line flex flex-col gap-0 md:hidden">
              {TIMELINE_EVENTS.map((event, i) => (
                <div key={i} className="relative flex items-start gap-5 pb-8">

                  {/* Ponto na linha */}
                  <div className="relative z-10 mt-1 shrink-0">
                    {i % 2 === 0 ? (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 shadow shadow-rose-200">
                        <Heart className="h-3 w-3 fill-white text-white" />
                      </div>
                    ) : (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-rose-300 bg-white dark:bg-slate-800">
                        <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                      </div>
                    )}
                  </div>

                  {/* Card do evento */}
                  <div className="flex-1 rounded-2xl border border-rose-50 bg-[#fdf9f6] p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/80">
                    <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.25em] text-rose-400">
                      {event.date}
                    </span>
                    <h4 className="mb-1.5 font-serif text-base font-semibold text-slate-700 dark:text-white">
                      {event.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {event.text}
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>
      </StickyReveal>
      {/* ─── SEÇÃO 4 — CTA ────────────────────────────────── */}
      <StickyReveal index={4}>
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-6 text-center dark:bg-slate-900">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
            <Heart className="h-[500px] w-[500px] fill-rose-500 text-rose-500" />
          </div>

          <div className="relative z-10 flex w-full max-w-lg flex-col items-center">
            <div className="mb-6 flex items-center gap-3 md:mb-8">
              <div className="h-[1px] w-10 bg-rose-200 md:w-12" />
              <Heart className="h-3.5 w-3.5 fill-rose-300 text-rose-300" />
              <div className="h-[1px] w-10 bg-rose-200 md:w-12" />
            </div>

            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.4em] text-rose-400">
              Junte-se a nós
            </p>

            {/* Título responsivo */}
            <h2 className="mb-4 font-serif text-2xl text-slate-700 dark:text-white sm:text-3xl md:text-4xl">
              Você faz parte<br />desta história.
            </h2>

            <p className="mb-8 text-sm leading-relaxed text-slate-500 dark:text-slate-400 md:mb-10 md:text-base">
              Gostaríamos muito de ter você ao nosso lado neste dia tão especial.
              Confirme sua presença e venha celebrar conosco!
            </p>

            {/* Botão full-width no mobile */}
            <button
              onClick={() => navigate("/rsvp")}
              className="group relative w-full overflow-hidden rounded-full bg-rose-500 px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-xl shadow-rose-200/60 transition-all duration-300 hover:-translate-y-1 hover:bg-rose-600 hover:shadow-2xl hover:shadow-rose-300/50 dark:shadow-rose-900/30 sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center justify-center gap-2">
                <Heart className="h-4 w-4 fill-white" />
                Confirmar Presença
              </span>
            </button>

            <p className="mt-5 text-xs text-slate-400">
              Responda até <span className="font-semibold text-rose-400">15 de Junho de 2025</span>
            </p>
          </div>
        </section>
      </StickyReveal>

    </div>
  )
}
