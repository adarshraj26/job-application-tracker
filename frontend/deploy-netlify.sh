#!/bin/bash

# Install Netlify CLI if not installed
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist 