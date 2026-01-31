# Portfolio Nginx Configuration Update

## Date: January 31, 2026

## What Was Done

### 1. Analyzed Existing Setup
- Found existing `my-app` configuration with:
  - Domain: `voncode.de` and `www.voncode.de`
  - SSL certificates from Let's Encrypt (certbot)
  - HTTP to HTTPS redirect
  - Proxy to localhost:3000 (dummy app)

### 2. Updated Portfolio Configuration
- Replaced the portfolio nginx config with SSL-enabled version
- Key changes:
  - Added SSL certificate configuration from certbot
  - Set as `default_server` for both HTTP (port 80) and HTTPS (port 443)
  - Added HTTP to HTTPS redirect
  - Kept all Angular routing and caching rules
  - Serves from: `/home/root/deployments/portfolio/current`

### 3. Deployed Changes
- Uploaded updated configuration to server
- Removed old `my-app` from sites-enabled
- Tested nginx configuration (passed)
- Restarted nginx successfully

## Configuration Details

### HTTPS Server Block (Port 443)
```nginx
server {
    server_name voncode.de www.voncode.de;
    root /home/root/deployments/portfolio/current;
    
    listen 443 ssl default_server;
    ssl_certificate /etc/letsencrypt/live/voncode.de/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/voncode.de/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    
    # Angular routing, caching, security headers...
}
```

### HTTP Server Block (Port 80)
```nginx
server {
    listen 80 default_server;
    server_name voncode.de www.voncode.de;
    
    # Redirect to HTTPS
    if ($host = www.voncode.de) {
        return 301 https://$host$request_uri;
    }
    if ($host = voncode.de) {
        return 301 https://$host$request_uri;
    }
    
    return 404;
}
```

## Current Status

✅ **Portfolio is now the default server**
- Accessible at: https://voncode.de and https://www.voncode.de
- SSL/HTTPS enabled with Let's Encrypt certificates
- HTTP automatically redirects to HTTPS
- Old dummy app (my-app) is disabled

✅ **Nginx Configuration**
- Config valid and tested
- Nginx service running
- Only portfolio site is enabled in sites-enabled

## Files Modified

### Local
- `nginx-portfolio.conf` - Updated with SSL and default_server configuration

### Server
- `/etc/nginx/sites-available/portfolio` - Updated configuration
- `/etc/nginx/sites-enabled/my-app` - Removed (old dummy app)
- `/etc/nginx/sites-enabled/portfolio` - Active (only enabled site)

## SSL Certificates

The existing Let's Encrypt certificates are maintained:
- Domain: `voncode.de`
- Certificate: `/etc/letsencrypt/live/voncode.de/fullchain.pem`
- Private Key: `/etc/letsencrypt/live/voncode.de/privkey.pem`
- Certbot auto-renewal should continue to work

## Testing

To verify the setup:
```bash
# Test locally (if you have the domain in /etc/hosts or DNS is configured)
curl -I https://voncode.de

# Or test on the server directly
ssh contabo-server "curl -I https://voncode.de"
```

## Next Deployment

Future deployments with `./deploy.sh` will:
1. Build the app
2. Deploy to `/home/root/deployments/portfolio/current/`
3. Restart nginx
4. Serve the updated app on https://voncode.de

No additional nginx configuration changes needed unless you want to add more features.
