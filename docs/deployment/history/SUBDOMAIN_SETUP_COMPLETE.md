# Subdomain Setup Complete - portfolio.voncode.de

**Date:** January 31, 2026  
**Status:** ✅ SUCCESSFUL

---

## What Was Accomplished

Successfully set up **portfolio.voncode.de** subdomain with full SSL/HTTPS support.

---

## Setup Steps Completed

### 1. DNS Configuration ✅
- User added DNS A record: `portfolio → server-ip`
- DNS propagated and verified

### 2. Nginx Configuration ✅
- Uploaded subdomain nginx configuration
- Moved to `/etc/nginx/sites-available/portfolio`
- Updated symlink in `/etc/nginx/sites-enabled/`
- Tested configuration (valid)
- Reloaded nginx

### 3. SSL Certificate ✅
- Obtained Let's Encrypt certificate for `portfolio.voncode.de`
- Certificate valid for 89 days (expires April 30, 2026)
- Auto-renewal configured
- HTTP to HTTPS redirect enabled

### 4. Verification ✅
- HTTPS access working: `https://portfolio.voncode.de`
- HTTP redirect working: `http://portfolio.voncode.de` → HTTPS
- Site serving correctly (HTTP 200)

---

## Current Status

### Active Domains

**Subdomain (NEW!):**
- **URL:** https://portfolio.voncode.de
- **Status:** ✅ Live and working
- **SSL:** Valid Let's Encrypt certificate
- **Redirect:** HTTP → HTTPS enabled

**Main Domain (Still Active):**
- **URL:** https://voncode.de
- **Status:** ✅ Still serving portfolio
- **SSL:** Valid Let's Encrypt certificate (different cert)

---

## SSL Certificates

Two separate certificates now exist:

### Certificate 1: portfolio.voncode.de
```
Domain: portfolio.voncode.de
Expiry: April 30, 2026 (89 days)
Path: /etc/letsencrypt/live/portfolio.voncode.de/
Auto-renewal: ✅ Enabled
```

### Certificate 2: voncode.de
```
Domains: voncode.de, www.voncode.de
Expiry: April 29, 2026 (88 days)
Path: /etc/letsencrypt/live/voncode.de/
Auto-renewal: ✅ Enabled
```

---

## Nginx Configuration

**Location:** `/etc/nginx/sites-available/portfolio`

**Key Features:**
- Server name: `portfolio.voncode.de`
- Root: `/home/root/deployments/portfolio/current/`
- SSL: Let's Encrypt certificates
- HTTP to HTTPS redirect
- Angular routing support (SPA)
- Static asset caching (1 year)
- Gzip compression
- Security headers

---

## Testing Results

### HTTPS Access
```bash
curl -I https://portfolio.voncode.de
# HTTP/1.1 200 OK ✅
# Content-Type: text/html
# Content-Length: 20401
```

### HTTP Redirect
```bash
curl -I http://portfolio.voncode.de
# HTTP/1.1 301 Moved Permanently ✅
# Location: https://portfolio.voncode.de
```

### DNS Resolution
```bash
# DNS successfully resolves to server IP ✅
```

---

## What About the Main Domain?

Both domains are currently active and serving the portfolio:

### Option 1: Keep Both (Current Setup) ✅
- **portfolio.voncode.de** - Works
- **voncode.de** - Still works
- Both serve the same portfolio site

### Option 2: Redirect Main to Subdomain
If you want to redirect `voncode.de` → `portfolio.voncode.de`:
```bash
# Update /etc/nginx/sites-available/portfolio
# Add redirect rule for voncode.de server block
```

### Option 3: Use Main Domain for Something Else
- Keep subdomain for portfolio
- Use `voncode.de` for different content/app

**Currently: Both domains active (Option 1)**

---

## Deployment

Your existing deployment script continues to work:

```bash
./deploy.sh
```

This deploys to: `/home/root/deployments/portfolio/current/`

Both domains will serve the updated content automatically.

---

## Maintenance

### Check SSL Certificates
```bash
ssh contabo-server "sudo certbot certificates"
```

### Renew Certificates Manually (if needed)
```bash
ssh contabo-server "sudo certbot renew"
```

### View Nginx Config
```bash
ssh contabo-server "sudo cat /etc/nginx/sites-available/portfolio"
```

### Check Nginx Status
```bash
ssh contabo-server "sudo systemctl status nginx"
```

---

## Auto-Renewal

Certbot auto-renewal is configured and will:
- Automatically renew certificates before expiry
- Reload nginx after renewal
- No manual intervention needed

---

## Accessing Your Site

### Subdomain (NEW!)
- **Primary:** https://portfolio.voncode.de ✅
- **HTTP:** http://portfolio.voncode.de (redirects to HTTPS)

### Main Domain (Still Works)
- **Primary:** https://voncode.de ✅
- **Alias:** https://www.voncode.de ✅

---

## Next Steps (Optional)

### 1. Choose Your Preferred Domain Strategy
Decide if you want to:
- Keep both domains serving portfolio (current)
- Redirect main domain to subdomain
- Use main domain for something else

### 2. Update External Links
If you have business cards, resumes, or external links:
- Consider updating to: `https://portfolio.voncode.de`
- Or keep using: `https://voncode.de`

### 3. Test Everything
Visit both URLs and verify:
- Site loads correctly
- All features work
- SSL shows as valid
- Mobile view works

---

## Troubleshooting

### If Subdomain Doesn't Load
```bash
# Check nginx is running
ssh contabo-server "sudo systemctl status nginx"

# Check DNS resolution
host portfolio.voncode.de

# Check SSL certificate
ssh contabo-server "sudo certbot certificates"
```

### If SSL Errors
```bash
# Verify certificate is valid
openssl s_client -connect portfolio.voncode.de:443 -servername portfolio.voncode.de

# Check certbot logs
ssh contabo-server "sudo tail -f /var/log/letsencrypt/letsencrypt.log"
```

---

## Summary

✅ **Subdomain Set Up:** portfolio.voncode.de  
✅ **DNS Configured:** A record pointing to server  
✅ **SSL Certificate:** Valid Let's Encrypt certificate  
✅ **Nginx Configured:** Serving from deployment directory  
✅ **HTTP Redirect:** HTTP → HTTPS enabled  
✅ **Auto-Renewal:** Certbot configured for automatic renewal  
✅ **Both Domains Active:** voncode.de and portfolio.voncode.de  

**Your portfolio is now accessible at:**
- **https://portfolio.voncode.de** (subdomain - NEW!)
- **https://voncode.de** (main domain - still active)

🎉 **Subdomain setup complete and working!**
