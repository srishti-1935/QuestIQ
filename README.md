# 🧠 QuestIQ — Cognitive Bias Detector

> Detect. Understand. Grow.

QuestIQ is an AI-powered web app that identifies cognitive biases in your everyday thoughts, decisions, and arguments — and shows you how to think more clearly.

## 🌐 Live Demo
[quest-iq-ten.vercel.app](https://quest-iq-ten.vercel.app)

## 💡 Why I Built This
Every day our brains take mental shortcuts that distort our decisions. Confirmation bias, sunk cost fallacy, survivorship bias — most people never notice them. QuestIQ makes these patterns visible in real time, helping people reason more clearly and make better decisions.

## ✨ Features
- **Bias Detection** — Paste any thought or argument and AI identifies the cognitive bias at play
- **Reframing** — Get a clear, non-judgmental explanation and a better way to think about it
- **Severity Scoring** — Each bias is rated low, medium, or high severity
- **Bias Profile** — Track your thinking patterns over time and see which biases you fall into most
- **Streak Tracking** — Daily usage streak to build the habit of clearer thinking

## 🛠️ Tech Stack
**Frontend**
- React.js
- React Router
- Lucide React (icons)
- CSS (glassmorphism + aurora animations)

**Backend**
- Node.js + Express
- Groq API (Llama 3.3 70B)

**Deployment**
- Frontend: Vercel
- Backend: Railway

## 🚀 Run Locally

**Clone the repo**
```bash
git clone https://github.com/srishti-1935/questiq.git
cd questiq
```

**Setup backend**
```bash
cd server
npm install
```

Create a `.env` file in the server folder:
```
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

```bash
npm run dev
```

**Setup frontend**
```bash
cd client
npm install
npm start
```

App runs at `http://localhost:3000`

## 📁 Project Structure

```
questiq/
├── client/
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── Landing.js
│       ├── Tool.js
│       └── History.js
└── server/
    ├── index.js
    └── routes/
        └── analyze.js
```

## 🔮 What's Next
QuestIQ is the first of two projects I'm building at the intersection of psychology, history, and technology. The second — **Ripple** — is a historical consequence engine that lets you explore alternate timelines and their human impact.

---
