import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
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
    // Customize esbuild options for further optimizations
    minify: "esbuild",
  },
  esbuild: {
    // Enable incremental builds and concurrency optimizations
    minifyWhitespace: true,
    minifyIdentifiers: true,
    minifySyntax: true,
  },
});
