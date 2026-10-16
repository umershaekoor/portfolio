# Deployment Configuration

This directory contains all deployment-related configuration and scripts for the portfolio application.

## Directory Structure

```
docs/deployment/
├── README.md                           # This file
├── nginx-configs/                      # Nginx server configurations
│   ├── nginx-portfolio.conf           # Main domain config (voncode.de)
│   └── nginx-portfolio-subdomain.conf # Subdomain config (portfolio.voncode.de)
├── scripts/                            # Deployment scripts
│   ├── deploy.sh                      # Main deployment script
│   ├── setup-nginx.sh                 # Nginx setup script
│   └── setup-subdomain.sh             # Subdomain setup script
└── history/                            # Historical documentation
    ├── DEPLOYMENT.md
    ├── DEPLOY_FIXES.md
    ├── NGINX_SSL_SETUP.md
    ├── SUBDOMAIN_SETUP.md
    └── SUBDOMAIN_SETUP_COMPLETE.md
```

## Quick Start

### Deploy to Server
```bash
cd /home/h2o/projects/portfolio-site/docs/deployment/scripts
./deploy.sh
```

### Setup Nginx (First Time)
```bash
cd /home/h2o/projects/portfolio-site/docs/deployment/scripts
./setup-nginx.sh
```

### Setup Subdomain (First Time)
```bash
cd /home/h2o/projects/portfolio-site/docs/deployment/scripts
./setup-subdomain.sh
```

## Active Domains

- **Main:** https://voncode.de
- **Subdomain:** https://portfolio.voncode.de

Both domains are active and serving the portfolio application.

## Nginx Configuration

Nginx configs are located in `nginx-configs/`:
- `nginx-portfolio.conf` - Main domain configuration
- `nginx-portfolio-subdomain.conf` - Subdomain configuration

### Update Nginx Configuration on Server

```bash
# Upload main domain config
scp docs/deployment/nginx-configs/nginx-portfolio.conf contabo-server:/tmp/
ssh contabo-server "sudo mv /tmp/nginx-portfolio.conf /etc/nginx/sites-available/portfolio"

# Or upload subdomain config
scp docs/deployment/nginx-configs/nginx-portfolio-subdomain.conf contabo-server:/tmp/
ssh contabo-server "sudo mv /tmp/nginx-portfolio-subdomain.conf /etc/nginx/sites-available/portfolio"

# Test and reload nginx
ssh contabo-server "sudo nginx -t && sudo systemctl reload nginx"
```

## SSL Certificates

Both domains have Let's Encrypt SSL certificates with auto-renewal enabled.

### Check Certificate Status
```bash
ssh contabo-server "sudo certbot certificates"
```

### Manual Renewal (if needed)
```bash
ssh contabo-server "sudo certbot renew"
ssh contabo-server "sudo systemctl reload nginx"
```

## Deployment Process

The `deploy.sh` script automates the deployment process:

1. **Build** - Builds the Angular application
2. **Archive** - Creates a tarball of the dist folder
3. **Upload** - Transfers to server via SCP
4. **Extract** - Extracts on server to deployment directory
5. **Symlink** - Creates/updates symlink to current version
6. **Reload** - Tests and reloads Nginx

### Deployment Directory Structure on Server

```
/home/root/deployments/portfolio/
├── releases/
│   ├── 2026-01-31-120000/
│   ├── 2026-01-31-130000/
│   └── ...
└── current -> releases/2026-01-31-130000/  (symlink)
```

Nginx serves from: `/home/root/deployments/portfolio/current/`

## Server Information

**Server:** contabo-server (configured in ~/.ssh/config)  
**User:** root  
**Nginx Root:** /home/root/deployments/portfolio/current/  
**Nginx Config:** /etc/nginx/sites-available/portfolio

## Troubleshooting

### Check Deployment
```bash
# View current deployment
ssh contabo-server "ls -la /home/root/deployments/portfolio/"

# Check what's being served
ssh contabo-server "ls -la /home/root/deployments/portfolio/current/"
```

### Check Nginx
```bash
# Test configuration
ssh contabo-server "sudo nginx -t"

# Check status
ssh contabo-server "sudo systemctl status nginx"

# View error logs
ssh contabo-server "sudo tail -f /var/log/nginx/error.log"
```

### Check SSL
```bash
# List certificates
ssh contabo-server "sudo certbot certificates"

# Test certificate
openssl s_client -connect portfolio.voncode.de:443 -servername portfolio.voncode.de
```

### DNS Issues
```bash
# Check DNS resolution
host voncode.de
host portfolio.voncode.de

# Check DNS propagation
dig voncode.de
dig portfolio.voncode.de
```

## Documentation

Historical deployment documentation and setup guides are preserved in the `history/` folder:

- **SUBDOMAIN_SETUP_COMPLETE.md** - Complete subdomain setup documentation
- **DEPLOYMENT.md** - Original deployment guide
- **NGINX_SSL_SETUP.md** - SSL certificate setup guide
- **DEPLOY_FIXES.md** - Deployment troubleshooting history

## Security Notes

- SSL certificates auto-renew via certbot
- HTTP automatically redirects to HTTPS
- Security headers configured in Nginx
- Gzip compression enabled
- Static assets cached for 1 year

## Maintenance

### Regular Tasks
- Monitor SSL certificate expiry (auto-renewal should handle this)
- Check nginx error logs periodically
- Keep server packages updated
- Backup deployment configurations

### Updating the Site
Simply run the deployment script from the project root:
```bash
./docs/deployment/scripts/deploy.sh
```

Or if you're already in the scripts directory:
```bash
cd docs/deployment/scripts
./deploy.sh
```

## SSH Configuration

Ensure your `~/.ssh/config` has the server configured:

```
Host contabo-server
  HostName <your-server-ip>
  User root
  IdentityFile ~/.ssh/id_rsa
  ServerAliveInterval 60
  ServerAliveCountMax 3
```

---

**Last Updated:** January 31, 2026  
**Status:** ✅ Both domains active and operational
