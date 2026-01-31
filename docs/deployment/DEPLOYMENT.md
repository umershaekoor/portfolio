# Deployment Script Guide

## Quick Start

### First Time Setup (One-time only)

1. **Configure SSH** - Add your server to `~/.ssh/config` (see Prerequisites section)

2. **Setup Nginx** - Run the nginx setup script:
```bash
./setup-nginx.sh
```

3. **Deploy** - Deploy your application:
```bash
./deploy.sh
```

### Subsequent Deployments

Just run:
```bash
./deploy.sh
```

---

## Prerequisites

1. **SSH Config**: Ensure your `~/.ssh/config` has the Contabo server configured:
```
Host contabo-server
    HostName your-server-ip-or-domain.com
    User your-username
    Port 22
    IdentityFile ~/.ssh/your_private_key
```

2. **SSH Key**: Make sure you can SSH into the server without password:
```bash
ssh contabo-server
```

3. **Server Setup**: On your Contabo server, ensure:
   - Nginx is installed and running
   - Your user has sudo privileges for nginx restart
   - The deployment directory exists (script will create it if not)

## Configuration

Edit `deploy.sh` and update these variables if needed:

- `REMOTE_PATH`: The path on your server where files should be deployed (default: `/home/root/deployments/portfolio`)
- `BUILD_DIR`: Local build output directory (default: `dist/apps/portfolio/browser`)

## Initial Server Setup

Before first deployment, set up the server structure:

### 1. Create deployment directory
```bash
ssh contabo-server "sudo mkdir -p /home/root/deployments/portfolio"
ssh contabo-server "sudo chown -R \$USER:\$USER /home/root/deployments"
```

### 2. Create Nginx configuration
```bash
ssh contabo-server "sudo nano /etc/nginx/sites-available/portfolio"
```

Use the configuration below (see Nginx Configuration Example section).

### 3. Create symlink from sites-available to sites-enabled
```bash
ssh contabo-server "sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio"
```

### 4. Test and restart Nginx
```bash
ssh contabo-server "sudo nginx -t && sudo systemctl restart nginx"
```

## Usage

### Basic Deployment
```bash
./deploy.sh
```

This will:
1. Clean previous build
2. Install dependencies
3. Run linting
4. Build for production
5. Deploy to server via rsync
6. Restart nginx

### Manual Build Only
```bash
npm run build:prod
```

### Manual Deploy Only (after building)
```bash
rsync -avz --delete dist/apps/portfolio/browser/ contabo-server:/home/root/deployments/portfolio/current/
ssh contabo-server "sudo systemctl restart nginx"
```

## Nginx Configuration Example

Create this file on your server at `/etc/nginx/sites-available/portfolio`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Point to your deployment directory
    root /home/root/deployments/portfolio/current;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml+rss;
}
```

**Important**: The nginx config file lives in `/etc/nginx/sites-available/` (not a symlink). 
The symlink goes from `sites-available` → `sites-enabled`.

**Important**: The nginx config file lives in `/etc/nginx/sites-available/` (not a symlink). 
The symlink goes from `sites-available` → `sites-enabled`.

To enable the site after creating the config:
```bash
# Create symlink (only needed once)
ssh contabo-server "sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio"

# Test and restart
ssh contabo-server "sudo nginx -t && sudo systemctl restart nginx"
```

## Troubleshooting

### Permission Denied
If you get permission errors:
```bash
ssh contabo-server "sudo chown -R $USER:$USER /home/root/deployments/portfolio"
```

### Nginx Won't Restart
Check nginx configuration:
```bash
ssh contabo-server "sudo nginx -t"
```

Check nginx logs:
```bash
ssh contabo-server "sudo tail -f /var/log/nginx/error.log"
```

### Build Fails
Clear node_modules and rebuild:
```bash
rm -rf node_modules dist
npm install
npm run build:prod
```

## Adding to CI/CD

You can integrate this script into GitHub Actions, GitLab CI, or other CI/CD pipelines by setting up SSH keys as secrets and calling the script.

### GitHub Actions Example
```yaml
name: Deploy to Contabo

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup SSH
      run: |
        mkdir -p ~/.ssh
        echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_rsa
        chmod 600 ~/.ssh/id_rsa
        echo "${{ secrets.SSH_CONFIG }}" > ~/.ssh/config
    - name: Deploy
      run: ./deploy.sh
```
