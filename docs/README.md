# Portfolio Site Documentation

**Last Updated:** January 31, 2026

This directory contains all project documentation organized by category.

---

## 📂 Directory Structure

```
docs/
├── deployment/          # Deployment guides and server setup
├── development/         # Development references and guides
└── history/            # Feature implementation and fix history
```

---

## 🚀 Deployment Documentation

**Location:** `docs/deployment/`

### Essential Guides

- **[DEPLOYMENT.md](deployment/DEPLOYMENT.md)** - Complete deployment guide
  - SSH setup instructions
  - Nginx configuration steps
  - Deployment script usage
  - Troubleshooting guide

- **[NGINX_SSL_SETUP.md](deployment/NGINX_SSL_SETUP.md)** - SSL/HTTPS setup with Certbot
  - How portfolio replaced the dummy app
  - SSL certificate configuration
  - Default server setup

- **[SUBDOMAIN_SETUP.md](deployment/SUBDOMAIN_SETUP.md)** - Subdomain configuration
  - DNS setup for portfolio.voncode.de
  - Automated setup script
  - Manual configuration steps

- **[DEPLOY_FIXES.md](deployment/DEPLOY_FIXES.md)** - Deployment script fixes
  - npm install issues resolved
  - CSS budget problems fixed
  - Nginx configuration troubleshooting

### Quick Commands

```bash
# Deploy the application
./deploy.sh

# Setup nginx (one-time)
./setup-nginx.sh

# Setup subdomain (one-time)
./setup-subdomain.sh
```

---

## 🛠️ Development Documentation

**Location:** `docs/development/`

- **[QUICK_REFERENCE.md](development/QUICK_REFERENCE.md)** - Quick development reference
  - Common commands
  - Project structure
  - Development tips

### Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build:prod

# Run linting
npm run lint

# Run tests
npm test
```

---

## 📜 Feature & Fix History

**Location:** `docs/history/`

Complete chronological record of all features, fixes, and improvements.

### Timeline & Experience Features

- **[TIMELINE_CARDS_IMPLEMENTATION.md](history/TIMELINE_CARDS_IMPLEMENTATION.md)** - Initial timeline cards
- **[TIMELINE_DOTS_FIXED.md](history/TIMELINE_DOTS_FIXED.md)** - Timeline dot styling
- **[TIMELINE_UX_IMPROVEMENTS.md](history/TIMELINE_UX_IMPROVEMENTS.md)** - UX enhancements
- **[FINAL_TIMELINE_FIXES.md](history/FINAL_TIMELINE_FIXES.md)** - Final timeline adjustments
- **[HOVER_CARDS_FIX.md](history/HOVER_CARDS_FIX.md)** - Hover card functionality
- **[CARD_SPACING_FIXES.md](history/CARD_SPACING_FIXES.md)** - Card spacing improvements
- **[RIGHT_SIDE_CARDS_FIX.md](history/RIGHT_SIDE_CARDS_FIX.md)** - Right-aligned card fixes
- **[EXPERIENCE_SCSS_REFACTORING.md](history/EXPERIENCE_SCSS_REFACTORING.md)** - SCSS refactoring

### Maps & Location Features

- **[REAL_MAPS_IMPLEMENTATION.md](history/REAL_MAPS_IMPLEMENTATION.md)** - Real map integration
- **[WORLD_ATLAS_IMPLEMENTATION.md](history/WORLD_ATLAS_IMPLEMENTATION.md)** - World atlas setup
- **[CITY_LOCATION_CORRECTIONS.md](history/CITY_LOCATION_CORRECTIONS.md)** - Location accuracy fixes
- **[MAP_REPOSITIONING_SUMMARY.md](history/MAP_REPOSITIONING_SUMMARY.md)** - Map positioning

### Skills Section

- **[SKILL_BADGES_IMPLEMENTATION.md](history/SKILL_BADGES_IMPLEMENTATION.md)** - Skill badges feature
- **[SKILLS_REFACTORING.md](history/SKILLS_REFACTORING.md)** - Skills code refactoring
- **[SKILLS_LINKS_AND_CURSOR_ADDED.md](history/SKILLS_LINKS_AND_CURSOR_ADDED.md)** - Interactive links
- **[SKILLS_UPDATE_SWAGGER_OPENAPI.md](history/SKILLS_UPDATE_SWAGGER_OPENAPI.md)** - Added Swagger/OpenAPI

### Mobile Optimizations

- **[MOBILE_TIMELINE_REDESIGN.md](history/MOBILE_TIMELINE_REDESIGN.md)** - Mobile timeline redesign
- **[MOBILE_DESKTOP_CLASS_SEPARATION.md](history/MOBILE_DESKTOP_CLASS_SEPARATION.md)** - Responsive refactoring
- **[MOBILE_CARD_CENTERING_FIX.md](history/MOBILE_CARD_CENTERING_FIX.md)** - Card centering
- **[MOBILE_CARD_TYPOGRAPHY_IMPROVEMENTS.md](history/MOBILE_CARD_TYPOGRAPHY_IMPROVEMENTS.md)** - Typography
- **[MOBILE_ARROW_ANCHORS.md](history/MOBILE_ARROW_ANCHORS.md)** - Arrow indicators
- **[MOBILE_BOTTOM_PADDING_FIX.md](history/MOBILE_BOTTOM_PADDING_FIX.md)** - Padding fixes
- **[MOBILE_SECTION_SPACING_FIX.md](history/MOBILE_SECTION_SPACING_FIX.md)** - Section spacing
- **[MOBILE_HORIZONTAL_SCROLL_FIXED_AGAIN.md](history/MOBILE_HORIZONTAL_SCROLL_FIXED_AGAIN.md)** - Scroll issues
- **[MOBILE_FIXES_COMPLETE_SUMMARY.md](history/MOBILE_FIXES_COMPLETE_SUMMARY.md)** - Complete mobile summary
- **[HOW_TO_SEE_MOBILE_CHANGES.md](history/HOW_TO_SEE_MOBILE_CHANGES.md)** - Mobile testing guide

### UI/UX Improvements

- **[INTRO_IMPROVEMENTS.md](history/INTRO_IMPROVEMENTS.md)** - Landing section improvements
- **[INTERACTION_IMPROVEMENTS.md](history/INTERACTION_IMPROVEMENTS.md)** - Interactive elements
- **[JOURNEY_BUTTON_ADDED.md](history/JOURNEY_BUTTON_ADDED.md)** - Journey navigation button
- **[DYNAMIC_TITLE_AND_ICON.md](history/DYNAMIC_TITLE_AND_ICON.md)** - Dynamic page title/icon

### CSS & Styling

- **[CSS_IMPROVEMENTS_SUMMARY.md](history/CSS_IMPROVEMENTS_SUMMARY.md)** - CSS optimizations
- **[FIXED_DUPLICATE_CSS_SELECTORS.md](history/FIXED_DUPLICATE_CSS_SELECTORS.md)** - Removed duplicates
- **[OVERFLOW_COUPLING_ISSUE_FIXED.md](history/OVERFLOW_COUPLING_ISSUE_FIXED.md)** - Overflow fixes
- **[VIEWPORT_UNITS_UPDATE.md](history/VIEWPORT_UNITS_UPDATE.md)** - Modern viewport units

### Content Updates

- **[BIELEFELD_PROFESSIONAL_JOURNEY_UPDATE.md](history/BIELEFELD_PROFESSIONAL_JOURNEY_UPDATE.md)** - Bielefeld content
- **[UNIVERSITY_DESCRIPTION_UPDATE.md](history/UNIVERSITY_DESCRIPTION_UPDATE.md)** - University content

### Technical Fixes

- **[LINTING_FIXES.md](history/LINTING_FIXES.md)** - Linting error fixes
- **[WARNINGS_FIXED.md](history/WARNINGS_FIXED.md)** - Build warnings resolved
- **[LANGUAGE_DROPDOWN_ZINDEX_FIXED.md](history/LANGUAGE_DROPDOWN_ZINDEX_FIXED.md)** - Z-index issues
- **[LIGHT_MODE_REVERT.md](history/LIGHT_MODE_REVERT.md)** - Light mode removal

---

## 🔍 Finding Documentation

### By Topic

**Deployment & Server Setup**
```bash
ls docs/deployment/
```

**Development & Contributing**
```bash
ls docs/development/
```

**Feature History & Changes**
```bash
ls docs/history/
```

### Search for Specific Topic

```bash
# Search in all documentation
grep -r "your-search-term" docs/

