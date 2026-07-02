#TaskFlow

**TaskFlow** is an AI-powered task management application that combines traditional task management with intelligent productivity features. Built with the MERN stack, it helps users organize, prioritize, and complete tasks efficiently.

## 🎯 Overview

TaskFlow streamlines task management by providing a complete solution for:
- **Task CRUD operations** (Create, Read, Update, Delete)
- **AI-powered task prioritization** using Google Gemini
- **Advanced filtering** (search, priority, completion status)
- **User authentication** with secure JWT-based sessions

## 🚀 Key Features

### Core Task Management
- **Dashboard interface** to view all tasks
- **Search and filtering** by keywords, priority, and completion status
- **Add/edit tasks** with rich metadata (titles, descriptions, due dates, priorities)
- **Real-time updates** with toast notifications
- **Responsive design** for desktop and mobile

### AI-Powered Prioritization
- **AI Analyze** page for intelligent task ranking
- **AI considers** urgency, importance, effort, and current priority labels
- **Detailed reasoning** for each priority ranking
- **Execution sequence** suggestions for optimal workflow
- **Fallback mode** when AI API is unavailable (shows tasks in default order)

### User Experience
- **JWT authentication** with secure cookies
- **Session management** with automatic logout
- **Protected routes** for authenticated users
- **Clean, modern UI** with Tailwind CSS and React components

## 🛠 Tech Stack

### Frontend
- **React + Vite** for rapid development
- **JavaScript** with modern ES6+ syntax
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Hot Toast** for notifications

### Backend
- **Node.js + Express** for server-side logic
- **MongoDB + Mongoose** for data storage
- **JWT Authentication** for secure sessions
- **CORS middleware** for cross-origin requests
- **Cookie Parser** for session management

### AI Integration
- **Google Gemini API** for task prioritization
- **JSON responses** with structured AI output
- **Error handling** for AI service failures

## 📁 Project Structure

```
TaskFlow/
├── backend/
│   ├── .env              # Environment variables (see example below)
│   ├── config/
│   │   └── dbConfig.js    # Database connection
│   ├── controllers/      # API route handlers
│   ├── models/           # Mongoose schemas
│   ├── middlewares/      # Express middleware
│   ├── routes/           # API routes
│   └── app.js            # Express server
│
├── frontend/
│   ├── .env               # Environment variables (see example below)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   └── App.jsx        # Main application entry point
│   └── vite.config.js     # Vite configuration
│
├── AGENTS.md             # Development guidelines
└── README.md             # This file
```

## 🔧 Environment Configuration

### Backend (.env)
```env
# Server Configuration
PORT=8080

# MongoDB Configuration
MONGODB_URI=mongodb://127.0.0.1:27017/taskflow

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# JWT Configuration
JWT_SECRET=your_jwt_secret_here

# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.0-flash
```

### Frontend (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:8080
```

### Database Schema (MongoDB)
- **User**: username, email, password
- **Task**: title, description, dueDate, priority, isCompleted, owner
```

## 🎨 UI/UX Highlights

- **Modern glassmorphism** design inspired components
- **Accessible** with proper ARIA labels
- **Responsive** layout for all screen sizes
- **Animated transitions** for smooth user interactions
- **Mobile-friendly** task editing forms

## 🏃‍♂️ Quick Start

### Backend
```bash
cd backend
npm install
node app.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Testing & Linting
```bash
cd backend
npm test

cd frontend
npm run lint
```

## ⚡ Usage Workflow

1. **Sign up or login** to create your account
2. **Add tasks** with title, description, due date, and priority
3. **Manage tasks** through the dashboard with search and filter options
4. **Edit or delete** tasks as needed
5. **Use AI Prioritization** on the `/prioritize` page:
   - Select tasks to analyze
   - Get AI-powered priority rankings
   - View detailed reasoning for each priority
   - Follow suggested execution sequence

## 🔒 Security Features

- **JWT tokens** stored in HTTP-only cookies
- **Password hashing** using bcryptjs
- **Input validation** for all API endpoints
- **CORS protection** with configurable origins
- **Session timeout** (4 hours)

## 🤖 AI Task Prioritization Details

The AI prioritization algorithm analyzes tasks based on:

1. **Urgency**: Proximity to due dates
2. **Importance**: Impact and description complexity
3. **Effort**: Description length and complexity indicators
4. **Current Priority**: Manual priority labels

Returns a structured JSON response with:
- `prioritizedTasks`: Array of tasks ranked by priority with reasoning
- `summary`: One-sentence AI analysis summary
- `executionSequence`: Recommended order to tackle tasks

## 📚 Development Guidelines

Refer to **AGENTS.md** for comprehensive development guidelines, including:
- Phased implementation plans
- Code quality standards
- Testing strategies
- AI integration best practices

## 🛡️ Deployment Considerations

- Use environment variables for production secrets
- Set secure `JWT_SECRET` and `GEMINI_API_KEY`
- Configure proper MongoDB connection URI
- Enable HTTPS in production
- Set appropriate CORS origins

TaskFlow combines the simplicity of traditional task managers with the intelligence of AI-powered prioritization, making it an essential tool for productivity and task management.
