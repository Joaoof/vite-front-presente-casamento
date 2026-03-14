import { Heart, Menu, X, Clock, MapPin, GlassWater, Music } from "lucide-react";
import { useEffect, useState } from "react";

const targetDate = new Date("2026-08-24T16:00:00").getTime();

type TimeLeft = {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
};

export default function Header() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal

  // Efeito do Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutos: Math.floor((difference / 1000 / 60) % 60),
          segundos: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Efeito para bloquear o scroll do fundo quando o modal estiver aberto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  function CircleProgress({ percentage, color, value, label }: { percentage: number; color: string; value: number; label: string }) {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - percentage * circumference;
    const rotation = percentage * 360;

    return (
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 flex flex-col items-center justify-center bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-rose-50">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} stroke="#f8f1f3" strokeWidth="4" fill="none" />
          <circle
            cx="60" cy="60" r={radius} stroke={color} strokeWidth="4" fill="none"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
          <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '60px 60px' }} className="transition-all duration-1000 ease-linear">
            <circle cx="110" cy="60" r="4" fill={color} />
            <circle cx="110" cy="60" r="8" fill={color} opacity="0.25" />
          </g>
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-800 tracking-wider tabular-nums">
            {value.toString().padStart(2, "0")}
          </span>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] text-rose-400 mt-0.5 sm:mt-1 uppercase font-medium">
            {label}
          </span>
        </div>
      </div>
    );
  }

  const diasPct = timeLeft.dias / 365;
  const horasPct = timeLeft.horas / 24;
  const minutosPct = timeLeft.minutos / 60;
  const segundosPct = timeLeft.segundos / 60;

  // Array de eventos para mapear no cronograma
  const cronogramaEventos = [
    { time: "16:00", title: "Cerimônia Religiosa", desc: "A troca de alianças e votos na igreja.", icon: Heart },
    { time: "18:00", title: "Recepção e Coquetel", desc: "Brindes de boas-vindas aos convidados.", icon: GlassWater },
    { time: "19:30", title: "Jantar Principal", desc: "Momento para compartilhar", icon: MapPin }, // Usando MapPin temporariamente, ajuste os ícones como preferir
    { time: "21:00", title: "Festa e Pista de Dança", desc: "Abertura da pista de dança.", icon: Music },
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2] text-slate-800 flex flex-col">
      
      {/* ----------------- MODAL DE CRONOGRAMA ----------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Overlay escuro que fecha ao clicar fora */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Caixa do Modal */}
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all flex flex-col max-h-[90vh]">
            
            {/* Header do Modal */}
           {/* Importação direta para o seu teste funcionar na hora */}
           <style>
              {`
                @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&family=Poppins:wght@400;600;700&display=swap');
              `}
            </style>

            <div className="bg-rose-50 border-b border-rose-100 px-6 py-5 flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-xl text-slate-800 flex items-center gap-2 font-['Opens Sans']">
                <img src="https://marketplace.canva.com/eM8WI/MAEhpNeM8WI/1/tl/canva-alarm-clock-icon-MAEhpNeM8WI.png" alt="" width={20}/>
                Cronograma do Dia
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 transition p-1 rounded-full hover:bg-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Conteúdo (Linha do tempo) */}
            <div className="p-6 md:p-8 overflow-y-auto">
              <div className="relative border-l-2 border-rose-100 ml-4 space-y-8">
                {cronogramaEventos.map((evento, index) => {
                  const Icon = evento.icon;
                  return (
                    <div key={index} className="relative pl-8 md:pl-10">
                      
                      {/* Ícone */}
                      <div className="absolute -left-[15px] top-0 bg-white border-2 border-rose-200 w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
                         <Icon className="w-4 h-4 text-rose-500" />
                      </div>
                      
                      {/* Bloco de texto */}
                      <div className="flex flex-col gap-1 items-start pt-1">
                        <span className="text-rose-500 font-bold text-sm tracking-widest leading-none font-['Poppins']">
                          {evento.time}
                        </span>
                        <h4 className="text-lg font-semibold text-slate-800 leading-tight mt-1 font-['Poppins']">
                          {evento.title}
                        </h4>
                        <p className="text-slate-500 text-sm leading-relaxed font-['Open_Sans']">
                          {evento.desc}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-slate-800 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-slate-700 transition"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ------------------------------------------------------- */}


      {/* CONTAINER HERO: Agora global, o fundo se aplica a tudo (Mobile e Desktop) */}
      <div className="w-full flex flex-col min-h-screen relative">
        
        {/* Fundo Absoluto unificado: Removido o md:hidden, agora cobre desktop também */}
        <div 
           className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
           style={{
             backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url("/img1.JPG")',
           }}
        />

        {/* NAVBAR */}
        {/* Removidos os fundos e bordas brancas do desktop para ficar transparente como no mobile */}
        <header className="relative md:sticky md:top-0 z-50 w-full bg-transparent">
          <div className="mx-auto max-w-[1100px] flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/185/185482.png" 
                alt="Logo" 
                width={40} 
                className="brightness-0 invert" // Logo sempre branca para contrastar com a foto
              />
            </div>

            {/* Links do desktop ajustados para branco, devido ao fundo escuro da imagem */}
            <nav className="hidden lg:flex items-center gap-8 text-sm text-white font-medium drop-shadow-md">
              {["Início", "Nossa História", "O Evento", "Lista de Presentes"].map((item) => (
                <a key={item} href="#" className="hover:text-rose-300 transition">
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button className="hidden lg:block bg-rose-500 text-white text-sm px-5 py-2 rounded-full hover:bg-rose-600 transition">
                Confirmar Presença
              </button>
              <button
                className="lg:hidden text-white" 
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                {isMobileOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
          
          {/* Menu Mobile Expandido (mantido intacto) */}
          {isMobileOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur absolute w-full left-0 top-full">
              <div className="flex flex-col gap-3 px-6 py-6 text-sm text-rose-600">
                {["Início", "Nossa História", "O Evento", "Lista de Presentes"].map((item) => (
                  <button key={item} className="text-left font-medium hover:text-rose-800 transition">
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* HERO CONTENT */}
        <section className="relative z-10 flex-grow flex flex-col justify-center items-center md:px-6 md:py-16">
          <div className="mx-auto max-w-[1100px] w-full">
            {/* Removido o visual de "cartão" (bordas arredondadas e fundo extra) no desktop */}
            <div className="w-full flex flex-col items-center justify-center text-center text-white px-6 py-16">
              
              <span className="text-xs tracking-[0.3em] uppercase text-rose-300 mb-4 drop-shadow-md">
                Reserve a data
              </span>
              <h1 className="text-3xl md:text-6xl font-serif mb-6 drop-shadow-lg text-white">
                Luís <span className="text-rose-400">e</span> Nathalia
              </h1>
              <p className="text-xs md:text-xl text-white mb-8 drop-shadow-lg font-medium tracking-wide">
                24 de Agosto de 2026
              </p>
              
              {/* Botão que abre o modal */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-rose-500 text-white px-8 py-4 md:py-3 rounded-full text-sm hover:bg-rose-600 transition shadow-lg w-full max-w-xs md:w-auto flex items-center justify-center gap-2 mx-auto"
              >
                <Clock className="w-4 h-4" />
                Ver cronograma do casamento
              </button>

            </div>
          </div>
        </section>
      </div>

      {/* COUNTDOWN (mantido intacto) */}
      <section className="py-20 md:py-24 bg-[#faf7f2] border-t border-rose-100">
        <div className="mx-auto max-w-[900px] text-center px-6 relative">
          
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-slate-800">
            O grande dia está chegando
          </h2>
          
          <p className="text-rose-400 mb-12 md:mb-16 text-xs md:text-sm font-medium uppercase tracking-[0.1em] md:tracking-[0.2em]">
            Cada segundo nos aproxima desse momento especial
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center relative z-10 max-w-sm lg:max-w-none mx-auto">
            {[
              { label: "Dias", value: timeLeft.dias, percentage: diasPct, color: "#ecae13" },
              { label: "Horas", value: timeLeft.horas, percentage: horasPct, color: "#f4a1c1" },
              { label: "Minutos", value: timeLeft.minutos, percentage: minutosPct, color: "#ec7c7a" },
              { label: "Segundos", value: timeLeft.segundos, percentage: segundosPct, color: "#f9d56e" },
            ].map((item) => (
              <CircleProgress key={item.label} {...item} />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}