# Search in history only
grep -r "mobile" docs/history/

# Search in deployment docs
grep -r "nginx" docs/deployment/
```

### Using IDE

Most IDEs support fuzzy file search:
- **VS Code/Cursor**: `Ctrl+P` or `Cmd+P`
- **IntelliJ**: `Ctrl+Shift+N` or `Cmd+Shift+O`

Type `docs/` to see all documentation files.

---

## 📝 Adding New Documentation

When creating new documentation:

1. **Choose the right folder:**
   - `docs/deployment/` - Server, deployment, infrastructure
   - `docs/development/` - Development guides, references
   - `docs/history/` - Feature implementations, bug fixes

2. **Use descriptive names:**
   - UPPERCASE_WITH_UNDERSCORES.md
   - Be specific: `MOBILE_CARD_CENTERING_FIX.md` not `FIX.md`

3. **Update this index:**
   - Add entry to the appropriate section
   - Include brief description
   - Link to the file

---

## 🎯 Quick Start for New Developers

1. **Read First:**
   - [README.md](../README.md) - Project overview
   - [QUICK_REFERENCE.md](development/QUICK_REFERENCE.md) - Essential commands

2. **Setting Up:**
   - Clone the repository
   - Run `npm install`
   - Run `npm start`

3. **Deployment:**
   - Read [DEPLOYMENT.md](deployment/DEPLOYMENT.md)
   - Configure SSH access
   - Use `./deploy.sh`

4. **Need Help?**
   - Check relevant docs in this folder
   - Search history for similar features/fixes
   - Review recent changes in `docs/history/`

---

## 📊 Documentation Statistics

```bash
# Count all documentation files
find docs/ -name "*.md" | wc -l

# List recent changes
ls -lt docs/history/ | head -10

# Size of documentation
du -sh docs/
```

---

## 🔗 Related Files in Root

- **README.md** - Main project README
- **deploy.sh** - Deployment script
- **setup-nginx.sh** - Nginx setup script
- **setup-subdomain.sh** - Subdomain setup script
- **nginx-portfolio.conf** - Nginx configuration template
- **nginx-portfolio-subdomain.conf** - Subdomain nginx config

---

## 📅 Maintenance

This index is manually maintained. When adding new documentation:
- Update the relevant section
- Keep chronological order in history
- Update the last updated date at the top

---

**Need help?** All documentation is searchable. Use grep, your IDE's search, or browse by category above.
