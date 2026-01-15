import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './app.jsx'
import './index.css'

// Custom theme
const theme = extendTheme({
  colors: {
    brand: {
      50: '#ffe5f1',
      100: '#ffcce4',
      500: '#ff2e8b',
      600: '#e6297d',
    }
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)