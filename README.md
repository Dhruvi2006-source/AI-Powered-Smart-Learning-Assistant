# 🎓 GenAI-Powered Smart Learning Assistant (`SmartLearn`)

An intelligent, student-friendly web application designed to help engineering students understand study materials, ask context-bound clarifying questions, and practice with AI-generated multiple-choice quizzes.

> **Academic Project**: 3rd Year B.Tech Computer Engineering (SAP Academic Submission)  
> **Author**: [Dhruvi Patel](https://dhruvi-dev.vercel.app/)  
> **Portfolio**: [dhruvi-dev.vercel.app](https://dhruvi-dev.vercel.app/)

---

## 🌟 Key Features

1. **📝 AI Notes Summarizer**:
   - Paste lengthy lecture notes or textbook chapters.
   - Generates a concise summary and 4–6 structured bullet points for quick exam revision.
   - Built-in live character counter (`0 / 5000`) and one-click **Copy Summary** functionality.

2. **❓ Ask AI (Context-Bound Q&A Tutor)**:
   - Ask questions about your study notes.
   - Instructs Gemini to answer strictly using the provided study material as primary context.
   - If the answer is not present in the notes, Gemini clearly notifies the student instead of hallucinating.

3. **🎯 AI Quiz Generator**:
   - Automatically extracts core concepts to create multiple-choice practice questions (MCQs).
   - Configurable question count (3, 5, 10) and difficulty level (Easy, Medium, Hard).
   - Interactive options selection, automated score evaluation (`Score: X / Y`), correct/incorrect highlighting, and detailed answer explanations.

---

## 🛠️ Technology Stack

### Frontend (`/client`)
- **Framework**: React 18 / 19 + Vite
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: Lucide React (`lucide-react`)
- **Language**: JavaScript (ES6+ / JSX)

### Backend (`/server`)
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Generative AI SDK**: Official `@google/genai` JavaScript SDK
- **AI Model**: Google Gemini (`gemini-3.6-flash`)
- **Middleware**: CORS, Express JSON Parser, Dotenv

---

## 📂 Repository Directory Structure

```text
SAP/
├── .env.example                  # Root placeholder environment template
├── .gitignore                    # Git ignore file for node_modules, build & env files
├── README.md                     # Complete project guide & setup documentation
│
├── client/                       # React + Vite Frontend Application
│   ├── package.json
│   ├── vite.config.js            # Vite config with @tailwindcss/vite plugin
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx               # Main application layout, tab router & footer
│       ├── index.css             # Tailwind v4 setup & typography
│       ├── config/
│       │   └── apiConfig.js      # Centralized API Base URL configuration
│       ├── data/
│       │   └── mockData.js       # Fallback mock study notes and sample Q&A
│       ├── services/
│       │   └── api.js            # Fetch helper communicating with Express backend
│       ├── components/
│       │   ├── Navbar.jsx        # Navigation bar & mobile drawer menu
│       │   ├── FeatureCard.jsx   # Dashboard feature cards
│       │   ├── LoadingState.jsx  # AI processing loader animation
│       │   ├── AIResponseCard.jsx# Formatted AI output & copy button
│       │   └── QuizQuestion.jsx  # MCQ option selector & scoring evaluator
│       └── pages/
│           ├── Home.jsx          # Dashboard overview & 3-step guide
│           ├── Summarizer.jsx    # Notes summarizer tool page
│           ├── AskAI.jsx         # Q&A tutor page
│           └── Quiz.jsx          # MCQ practice quiz generator page
│
└── server/                       # Node.js + Express + Gemini Backend
    ├── package.json
    ├── server.js                 # Express server entry point (Port 5000)
    ├── .env                      # Private environment variables (GEMINI_API_KEY)
    ├── .env.example              # Template for server environment variables
    ├── routes/
    │   └── api.js                # Express API routes (/health, /summarize, /ask, /quiz)
    └── services/
        └── geminiService.js      # Gemini GenAI SDK prompts & structured schemas
```

---

## 📋 Prerequisites

Before running the project, ensure you have the following installed on your machine:

- **Node.js**: `v18.0.0` or higher (Verify with `node -v`)
- **npm**: `v9.0.0` or higher (Verify with `npm -v`)
- **Google Gemini API Key**: Free key from [Google AI Studio](https://aistudio.google.com/)

---

## ⚡ Step-by-Step Installation & Setup Guide

### Step 1: Clone or Download the Repository

```bash
git clone https://github.com/Dhruvi2006/AI-Powered-Smart-Learning-Assistant.git
cd AI-Powered-Smart-Learning-Assistant
```

---

### Step 2: Configure Backend Environment Variables

1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install server dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside the `server/` directory:
   ```bash
   # On Windows PowerShell:
   New-Item -ItemType File -Name .env

   # On Mac/Linux:
   touch .env
   ```
4. Open `server/.env` and add your Gemini API Key:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
   *(Replace `your_actual_gemini_api_key_here` with your key from [Google AI Studio](https://aistudio.google.com/)).*

---

### Step 3: Install Frontend Dependencies

Open a new terminal window, navigate to the `client/` directory, and install dependencies:

```bash
cd client
npm install
```

---

## 🚀 Running the Application

To run the application locally, you need to start **both** the backend server and the frontend client simultaneously.

### 1. Start the Backend Express Server

In your first terminal (inside `server/`):

```bash
npm start
```

- Server will start at: **`http://localhost:5000`**
- Health Check: **`http://localhost:5000/api/health`**

---

### 2. Start the Frontend React App

In your second terminal (inside `client/`):

```bash
npm run dev
```

- Client will launch at: **`http://localhost:5173`**

Open `http://localhost:5173` in your web browser to use the application!

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description | Sample Payload |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Server Health Status | N/A |
| `POST` | `/api/summarize` | Summarize study notes | `{ "notes": "Textbook content..." }` |
| `POST` | `/api/ask` | Answer question from notes | `{ "notes": "...", "question": "..." }` |
| `POST` | `/api/quiz` | Generate MCQs | `{ "notes": "...", "numberOfQuestions": 3, "difficulty": "medium" }` |

---

## 💡 SAP Presentation & Demonstration Guide

If you are presenting this project for your academic evaluation:

1. **3-Tier Architecture**:
   - Highlight the clean separation between **React Frontend** $\leftrightarrow$ **Express Backend** $\leftrightarrow$ **Google Gemini AI**.
2. **Context-Grounded AI**:
   - Explain how prompt instructions prevent AI hallucinations by forcing Gemini to base answers solely on the provided study notes.
3. **Structured JSON Schemas**:
   - Demonstrate how `@google/genai` uses `responseSchema` to receive type-safe JSON objects for quiz questions and bulleted summaries.

---

## 👩‍💻 Author & Attribution

- **Developed By**: [Dhruvi Patel](https://dhruvi-dev.vercel.app/)
- **Portfolio**: [https://dhruvi-dev.vercel.app/](https://dhruvi-dev.vercel.app/)
- **Academic Submission**: B.Tech Computer Engineering (3rd Year)

---

## 📄 License

This project is open-source and created for academic submission purposes.  
© 2026 SmartLearn GenAI by Dhruvi Patel. All rights reserved.
