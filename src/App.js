import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/search' element={<Search />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/products/:productId' element={<Product />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
