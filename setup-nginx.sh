#!/bin/bash

# Nginx Setup Script for Portfolio Site
# Run this ONCE to set up the nginx configuration on your Contabo server

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SERVER_NAME="contabo-server"
NGINX_CONFIG="nginx-portfolio.conf"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Nginx Setup for Portfolio Site${NC}"
echo -e "${BLUE}========================================${NC}"

# Check if nginx config file exists locally
if [ ! -f "$NGINX_CONFIG" ]; then
    echo -e "${RED}✗ Nginx config file not found: $NGINX_CONFIG${NC}"
    echo -e "${YELLOW}Please make sure $NGINX_CONFIG exists in the current directory${NC}"
    exit 1
fi

echo -e "\n${YELLOW}[1/5] Uploading nginx configuration...${NC}"
scp $NGINX_CONFIG $SERVER_NAME:/tmp/portfolio.conf
echo -e "${GREEN}✓ Configuration uploaded${NC}"

echo -e "\n${YELLOW}[2/5] Moving config to sites-available...${NC}"
ssh $SERVER_NAME "sudo mv /tmp/portfolio.conf /etc/nginx/sites-available/portfolio"
echo -e "${GREEN}✓ Configuration moved${NC}"

echo -e "\n${YELLOW}[3/5] Creating symlink to sites-enabled...${NC}"
ssh $SERVER_NAME "sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio"
echo -e "${GREEN}✓ Symlink created${NC}"

echo -e "\n${YELLOW}[4/5] Testing nginx configuration...${NC}"
if ssh $SERVER_NAME "sudo nginx -t"; then
    echo -e "${GREEN}✓ Nginx configuration is valid${NC}"
else
    echo -e "${RED}✗ Nginx configuration has errors${NC}"
    exit 1
fi

echo -e "\n${YELLOW}[5/5] Starting nginx...${NC}"
if ssh $SERVER_NAME "sudo systemctl restart nginx"; then
    echo -e "${GREEN}✓ Nginx started successfully${NC}"
else
    echo -e "${RED}✗ Failed to start nginx${NC}"
    echo -e "${YELLOW}Check logs with: ssh $SERVER_NAME 'sudo journalctl -xeu nginx.service'${NC}"
    exit 1
fi

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}Nginx setup completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${BLUE}You can now run ./deploy.sh to deploy your application${NC}\n"
echo -e "${YELLOW}Don't forget to:${NC}"
echo -e "${YELLOW}1. Update server_name in /etc/nginx/sites-available/portfolio with your domain${NC}"
echo -e "${YELLOW}2. Set up SSL/HTTPS with certbot if needed${NC}\n"
