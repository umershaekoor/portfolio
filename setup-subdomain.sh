#!/bin/bash

# Setup Portfolio on Subdomain: portfolio.voncode.de
# This script sets up the portfolio to run on a subdomain instead of the main domain

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SERVER_NAME="contabo-server"
SUBDOMAIN="portfolio.voncode.de"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Portfolio Subdomain Setup${NC}"
echo -e "${BLUE}Setting up: $SUBDOMAIN${NC}"
echo -e "${BLUE}========================================${NC}"

echo -e "\n${YELLOW}Step 1: DNS Configuration${NC}"
echo -e "${BLUE}You need to add a DNS record for the subdomain:${NC}"
echo -e "${GREEN}Type: A${NC}"
echo -e "${GREEN}Name: portfolio${NC}"
echo -e "${GREEN}Value: $(ssh $SERVER_NAME 'curl -s ifconfig.me')${NC}"
echo -e "${GREEN}TTL: 3600 (or automatic)${NC}"
echo -e ""
read -p "Have you added the DNS record? (yes/no): " dns_done

if [[ "$dns_done" != "yes" ]]; then
    echo -e "${YELLOW}Please add the DNS record and run this script again.${NC}"
    exit 0
fi

echo -e "\n${YELLOW}Step 2: Testing DNS Resolution${NC}"
if host $SUBDOMAIN > /dev/null 2>&1; then
    echo -e "${GREEN}✓ DNS is resolving for $SUBDOMAIN${NC}"
else
    echo -e "${RED}✗ DNS not resolving yet. It may take a few minutes to propagate.${NC}"
    echo -e "${YELLOW}You can continue, but SSL setup might fail if DNS isn't ready.${NC}"
    read -p "Continue anyway? (yes/no): " continue_anyway
    if [[ "$continue_anyway" != "yes" ]]; then
        exit 0
    fi
fi

echo -e "\n${YELLOW}Step 3: Uploading Nginx Configuration${NC}"
scp nginx-portfolio-subdomain.conf $SERVER_NAME:/tmp/portfolio-subdomain.conf
ssh $SERVER_NAME "sudo mv /tmp/portfolio-subdomain.conf /etc/nginx/sites-available/portfolio"
echo -e "${GREEN}✓ Configuration uploaded${NC}"

echo -e "\n${YELLOW}Step 4: Enabling the Site${NC}"
ssh $SERVER_NAME "sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio"
echo -e "${GREEN}✓ Site enabled${NC}"

echo -e "\n${YELLOW}Step 5: Testing Nginx Configuration${NC}"
if ssh $SERVER_NAME "sudo nginx -t"; then
    echo -e "${GREEN}✓ Nginx configuration is valid${NC}"
else
    echo -e "${RED}✗ Nginx configuration has errors${NC}"
    exit 1
fi

echo -e "\n${YELLOW}Step 6: Reloading Nginx${NC}"
ssh $SERVER_NAME "sudo systemctl reload nginx"
echo -e "${GREEN}✓ Nginx reloaded${NC}"

echo -e "\n${YELLOW}Step 7: Setting up SSL Certificate${NC}"
echo -e "${BLUE}Running Certbot to obtain SSL certificate for $SUBDOMAIN...${NC}"
ssh $SERVER_NAME "sudo certbot --nginx -d $SUBDOMAIN --non-interactive --agree-tos --email your-email@example.com --redirect"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ SSL certificate obtained successfully${NC}"
else
    echo -e "${YELLOW}⚠ Certbot failed. You may need to run it manually:${NC}"
    echo -e "${YELLOW}  ssh $SERVER_NAME \"sudo certbot --nginx -d $SUBDOMAIN\"${NC}"
fi

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}Subdomain Setup Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${BLUE}Your portfolio should now be accessible at:${NC}"
echo -e "${GREEN}https://$SUBDOMAIN${NC}"
echo -e ""
echo -e "${YELLOW}Testing the site...${NC}"
sleep 2
ssh $SERVER_NAME "curl -I https://$SUBDOMAIN 2>&1 | head -5"
