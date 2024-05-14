import './Header.scss';
import Searchbar from '../Searchbar/Searchbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Message from '../../components/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { blurActions } from '../../store/blur-slice';
import { filterActions } from '../../store/filter-slice';
import { useFetch } from '../../hooks/useFetch';
import { encryption } from '../../token/token';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilter, faUserFriends, faUserCheck, faSignIn, faSignOut, faBars, faUserCircle, faShoppingCart, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { userActions } from '../../store/user-slice';
import { cartActions } from '../../store/cart-slice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentCartItems = useSelector(state => state.cart.cartItems);
  const isUserLoggedIn = useSelector(state => state.currentUser.id ? state.currentUser.id : false);
  const currentUserId = useSelector(state => state.currentUser.id);
  const userInfoRef = useRef(null);
  const [userLabelWidth, setUserLabelWidth] = useState(144);
  const [show, setShow] = useState(false);
  const [successLogout, setSuccessLogout] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const { data: userInfo, error: userError } = useFetch(currentUserId ? `http://localhost:5001/users/${currentUserId}` : '', 'GET');

  useEffect(() => {
    const handleCheckbox = () => {
      setSelectedFilter(null);
    };

    window.addEventListener('popstate', handleCheckbox);

    return () => {
      window.removeEventListener('popstate', handleCheckbox);
    };
  }, []);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter === selectedFilter ? navigate('/') : filter);
    encryption('1E633C454A2C5BD6', 'sf', filter);
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
    if (!userError) {
      setSuccessLogout(true);

      setTimeout(() => {
        dispatch(userActions.loggedOut());
        encryption('D4B7EF6F8553C18E', 'uid', '');
        encryption('B7BE2BFB64C56BD3', 'umn', '');
        dispatch(cartActions.removeAll());
        navigate('/');
      }, 2000);
    }
  };

  return (
    <>
      <header className='mb-6 shadow-2xl shadow-zinc-400 sticky bg-slate-50 top-0 z-20'>
        <nav className='navbar flex justify-between items-center medium'>
          <button type="button" className='expand-navbar btn rounded-none focus:ring-0 focus:ring-offset-0 lg:hidden block relative' onClick={showSidebar}>
            <FontAwesomeIcon icon={faBars} className={`${show ? 'rotate-90' : 'rotate-0'} transition-all duration-300`} />
          </button>
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
          {isUserLoggedIn ? <ul className='lg:flex justify-center items-center hidden'>
            <li className='user-profile text-center' ref={userInfoRef} style={{ minWidth: 144 }}>
              <button
                className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none'
                onMouseOver={() => setUserLabelWidth(userInfoRef.current?.clientWidth)}
              >
                {`${userInfo?.name || 'کاربر'} ${userInfo?.lastName || 'نامشخص'}`}
              </button>
              <div className='user-profile-info hidden'>
                <section className='relative'>
                  <div
                    className='absolute top-0 -right-12 z-20 min-w-250 min-h-100 w-1/4 h-max bg-white shadow-2xl shadow-zinc-500 rounded-md'
                    style={{ width: userLabelWidth + 100, minWidth: 244 }}
                  >
                    <ul className='flex justify-center items-center flex-wrap'>
                      <li className='dropdown-item w-full text-center h-12'>
                        <NavLink to='/dashboard' className='profile-link btn focus:ring-0 focus:ring-offset-0'>
                          پروفایل کاربر<FontAwesomeIcon className='medium mr-1' icon={faUserCircle} />
                        </NavLink>
                      </li>
                      <li className='dropdown-item w-full text-center h-12'>
                        <NavLink to='/cart' className='cart-link relative btn focus:ring-0 focus:ring-offset-0'>
                          سبد خرید<FontAwesomeIcon className='medium mr-1' icon={faShoppingCart} />
                          {currentCartItems?.length === 0
                            ? null
                            : <span className="absolute flex h-5 w-5 cart-ping">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="absolute inline-flex rounded-full h-5 w-5 bg-red-500 text-white font-bold justify-center items-center cart-ping-font-size">{currentCartItems?.length}</span>
                            </span>}
                        </NavLink>
                      </li>
                      <li className='dropdown-item w-full text-center h-12'>
                        <NavLink to='/bookshelf' className='cart-link btn focus:ring-0 focus:ring-offset-0'>
                          قفسه کتاب<FontAwesomeIcon className='medium mr-1' icon={faShoppingBasket} />
                        </NavLink>
                      </li>
                      <li className='dropdown-item w-full text-center h-14'>
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
          {show && <Sidebar visibleSidebar={show} setVisibleSidebar={setShow} />}
          <Searchbar />
        </nav>
      </header>
      <div className="relative z-40 flex justify-center items-center flex-wrap">
        <div className={`logout-success ${successLogout ? 'show' : ''}`}>
          {successLogout && <Message type={'success'} text={'خروج موفقیت آمیز بود!'} size={'small'} />}
        </div>
      </div>
    </>
  );
}

export default Header;
