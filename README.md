# 🛡️ ScopeShield - Transform Vague Requests into Clear Technical Contracts

![ScopeShield Banner](https://img.shields.io/badge/ScopeShield-Hackathon%20Project-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.9+-green?style=flat-square)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-teal?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square)

## 🎯 What is ScopeShield?

**ScopeShield** is an intelligent tool that protects developers and teams from the dangers of scope creep. It converts vague client requests into detailed technical scope contracts, identifying:

- 🔍 **Hidden Scope** - Tasks not explicitly mentioned
- ⚠️ **Technical Risks** - Potential problems before starting
- ❓ **Clarifying Questions** - What you should ask before committing
- 📊 **Realistic Estimates** - Time and complexity based on analysis
- 📋 **Implementation Plan** - Detailed steps to execute the project
- ✉️ **Professional Response** - Ready-to-send email for the client

## 🚀 Quick Start

### Option 1: Quick Guide (Recommended)

Read the [**Quick Start Guide (QUICKSTART.md)**](./QUICKSTART.md) for step-by-step instructions.

### Option 2: Quick Commands

**Backend (Terminal 1):**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm install
npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001
- API Documentation: http://localhost:8001/docs

## 📸 Screenshots

### Main Page
Clean and modern interface to enter client requests.

### Analysis Dashboard
Complete analysis view with 10 detailed sections:
- Request summary
- Risk score
- Identified hidden scope
- Impacted code areas
- Technical risks
- Clarifying questions
- Time estimation
- Implementation plan
- Client response
- Task checklist

## 🏗️ Project Architecture

```
ScopeShield/
│
├── 📁 backend/              # FastAPI API (Python)
│   ├── main.py             # Entry point
│   ├── models/             # Pydantic models
│   ├── routers/            # REST endpoints
│   ├── services/           # Business logic
│   └── requirements.txt    # Dependencies
│
├── 📁 frontend/             # Next.js Application (TypeScript)
│   ├── app/                # Pages and routes
│   ├── components/         # React components
│   ├── lib/                # API client and utilities
│   ├── types/              # TypeScript types
│   └── package.json        # Dependencies
│
├── 📁 docs/                 # Project documentation
├── 📁 CHATS-BOB/           # IBM Bob conversation logs
├── test_backend_integration.py  # Test script
├── QUICKSTART.md           # Quick start guide
└── README.md               # This file
```

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern and fast web framework
- **Pydantic** - Automatic data validation
- **Uvicorn** - High-performance ASGI server
- **Python 3.9+** - Base language

### Frontend
- **Next.js 14** - React framework with SSR
- **TypeScript** - Static typing
- **Tailwind CSS** - Utility-first styles
- **React Hooks** - State management

## 🎨 Key Features

### ✅ Intelligent Fallback System
The frontend automatically attempts to connect to the backend. If unavailable, it uses mock data to allow uninterrupted development.

### ✅ Complete Scope Analysis
- Identifies hidden unmentioned tasks
- Calculates technical risk (0-10)
- Detects impacted code areas
- Generates intelligent questions

### ✅ Realistic Estimates
- Time breakdown per task
- Complexity classification
- Dependency identification

### ✅ Professional Response
- Formatted email ready to send
- Professional and clear tone
- Includes all necessary questions

### ✅ Implementation Plan
- Ordered and numbered steps
- Estimated duration per step
- Task dependencies

### ✅ Actionable Checklist
- Complete verification list
- Markdown format for copying
- Logically organized tasks

## 📊 Usage Example

**Client Input:**
```
"Just add Google login, change the dashboard and make it look more modern."
```

**ScopeShield Output:**
- ✅ Identifies 8+ hidden tasks (session handling, user migration, etc.)
- ✅ Calculates technical risk: 7.5/10
- ✅ Generates 6 clarifying questions
- ✅ Estimates 3-5 days of work
- ✅ Creates detailed 6-step plan
- ✅ Prepares professional response for client

## 🧪 Testing

### Test Backend
```bash
python test_backend_integration.py
```

### Test Frontend
```bash
cd frontend
npm run dev
# Open http://localhost:3000 and click "Try Demo Now"
```

## 📚 Documentation

- [**QUICKSTART.md**](./QUICKSTART.md) - Quick start guide
- [**backend/README.md**](./backend/README.md) - Backend documentation
- [**frontend/INTEGRATION.md**](./frontend/INTEGRATION.md) - Integration guide
- [**docs/**](./docs/) - Additional project documentation
- [**CHATS-BOB/**](./CHATS-BOB/) - IBM Bob conversation logs for hackathon

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
PORT=8001
NODE_ENV=development
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8001
```

## 🚧 Project Status

### ✅ Completed (MVP)
- [x] FastAPI Backend API
- [x] Next.js and TypeScript Frontend
- [x] Automatic fallback system
- [x] 10 dashboard sections
- [x] Reusable components
- [x] Complete documentation
- [x] Integration test script
- [x] IBM Bob conversation logs

### 🔜 Future Improvements
- [ ] IBM Bob integration for real repository analysis
- [ ] Intelligent code pattern detection
- [ ] Database for analysis history
- [ ] User authentication system
- [ ] Export reports (PDF, Markdown)
- [ ] Multiple repository analysis
- [ ] GitHub/GitLab integration

## 👥 ScriptHunters Team

Project developed for the ScopeShield Hackathon.

## 🤝 Contributing

This is a hackathon project. If you want to contribute:

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - See [LICENSE](./LICENSE) file for details.

## 🎤 Hackathon Materials

Presenting ScopeShield at the hackathon? We have everything ready:

- 📋 [**Demo Script**](./docs/04-demo-hackathon.md) - 30s pitch and 2-minute demo
- 📊 [**Slides**](./docs/05-slides-demo.md) - 10 slides with exact timing
- ❓ [**FAQ for Judges**](./docs/06-faq-jueces.md) - 15+ questions with prepared answers
- 🤖 [**IBM Bob Usage Report**](./docs/07-ibm-bob-usage-report.md) - Complete AI collaboration documentation
- 💬 [**Conversation Logs**](./CHATS-BOB/) - Full IBM Bob chat history
- 📚 [**Docs Index**](./docs/README.md) - All documentation organized

## 🆘 Support

Having issues? Check:
1. [QUICKSTART.md](./QUICKSTART.md) - Start guide
2. [INSTRUCCIONES_EJECUCION.md](./INSTRUCCIONES_EJECUCION.md) - Detailed steps
3. [backend/README.md](./backend/README.md) - Backend documentation
4. [docs/](./docs/) - Complete project documentation

## 🎉 Acknowledgments

- FastAPI for their excellent framework
- Next.js for making frontend development so easy
- The open source community for the incredible tools

---

**Made with ❤️ by the ScriptHunters team**

[⬆ Back to top](#️-scopeshield---transform-vague-requests-into-clear-technical-contracts)