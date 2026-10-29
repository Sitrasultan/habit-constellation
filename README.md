<div align="center">

# ✨ Habit Constellation

### *Small steps • Big dreams*

Turn your daily habits into stars, and watch them form a constellation of the life you're building.

[![Live Demo](https://img.shields.io/badge/Live-Demo-8b5cf6?style=for-the-badge&logo=vercel&logoColor=white)](https://YOUR-LIVE-LINK.vercel.app)
[![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![PWA](https://img.shields.io/badge/PWA-Installable-f59e0b?style=for-the-badge&logo=pwa&logoColor=white)](#-install-as-an-app)

![Habit Constellation Dashboard](./screenshots/dashboard.png)

</div>

---

## 🌌 About

**Habit Constellation** is a habit tracker that replaces boring checklists with something you actually want to look at. Every habit is a **star** on a night-sky canvas. Complete it today and it glows brighter. Keep a streak and it grows. Together, your stars connect into a named **constellation** that you can save, share, and export.

> *"You don't just build habits, you build the life you want."*

---

## 🎯 Features

### Core
- ⭐ **Habits as stars:** every habit becomes a glowing star in its own color
- ✅ **Daily check-ins:** one tap to complete, one tap to undo
- 🔥 **Smart streaks:** calculated from completion history, so they can never go out of sync
- 🌠 **Living constellation:** star size and glow grow with your streak, and missed days dim them
- 🏷️ **Name your constellation:** give it a title like *"The Balanced Dreamer"*

### Going further
- 🏅 **Milestone badges:** special rings for 7, 30, and 100-day streaks
- 🎆 **Daily celebration:** complete every habit and a shooting star crosses the sky
- 🧩 **Constellation templates:** arrange your stars into shapes (Big Dipper, Heart, Triangle, Crown)
- 📅 **Flexible scheduling:** daily habits or specific weekdays
- 📝 **Check-in notes:** add a one-line reflection to any day
- 📊 **Statistics page:** heatmap calendar, completion rates, best and current streaks
- 🗓️ **Weekly reflection:** your brightest star, your dimmest star, and your progress at a glance
- 🔔 **Reminders:** optional browser notifications per habit
- 🖼️ **Shareable export:** download your constellation as a PNG (square or story size)
- 🎨 **Sky themes:** Midnight, Dawn, and Aurora
- 💾 **Your data, your control:** export, import, or reset everything as JSON

### Quality
- 📱 **Fully responsive:** sidebar on desktop, bottom navigation on mobile
- ♿ **Accessible:** keyboard navigation, ARIA labels, visible focus, reduced-motion support
- 📲 **Installable PWA:** works offline and installs like a native app
- ⚡ **Fast:** lazy-loaded pages and GPU-friendly animations

---

## 📸 Screenshots

| Dashboard | Mobile | Statistics |
|:---:|:---:|:---:|
| ![Dashboard](./screenshots/dashboard.png) | ![Mobile](./screenshots/mobile.png) | ![Statistics](./screenshots/statistics.png) |

| Constellation Templates | Export Card |
|:---:|:---:|
| ![Templates](./screenshots/templates.png) | ![Export](./screenshots/export.png) |

---

## 🛠️ Tech Stack

| Area | Tools |
|---|---|
| **Framework** | React 18, Vite |
| **Routing** | React Router |
| **State** | Context API + `useReducer` |
| **Styling** | CSS variables design system (or Tailwind) |
| **Graphics** | Hand-built SVG (stars, mountains, glow filters) |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Storage** | localStorage with a versioned schema |
| **PWA** | vite-plugin-pwa |
| **Testing** | Vitest |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or newer
- npm, yarn, or pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/habit-constellation.git

# 2. Go into the project folder
cd habit-constellation

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the dev server |
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run test` | Runs unit tests |

---

## 📲 Install as an App

Habit Constellation is a Progressive Web App.

- **Desktop (Chrome/Edge):** click the install icon in the address bar
- **Android:** open the menu, then **Add to Home screen**
- **iPhone:** tap **Share**, then **Add to Home Screen**

---

## 📁 Project Structure

```
habit-constellation/
├── public/              # Icons, manifest, static assets
├── screenshots/         # README images
├── src/
│   ├── components/      # Sidebar, HabitCard, ConstellationCanvas, StatCard...
│   ├── pages/           # Home, MyHabits, Constellations, Statistics, Settings
│   ├── context/         # Global habit and theme state
│   ├── hooks/           # useHabits, useStreaks, useLocalStorage, useTheme
│   ├── utils/           # Date helpers, streak logic, export helpers
│   ├── styles/          # Design tokens and global styles
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 🧠 Design Decisions

- **Streaks are derived, not stored.** Each habit keeps a list of completion dates, and streaks are calculated from it. This makes inconsistent data (like a 12-day streak with 7 lit days) impossible.
- **One clear completion state.** A checkmark means done today and an empty circle means not done, so users never have to guess.
- **SVG over images.** The night sky, mountains, and stars are all SVG, which keeps the app light and sharp on every screen.
- **Preset star positions.** Stars snap to hand-tuned coordinates, so the constellation always looks balanced instead of random.
- **Mobile-first.** The layout starts from a phone screen and scales up, with 44px minimum tap targets.
- **Safe local storage.** Reads and writes are wrapped in error handling with a versioned schema, so future updates can migrate old data.

---

## 🗺️ Roadmap

- [ ] User accounts and cloud sync (Node.js, Express, PostgreSQL)
- [ ] Friends and shared constellations
- [ ] Ethiopian calendar support
- [ ] Home screen widgets
- [ ] Multi-language support (English, Amharic, Afaan Oromo)

---

## 🤝 Contributing

Contributions, issues, and feature ideas are welcome.

1. Fork the project
2. Create your branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "feat: add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 👩‍💻 Author

**Sitra Sultan**
Full-stack developer · Information Science graduate, Jimma University

[![GitHub](https://img.shields.io/badge/GitHub-YOUR__USERNAME-181717?style=flat-square&logo=github)](https://github.com/YOUR_USERNAME)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0a66c2?style=flat-square&logo=linkedin)](https://linkedin.com/in/YOUR_PROFILE)

---

<div align="center">

If you like this project, please give it a ⭐ on GitHub!

*Made with 💜 and a lot of stars.*

</div>