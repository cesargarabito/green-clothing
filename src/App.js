
import { Routes, Route } from 'react-router-dom'
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/Authentication';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import {useEffect} from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth, getCurrentUser } from "./utils/firebase/firebase.utils";
import { checkUserSession, setCurrentUser } from './store/user/user.action';
import { useDispatch } from 'react-redux';
import { GlobalStyle } from './global.styles';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(checkUserSession());
        }, []);
       
        

  return (
    <div>
      <GlobalStyle />
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={ <Home />} />
        <Route path='shop/*' element={ <Shop />} />
        <Route path='checkout' element={ <Checkout />} />
        <Route path='auth' element={ <Authentication />} />
      </Route>
    </Routes>
    </div>
    
  );
}

export default App;
