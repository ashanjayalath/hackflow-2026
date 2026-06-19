import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          bg: { value: '#0c1324' },
          primary: { value: '#4cd7f6' },
          primaryContainer: { value: '#06b6d4' },
          onPrimaryContainer: { value: '#00424f' },
          secondary: { value: '#ddb7ff' },
          surface: { value: '#0c1324' },
          surfaceLow: { value: '#151b2d' },
          surfaceContainer: { value: '#191f31' },
          surfaceHigh: { value: '#23293c' },
          onSurface: { value: '#dce1fb' },
          onSurfaceVariant: { value: '#bcc9cd' },
        },
      },
      fonts: {
        heading: { value: `'Montserrat', sans-serif` },
        body: { value: `'Inter', sans-serif` },
        mono: { value: `'JetBrains Mono', monospace` },
      },
    },
  },
});

// createSystem එකෙන් defaultConfig එකත් එක්ක අපේ custom theme එක merge කරනවා
export const system = createSystem(defaultConfig, customConfig);