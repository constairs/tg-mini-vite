import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  ThemeConfig,
} from '@chakra-ui/react';
import WebApp from '@twa-dev/sdk';
import eruda from 'eruda';

import { AppContextProvider } from './Context';
import App from './App.tsx';
import './index.css';

WebApp.ready();

eruda.init();

window.localStorage.removeItem('chakra-ui-color-mode');

const config: ThemeConfig = {
  initialColorMode: WebApp.colorScheme,
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AppContextProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </AppContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
