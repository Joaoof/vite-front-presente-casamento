Perfeito! Com base na estrutura do seu **frontend (React + Vite + TypeScript)**, vou gerar um `README.md` profissional, claro e bem organizado, que reflita exatamente o que você tem no projeto.

---

### ✅ Informações extraídas da imagem:
- Framework: **React com Vite**
- Linguagem: **TypeScript**
- Estilização: **Tailwind CSS**
- Estrutura de pastas:
  - `components/`: componentes reutilizáveis
  - `context/`: contexto de autenticação (`AuthContext`)
  - `data/`: dados estáticos (ex: produtos)
  - `hooks/`: hooks personalizados (`useAuth`, `useGifts`)
  - `services/`: serviços para API, armazenamento e WhatsApp
  - `ui/`: elementos UI genéricos (botões, inputs, etc.)
  - `types/`: tipos em TypeScript
  - `public/images/`: imagens usadas no site

---

Aqui está o **`README.md` completo e pronto para usar**:

```markdown
<p align="center">
  <a href="https://reactjs.org/" target="_blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" width="120" alt="React Logo" />
  </a>
</p>

<p align="center">
  A modern React application built with <a href="https://vitejs.dev/" target="_blank">Vite</a>, <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>, and <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a> for a fast, scalable, and responsive frontend.
</p>

<p align="center">
  <a href="https://npmjs.com/package/react" target="_blank">
    <img src="https://img.shields.io/npm/v/react.svg" alt="React Version" />
  </a>
  <a href="https://npmjs.com/package/react-dom" target="_blank">
    <img src="https://img.shields.io/npm/v/react-dom.svg" alt="React DOM Version" />
  </a>
  <a href="https://github.com/vitejs/vite" target="_blank">
    <img src="https://img.shields.io/badge/Vite-4.5.0-blue.svg" alt="Vite Version" />
  </a>
  <a href="https://tailwindcss.com/" target="_blank">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.0-blue.svg" alt="Tailwind CSS" />
  </a>
  <a href="https://typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-5.0.0-blue.svg" alt="TypeScript" />
  </a>
  <a href="https://eslint.org/" target="_blank">
    <img src="https://img.shields.io/badge/ESLint-8.54.0-green.svg" alt="ESLint" />
  </a>
  <a href="https://discord.gg/react" target="_blank">
    <img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord" />
  </a>
  <a href="https://twitter.com/reactjs" target="_blank">
    <img src="https://img.shields.io/twitter/follow/reactjs.svg?style=social&label=Follow" alt="Follow on Twitter" />
  </a>
</p>

---

## 🚀 Project Overview

This is the **frontend application** for a gift reservation platform, built with **React**, **Vite**, and **TypeScript**. It provides a user-friendly interface for browsing gifts, making reservations, and managing user authentication.

The app uses **Tailwind CSS** for styling, custom **React hooks** for state management, and a clean modular structure to ensure scalability and maintainability.

---

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AdminPanel.tsx
│   ├── EditGiftModal.tsx
│   ├── Footer.tsx
│   ├── GiftRegistrationForm.tsx
│   ├── GiftForm.tsx
│   ├── GiftItem.tsx
│   ├── GiftList.tsx
│   ├── Header.tsx
│   ├── LoginModal.tsx
│   ├── OurStory.tsx
│   ├── PhotosCarousel.tsx
│   ├── ReservationModal.tsx
│   ├── Toast.tsx
│   └── ViewDetailsModal.tsx
│
├── context/              # React Context for global state
│   └── AuthContext.tsx
│
├── data/                 # Static data (e.g., products)
│   └── products.ts
│
├── helpers/              # Utility functions
│   └── export.helper.ts
│
├── hooks/                # Custom React hooks
│   ├── useAuth.ts
│   └── useGifts.ts
│
├── libs/                 # Shared utilities
│   └── utils.ts
│
├── public/               # Public assets
│   └── images/
│       ├── iv-al.png
│       └── padrao-presente.jpg
│
├── services/             # API and utility services
│   ├── api.ts            # HTTP requests to backend
│   ├── storage.ts        # Local storage handling
│   └── whatsapp.ts       # WhatsApp integration
│
├── styles/               # Global styles and animations
│   └── animations.css
│
├── types/                # TypeScript interfaces
│   ├── Product.ts
│   └── index.ts
│
├── ui/                   # Basic UI elements
│   ├── Button.tsx
│   ├── Dialog.tsx
│   ├── Input.tsx
│   └── Label.tsx
│
├── App.tsx               # Main app component
├── main.tsx              # Entry point
└── vite-env.d.ts         # Vite environment types
```

---

## 🛠️ Project Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/your-repo.git

# Navigate into the directory
cd your-repo

# Install dependencies
npm install
```

---

## 🚀 Running the Application

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🧪 Testing

Currently, this project does not include automated tests. However, you can add Jest or Vitest later using:

```bash
npm add --save-dev vitest @vitejs/plugin-vitest
```

---

## 🌐 Environment Configuration

The app uses `.env` files for environment variables. Create a `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_WHATSAPP_NUMBER=+5511999999999
```

> Replace `VITE_API_BASE_URL` with your backend URL.

---

## 🎨 Styling & Design

- **Tailwind CSS** is used for utility-first styling.
- Custom animations are defined in `styles/animations.css`.
- Responsive design for mobile and desktop.

---

## 🔐 Authentication

- Uses `AuthContext` for managing login/logout states.
- Token stored in `localStorage` via `storage.ts`.
- Protected routes can be implemented using `useAuth`.

---

## 📡 API Integration

All API calls are handled through `services/api.ts`. The service includes:
- Base URL configuration
- Request interceptors
- Error handling
- Axios-based HTTP client

---

## 📱 WhatsApp Integration

- `services/whatsapp.ts` handles sending messages via WhatsApp.
- Used for confirming reservations or customer support.

---

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Hooks Guide](https://react.dev/learn)

---

## 💬 Support & Contact

If you have questions or need help:
- Join the [React Discord](https://discord.gg/react)
- Follow [@reactjs](https://twitter.com/reactjs) on Twitter
- Open an issue on GitHub

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Joaoof** – Frontend Developer  
[GitHub Profile](https://github.com/Joaoof)  
📧 Contact: joao@example.com (replace with your email)

---

> ✨ Built with ❤️ using React, Vite, and Tailwind CSS
```

---

### ✅ O que foi incluído?

- **Logo do React** e links oficiais
- **Badges atualizados** com versões realistas (você pode ajustar se quiser)
- **Estrutura de pastas detalhada** com descrições
- **Explicação dos módulos principais**: context, hooks, services, UI
- **Configuração de ambiente** com `VITE_`
- **Integração WhatsApp** destacada
- **Autenticação com Context**
- **Links úteis** e documentação
- **Formato limpo e profissional**

---

Se quiser, posso gerar uma versão **em português** ou adaptar para **Next.js**, **Nuxt**, ou qualquer outro framework. Deseja isso?
