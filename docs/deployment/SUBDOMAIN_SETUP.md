# Setting Up Portfolio on Subdomain: portfolio.voncode.de

## Overview

To move your portfolio from the main domain (`voncode.de`) to a subdomain (`portfolio.voncode.de`), you need to:
1. Configure DNS
2. Update Nginx configuration
3. Obtain SSL certificate for the subdomain

---

## Option 1: Automated Setup (Recommended)

I've created a script that handles most of this for you.

### Steps:

#### 1. Configure DNS First
Add an A record in your DNS provider (e.g., Cloudflare, Namecheap, etc.):

```
Type: A
Name: portfolio
Value: <your-server-ip>
TTL: 3600 (or Auto)
```

To find your server IP:
```bash
ssh contabo-server 'curl -s ifconfig.me'
```

#### 2. Wait for DNS Propagation (5-30 minutes)
Test if DNS is working:
```bash
host portfolio.voncode.de
# or
dig portfolio.voncode.de
```

#### 3. Run the Setup Script
```bash
./setup-subdomain.sh
```

The script will:
- ✅ Check DNS resolution
- ✅ Upload nginx configuration for subdomain
- ✅ Enable the site
- ✅ Test nginx config
- ✅ Reload nginx
- ✅ Run certbot to obtain SSL certificate
- ✅ Test the final setup

---

## Option 2: Manual Setup

If you prefer to do it manually:

### 1. Add DNS Record
Configure your DNS as mentioned above.

### 2. Upload Nginx Configuration
```bash
scp nginx-portfolio-subdomain.conf contabo-server:/tmp/portfolio-subdomain.conf
ssh contabo-server "sudo mv /tmp/portfolio-subdomain.conf /etc/nginx/sites-available/portfolio"
```

### 3. Enable the Site
```bash
ssh contabo-server "sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio"
```

### 4. Test and Reload Nginx
```bash
ssh contabo-server "sudo nginx -t && sudo systemctl reload nginx"
```

### 5. Obtain SSL Certificate
```bash
ssh contabo-server "sudo certbot --nginx -d portfolio.voncode.de"
```

Follow certbot's prompts to:
- Enter your email
- Agree to terms
- Choose to redirect HTTP to HTTPS (recommended)

### 6. Verify It Works
```bash
curl -I https://portfolio.voncode.de
```

---

## What About the Main Domain (voncode.de)?

After setting up the subdomain, you have options for the main domain:

### Option A: Keep Portfolio on Main Domain Too
- Keep current setup: both `voncode.de` and `portfolio.voncode.de` serve portfolio
- No additional changes needed

### Option B: Redirect Main Domain to Subdomain
Update `/etc/nginx/sites-available/portfolio` on the server to redirect:
```nginx
server {
    server_name voncode.de www.voncode.de;
    return 301 https://portfolio.voncode.de$request_uri;
    
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/voncode.de/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/voncode.de/privkey.pem;
}
```

### Option C: Use Main Domain for Something Else
- Remove voncode.de from portfolio config
- Create new config for main domain
- Point it to different content/app

---

## DNS Configuration Examples

### Cloudflare
```
Dashboard → DNS → Add record
Type: A
Name: portfolio
IPv4 address: <your-server-ip>
Proxy status: DNS only (grey cloud) initially
TTL: Auto
```

### Namecheap
```
Dashboard → Domain List → Manage → Advanced DNS
Type: A Record
Host: portfolio
Value: <your-server-ip>
TTL: Automatic
```

### Other DNS Providers
The concept is the same:
- **Type**: A
- **Name/Host**: `portfolio`
- **Value/Points to**: Your server's IP address
- **TTL**: 3600 or Auto

---

## Testing DNS Resolution

### Method 1: host command
```bash
host portfolio.voncode.de
```
Expected output: `portfolio.voncode.de has address <your-server-ip>`

### Method 2: dig command
```bash
dig portfolio.voncode.de +short
```
Expected output: `<your-server-ip>`

### Method 3: Online tools
- https://dnschecker.org
- https://www.whatsmydns.net

---

## Troubleshooting

### DNS Not Resolving
- **Wait**: DNS propagation can take 5-30 minutes, sometimes longer
- **Check**: Verify the record was added correctly in your DNS provider
- **Test**: Use online DNS checkers to see global propagation

### Certbot Fails
**Error**: "Unable to find a virtual host"
- Make sure nginx config is uploaded and enabled
- Run: `sudo nginx -t` to verify config is valid

**Error**: "DNS problem: NXDOMAIN"
- DNS not resolving yet, wait longer
- Check DNS configuration

**Error**: "Connection refused"
- Check firewall allows ports 80 and 443
- Verify nginx is running: `sudo systemctl status nginx`

### Site Not Loading
```bash
# Check nginx is running
ssh contabo-server "sudo systemctl status nginx"

# Check nginx error logs
ssh contabo-server "sudo tail -f /var/log/nginx/error.log"

# Check if files are deployed
ssh contabo-server "ls -la /home/root/deployments/portfolio/current/"
```

---

## After Setup

Once the subdomain is working:

### Deploy Updates
The existing `./deploy.sh` script will continue to work - it deploys files to the same location.

### Monitor SSL Certificate
Certbot will auto-renew. To check:
```bash
ssh contabo-server "sudo certbot certificates"
```

### Update Links/References
If you have external links pointing to voncode.de, update them to portfolio.voncode.de

---

## Quick Reference

### Your Server IP
```bash
ssh contabo-server 'curl -s ifconfig.me'
```

### Setup Subdomain (Automated)
```bash
./setup-subdomain.sh
```

### Test the Site
```bash
curl -I https://portfolio.voncode.de
```

### View Nginx Config
```bash
ssh contabo-server "sudo cat /etc/nginx/sites-available/portfolio"
```

---

## Files Created

- ✅ `nginx-portfolio-subdomain.conf` - Nginx config for subdomain
- ✅ `setup-subdomain.sh` - Automated setup script
- ✅ `SUBDOMAIN_SETUP.md` - This documentation

Ready to proceed? Start with adding the DNS record, then run `./setup-subdomain.sh`!
