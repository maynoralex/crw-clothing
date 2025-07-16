import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { UserProvider } from './contexts/user.context.jsx'
import { ProductsProvider } from './contexts/product.context.jsx'
import { CartProvider } from './contexts/cart.context.jsx'
import { BrowserRouter } from "react-router";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
