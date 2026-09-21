/*  Conteúdo da página de proposta de parceria (/parceria).                */
/*  Tudo aqui é ponto de partida para conversa: ajuste valores, prazos e  */
/*  textos antes de fechar qualquer acordo.                                 */

export type PartnerPlan = {
  id: string
  name: string
  price: number
  detail: string
  highlighted?: boolean
}

export type Objection = {
  question: string
  answer: string
}

export type DemoScreen = {
  src: string
  caption: string
}

export type WhatsAppMessage = {
  from: "noiva" | "robo"
  text: string
}

export type GuideTopic = {
  id: string
  label: string
  text: string
}

export const DEMO_COUPLE_SLUG  = "luis-natiele"
export const DEMO_COUPLE_NAMES = "Luís e Natiele"
export const DEMO_COUPLE_DATE  = "julho de 2026"

export const DEVELOPER_NAME  = "João"
export const DEVELOPER_CITY  = "Araguaína"
export const DEVELOPER_EMAIL = "joaodeus400@gmail.com"

/*  Número no formato internacional, só dígitos (ex.: 5563999999999).  */
/*  Enquanto estiver vazio, o botão de contato cai para o e-mail.        */
export const DEVELOPER_WHATSAPP = "5563991021043"

/*  Percentual do valor de cada site repassado à cerimonialista.  */
export const COMMISSION_RATE = 0.3

/*  Preço pago uma única vez pelo casal.  */
export const PLANS: PartnerPlan[] = [
  {
    id:     "simples",
    name:   "Site simples",
    price:  197,
    detail: "História do casal, fotos, confirmação de presença e lista de presentes.",
  },
  {
    id:          "completo",
    name:        "Site completo",
    price:       347,
    detail:      "Tudo do simples, mais cronograma do dia, stories com música, painel do casal e instalação no celular.",
    highlighted: true,
  },
  {
    id:     "proprio",
    name:   "Completo com domínio próprio",
    price:  597,
    detail: "Tudo do completo, com endereço próprio (ex.: marinaerafael.com.br) e convite digital animado.",
  },
]

/*  Telas reais do site de exemplo, capturadas no celular (public/demo).  */
export const DEMO_SCREENS: DemoScreen[] = [
  { src: "/demo/tela-inicio.webp",     caption: "Página inicial" },
  { src: "/demo/tela-cronograma.webp", caption: "Cronograma do dia" },
  { src: "/demo/tela-presentes.webp",  caption: "Lista de presentes" },
  { src: "/demo/tela-rsvp.webp",       caption: "Confirmação de presença" },
]

export const SITE_FEATURES: string[] = [
  "Lista de presentes com reserva e aviso por e-mail",
  "Confirmação de presença com acompanhantes e restrições alimentares",
  "História do casal em formato de stories, com música",
  "Cronograma do dia e contagem regressiva",
  "Painel do casal para acompanhar reservas e exportar em PDF",
  "Instalável no celular, abre como aplicativo",
]

/*  Avisos e robô no WhatsApp: em construção, entram já na primeira noiva indicada.  */
export const WHATSAPP_ALERTS: string[] = [
  "O convidado recebe a confirmação no WhatsApp assim que responde no site, com data, horário e endereço.",
  "Os noivos recebem um aviso no WhatsApp a cada confirmação de presença e a cada presente reservado.",
  "Os noivos, e você se quiser, perguntam ao robô no WhatsApp quantos confirmaram e quais presentes já foram reservados, com os valores.",
]

/*  Exemplo de conversa com o robô, com dados fictícios.  */
export const WHATSAPP_DEMO: WhatsAppMessage[] = [
  { from: "noiva", text: "Quantos já confirmaram?" },
  { from: "robo",  text: "Até agora, 84 convidados confirmaram: 62 adultos e 22 crianças. 5 avisaram que não vêm. 3 têm restrição alimentar: 2 sem glúten e 1 vegetariano." },
  { from: "noiva", text: "E os presentes?" },
  { from: "robo",  text: "12 presentes reservados, R$ 4.380 no total. Os últimos: Jogo de Panelas Inox (R$ 489,90), por Carla Menezes, e Adega Climatizada (R$ 1.373,43), pela família Andrade." },
]

/*  O que a cerimonialista ganha no trabalho dela, antes de falar em comissão.  */
export const PLANNER_BENEFITS: string[] = [
  "Confirmações prontas para o seu planejamento: quem vem, com quantos acompanhantes e com quais restrições alimentares, em uma planilha que eu te envio antes do evento.",
  "Os números na hora que você precisar: pergunte ao robô no WhatsApp quantos confirmaram, sem ligar para a noiva.",
  "O cronograma do dia publicado no site, do jeito que você definir, para os convidados pararem de perguntar horário.",
  "O nome do seu cerimonial no rodapé do site, se você quiser. A noiva vê que o algo a mais veio de você.",
  "Nenhum trabalho operacional: eu cadastro fotos, textos e lista, e atendo o casal por WhatsApp.",
  "30% do valor de cada site fechado por indicação sua, por Pix, no mesmo dia em que o casal paga.",
]

