import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SharedLayout from './pages/SharedLayout/SharedLayout';
import NotFound from './pages/404/404';
import AboutUs from './pages/AboutUs/AboutUs';
import Cart from './pages/Cart/Cart';
import Bookshelf from './pages/Bookshelf/Bookshelf';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Search from './pages/Search/Search';
import Filters from './pages/Filters/Filters';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Error from './components/Error/Error';
import { useSelector } from 'react-redux';
import { useFetch } from './hooks/useFetch';
import { decryption } from './token/token';

function App() {
  const isBlur = useSelector(state => state.blur.isBlur);
  const filterType = useSelector(state => state.filter.filterType);
  const isUserLoggedIn = useSelector(state => state.currentUser.id ? state.currentUser.id : false);
  const { error: productsErr } = useFetch('http://localhost:5000/products', 'GET');
  const { error: usersErr } = useFetch('http://localhost:5001/users', 'GET');

  return (
    <main className={`bookshop-app ${decryption('D8DC79B5A6C63C89', 'dm') === 'true' ? 'dark' : 'light'}`}>
      <div className='app dark:bg-zinc-800 dark:text-white'>
        {productsErr || usersErr ?
          <div className='flex justify-center items-center flex-warp h-screen'>
            <Error message={'خطایی رخ داده است! درحال حاضر استفاده از سایت امکان پذیر نمی‌باشد!'} />
          </div> :
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<SharedLayout />}>
                <Route index element={<Home isBlur={isBlur} />} />
                <Route path='/dashboard' element={isUserLoggedIn ? <Dashboard isBlur={isBlur} /> : <NotFound isBlur={isBlur} />} />
                <Route path='/search' element={<Search isBlur={isBlur} />} />
                <Route path='/filters' element={<Filters isBlur={isBlur} filterType={filterType} />} />
                <Route path='/products/:productId' element={<Product isBlur={isBlur} />} />
                <Route path='/about-us' element={<AboutUs isBlur={isBlur} />} />
                <Route path='/cart' element={isUserLoggedIn ? <Cart isBlur={isBlur} /> : <NotFound isBlur={isBlur} />} />
                <Route path='/bookshelf' element={isUserLoggedIn ? <Bookshelf isBlur={isBlur} /> : <NotFound isBlur={isBlur} />} />
              </Route>
              <Route path='/change-password' element={<ChangePassword />} />
              <Route path='/sign-up' element={isUserLoggedIn ? <NotFound isBlur={isBlur} /> : <SignUp isBlur={isBlur} />} />
              <Route path='/sign-in' element={isUserLoggedIn ? <NotFound isBlur={isBlur} /> : <SignIn />} />
              <Route path='*' element={<NotFound isBlur={isBlur} />} />
            </Routes>
          </BrowserRouter>}
      </div>
    </main>
  );
}

export default App;
