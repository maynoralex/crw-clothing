import Home from './routes/home/home.component.jsx';
import { Routes, Route } from "react-router";
import  Navigation  from './routes/navigation/navigation.component.jsx'
import Authentication from './routes/authentication/authentication.component.jsx';
import Shop from './routes/shop/shop.component.jsx'
import Checkout from './routes/checkout/checkout.component.jsx'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { setCurrentUser } from './store/user/user.reducer'

import {
  onAuthStateChangedListener,
  createUserDocFromAuth,
} from './utils/firebase/firebase';



const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocFromAuth(user);
            }
            console.log(setCurrentUser(user));
            dispatch(setCurrentUser(user));
            
        });
        return unsubscribe;
    }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />} >
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
