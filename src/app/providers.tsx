'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { system } from '../theme'; // ඔයාගේ src/theme.ts එක තියෙන නිවැරදි path එක දෙන්න

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      {children}
    </ChakraProvider>
  );
}