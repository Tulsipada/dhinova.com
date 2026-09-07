import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { readFileSync, writeFileSync, existsSync } from "fs";

type BlogEntry = {
  slug: string;
  date: string;
};

const SITE_URL = "https://dhinova.com";

const generateSitemapXml = () => {
  const blogsPath = path.resolve(__dirname, "src/data/blogs.json");
  const blogs = JSON.parse(readFileSync(blogsPath, "utf-8")) as BlogEntry[];

  const staticUrls = [
    { loc: `${SITE_URL}/`, changefreq: "weekly", priority: "1.0" },
    { loc: `${SITE_URL}/blogs`, changefreq: "weekly", priority: "0.9" },
  ];

  const blogUrls = blogs.map((blog) => ({
    loc: `${SITE_URL}/blogs/${blog.slug}`,
    lastmod: blog.date,
    changefreq: "monthly",
    priority: "0.8",
  }));

  const urls = [...staticUrls, ...blogUrls]
    .map((url) => {
      const lastmod = "lastmod" in url && url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : "";
      return `  <url>\n    <loc>${url.loc}</loc>${lastmod}\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

// Plugin to copy index.html to 404.html and refresh sitemap after build
const seoBuildPlugin = () => {
  return {
    name: "seo-build",
    buildStart() {
      const sitemap = generateSitemapXml();
      writeFileSync(path.resolve(__dirname, "public/sitemap.xml"), sitemap);
    },
    closeBundle() {
      const indexPath = path.resolve(__dirname, "dist/index.html");
      const notFoundPath = path.resolve(__dirname, "dist/404.html");

      if (existsSync(indexPath)) {
        const indexContent = readFileSync(indexPath, "utf-8");
        writeFileSync(notFoundPath, indexContent);
        console.log("✓ Copied index.html to 404.html for GitHub Pages");
      }

      const sitemap = generateSitemapXml();
      writeFileSync(path.resolve(__dirname, "dist/sitemap.xml"), sitemap);
      console.log("✓ Generated sitemap.xml");
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
  plugins: [react(), seoBuildPlugin()],
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
