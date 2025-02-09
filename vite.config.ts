import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    // Configure base only if deploying on a subpath:
    base: "/",
    plugins: [react(), tailwindcss()],
    optimizeDeps: {
      // Pre-bundle React dependencies if needed
      include: ["react", "react-dom"],
    },
    build: {
      // Use an appropriate target based on your deployment environment
      target: "esnext",
      // Enable CSS code-splitting for faster rebuilds
      cssCodeSplit: true,
      // Customize esbuild options for faster build times
      minify: "esbuild",
      // Disable sourcemaps for production builds (adjust as needed)
      sourcemap: false,
      // Configure Rollup output for better caching and file organization
      rollupOptions: {
        output: {
          entryFileNames: "assets/js/[name]-[hash].js",
          chunkFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
              return "assets/images/[name]-[hash][extname]";
            }
            if (/\.css$/.test(name ?? "")) {
              return "assets/css/[name]-[hash][extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      },
      // Limit inline assets for better performance
      assetsInlineLimit: 4096,
    },
    esbuild: {
      // Enable incremental builds and concurrency optimizations
      minifyWhitespace: true,
      minifyIdentifiers: true,
      minifySyntax: true,
    },
  };
});