# Portfolio Site

A modern, responsive portfolio website built with Angular and Nx.

**Live Site:** https://voncode.de

---

## 📚 Documentation

**Complete documentation is available in the [docs](docs/) folder:**

- **[docs/deployment/](docs/deployment/)** - Deployment guides, nginx setup, SSL configuration
- **[docs/development/](docs/development/)** - Development references and guides  
- **[docs/history/](docs/history/)** - Feature implementation and fix history

**Quick links:**
- [Deployment Guide](docs/deployment/DEPLOYMENT.md) - How to deploy to production
- [Quick Reference](docs/development/QUICK_REFERENCE.md) - Common commands and tips
- [Documentation Index](docs/README.md) - Full documentation index

---

## 🚀 Quick Start

### Development Server

To run the dev server for your app, use:

```sh
npx nx serve portfolio
```

To create a production bundle:

```sh
npx nx build portfolio
```

### Deploy to Production

To deploy to the production server:

```sh
cd docs/deployment/scripts
./deploy.sh
```

See [Deployment Guide](docs/deployment/README.md) for detailed instructions.

---

## 🛠️ Development

### Available Commands

```sh
npm start              # Start development server
npm run build         # Build for development
npm run build:prod    # Build for production
npm run lint          # Run linting
npm test              # Run tests
```

### Project Structure

```
apps/portfolio/        # Main Angular application
docs/                  # Documentation
shared-ui/            # Shared UI components
static/               # Static assets
```

See [docs/README.md](docs/README.md) for complete documentation structure.

---

## 📦 Tech Stack

- **Framework:** Angular 20
- **Build System:** Nx
- **Styling:** SCSS
- **Internationalization:** ngx-translate
- **Maps:** world-atlas, topojson
- **Email:** EmailJS

---

## 🔧 Advanced Nx Features

### Generate New Components

To generate a new application:

```sh
npx nx g @nx/angular:app demo
```

To generate a new library:

```sh
npx nx g @nx/angular:lib mylib
```

### Visualize Project Graph

```sh
npx nx graph
```

### List Available Plugins

```sh
npx nx list
```

[Learn more about Nx &raquo;](https://nx.dev)

---

## 📖 Learn More

- **[Documentation Index](docs/README.md)** - All project documentation
- **[Deployment Guide](docs/deployment/DEPLOYMENT.md)** - Deploy to production
- **[Feature History](docs/history/)** - See what's been implemented

---