export const OBJECTIONS: Objection[] = [
  {
    question: "Eu já indico o iCasei há anos e nunca tive problemas. O que o seu sistema tem que justificaria eu arriscar minha reputação com as minhas noivas?",
    answer:   "Não estou pedindo para você trocar nada. Estou pedindo um piloto com um casal, escolhido por você, sem custo para o casal e com devolução integral se algo falhar. O que muda: o site é feito para aquele casal, sem template e sem logo de terceiros; o casal paga uma vez e não tem taxa sobre os presentes; você recebe as confirmações organizadas; e uma parte de cada site é sua.",
  },
  {
    question: "E se o site cair no sábado à noite, no meio da festa?",
    answer:   "O site é estático e fica em uma rede de distribuição global, então abre mesmo que o meu servidor esteja fora. Um monitor me avisa em menos de um minuto se algo sair do ar. Em fim de semana com casamento de casal seu, eu fico de plantão com resposta em até 30 minutos, e isso vai no contrato.",
  },
  {
    question: "E o dinheiro dos presentes? Quem segura esse valor?",
    answer:   "Não passa por mim nem por você. O convidado reserva o presente no site e paga diretamente ao casal, na chave Pix do casal. A sua comissão é sobre o valor do site, nunca sobre os presentes.",
  },
  {
    question: "O que exatamente eu ganho com isso?",
    answer:   "As confirmações de presença organizadas antes do evento, o seu nome no site do casal, e 30% do valor de cada site fechado por indicação sua, por Pix, no mesmo dia em que o casal paga. Sem meta mínima e sem exclusividade.",
  },
  {
    question: "Se der problema, como o meu nome fica protegido?",
    answer:   "Por contrato: a responsabilidade técnica é minha; qualquer problema eu resolvo direto com o casal, em meu nome; o casal tem garantia de devolução integral; e o seu nome não aparece em nenhuma tela ou termo do sistema, a não ser que você queira. Você encerra a parceria quando quiser, sem multa.",
  },
  {
    question: "Quem atende o casal quando eles tiverem dúvida? Eu não tenho tempo para isso.",
    answer:   "Eu. O casal fala comigo por WhatsApp desde o primeiro dia, para fotos, textos, lista e dúvidas. Você só indica.",
  },
]

export const COMMITMENTS: string[] = [
  "Site no ar 99,9% do mês, com relatório sempre que você pedir",
  "Plantão em fim de semana de evento, com resposta em até 30 minutos",
  "Backup diário de todos os dados",
  "Dados dos convidados só para o casal e para você, conforme a LGPD",
  "Devolução integral ao casal se o sistema falhar",
  "Comissão de 30% por Pix no mesmo dia, sem meta e sem exclusividade",
  "Encerramento da parceria a qualquer momento, sem multa",
]

const brlShort = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })

/*  Guia animado no canto da página: um texto curto por seção.  */
export const GUIDE_INTRO = "Oi! Eu sou o guia desta proposta. Toque em um assunto e eu explico em poucas linhas."

export const GUIDE_TOPICS: GuideTopic[] = [
  {
    id:    "site",
    label: "O site",
    text:  `É o site que cada casal recebe: história, fotos, confirmação de presença, lista de presentes e cronograma do dia. As quatro telas na página são do site real do ${DEMO_COUPLE_NAMES}. Você pode abrir e navegar como convidada.`,
  },
  {
    id:    "whatsapp",
    label: "Avisos no WhatsApp",
    text:  "O convidado recebe a confirmação no WhatsApp, os noivos recebem aviso de cada confirmação e de cada presente reservado, e o robô responde quantos confirmaram e quais presentes já saíram. Está entrando agora, e a sua primeira noiva já recebe pronto.",
  },
  {
    id:    "ganhos",
    label: "O que você ganha",
    text:  "Confirmações e restrições alimentares organizadas antes do evento, os números na hora que precisar pelo robô, o nome do seu cerimonial no site, nenhum trabalho operacional e 30% de cada site por Pix, no mesmo dia.",
  },
  {
    id:    "precos",
    label: "Quanto custa",
    text:  `O casal paga uma vez: ${PLANS.map((plan) => brlShort(plan.price)).join(", ")}. Sem mensalidade e sem taxa sobre presentes. Você recebe ${Math.round(COMMISSION_RATE * 100)}% no mesmo dia: ${PLANS.map((plan) => brlShort(plan.price * COMMISSION_RATE)).join(", ")}.`,
  },
  {
    id:    "perguntas",
    label: "Perguntas difíceis",
    text:  "Respondi antes as perguntas que uma cerimonialista criteriosa faz: por que não continuar só com o iCasei, o que acontece se o site cair no sábado, quem segura o dinheiro dos presentes e como o seu nome fica protegido.",
  },
  {
    id:    "contrato",
    label: "O que vai no papel",
    text:  "Um contrato de uma página: site no ar 99,9% do mês, plantão em fim de semana de evento, backup diário, LGPD, devolução integral ao casal se falhar, comissão de 30% e saída sem multa.",
  },
  {
    id:    "comecar",
    label: "Como começar",
    text:  `A primeira noiva sua não paga nada: você escolhe um casal, eu faço o site completo de graça e você vê como funciona sem risco. Depois é só chamar o ${DEVELOPER_NAME} no WhatsApp.`,
  },
]
