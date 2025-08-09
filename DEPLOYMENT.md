# 🚀 Deployment Guide

This guide will help you deploy the JobTracker application using **Render** for the backend and **Vercel** for the frontend.

## 📋 Prerequisites

- GitHub account with the repository
- Render account (free tier available)
- Vercel account (free tier available)
- MongoDB Atlas account (free tier available)

## 🔧 Backend Deployment (Render)

### 1. Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Add your IP to the whitelist (or use 0.0.0.0/0 for all IPs)

### 2. Deploy to Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `jobtracker-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

### 3. Environment Variables
Add these environment variables in Render:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobtracker?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d
CORS_ORIGIN=https://your-frontend-domain.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
PORT=10000
```

### 4. Deploy
Click "Create Web Service" and wait for deployment.

## 🎨 Frontend Deployment (Vercel)

### 1. Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2. Environment Variables
Add these environment variables in Vercel:

```env
VITE_API_URL=https://your-backend-name.onrender.com
```

### 3. Deploy
Click "Deploy" and wait for the build to complete.

## 🔗 Update CORS Settings

After both deployments are complete:

1. Go to your Render backend dashboard
2. Update the `CORS_ORIGIN` environment variable with your Vercel frontend URL
3. Redeploy the backend service

## 🌐 Final URLs

- **Frontend**: `https://your-project-name.vercel.app`
- **Backend**: `https://your-backend-name.onrender.com`

## 🔍 Testing Deployment

1. Visit your frontend URL
2. Try to register a new account
3. Test login functionality
4. Create a test job application
5. Verify all features work correctly

## 🛠️ Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure the frontend URL is added to CORS_ORIGIN
2. **Database Connection**: Verify MongoDB URI is correct
3. **Build Failures**: Check the build logs in Vercel/Render
4. **Environment Variables**: Ensure all required variables are set

### Debug Commands:

```bash
# Check backend health
curl https://your-backend-name.onrender.com/api/health

# Check frontend build
npm run build
```

## 📈 Monitoring

- **Render**: Monitor logs and performance in the dashboard
- **Vercel**: Check analytics and performance in the dashboard
- **MongoDB Atlas**: Monitor database usage and performance

## 🔄 Continuous Deployment

Both Render and Vercel will automatically redeploy when you push changes to your main branch.

## 💰 Cost Optimization

- **Render Free Tier**: 750 hours/month, sleeps after 15 minutes of inactivity
- **Vercel Free Tier**: Unlimited deployments, 100GB bandwidth
- **MongoDB Atlas Free Tier**: 512MB storage, shared clusters

## 🚀 Next Steps

1. Set up custom domains (optional)
2. Configure SSL certificates (automatic with Vercel/Render)
3. Set up monitoring and alerts
4. Configure backup strategies
5. Set up CI/CD pipelines

---

**Happy Deploying! 🎉** 