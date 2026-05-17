import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure webpack to ignore backend directories
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/.next/**',
          '../backend/**',
          '../.venv/**',
          '**/venv/**',
          '**/__pycache__/**',
          '**/*.pyc',
          '**/*.py',
        ],
      };
    }
    return config;
  },
};

export default nextConfig;

// Made with Bob
