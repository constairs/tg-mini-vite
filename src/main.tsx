import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react';
import App from './App.tsx';
import './index.css';

import WebApp from '@twa-dev/sdk'

import eruda from 'eruda'

WebApp.ready();

eruda.init();

// const colors = {
//   brand: {
//     900: '#1a365d',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
// };

console.log('colorScheme', WebApp.colorScheme);

const config: ThemeConfig = {
  initialColorMode: WebApp.colorScheme,
  useSystemColorMode: false,
};

const theme = extendTheme({ config })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
