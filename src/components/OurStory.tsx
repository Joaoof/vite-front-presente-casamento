import { Heart, Plane, Dog, Infinity, MapPin, Calendar } from "lucide-react"
import StickyReveal from "./Reveal"
import { useNavigate } from "react-router-dom"

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

        .timeline-mobile-line::before {
          content: '';
          position: absolute;
          left: 13px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #4A7AB5, #C8DCF0, transparent);
        }
      `}</style>

      {/* ─── BANNER ───────────────────────────────────────── */}
      <div className="sticky top-0 z-50 w-full overflow-hidden py-2 shadow-md md:py-2.5"
        style={{ background: 'linear-gradient(90deg, #1B3A6B, #4A7AB5, #1B3A6B)' }}>
        <div className="animate-marquee flex items-center whitespace-nowrap text-white">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.25em] md:mx-10 md:gap-4 md:text-[11px] md:tracking-[0.3em]">
              <span className="text-blue-200/60">✦</span>
              celebrando o amor de
              <span className="rounded-full border border-white/30 bg-white/10 px-3 py-0.5 font-bold tracking-widest md:px-4">
                Luís & Natiele
              </span>
              25 · 07 · 2026
              <span className="text-blue-200/60">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── SEÇÃO 1 — HERO ───────────────────────────────── */}
      <StickyReveal index={0}>
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 scale-105 bg-cover bg-center" style={{ backgroundImage: 'url("img2.JPG")' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1B3A6B]/10 via-[#1B3A6B]/40 to-[#1B3A6B]/75" />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <div className="mb-5 flex items-center gap-3 opacity-70">
              <div className="h-[1px] w-8 bg-blue-200 md:w-12" />
              <Heart className="h-3.5 w-3.5 fill-blue-200 text-blue-200 md:h-4 md:w-4" />
              <div className="h-[1px] w-8 bg-blue-200 md:w-12" />
            </div>

            <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.4em] text-blue-200 md:text-[10px]">
              A nossa história
            </p>

            <h1 className="mb-4 font-serif text-[2.8rem] font-bold leading-tight text-white drop-shadow-2xl sm:text-4xl md:text-5xl">
              Luís & Natiele
            </h1>

            <div className="mt-3 flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
              <span className="flex items-center gap-1.5 text-xs font-light tracking-widest text-white/80 md:text-sm">
                <Calendar className="h-3 w-3 text-blue-200 md:h-3.5 md:w-3.5" />
                25 de Julho, 2026
              </span>
              <span className="hidden text-white/30 sm:block">·</span>
              <span className="flex items-center gap-1.5 text-xs font-light tracking-widest text-white/80 md:text-sm">
                <MapPin className="h-3 w-3 text-blue-200 md:h-3.5 md:w-3.5" />
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
        <section className="flex min-h-screen w-full items-center justify-center bg-[#f0f6ff] px-6 py-20 dark:bg-slate-900">
          <div className="flex max-w-xl flex-col items-center text-center">
            {/* Aspas na cor azul claro */}
            <span className="mb-2 select-none font-serif text-6xl leading-none text-[#C8DCF0] dark:text-[#1B3A6B]/60 md:text-7xl">"</span>
            <p className="font-serif text-lg leading-[1.9] text-slate-600 dark:text-slate-400 md:text-2xl">
              Foi nos detalhes mais simples que construímos o nosso maior amor.
              Cada pequena escolha nos guiou até o altar.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-[1px] w-8 bg-[#C8DCF0] md:w-10" />
              <Heart className="h-3.5 w-3.5 fill-[#4A7AB5] text-[#4A7AB5]" />
              <div className="h-[1px] w-8 bg-[#C8DCF0] md:w-10" />
            </div>
            <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.3em] text-[#4A7AB5]">
              Luís e Natiele
            </p>
          </div>
        </section>
      </StickyReveal>

      {/* ─── SEÇÃO 3 — TIMELINE ───────────────────────────── */}
      <StickyReveal index={2}>
  <section className="flex min-h-screen w-full items-center overflow-hidden py-24 dark:bg-slate-800/90"
    style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0f6ff 50%, #ffffff 100%)' }}>
    <div className="mx-auto w-full max-w-6xl px-5 md:px-10">

      {/* ── Cabeçalho ── */}
      <div className="mb-16 flex flex-col items-center text-center md:mb-24">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.35em]"
          style={{ borderColor: '#C8DCF0', color: '#4A7AB5', background: 'rgba(200,220,240,0.2)' }}>
          <Heart className="h-2.5 w-2.5 fill-[#4A7AB5]" />
          Nossa jornada
        </span>
        <h2 className="font-serif text-3xl font-bold md:text-5xl" style={{ color: '#1B3A6B' }}>
          Como Tudo Começou
        </h2>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-[1px] w-12" style={{ background: '#C8DCF0' }} />
          <div className="h-1.5 w-1.5 rounded-full" style={{ background: '#4A7AB5' }} />
          <div className="h-[1px] w-12" style={{ background: '#C8DCF0' }} />
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP — cards alternados com linha central
      ══════════════════════════════════════════ */}
      <div className="relative hidden md:block">

        {/* Linha central vertical */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
          style={{ background: 'linear-gradient(to bottom, transparent, #C8DCF0 10%, #C8DCF0 90%, transparent)' }} />

        <div className="flex flex-col gap-0">
          {TIMELINE_EVENTS.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className="relative grid grid-cols-2 items-center gap-0" style={{ minHeight: '160px' }}>

                {/* ── Lado esquerdo ── */}
                <div className={`flex justify-end pr-12 ${isLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  {isLeft && (
                    <div className="group relative max-w-sm w-full cursor-default">
                      {/* Card */}
                      <div className="relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
                        style={{ borderColor: '#e8f1fb' }}>
                        {/* Faixa decorativa lateral */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                          style={{ background: 'linear-gradient(to bottom, #1B3A6B, #4A7AB5)' }} />
                        <div className="pl-3">
                          <span className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.25em]"
                            style={{ background: 'rgba(200,220,240,0.3)', color: '#4A7AB5' }}>
                            {event.date}
                          </span>
                          <h4 className="mb-2 font-serif text-lg font-bold leading-tight" style={{ color: '#1B3A6B' }}>
                            {event.title}
                          </h4>
                          <p className="text-xs leading-relaxed text-slate-400">{event.text}</p>
                        </div>
                        {/* Brilho no hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                          style={{ background: 'linear-gradient(135deg, rgba(200,220,240,0.15) 0%, transparent 60%)' }} />
                      </div>
                      {/* Seta apontando para a linha */}
                      <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 h-4 w-4 rotate-45 border-t border-r bg-white"
                        style={{ borderColor: '#e8f1fb' }} />
                    </div>
                  )}
                </div>

                {/* ── Ponto central ── */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  {i % 2 === 0 ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full ring-4 ring-white shadow-lg transition-transform duration-300 hover:scale-110"
                      style={{ background: 'linear-gradient(135deg, #1B3A6B, #4A7AB5)', boxShadow: '0 4px 16px rgba(27,58,107,0.35)' }}>
                      <Heart className="h-4 w-4 fill-white text-white" />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white ring-4 ring-white shadow-lg transition-transform duration-300 hover:scale-110"
                      style={{ borderColor: '#4A7AB5', boxShadow: '0 4px 16px rgba(74,122,181,0.25)' }}>
                      <div className="h-3 w-3 rounded-full" style={{ background: '#4A7AB5' }} />
                    </div>
                  )}
                </div>

                {/* ── Lado direito ── */}
                <div className={`flex justify-start pl-12 ${!isLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  {!isLeft && (
                    <div className="group relative max-w-sm w-full cursor-default">
                      {/* Seta apontando para a linha */}
                      <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 h-4 w-4 rotate-45 border-b border-l bg-white"
                        style={{ borderColor: '#e8f1fb' }} />
                      {/* Card */}
                      <div className="relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
                        style={{ borderColor: '#e8f1fb' }}>
                        <div className="absolute right-0 top-0 bottom-0 w-1 rounded-r-2xl"
                          style={{ background: 'linear-gradient(to bottom, #4A7AB5, #7AAFD4)' }} />
                        <div className="pr-3">
                          <span className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.25em]"
                            style={{ background: 'rgba(200,220,240,0.3)', color: '#4A7AB5' }}>
                            {event.date}
                          </span>
                          <h4 className="mb-2 font-serif text-lg font-bold leading-tight" style={{ color: '#1B3A6B' }}>
                            {event.title}
                          </h4>
                          <p className="text-xs leading-relaxed text-slate-400">{event.text}</p>
                        </div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                          style={{ background: 'linear-gradient(225deg, rgba(200,220,240,0.15) 0%, transparent 60%)' }} />
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Ícone de aliança no fim da linha */}
        <div className="mt-6 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full ring-4 ring-white shadow-xl"
            style={{ background: 'linear-gradient(135deg, #1B3A6B, #4A7AB5)', boxShadow: '0 6px 24px rgba(27,58,107,0.4)' }}>
            <Heart className="h-5 w-5 fill-white text-white" />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE — cards verticais elegantes
      ══════════════════════════════════════════ */}
      <div className="relative flex flex-col md:hidden">

        {/* Linha vertical contínua */}
        <div className="absolute left-[19px] top-2 bottom-8 w-[2px]"
          style={{ background: 'linear-gradient(to bottom, #1B3A6B, #C8DCF0, transparent)' }} />

        {TIMELINE_EVENTS.map((event, i) => (
          <div key={i} className="relative flex items-start gap-5 pb-10">

            {/* Ponto */}
            <div className="relative z-10 shrink-0 mt-1">
              {i % 2 === 0 ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-full ring-4 ring-white shadow-md"
                  style={{ background: 'linear-gradient(135deg, #1B3A6B, #4A7AB5)', boxShadow: '0 4px 12px rgba(27,58,107,0.3)' }}>
                  <Heart className="h-3.5 w-3.5 fill-white text-white" />
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white ring-4 ring-white shadow-md"
                  style={{ borderColor: '#4A7AB5' }}>
                  <div className="h-3 w-3 rounded-full" style={{ background: '#4A7AB5' }} />
                </div>
              )}
              {/* Número do evento */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold text-white"
                style={{ background: '#1B3A6B' }}>
                {i + 1}
              </span>
            </div>

            {/* Card */}
            <div className="flex-1 overflow-hidden rounded-2xl border bg-white shadow-sm"
              style={{ borderColor: '#e8f1fb' }}>
              {/* Topo colorido do card */}
              <div className="h-1 w-full"
                style={{ background: i % 2 === 0
                  ? 'linear-gradient(to right, #1B3A6B, #4A7AB5)'
                  : 'linear-gradient(to right, #4A7AB5, #7AAFD4)' }} />
              <div className="p-4">
                <span className="mb-1.5 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em]"
                  style={{ background: 'rgba(200,220,240,0.3)', color: '#4A7AB5' }}>
                  {event.date}
                </span>
                <h4 className="mb-1.5 font-serif text-base font-bold" style={{ color: '#1B3A6B' }}>
                  {event.title}
                </h4>
                <p className="text-xs leading-relaxed text-slate-500">{event.text}</p>
              </div>
            </div>

          </div>
        ))}

        {/* Final da linha */}
        <div className="flex items-center gap-4 pl-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-lg"
            style={{ background: 'linear-gradient(135deg, #1B3A6B, #4A7AB5)' }}>
            <Heart className="h-4 w-4 fill-white" />
          </div>
          <p className="font-serif text-sm italic" style={{ color: '#4A7AB5' }}>
            E a história continua...
          </p>
        </div>
      </div>

    </div>
  </section>
</StickyReveal>


      {/* ─── SEÇÃO 4 — CTA ────────────────────────────────── */}
      <StickyReveal index={4}>
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#f0f6ff] px-6 text-center dark:bg-slate-900">
          {/* Coração de fundo decorativo */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
            <Heart className="h-[500px] w-[500px]" style={{ fill: '#1B3A6B', color: '#1B3A6B' }} />
          </div>

          <div className="relative z-10 flex w-full max-w-lg flex-col items-center">
            <div className="mb-6 flex items-center gap-3 md:mb-8">
              <div className="h-[1px] w-10 bg-[#C8DCF0] md:w-12" />
              <Heart className="h-3.5 w-3.5 fill-[#4A7AB5] text-[#4A7AB5]" />
              <div className="h-[1px] w-10 bg-[#C8DCF0] md:w-12" />
            </div>

            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.4em] text-[#4A7AB5]">
              Junte-se a nós
            </p>

            <h2 className="mb-4 font-serif text-2xl text-[#1B3A6B] dark:text-white sm:text-3xl md:text-4xl">
              Você faz parte<br />desta história.
            </h2>

            <p className="mb-8 text-sm leading-relaxed text-slate-500 dark:text-slate-400 md:mb-10 md:text-base">
              Gostaríamos muito de ter você ao nosso lado neste dia tão especial.
              Confirme sua presença e venha celebrar conosco!
            </p>

            <button
              onClick={() => navigate("/rsvp")}
              className="group relative w-full overflow-hidden rounded-full px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:w-auto"
              style={{
                background: '#1B3A6B',
                boxShadow: '0 8px 24px rgba(27,58,107,0.35)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#14305a')}
              onMouseLeave={e => (e.currentTarget.style.background = '#1B3A6B')}
            >
              {/* Shimmer */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center justify-center gap-2">
                <Heart className="h-4 w-4 fill-white" />
                Confirmar Presença
              </span>
            </button>

            <p className="mt-5 text-xs text-slate-400">
              Responda até <span className="font-semibold text-[#4A7AB5]">01 de Março de 2026</span>
            </p>
          </div>
        </section>
      </StickyReveal>

    </div>
  )
}
