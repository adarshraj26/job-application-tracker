# JobTracker Backend API

A robust Node.js/Express backend for the JobTracker application with MongoDB database, JWT authentication, and file upload capabilities.

## 🚀 Features

- **Authentication & Authorization**: JWT-based user authentication
- **Database**: MongoDB with Mongoose ODM
- **File Uploads**: Resume and document upload with Multer
- **Security**: Rate limiting, CORS, Helmet
- **Pro Features**: Subscription management
- **Analytics**: Application statistics and user analytics
- **Interview Tracking**: Multi-round interview management

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free tier)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobtracker
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=30d
   CORS_ORIGIN=http://localhost:5173
   ```

4. **MongoDB Atlas Setup**
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get your connection string
   - Replace `username`, `password`, and `cluster` in your MONGODB_URI

5. **Start the server**
   ```bash
   npm run dev
   ```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>
```

### Applications Endpoints

#### Get All Applications
```
GET /api/applications?page=1&limit=10&status=Applied&search=google
Authorization: Bearer <token>
```

#### Create Application
```
POST /api/applications
Authorization: Bearer <token>
Content-Type: application/json

{
  "companyName": "Google",
  "position": "Software Engineer",
  "location": "Mountain View, CA",
  "workMode": "Hybrid",
  "salary": "$150,000",
  "appliedDate": "2024-01-15",
  "source": "LinkedIn",
  "notes": "Applied through LinkedIn"
}
```

#### Update Application
```
PUT /api/applications/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Technical Round 1",
  "outcome": "Active"
}
```

#### Delete Application
```
DELETE /api/applications/:id
Authorization: Bearer <token>
```

### File Upload Endpoints

#### Upload Resume
```
POST /api/upload/resume
Authorization: Bearer <token>
Content-Type: multipart/form-data

resume: <file>
```

#### Upload Multiple Documents
```
POST /api/upload/documents
Authorization: Bearer <token>
Content-Type: multipart/form-data

documents: <files>
```

### User Management Endpoints

#### Update Profile
```
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "John Doe",
  "preferences": {
    "theme": "dark",
    "notifications": {
      "email": true,
      "browser": true
    }
  }
}
```

#### Upgrade to Pro
```
POST /api/users/upgrade-pro
Authorization: Bearer <token>
Content-Type: application/json

{
  "paymentMethod": "razorpay",
  "paymentId": "pay_123456789"
}
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `MONGODB_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRE` | JWT expiration time | `30d` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |

## 🗄️ Database Schema

### User Model
- `fullName`: String (required)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- `isProUser`: Boolean (default: false)
- `proExpiryDate`: Date
- `preferences`: Object (theme, notifications)
- `lastLogin`: Date
- `isActive`: Boolean (default: true)

### Application Model
- `user`: ObjectId (ref: User)
- `companyName`: String (required)
- `position`: String (required)
- `location`: String (required)
- `workMode`: Enum (Remote, On-site, Hybrid)
- `salary`: String
- `appliedDate`: Date (required)
- `status`: Enum (Applied, Technical Round 1, etc.)
- `outcome`: Enum (Active, Selected, Rejected)
- `source`: Enum (LinkedIn, Naukri.com, etc.)
- `notes`: String
- `contactPerson`: String
- `contactEmail`: String
- `resumeVersion`: String
- `coverLetter`: String
- `portfolioLink`: String
- `additionalDocuments`: Array
- `rejectionReason`: Enum
- `rejectionNotes`: String
- `followUpDate`: Date
- `priority`: Enum (High, Medium, Low)
- `resumeUrl`: String
- `resumeFile`: Object
- `interviewRounds`: Array
- `tags`: Array
- `responseTime`: Number
- `applicationScore`: Number

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Rate Limiting**: Prevents abuse
- **CORS Protection**: Configurable cross-origin requests
- **Input Validation**: Mongoose schema validation
- **File Upload Security**: File type and size restrictions

## 📊 Analytics & Statistics

The API provides comprehensive analytics:
- Application status breakdown
- Interview round tracking
- Response time analysis
- Source effectiveness
- User engagement metrics

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Setup for Production
1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Set strong JWT secret
4. Configure CORS for your domain
5. Set up proper rate limiting

## 📝 Scripts

- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon
- `npm run build`: Build for production (if using TypeScript)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support, please open an issue in the repository or contact the development team. 