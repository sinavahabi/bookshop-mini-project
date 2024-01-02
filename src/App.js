import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SharedLayout from './pages/SharedLayout/SharedLayout';
import NotFound from './pages/404/404';
import AboutUs from './pages/AboutUs/AboutUs';
import Cart from './pages/Cart/Cart';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Search from './pages/Search/Search';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import { useSelector } from 'react-redux';

function App() {
  const isBlur = useSelector(state => state.blur.isBlur);
  
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route index element={<Home isBlur={isBlur} />} />
            <Route path='/dashboard' element={<Dashboard isBlur={isBlur} />} />
            <Route path='/search' element={<Search isBlur={isBlur} />} />
            <Route path='/products/:productId' element={<Product isBlur={isBlur} />} />
            <Route path='/about-us' element={<AboutUs isBlur={isBlur} />} />
            <Route path='/cart' element={<Cart isBlur={isBlur} />} />
          </Route>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
