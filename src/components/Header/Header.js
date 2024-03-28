import './Header.scss';
import Searchbar from '../Searchbar/Searchbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Message from '../../components/Message/Message';
import { useDispatch } from 'react-redux';
import { blurActions } from '../../store/blur-slice';
import { filterActions } from '../../store/filter-slice';
import { useFetch } from '../../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilter, faUserFriends, faUserCheck, faSignIn, faSignOut, faBars, faUser, faUserCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [successLogout, setSuccessLogout] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const { data: userInfo, error: userError } = useFetch(localStorage.getItem('userId')?.length > 0 ? `http://localhost:5001/users/${localStorage.getItem('userId')}` : '', 'GET');
  const { loading, error, saveInfo } = useFetch(userInfo?.id ? `http://localhost:5001/users/${userInfo?.id}` : '', 'PUT');

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter === selectedFilter ? null : filter);
  };

  const filters = [
    { label: 'مالی', action: filterActions.financial },
    { label: 'فلسفه', action: filterActions.philosophy },
    { label: 'روانشناسی', action: filterActions.psychology },
    { label: 'خودسازی', action: filterActions.selfDevelopment },
  ];

  // Create a function to handle sidebar view on small screen sizes: "(min-width: 1024px)"
  const showSidebar = () => {
    if (show) {
      setShow(false);
      dispatch(blurActions.blurOut());
    } else {
      setShow(true);
      dispatch(blurActions.blurOn());
    }
  };

  // Create a function to handle user logout
  const logOut = async () => {
    saveInfo({
      ...userInfo,
      loggedIn: false
    });

    if (!userError) {
      setSuccessLogout(true);

      setTimeout(() => {
        localStorage.setItem('userLoggedIn', JSON.stringify(false));
        localStorage.setItem('userId', '');
      }, 3000);
    }
  };

  return (
    <>
      <header className='mb-6 shadow-2xl shadow-zinc-400 sticky bg-slate-50 top-0 z-20'>
        <nav className='navbar flex justify-between items-center medium'>
          <button type="button" className='expand-navbar btn rounded-none focus:ring-0 focus:ring-offset-0 lg:hidden block relative' onClick={showSidebar}>
            <FontAwesomeIcon icon={faBars} className={`${show ? 'rotate-90' : 'rotate-0'} transition-all duration-300`} />
          </button>
          {error && <div className="absolute z-20 top-14 left-3 small animate-bounce bg-red-200 text-red-500 p-3 rounded-md">خطایی در خروج شما از حساب کاربری رخ داده است!</div>}
          {loading && <div className="absolute z-20 top-14 right-3 medium animate-bounce bg-white p-3 rounded-md shadow-2xl shadow-zinc-400">لطفا صبر نمایید...</div>}
          {/* Larger screen sizes navbar view */}
          <ul className='lg:flex justify-center items-center hidden'>
            <li>
              <NavLink to='/' className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none'>
                خانه<FontAwesomeIcon className='mr-1 smaller' icon={faHome} />
              </NavLink>
            </li>
            <li>
              <NavLink to='/about-us' className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none'>
                درباره ما<FontAwesomeIcon className='mr-1 smaller' icon={faUserFriends} />
              </NavLink>
            </li>
            <li>
              <div className="dropdown relative inline-block">
                <button type='button' className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none dropdown-btn'>
                  دسته‌بندی‌ها<FontAwesomeIcon className='mr-1 smaller' icon={faFilter} />
                </button>
                <ul className='dropdown-list absolute z-10 hidden bg-slate-50 shadow-2xl shadow-zinc-400 rounded-b-md'>
                  {filters.map((filter, index) => (
                    <li key={index} className='dropdown-item flex justify-start items-center'>
                      <label className='cursor-pointer small ml-1' htmlFor={filter.label}>
                        {filter.label}
                      </label>
                      <input
                        onClick={() => {
                          navigate('/filters');
                          dispatch(filter.action());
                        }}
                        onChange={() => handleFilterChange(filter.label)}
                        type="checkbox"
                        name={`فیلتر-${filter.label}`}
                        id={filter.label}
                        checked={selectedFilter === filter.label}
                        className='cursor-pointer w-4 h-4 accent-teal-600 hover:accent-teal-500 rounded'
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
          {localStorage.getItem('userLoggedIn')?.length === 4 ? <ul className='lg:flex justify-center items-center hidden'>
            <li className='user-profile'>
              <button className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none'>
                {`${userInfo?.name || 'کاربر'} ${userInfo?.lastName || 'نامشخص'}`}<FontAwesomeIcon className='mr-1 smaller' icon={faUser} />
              </button>
              <div className='user-profile-info hidden'>
                <section className='relative'>
                  <div className='absolute top-0 -right-12 z-20 min-w-250 min-h-50 w-1/4 h-max bg-white shadow-2xl shadow-zinc-500 rounded-md'>
                    <ul className='flex justify-center items-center flex-wrap'>
                      <li className='dropdown-item w-full text-center'>
                        <NavLink to='/dashboard' className='profile-link btn focus:ring-0 focus:ring-offset-0'>
                          پروفایل کاربر<FontAwesomeIcon className='medium mr-1' icon={faUserCircle} />
                        </NavLink>
                      </li>
                      <li className='dropdown-item w-full text-center'>
                        <NavLink to='/cart' className='cart-link btn focus:ring-0 focus:ring-offset-0'>
                          سبد خرید<FontAwesomeIcon className='small mr-1' icon={faShoppingCart} />
                        </NavLink>
                      </li>
                      <li className='dropdown-item w-full text-center'>
                        <button type='button' className='btn focus:ring-0 focus:ring-offset-0' onClick={logOut}>
                          خروج از حساب<FontAwesomeIcon className='small mr-1' icon={faSignOut} />
                        </button>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            </li>
          </ul> :
            <ul className='lg:flex justify-center items-center hidden'>
              <li>
                <NavLink to='/sign-up' className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none'>
                  ثبت نام<FontAwesomeIcon className='mr-1 smaller' icon={faUserCheck} />
                </NavLink>
              </li>
              <li>
                <NavLink to='/sign-in' className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none'>
                  ورود<FontAwesomeIcon className='mr-1 smaller' icon={faSignIn} />
                </NavLink>
              </li>
            </ul>}
          {/* Smaller screen sizes sidebar view */}
          {show && <Sidebar />}
          <Searchbar />
        </nav>
      </header>
      <div className="relative z-10 flex justify-center items-center flex-wrap">
        <div className={`logout-success ${successLogout ? 'show' : ''}`}>
          {successLogout && <Message type={'success'} text={'خروج موفقیت آمیز بود!'} size={'small'} />}
        </div>
      </div>
    </>
  );
}

export default Header;
