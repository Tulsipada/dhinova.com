import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { readFileSync, writeFileSync, existsSync } from "fs";

// Plugin to copy index.html to 404.html after build
const copy404Plugin = () => {
  return {
    name: "copy-404",
    closeBundle() {
      const indexPath = path.resolve(__dirname, "dist/index.html");
      const notFoundPath = path.resolve(__dirname, "dist/404.html");
      
      if (existsSync(indexPath)) {
        const indexContent = readFileSync(indexPath, "utf-8");
        writeFileSync(notFoundPath, indexContent);
        console.log("✓ Copied index.html to 404.html for GitHub Pages");
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), copy404Plugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: mode === 'development' ? 'inline' : false,
    minify: mode === 'production' ? 'esbuild' : false,
    cssMinify: mode === 'production',
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React chunks - keep everything React-related together
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Essential UI components only
          'ui-essential': ['@radix-ui/react-slot', '@radix-ui/react-tooltip', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          // Icons
          'icons': ['lucide-react'],
        },
        // Optimize chunk sizes
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    // Optimize for GitHub Pages
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    // Enable compression
    reportCompressedSize: true,
    // Optimize assets
    assetsInlineLimit: 4096,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      '@radix-ui/react-slot',
      '@radix-ui/react-tooltip',
      'class-variance-authority',
      'clsx',
      'tailwind-merge'
    ],
    exclude: [
      'framer-motion' // Exclude from initial bundle
    ]
  },
}));
