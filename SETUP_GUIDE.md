# 🚀 JobTracker Full-Stack Setup Guide

Complete setup guide for the JobTracker application with React frontend and Node.js/Express backend.

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (free tier)
- **Git**

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project

### 2. Create Database Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider and region
4. Click "Create"

### 3. Set Up Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Select "Read and write to any database"
5. Click "Add User"

### 4. Set Up Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### 5. Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password

## 🛠️ Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
cp env.example .env
```

Edit `.env` with your MongoDB connection string:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/jobtracker?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Start Backend Server
```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📊 Environment: development
🌐 Health check: http://localhost:5000/api/health
MongoDB Connected: cluster.mongodb.net
```

## 🎨 Frontend Setup

### 1. Navigate to Root Directory
```bash
cd ..
```

### 2. Environment Configuration
```bash
cp env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Install Dependencies (if not already done)
```bash
npm install
```

### 4. Start Frontend Development Server
```bash
npm run dev
```

You should see:
```
VITE v7.0.6  ready in 289 ms
➜  Local:   http://localhost:5173/
```

## 🧪 Testing the Setup

### 1. Test Backend Health
Visit: `http://localhost:5000/api/health`
Should return:
```json
{
  "status": "success",
  "message": "JobTracker API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 2. Test Frontend
Visit: `http://localhost:5173`
Should show the JobTracker homepage

### 3. Test Registration
1. Click "Sign Up" on the homepage
2. Fill in the registration form
3. Submit and check if user is created in MongoDB Atlas

## 📁 Project Structure

```
job-application-tracker/
├── backend/                 # Node.js/Express backend
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth & error handling
│   ├── config/             # Database config
│   ├── utils/              # Utility functions
│   ├── uploads/            # File uploads (auto-created)
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend documentation
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── context/            # React context
│   ├── services/           # API services
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Utility functions
│   └── types/              # TypeScript types
├── package.json            # Frontend dependencies
├── vite.config.ts          # Vite configuration
└── README.md               # Main documentation
```

## 🔧 Configuration Options

### Backend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `MONGODB_URI` | MongoDB connection | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRE` | Token expiration | `30d` |
| `CORS_ORIGIN` | Allowed origins | `http://localhost:5173` |

### Frontend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

## 🚀 Deployment

### Backend Deployment (Railway/Render)
1. Push code to GitHub
2. Connect to Railway or Render
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Push code to GitHub
2. Connect to Vercel or Netlify
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcryptjs encryption
- **Rate Limiting**: Prevents API abuse
- **CORS Protection**: Configurable origins
- **Input Validation**: Mongoose schema validation
- **File Upload Security**: Type and size restrictions

## 📊 Features Included

### Authentication
- User registration and login
- JWT token management
- Password reset functionality
- Profile management

### Job Applications
- CRUD operations for applications
- Advanced search and filtering
- Interview round tracking
- File uploads (resumes, documents)

### Analytics
- Application statistics
- Status breakdowns
- Response time analysis
- User engagement metrics

### Pro Features
- Subscription management
- Advanced analytics
- Calendar integration
- Priority tracking

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
- Check your connection string
- Verify username/password
- Ensure IP is whitelisted

**Port Already in Use**
```bash
# Find process using port 5000
netstat -ano | findstr :5000
# Kill the process
taskkill /PID <process_id> /F
```

### Frontend Issues

**API Connection Error**
- Check if backend is running
- Verify `VITE_API_URL` in `.env`
- Check CORS settings

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

If you encounter issues:

1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure MongoDB Atlas is properly configured
4. Check network connectivity
5. Review the logs in both frontend and backend

## 🎉 Success!

Once everything is set up:

1. ✅ Backend running on `http://localhost:5000`
2. ✅ Frontend running on `http://localhost:5173`
3. ✅ Database connected to MongoDB Atlas
4. ✅ User registration and login working
5. ✅ Job application CRUD operations functional

Your JobTracker application is now ready for development and deployment! 🚀 