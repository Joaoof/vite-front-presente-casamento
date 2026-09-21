import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Lottie } from "lottie-react"
import {
  COMMISSION_RATE, COMMITMENTS, DEMO_COUPLE_DATE, DEMO_COUPLE_NAMES, DEMO_COUPLE_SLUG, DEMO_SCREENS,
  DEVELOPER_CITY, DEVELOPER_EMAIL, DEVELOPER_NAME, DEVELOPER_WHATSAPP, OBJECTIONS, PLANNER_BENEFITS, PLANS, SITE_FEATURES,
  WHATSAPP_ALERTS, WHATSAPP_DEMO,
} from "../config/partnership"
import { CHAT_BUBBLE, CHECK_POP, GIFT_BOUNCE, HEART_PULSE } from "../data/lottie"
import ProposalGuide from "./ProposalGuide"

const NAVY         = "#1B3A6B"
const BLUE         = "#4A7AB5"
const MIST         = "#C8DCF0"
const INK          = "#2F3A4A"
const PAPER        = "#FBFCFE"
const DISPLAY_FONT = "Poppins, Inter, sans-serif"
const BODY_FONT    = "Inter, Poppins, sans-serif"

const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })

const monthLabel = new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" })

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

export default function Partnership() {
  const [weddingsPerMonth, setWeddingsPerMonth] = useState(2)

  const mainPlan = PLANS.find((plan) => plan.highlighted) ?? PLANS[0]
  const perMonth = mainPlan.price * COMMISSION_RATE * weddingsPerMonth
  const animate  = !reduceMotion()

  const contactHref = DEVELOPER_WHATSAPP
    ? `https://wa.me/${DEVELOPER_WHATSAPP}?text=${encodeURIComponent(`Oi ${DEVELOPER_NAME}, li a sua proposta para cerimonialistas e quero conversar.`)}`
    : `mailto:${DEVELOPER_EMAIL}?subject=${encodeURIComponent("Proposta para cerimonialistas")}`

  useEffect(() => {
    document.title = `Proposta para cerimonialistas · ${DEVELOPER_NAME}`
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const ornament = (
    <div className="my-10 flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-10" style={{ background: MIST }} />
      <Lottie src={HEART_PULSE} loop autoplay={animate} style={{ width: 30, height: 30 }} />
      <span className="h-px w-10" style={{ background: MIST }} />
    </div>
  )

  return (
    <div className="min-h-screen w-full" style={{ background: PAPER, color: INK, fontFamily: BODY_FONT }}>
      <style>{`
        .proposta h1, .proposta h2 { font-family: ${DISPLAY_FONT}; color: ${NAVY}; font-weight: 600; line-height: 1.2 }
        .proposta h1 { font-size: 2.4rem; margin: 0 0 1.5rem; letter-spacing: -0.01em }
        .proposta h2 { font-size: 1.55rem; margin: 0 0 1rem }
        .proposta .titulo { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem }
        .proposta .titulo h2 { margin: 0 }
        .proposta p  { font-size: 1.0625rem; line-height: 1.75; margin: 0 0 1rem }
        .proposta li { font-size: 1.0625rem; line-height: 1.7 }
        .proposta a  { color: ${NAVY} }
        .proposta section { scroll-margin-top: 1.5rem }
        .proposta select { border: 1px solid ${MIST}; border-radius: 6px; padding: 2px 6px; background: white; color: ${NAVY}; font-weight: 600; font-family: ${BODY_FONT} }
        @media (max-width: 640px) { .proposta h1 { font-size: 1.85rem } .proposta h2 { font-size: 1.35rem } }
      `}</style>

      <header className="px-6 pt-8">
        <div className="mx-auto flex max-w-[860px] flex-wrap items-center gap-x-3 gap-y-1 pr-20 text-sm" style={{ color: BLUE }}>
          <span>{DEVELOPER_CITY}, {monthLabel}</span>
          <span aria-hidden>·</span>
          <a href={contactHref} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4" style={{ color: NAVY }}>
            Falar com {DEVELOPER_NAME} no WhatsApp
          </a>
        </div>
      </header>

      <main className="proposta mx-auto max-w-[860px] px-6 pb-16 pt-12 md:pt-16">

        {/*  Abertura  */}
        <section className="max-w-[640px]">
          <h1>Para cerimonialistas de {DEVELOPER_CITY}</h1>
          <p>
            Meu nome é {DEVELOPER_NAME}, sou desenvolvedor aqui em {DEVELOPER_CITY}. Fiz o site de casamento
            do {DEMO_COUPLE_NAMES}, que casaram em {DEMO_COUPLE_DATE}, e quero propor uma parceria para quem organiza
            casamentos na cidade: você indica o site para as suas noivas, eu faço todo o trabalho, e uma parte do
            valor de cada site é sua.
          </p>
          <p>
            Sei que cerimonialista só indica quem confia. Por isso esta página é curta e direta: o que é o site,
            o que você ganha com ele, quanto custa e as respostas para as perguntas que imagino que você vai fazer.
          </p>
        </section>

        {/*  Telas reais  */}
        <section id="site" className="mt-12">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {DEMO_SCREENS.map((screen) => (
              <figure key={screen.src} className="m-0">
                <img src={screen.src} alt={screen.caption} loading="lazy"
                  className="w-full rounded-xl border bg-white" style={{ borderColor: MIST, aspectRatio: "390 / 779", objectFit: "cover", objectPosition: "top" }} />
                <figcaption className="mt-2 text-center text-sm font-medium" style={{ color: BLUE }}>{screen.caption}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-center text-sm">
            <Link to={`/${DEMO_COUPLE_SLUG}`} target="_blank" className="font-semibold underline underline-offset-4">
              Abrir o site do {DEMO_COUPLE_NAMES}
            </Link>
            <span className="text-slate-500"> · área do casal: usuário demo, senha demo</span>
          </p>
        </section>

        {ornament}

        {/*  O que o site faz  */}
        <section className="max-w-[640px]">
          <h2>O que o site faz</h2>
          <ul className="list-disc space-y-1.5 pl-5">
            {SITE_FEATURES.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        </section>

        {ornament}

        {/*  Avisos no WhatsApp  */}
        <section id="whatsapp" className="max-w-[640px]">
          <div className="titulo">
            <Lottie src={CHAT_BUBBLE} loop autoplay={animate} style={{ width: 64, height: 54 }} />
            <h2>Avisos no WhatsApp</h2>
          </div>
          <p>Está entrando no site agora, e a primeira noiva sua já recebe pronto:</p>
          <ul className="mb-8 list-disc space-y-2 pl-5">
            {WHATSAPP_ALERTS.map((alert) => <li key={alert}>{alert}</li>)}
          </ul>
          <div className="max-w-[420px] rounded-xl px-3 py-4" style={{ background: "#EFEAE2" }}>
            <div className="flex flex-col gap-2">
              {WHATSAPP_DEMO.map((message, i) => (
                <div key={i} className={`max-w-[88%] rounded-lg px-3 py-2 text-[15px] leading-relaxed ${message.from === "noiva" ? "self-end rounded-tr-none" : "self-start rounded-tl-none"}`}
                  style={{ background: message.from === "noiva" ? "#D9FDD3" : "white", color: "#111B21", boxShadow: "0 1px 0.5px rgba(11,20,26,0.13)" }}>
                  {message.text}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-500">Exemplo de conversa com o robô, com dados fictícios.</p>
        </section>

        {ornament}

        {/*  O que a cerimonialista ganha  */}
        <section id="ganhos" className="max-w-[640px]">
          <h2>O que você ganha com ele</h2>
          <ul className="list-disc space-y-2.5 pl-5">
            {PLANNER_BENEFITS.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
        </section>

        {ornament}

        {/*  Quanto custa  */}
        <section id="precos" className="max-w-[640px]">
          <div className="titulo">
            <Lottie src={GIFT_BOUNCE} loop autoplay={animate} style={{ width: 56, height: 56 }} />
            <h2>Quanto custa para o casal</h2>
          </div>
          <p>O casal paga uma vez. Não tem mensalidade e não tem taxa sobre os presentes.</p>
          <div className="my-6" style={{ borderTop: `1px solid ${MIST}` }}>
            {PLANS.map((plan) => (
              <div key={plan.id} className="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:gap-6" style={{ borderBottom: `1px solid ${MIST}` }}>
                <div>
                  <p className="!mb-0.5 font-semibold" style={{ color: NAVY }}>
                    {plan.name}
                    {plan.highlighted && <span className="ml-2 text-sm font-medium" style={{ color: BLUE }}>o que eu indico</span>}
                  </p>
                  <p className="!mb-0 text-sm text-slate-500">{plan.detail}</p>
                </div>
                <div className="sm:text-right">
                  <p className="!mb-0 font-semibold" style={{ color: NAVY }}>{brl(plan.price)}</p>
                  <p className="!mb-0 text-sm" style={{ color: BLUE }}>você recebe {brl(plan.price * COMMISSION_RATE)}</p>
                </div>
              </div>
            ))}
          </div>
          <p>
            O repasse é por Pix, no mesmo dia em que o casal paga. Sem meta mínima e sem exclusividade:
            você continua indicando o que quiser, para quem quiser.
          </p>
          <p>
            Para ter uma ideia: com{" "}
            <select value={weddingsPerMonth} onChange={(e) => setWeddingsPerMonth(Number(e.target.value))} aria-label="Casais por mês">
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>{" "}
            {weddingsPerMonth === 1 ? "casal" : "casais"} por mês no {mainPlan.name.toLowerCase()}, são{" "}
            <strong style={{ color: NAVY }}>{brl(perMonth)}</strong> por mês, ou{" "}
            <strong style={{ color: NAVY }}>{brl(perMonth * 12)}</strong> em um ano.
          </p>
        </section>

        {ornament}

        {/*  Perguntas  */}
        <section id="perguntas" className="max-w-[640px]">
          <h2>O que você provavelmente vai me perguntar</h2>
          <div className="mt-6 space-y-8">
            {OBJECTIONS.map((item) => (
              <div key={item.question}>
                <p className="!mb-2 font-semibold" style={{ color: NAVY }}>{item.question}</p>
                <p className="!mb-0">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {ornament}

        {/*  Compromissos  */}
        <section id="contrato" className="max-w-[640px]">
          <h2>O que eu coloco no papel</h2>
          <p>Contrato de parceria simples, de uma página, com estes pontos:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            {COMMITMENTS.map((commitment) => <li key={commitment}>{commitment}</li>)}
          </ul>
        </section>

        {ornament}

        {/*  Como começar  */}
        <section id="comecar" className="max-w-[640px]">
          <div className="titulo">
            <Lottie src={CHECK_POP} loop autoplay={animate} style={{ width: 56, height: 56 }} />
            <h2>Como começar</h2>
          </div>
          <p>
            A primeira noiva sua não paga nada. Escolha um casal, eu faço o site completo de graça, e você vê como
            funciona sem colocar o seu nome em risco e sem custo para o casal. Se qualquer coisa falhar, o problema
            é meu, não seu. Se der certo, seguimos com as próximas noivas nas condições acima.
          </p>
          <p>
            <a href={contactHref} target="_blank" rel="noreferrer"
              className="inline-block rounded-md px-6 py-3 text-base font-semibold !text-white no-underline"
              style={{ background: NAVY }}>
              Falar com {DEVELOPER_NAME}{DEVELOPER_WHATSAPP ? " no WhatsApp" : " por e-mail"}
            </a>
          </p>
          <p className="mt-10 !mb-0 font-semibold" style={{ fontFamily: DISPLAY_FONT, color: NAVY, fontSize: "1.25rem" }}>{DEVELOPER_NAME}</p>
          <p className="text-sm text-slate-500">Desenvolvedor, {DEVELOPER_CITY}</p>
        </section>
      </main>

      <footer className="px-6 py-6 text-center text-sm text-slate-500" style={{ borderTop: `1px solid ${MIST}` }}>
        Valores de {monthLabel}, ajustáveis na conversa.
      </footer>

      <ProposalGuide />
    </div>
  )
}
