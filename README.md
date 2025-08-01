# 🚀 Job Application Tracker

> **A modern, full-stack application to streamline your job search process with advanced tracking, analytics, and productivity features.**

[![React](https://img.shields.io/badge/React-18.0.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green.svg)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-blue.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-4.4-yellow.svg)](https://vitejs.dev/)

<div align="center">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License"/>
  <img src="https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg" alt="Status"/>
  <img src="https://img.shields.io/badge/Version-1.0.0-blue.svg" alt="Version"/>
</div>

---

## ✨ Features

### 📊 **Advanced Dashboard**
- **Real-time Analytics** - Track application success rates, response times, and industry trends
- **Interactive Charts** - Visualize your job search progress with beautiful charts
- **Status Tracking** - Monitor applications across different stages (Applied, Interview, Offer, etc.)

### 🎯 **Smart Application Management**
- **Quick Add** - Add new applications in seconds with our streamlined form
- **Bulk Operations** - Import/export applications, bulk status updates
- **Advanced Search** - Find applications by company, position, status, or custom filters
- **Follow-up Reminders** - Never miss a follow-up with intelligent reminder system

### 📁 **Document Management**
- **Resume & Cover Letter Storage** - Upload and organize all your documents
- **Version Control** - Track different versions of your resumes
- **File Organization** - Categorize documents by application type

### 🔔 **Productivity Features**
- **Interview Scheduling** - Calendar integration for interview management
- **Email Templates** - Pre-written templates for follow-ups and thank you notes
- **Progress Tracking** - Set goals and track your job search milestones
- **Mobile Responsive** - Access your data anywhere, anytime

### 🎨 **Modern UI/UX**
- **Dark/Light Mode** - Toggle between themes for comfortable viewing
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Intuitive Interface** - Clean, modern design with smooth animations
- **Accessibility** - Built with accessibility best practices

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible components
- **React Router** - Client-side routing
- **React Query** - Server state management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication & authorization
- **Multer** - File upload handling

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control
- **npm** - Package management

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adarshraj26/job-application-tracker.git
   cd job-application-tracker
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Copy example files
   cp env.example .env
   cp backend/env.example backend/.env
   
   # Edit the files with your configuration
   # See the example files for required variables
   ```

4. **Start the development servers**
   ```bash
   # Start backend server (in backend directory)
   cd backend
   npm run dev
   
   # Start frontend server (in new terminal)
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## 📱 Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Dashboard+Screenshot" alt="Dashboard" width="400"/>
  <img src="https://via.placeholder.com/800x400/10B981/FFFFFF?text=Applications+List" alt="Applications" width="400"/>
  <img src="https://via.placeholder.com/800x400/F59E0B/FFFFFF?text=Analytics+View" alt="Analytics" width="400"/>
</div>

---

## 🏗️ Project Structure

```
job-application-tracker/
├── src/                    # Frontend source code
│   ├── components/         # Reusable UI components
│   ├── features/          # Feature-based components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── hooks/             # Custom React hooks
│   ├── context/           # React context providers
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── backend/               # Backend source code
│   ├── config/            # Database configuration
│   ├── middleware/        # Express middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── utils/             # Backend utilities
├── public/                # Static assets
└── docs/                  # Documentation
```

---

## 🔧 Configuration

### Environment Variables

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Job Application Tracker
```

**Backend (backend/.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-tracker
JWT_SECRET=your-secret-key
```

### Database Setup

1. **Local MongoDB**
   ```bash
   # Install MongoDB locally
   # Start MongoDB service
   ```

2. **MongoDB Atlas**
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Get your connection string
   - Update `MONGODB_URI` in backend/.env

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy the dist folder
```

### Backend Deployment (Railway/Render)
```bash
cd backend
npm start
```

### Environment Variables for Production
- Set all environment variables in your hosting platform
- Use production MongoDB URI
- Configure CORS for your domain

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow the existing code style
- Use TypeScript for all new code
- Write meaningful commit messages
- Add tests for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Vite Team** - For the lightning-fast build tool
- **Tailwind CSS** - For the utility-first CSS framework
- **Shadcn/ui** - For the beautiful component library
- **MongoDB** - For the flexible database solution

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/adarshraj26/job-application-tracker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/adarshraj26/job-application-tracker/discussions)
- **Email**: [Your Email]

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/adarshraj26">Adarsh Raj</a></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
