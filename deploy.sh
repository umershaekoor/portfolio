#!/bin/bash

# Portfolio Site Deployment Script
# This script builds the Angular application and deploys it to the Contabo server

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SERVER_NAME="contabo-server"
REMOTE_PATH="/home/root/deployments/portfolio"  # Deployment directory
BUILD_DIR="dist/apps/portfolio/browser"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Portfolio Site Deployment${NC}"
echo -e "${BLUE}========================================${NC}"

# Step 1: Clean previous build
echo -e "\n${YELLOW}[1/6] Cleaning previous build...${NC}"
if [ -d "dist" ]; then
    rm -rf dist
    echo -e "${GREEN}✓ Previous build cleaned${NC}"
else
    echo -e "${GREEN}✓ No previous build to clean${NC}"
fi

# Step 2: Check if node_modules exists, install if needed
echo -e "\n${YELLOW}[2/6] Checking dependencies...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}Installing dependencies...${NC}"
    npm install --legacy-peer-deps
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Dependencies already installed${NC}"
fi

# Step 3: Run linting (non-blocking)
echo -e "\n${YELLOW}[3/6] Running linting...${NC}"
if npm run lint; then
    echo -e "${GREEN}✓ Linting passed${NC}"
else
    echo -e "${YELLOW}⚠ Linting warnings detected, but continuing deployment${NC}"
fi

# Step 4: Build for production
echo -e "\n${YELLOW}[4/6] Building application for production...${NC}"
if npm run build:prod; then
    echo -e "${GREEN}✓ Build completed${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi

# Step 5: Deploy to server
echo -e "\n${YELLOW}[5/6] Deploying to Contabo server...${NC}"

# Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}✗ Build directory not found: $BUILD_DIR${NC}"
    exit 1
fi

# Create remote directory if it doesn't exist
echo -e "${BLUE}Creating remote directory if needed...${NC}"
ssh $SERVER_NAME "sudo mkdir -p $REMOTE_PATH && sudo chown -R \$USER:\$USER $REMOTE_PATH"

# Backup existing deployment (optional)
echo -e "${BLUE}Creating backup of existing deployment...${NC}"
ssh $SERVER_NAME "if [ -d $REMOTE_PATH/current ]; then sudo rm -rf $REMOTE_PATH/backup && sudo mv $REMOTE_PATH/current $REMOTE_PATH/backup; fi"

# Transfer files to server
echo -e "${BLUE}Transferring files...${NC}"
rsync -avz --delete $BUILD_DIR/ $SERVER_NAME:$REMOTE_PATH/current/

echo -e "${GREEN}✓ Files transferred successfully${NC}"

# Step 6: Restart nginx
echo -e "\n${YELLOW}[6/6] Restarting nginx...${NC}"
ssh $SERVER_NAME "sudo systemctl restart nginx"

# Check nginx status
NGINX_STATUS=$(ssh $SERVER_NAME "sudo systemctl is-active nginx")
if [ "$NGINX_STATUS" = "active" ]; then
    echo -e "${GREEN}✓ Nginx restarted successfully${NC}"
else
    echo -e "${RED}✗ Nginx failed to restart${NC}"
    exit 1
fi

# Final message
echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${BLUE}Your site should now be live on your server.${NC}\n"
