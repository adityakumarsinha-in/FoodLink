# 🌿 FoodLink

> **Connecting Surplus Food With People Who Need It** — A premium, futuristic, and classically beautiful platform built to reduce landfill food waste, combat hunger, and coordinate community redistribution.

---

## 🎨 Design Theme: Glassmorphic Eco-Futurism
FoodLink features a premium dark obsidian layout (`#03060e`) decorated with cosmic background glow blurs (emerald, cyan, violet) and fine grid meshes. Built with the **Syne** (headings) and **Space Grotesk** (tech interface) Google Fonts, the platform offers dynamic neon-indicator sidebars, glassy forms, and smooth micro-animations.

---

## ⚙️ Key Platform Modules
FoodLink is a role-based single page application (SPA). Once registered, users can switch between **5 distinct dashboard consoles** built for live testing:

* 🏪 **Food Providers:** Restaurants, bakeries, hostels, and event organizers can list surplus meals, track active items, and monitor donation histories.
* 🤝 **NGOs:** Discover local listings in real-time, inspect coordinate grids via the interactive **Food Map**, claim meals, and log distribution logs.
* 🚗 **Volunteers:** Assisting transport links. Get notified of assigned pickups, coordinate routes, and mark safe deliveries.
* 📍 **Needy Individuals:** Browse nearby available food donations relative to proximity and claim directly.
* 📊 **Admin Console:** Track carbon footprint metrics, review active/completed items, moderate registered users, and audit platform registries.

---

## 💻 Tech Stack

| Technology | Role |
| :--- | :--- |
| **React 19** | Functional components, custom hooks, and dynamic layouts. |
| **Vite 6** | Modern, fast bundler and build development server. |
| **Tailwind CSS v4** | Obsidian dark variables, glassy classes, and responsive grids. |
| **React Router v7** | Client-side routing, nested layouts, and role paths. |
| **Context API** | Role authorization, active session mocks, and global states. |
| **Recharts** | Interactive SVG analytics dashboards. |
| **Lucide React** | Cybernetic vector icons. |

---

## 🚀 Running Locally

Follow these instructions to set up the development server on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adityakumarsinha-in/FoodLink.git
   cd FoodLink
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```
   Open **`http://localhost:5173/FOOD-LINK/`** in your browser.

---

## 🌐 Production Build & Deployment

### Build Command
To compile the React files into highly optimized production static files:
```bash
npm run build
```
This generates the static `dist/` directory, which is ignored locally by `.gitignore`.

### Automated Deployment (GitHub Actions)
The repository is integrated with **GitHub Actions** (`.github/workflows/deploy.yml`). Pushing changes to the `main` branch triggers an automated runner that:
1. Installs Node.js & dependencies.
2. Compiles the project using `npm run build`.
3. Hosts and deploys the output to **GitHub Pages** under the `/FOOD-LINK/` subpath.
