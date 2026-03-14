import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Heart, Send, ChevronDown, ChevronRight, Home, Sparkles, Loader2 } from "lucide-react"

// ─── Types ────────────────────────────────────────────────
type FormData = {
  fullName:   string
  email:      string
  attendance: "yes" | "no"
  guests:     string
  dietary:    string
  message:    string
}

type Status = "idle" | "loading" | "success" | "error"

const GUEST_OPTIONS = ["1 Convidado", "2 Convidados", "3 Convidados", "4 Convidados"]

const ATTENDANCE_OPTIONS = [
  { value: "yes", label: "Confirmo Presença 🎉" },
  { value: "no",  label: "Não Poderei Comparecer" },
] as const

const INPUT_CLASS =
  "w-full rounded-lg border border-primary/20 bg-background-light dark:bg-background-dark/50 " +
  "focus:border-primary focus:ring-1 focus:ring-primary h-14 px-4 text-base outline-none transition"

const TEXTAREA_CLASS =
  "w-full rounded-lg border border-primary/20 bg-background-light dark:bg-background-dark/50 " +
  "focus:border-primary focus:ring-1 focus:ring-primary p-4 text-base outline-none resize-none transition"

// ─── Component ────────────────────────────────────────────
export default function RSVP() {
  const [form, setForm] = useState<FormData>({
    fullName:   "",
    email:      "",
    attendance: "yes",
    guests:     "1 Convidado",
    dietary:    "",
    message:    "",
  })
  const [status, setStatus] = useState<Status>("idle")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  // ─── Tela de sucesso ──────────────────────────────────
  if (status === "success") {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">

        {/* Navbar na tela de sucesso também */}
        <header className="sticky top-0 z-50 w-full border-b border-primary/15 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-[800px] items-center justify-between px-4 py-4 md:px-10">
            <Link to="/" className="flex items-center gap-2 group">
              <Heart className="w-5 h-5 text-primary fill-primary transition group-hover:scale-110" />
              <span className="font-display font-bold text-base tracking-tight text-slate-900 dark:text-slate-100">
                João Victor & Ana Luiza
              </span>
            </Link>
            <nav aria-label="breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm text-slate-500">
                <li>
                  <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Home className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Início</span>
                  </Link>
                </li>
                <li><ChevronRight className="w-3.5 h-3.5 text-slate-300" /></li>
                <li className="font-semibold text-primary">RSVP</li>
              </ol>
            </nav>
          </div>
        </header>

        <div className="flex flex-1 items-center justify-center px-4">
          <div className="text-center">
            <Heart className="w-16 h-16 text-primary fill-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold mb-3 text-slate-900 dark:text-slate-100">
              Obrigado, {form.fullName}!
            </h2>
            <p className="text-slate-500">
              {form.attendance === "yes"
                ? "Mal podemos esperar para celebrar com você!"
                : "Sentiremos sua falta, mas agradecemos a resposta."}
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Home className="w-4 h-4" />
              Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  // ─── Formulário principal ──────────────────────────────
  return (
    
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-slate-100">

      {/* ─── NAVBAR ──────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/15 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[800px] items-center justify-between px-4 py-4 md:px-10">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Heart className="w-5 h-5 text-primary fill-primary transition group-hover:scale-110" />
            <span className="font-display font-bold text-base tracking-tight">
              João Victor & Ana Luiza
            </span>
          </Link>

          {/* Breadcrumb */}
          <nav aria-label="breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-slate-500">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Início</span>
                </Link>
              </li>
              <li><ChevronRight className="w-3.5 h-3.5 text-slate-300" /></li>
              <li className="font-semibold text-primary">RSVP</li>
            </ol>
          </nav>

        </div>
      </header>

      {/* ─── MAIN ────────────────────────────────────────── */}
      <main className="flex flex-1 justify-center px-4 py-10 md:px-40">
        <div className="flex w-full max-w-[800px] flex-col">

          {/* HERO BANNER */}
          <div
            className="mb-8 min-h-[300px] overflow-hidden rounded-xl bg-cover bg-center flex flex-col justify-end"
            style={{
              backgroundImage: [
                "linear-gradient(to top, rgba(34,29,16,0.85) 0%, rgba(34,29,16,0) 60%)",
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCxLoKG2J1Hh07Tui9ivFtkUmHy0jcOXLp9dc7OmTked4Mmg7w1UnT6eOUcpT9pFkQ25ARWz1pHC7tzg_m8WXLhBsI-9HHJzkyLlddrBoOTHjkQJieH-eterbPBdpsPlPudSu2ofFf1OwrLZ5wLkDylYZykDStgkrDavXop8yquQAI9tYwkIBDIBU88k2LVPCGMMcLqnqZ66sLEs_-3t9Nnbs4kOYTqOVtwEoAcbc7EO2Z_5PA1d-sHKVt9WD9jjggmkRQv_Jd0cXs")',
              ].join(", "),
            }}
          >
            <div className="p-8">
              <h1 className="font-display text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
                Confirme sua Presença
              </h1>
              <p className="mt-2 font-medium text-primary">
                Mal podemos esperar para celebrar com você!
              </p>
            </div>
          </div>

          {/* FORM CARD */}
          <div className="rounded-xl border border-primary/10 bg-white dark:bg-slate-800/50 p-6 shadow-sm md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Nome + Email */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fullName" className="text-base font-semibold">Nome Completo</label>
                  <input
                    id="fullName" name="fullName" type="text" required
                    value={form.fullName} onChange={handleChange}
                    placeholder="Digite seu nome completo"
                    className={INPUT_CLASS}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-base font-semibold">E-mail</label>
                  <input
                    id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    placeholder="seuemail@exemplo.com"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              {/* Presença */}
              <div className="space-y-4">
                <p className="text-base font-semibold">Você vai comparecer?</p>
                <div className="flex flex-wrap gap-4">
                  {ATTENDANCE_OPTIONS.map(({ value, label }) => (
                    <label key={value} className="group flex cursor-pointer items-center gap-3">
                      <input
                        type="radio" name="attendance" value={value}
                        checked={form.attendance === value}
                        onChange={handleChange}
                        className="size-5 accent-[#ecae13]"
                      />
                      <span className="text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Nº de convidados */}
              <div className="flex max-w-xs flex-col gap-2">
                <label htmlFor="guests" className="text-base font-semibold">Número de Convidados</label>
                <div className="relative">
                  <select
                    id="guests" name="guests"
                    value={form.guests} onChange={handleChange}
                    className={`${INPUT_CLASS} appearance-none pr-10`}
                  >
                    {GUEST_OPTIONS.map(g => <option key={g}>{g}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 w-5 h-5 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Restrições alimentares */}
              <div className="flex flex-col gap-2">
                <label htmlFor="dietary" className="text-base font-semibold">Restrições Alimentares</label>
                <textarea
                  id="dietary" name="dietary" rows={3}
                  value={form.dietary} onChange={handleChange}
                  placeholder="Informe alergias ou restrições alimentares (ex: Vegano, Sem Glúten)"
                  className={TEXTAREA_CLASS}
                />
              </div>

              {/* Mensagem */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-base font-semibold">
                  Mensagem ao Casal{" "}
                  <span className="font-normal text-slate-400">(Opcional)</span>
                </label>
                <textarea
                  id="message" name="message" rows={4}
                  value={form.message} onChange={handleChange}
                  placeholder="Uma mensagem para João Victor e Ana Luiza..."
                  className={TEXTAREA_CLASS}
                />
              </div>

              {/* Erro */}
              {status === "error" && (
                <p className="text-sm text-red-500">
                  Algo deu errado. Por favor, tente novamente.
                </p>
              )}

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-12 py-4 text-lg font-bold text-background-dark shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed md:w-auto"
                >
                  {status === "loading" ? (
                    <>
                      <span>Enviando...</span>
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>Confirmar Presença</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="mt-4 text-sm italic text-slate-500 text-center md:text-left">
                  Responda até 15 de Junho de 2025
                </p>
              </div>

            </form>
          </div>

          {/* FOOTER */}
          <footer className="mt-20 border-t border-primary/10 py-10 text-center">
            <div className="mb-6 flex justify-center gap-6">
              <Sparkles className="w-5 h-5 text-primary/40" />
              <Heart className="w-5 h-5 text-primary/40" />
              <Sparkles className="w-5 h-5 text-primary/40" />
            </div>
            <p className="font-display text-lg">João Victor & Ana Luiza</p>
            <p className="mt-2 text-sm text-slate-500">04 de Outubro de 2025</p>
          </footer>

        </div>
      </main>
    </div>
  )
}
