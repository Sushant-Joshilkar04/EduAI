# EduAI - AI-Powered Learning Platform



##  Overview

EduAI is a revolutionary AI-powered learning platform that transforms the way students interact with educational content. Our platform combines cutting-edge AI technology with intuitive design to create an immersive learning experience.

### ✨ Key Features

- **🤖 AI-Powered Smart Notes**: Transform lectures, PDFs, and study materials into intelligent, structured notes instantly
- **👨‍🏫 Real-time AI Tutoring**: Get 24/7 personalized help from your AI tutor with detailed explanations
- **📅 Intelligent Study Planning**: Create adaptive study schedules that optimize for maximum efficiency and retention
- **🎧 PDF to Podcast Converter**: Convert any PDF document into engaging podcasts for on-the-go learning

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+** - React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **React** - JavaScript library for building user interfaces

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **JWT** - JSON Web Token for authentication
- **Nodemailer** - Email service for verification

### AI & Cloud Services
- **Groq API** - AI language model integration
- **Eleven Labs** - Text-to-speech conversion
- **Cloudinary** - Cloud storage for PDFs and audio files

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Sushant-Joshilkar04/EduAI.git
cd eduai
```

### 2. Install Dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

### 3. Environment Configuration

#### Frontend Environment Variables
Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Backend Environment Variables
Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
CLIENT_URL=http://localhost:3000

# Database Configuration
MONGO_URI=mongodb://localhost:27017/eduai

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# AI Services
GROQ_API_KEY=your_groq_api_key
Eleven_LAB=your_eleven_labs_api_key

# Email Configuration
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_specific_password
```

### 4. Service Setup

#### MongoDB Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Create a database named `eduai`
3. Update the `MONGO_URI` in your environment variables

#### Cloudinary Setup
1. Sign up for a [Cloudinary](https://cloudinary.com/) account
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Update the Cloudinary credentials in your environment variables

#### Groq API Setup
1. Sign up for [Groq](https://groq.com/) account
2. Generate your API key
3. Add it to your environment variables

#### Eleven Labs Setup
1. Create an account at [Eleven Labs](https://elevenlabs.io/)
2. Get your API key from the dashboard
3. Add it to your environment variables

#### Email Configuration
1. Use Gmail or any SMTP service
2. For Gmail, generate an App Password
3. Update `MAIL_USER` and `MAIL_PASS` in your environment variables

## 🚀 Running the Application

### Development Mode

1. **Start the Backend Server**
```bash
cd backend
npm run dev
```
The backend server will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

## 🔐 Authentication Flow

1. **User Registration**: New users sign up with email and password
2. **Email Verification**: System sends verification link via email
3. **Account Activation**: Users click the link to verify their email
4. **Login**: Verified users can log in to access the platform
5. **JWT Authentication**: Secure API access with JSON Web Tokens

## 🎯 Core Features Implementation

### Smart Notes Generation
- Upload PDFs, audio files, or text documents
- AI processes content using Groq API
- Generates structured, intelligent notes
- Stores processed content in MongoDB

### AI Tutoring System
- Real-time chat with AI tutor
- Context-aware responses based on user's study materials
- Personalized explanations and examples
- Session history tracking

### Study Planning
- AI analyzes user's learning patterns
- Creates personalized study schedules
- Adaptive planning based on progress
- Deadline and goal tracking

### PDF to Podcast Conversion
- Upload PDF documents via Cloudinary
- Extract and process text content
- Convert to natural speech using Eleven Labs
- Generate downloadable podcast files

---

**EduAI** - Transforming Education with AI ✨
