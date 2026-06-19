import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      bg: '#0c1324',
      primary: '#4cd7f6',
      primaryContainer: '#06b6d4',
      onPrimaryContainer: '#00424f',
      secondary: '#ddb7ff',
      surface: '#0c1324',
      surfaceLow: '#151b2d',
      surfaceContainer: '#191f31',
      surfaceHigh: '#23293c',
      onSurface: '#dce1fb',
      onSurfaceVariant: '#bcc9cd',
    },
  },
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Inter', sans-serif`,
    mono: `'JetBrains Mono', monospace`,
  },
});