# Deployment Guide

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

## Production Build

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## GitHub Deployment

1. **Create a new repository** on GitHub
2. **Initialize git** in the project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: FOG Scanner application"
   ```
3. **Add remote origin**:
   ```bash
   git remote add origin https://github.com/yourusername/fog-scanner.git
   git branch -M main
   git push -u origin main
   ```

## Hosting Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Vite configuration
3. Deploy with zero configuration

### Netlify
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Update vite.config.js with base path
4. Run: `npm run build && npm run deploy`

## Environment Requirements

- Node.js 20.19+ or 22.12+
- npm 8+ or yarn 1.22+
- Modern browser with ES6+ support
