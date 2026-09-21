import { Gift } from "../types"

/*  Lista de presentes usada no modo demonstração (sem backend).  */
/*  Imagens públicas do Pexels, já usadas em src/data/products.ts.  */

const pexels = (id: string) =>
  `https://images.pexels.com/photos/${id}.jpeg?auto=compress&cs=tinysrgb&w=800`

const BASE_DATE = new Date("2026-06-01T12:00:00").getTime()

export const DEMO_GIFTS: Gift[] = [
  { id: "demo-01", name: "2 Passagens Aéreas para a Lua de Mel", description: "Ida e volta para o destino escolhido pelo casal.",  imageUrl: pexels("46148/aircraft-jet-landing-cloud-46148"), price: 1716.78, status: "available", priority: "high",   createdAt: BASE_DATE + 1  },
  { id: "demo-02", name: "Adega de Vinhos Climatizada",           description: "Para 12 garrafas, com controle de temperatura.",  imageUrl: pexels("2702805/pexels-photo-2702805"),          price: 1373.43, status: "available", priority: "medium", createdAt: BASE_DATE + 2  },
  { id: "demo-03", name: "Smart TV 55\" 4K",                      description: "Para as noites de filme no novo lar.",            imageUrl: pexels("6782570/pexels-photo-6782570"),          price: 2799.99, status: "reserved",  priority: "high",   createdAt: BASE_DATE + 3,  reservedBy: "Carla Menezes <carla@exemplo.com>" },
  { id: "demo-04", name: "Jogo de Panelas Inox",                  description: "Conjunto com 5 peças e tampas de vidro.",         imageUrl: pexels("6996085/pexels-photo-6996085"),          price: 489.90,  status: "available", priority: "medium", createdAt: BASE_DATE + 4  },
  { id: "demo-05", name: "Liquidificador Profissional",           description: "1400W, copo de vidro de 2 litros.",               imageUrl: pexels("6996085/pexels-photo-6996085"),                              price: 349.99,  status: "available", priority: "low",    createdAt: BASE_DATE + 5  },
  { id: "demo-06", name: "Jogo de Cama King",                     description: "Percal 400 fios, 4 peças.",                       imageUrl: pexels("164595/pexels-photo-164595"),            price: 299.90,  status: "reserved",  priority: "medium", createdAt: BASE_DATE + 6,  reservedBy: "Família Andrade <andrade@exemplo.com>" },
  { id: "demo-07", name: "Conjunto de Toalhas",                   description: "Banho e rosto, 100% algodão, 8 peças.",           imageUrl: pexels("4210341/pexels-photo-4210341"),          price: 159.90,  status: "available", priority: "low",    createdAt: BASE_DATE + 7  },
  { id: "demo-08", name: "Abajur Decorativo",                     description: "Base em madeira e cúpula em linho.",              imageUrl: pexels("1112598/pexels-photo-1112598"),                               price: 211.74,  status: "available", priority: "low",    createdAt: BASE_DATE + 8  },
  { id: "demo-09", name: "Edredom Queen",                         description: "Dupla face, toque de pluma.",                     imageUrl: pexels("6588582/pexels-photo-6588582"),            price: 279.00,  status: "available", priority: "low",    createdAt: BASE_DATE + 9  },
  { id: "demo-10", name: "Jantar Romântico na Lua de Mel",        description: "Menu degustação para dois no destino da viagem.", imageUrl: pexels("3209101/pexels-photo-3209101"), price: 650.00,  status: "available", priority: "medium", createdAt: BASE_DATE + 10 },
  { id: "demo-11", name: "Jogo de Toalhas de Mesa",               description: "Para as primeiras reuniões em família.",          imageUrl: pexels("4210341/pexels-photo-4210341"),          price: 189.90,  status: "available", priority: "low",    createdAt: BASE_DATE + 11 },
  { id: "demo-12", name: "Panela de Pressão Elétrica",            description: "6 litros, 12 funções programáveis.",              imageUrl: pexels("6996085/pexels-photo-6996085"),          price: 429.00,  status: "available", priority: "medium", createdAt: BASE_DATE + 12 },
  { id: "demo-13", name: "Luminária de Piso",                     description: "Estilo escandinavo, luz quente.",                 imageUrl: pexels("1112598/pexels-photo-1112598"),                               price: 389.00,  status: "available", priority: "low",    createdAt: BASE_DATE + 13 },
  { id: "demo-14", name: "Kit Taças de Cristal",                  description: "6 taças para vinho tinto.",                       imageUrl: pexels("2702805/pexels-photo-2702805"),          price: 259.90,  status: "available", priority: "low",    createdAt: BASE_DATE + 14 },
]
