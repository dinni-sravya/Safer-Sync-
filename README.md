# SaferSync 🛡️✨

**SaferSync** is a premium, safety-first travel sharing and group matching application designed to make group travel safer, more economical, and eco-friendly. Built with a modern tech stack, it features a stunning glassmorphism UI/UX and unique safety features like "Women Only" filters and "Mood matching".

![SaferSync Banner](https://via.placeholder.com/1200x400/0a0a0a/a855f7?text=SaferSync+Travel+App)

## 🚀 Key Features

- **🛡️ Safety First**: Dedicated "Women Only" travel filters for secure group matching.
- **🎭 Mood Matching**: Find travel groups that match your vibe (Chill, Party, Business, Silent).
- **🌿 Eco-Impact Dashboard**: Visualize your contribution to the planet with CO₂, Fuel, and Money savings.
- **💰 Smart Expense Split**: Automatic cost calculation and per-person split display in INR (₹).
- **🎨 Premium UI**: Deep purple & black aesthetic with Glassmorphism, Neon accents, and Framer Motion animations.
- **⚡ Full Stack**: React + Vite Frontend focused on performance, backed by a Node.js Express server.

## 🚧 Current Prototype Scope

The current version includes the following fully functional flows:
1.  **Authentication**: Secure Login with Mobile & OTP.
2.  **Onboarding**: Language Selection (English, Hindi, Kannada).
3.  **Discovery**: "Find Groups" with smart filters (Women Only, Mood).
4.  **Trip Management**: View Trip Details, Itinerary, and Co-passengers.
5.  **Booking**: "Confirm & Join" flow with Payment Integration.
6.  **Impact**: Eco-dashboard tracking savings.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express.js.
- **Architecture**: Monorepo structure with `concurrently` for unified execution.

## 📦 Installation & Running

Prerequisites: Node.js installed.

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/safersync.git
    cd safersync
    ```

2.  **Install Dependencies**
    Execute this command in the root folder to install dependencies for **Root**, **Client**, and **Server** automatically:
    ```bash
    npm run install:all
    ```

3.  **Run the Application**
    Start both the Frontend (Client) and Backend (Server) with a single command:
    ```bash
    npm start
    ```

    - **Frontend**: [http://localhost:5173](http://localhost:5173)
    - **Backend**: [http://localhost:5000](http://localhost:5000)

## 📂 Project Structure

```
safersync/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI (EcoCard, Layout)
│   │   ├── pages/          # Full pages (Search, Login, Payment)
│   │   └── index.css       # Tailwind & Theme styles
│   └── vite.config.js
├── server/                 # Express Backend
│   ├── index.js            # API Routes & Mock Data
│   └── package.json
└── package.json            # Root scripts
```

## 📸 Screenshots

| Login & Language | Group Search |
|------------------|--------------|
| *Glassmorphic Login* | *Smart Filters & Listings* |

| Trip Details | Eco Dashboard |
|--------------|---------------|
| *Itinerary & Map* | *Savings & CO2 Stats* |

---

*Made for Hackathon 2026*
"# Safer-Sync-" 
