# Dhinova Technology Pvt Ltd

A modern, professional website showcasing the services and expertise of Dhinova Technology - a leading software development company specializing in web applications, mobile apps, blockchain solutions, and AI-powered projects.

## 🚀 Live Demo

Visit the website: [dhinova.com](https://dhinova.com)

## 📋 About

This is a professional corporate website built with modern web technologies. The site features:

- **Hero Section**: Engaging introduction with modern design
- **About**: Company background and expertise
- **Services**: Comprehensive service offerings
- **Contact**: Easy ways to get in touch

## ✨ Features

- 🎨 Modern, responsive design with smooth animations
- 🌙 Professional UI with custom color schemes
- 📱 Fully responsive across all devices
- 🚀 Fast performance with Vite build tool
- 🎭 Beautiful UI components from shadcn/ui

## 🛠️ Technologies Used

### Core Technologies
- **React 18.3** - UI framework
- **TypeScript 5.8** - Type safety
- **Vite 5.4** - Build tool and dev server
- **Tailwind CSS 3.4** - Styling

### UI & Animation
- **shadcn/ui** - Accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library

### Other Libraries
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **next-themes** - Theme management

## 📦 Installation

### Prerequisites
- Node.js 18+ (recommended)
- npm or yarn or bun

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dhinova.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   bun run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080`

## 🚀 Build for Production

```bash
# Build the project
npm run build

# Build for production
npm run build:prod

# Preview production build
npm run preview
```

## 📁 Project Structure

```
dhinova.com/
├── public/              # Static assets
│   ├── favicon.svg
│   └── placeholder.svg
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   └── Services.tsx
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   └── App.tsx         # Root component
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts
```

## 🚀 Deployment

### GitHub Pages

This project is configured for automated deployment to GitHub Pages using GitHub Actions.

1. **Automatic Deployment**: Push to the `main` branch to trigger automatic deployment
2. **Manual Deployment**: Run `npm run deploy` for production or `npm run deploy:dev` for development builds

The GitHub Actions workflow will:
- Build the project
- Deploy to GitHub Pages
- Set up the CNAME file for custom domain (dhinova.com)

### Manual Deployment

```bash
# Deploy to GitHub Pages
npm run deploy

# Deploy development build
npm run deploy:dev
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:prod` - Build with production mode
- `npm run build:dev` - Build with development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Build and deploy to GitHub Pages (production)
- `npm run deploy:dev` - Build and deploy to GitHub Pages (development)

## 📄 License

© 2025 Dhinova Technology Pvt Ltd. All rights reserved.
