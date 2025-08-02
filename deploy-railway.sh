#!/bin/bash

# Install Railway CLI if not installed
npm install -g @railway/cli

# Login to Railway
railway login

# Build the project
npm run build

# Deploy to Railway
railway up 