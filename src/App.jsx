import Home from './components/routes/home/home.component.jsx';
import { Routes, Route } from "react-router";
import  Navigation  from './components/routes/navigation/navigation.component.jsx'
import Authentication from './components/routes/authentication/authentication.component.jsx';
import Shop from './components/shop/shop.component.jsx'
import Checkout from './components/routes/checkout/checkout.component.jsx'


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />} >
          <Route index element={<Home />} />
          <Route path='shop' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
