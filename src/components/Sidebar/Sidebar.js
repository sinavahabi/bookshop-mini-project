import './Sidebar.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterActions } from '../../store/filter-slice';
import { blurActions } from '../../store/blur-slice';
import { userActions } from '../../store/user-slice';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { encryption } from '../../token/token';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilter, faUserFriends, faUserCheck, faSignIn, faSignOut, faAngleDown, faAngleUp, faUserCircle, faShoppingCart, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ visibleSidebar, setVisibleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentCartItems = useSelector(state => state.cart.cartItems);
  const isUserLoggedIn = useSelector(state => state.currentUser.id ? state.currentUser.id : false);
  const currentUserId = useSelector(state => state.currentUser.id);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const { data: userInfo, error: userError } =  useFetch(currentUserId ? `http://localhost:5001/users/${currentUserId}` : '', 'GET');

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter === selectedFilter ? null : filter);
    encryption('1E633C454A2C5BD6', 'sf', filter);
  };

  const filters = [
    { label: 'مالی', action: filterActions.financial },
    { label: 'فلسفه', action: filterActions.philosophy },
    { label: 'روانشناسی', action: filterActions.psychology },
    { label: 'خودسازی', action: filterActions.selfDevelopment },
  ];

  const handleNavLinkClick = () => {
    dispatch(blurActions.blurOut());
    setVisibleSidebar(false);
  };

  return (
    <>
      {visibleSidebar && <nav className='sidebar lg:hidden py-6 flex justify-start items-start fixed z-10 top-10 md:top-11 h-screen w-1/2 min-w-250 shadow-2xl shadow-zinc-400 bg-slate-50'>
        <ul className='w-full flex flex-col flex-wrap'>
          <li>
            <NavLink to='/' onClick={handleNavLinkClick} className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none block w-full'>
              خانه<FontAwesomeIcon className='mr-1 smaller' icon={faHome} />
            </NavLink>
          </li>
          <li>
            <NavLink to='/about-us' onClick={handleNavLinkClick} className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none block w-full'>
              درباره ما<FontAwesomeIcon className='mr-1 smaller' icon={faUserFriends} />
            </NavLink>
          </li>
          <li>
            <div className='dropdown relative inline-block'>
              <button type='button' className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none block w-full dropdown-btn'>
                دسته‌بندی‌ها<FontAwesomeIcon className='mr-1 smaller' icon={faFilter} />
              </button>
              <ul className='dropdown-list absolute z-10 right-28 top-0 md:right-32 hidden bg-slate-50 shadow-2xl shadow-zinc-400 rounded-l-md rounded-b-md lg:rounded-l-none'>
                {filters.map((filter, index) => (
                  <li key={index} className='dropdown-item flex justify-start items-center'>
                    <label className='small ml-1'>
                      {filter.label}
                    </label>
                    <input
                      onClick={() => {
                        // handle filter changes
                        navigate('/filters');
                        dispatch(filter.action());
                        dispatch(blurActions.blurOut());
                        setVisibleSidebar(false);
                      }}
                      onChange={() => handleFilterChange(filter.label)}
                      type='checkbox'
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
          {isUserLoggedIn && <li className='user-profile'>
            <div className="flex items-center">
              <button
                className='text-right btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none block w-full'
                onClick={() => setShowUserInfo(prevState => !prevState)}
              >
                {`${userInfo?.name || 'کاربر'} ${userInfo?.lastName || 'نامشخص'}`}<FontAwesomeIcon className='navigate-icon' icon={showUserInfo ? faAngleUp : faAngleDown} />
              </button>
            </div>
            {showUserInfo && <section>
              <ul>
                <li>
                  <NavLink to='/dashboard' onClick={handleNavLinkClick} className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none block w-full'>
                    پروفایل کاربر<FontAwesomeIcon className='medium mr-1' icon={faUserCircle} />
                  </NavLink>
                </li>
                <li>
                  <button type='button' className='text-right btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none block w-full' onClick={() => {
                    dispatch(userActions.loggedOut());

                    if (!userError) {
                      encryption('D4B7EF6F8553C18E', 'uid', '');
                      encryption('B7BE2BFB64C56BD3', 'umn', '');
                      navigate('/');
                    }
                  }}>
                    خروج از حساب<FontAwesomeIcon className='small mr-1' icon={faSignOut} />
                  </button>
                </li>
                <li>
                  <NavLink to='/bookshelf' className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none block w-full'>
                    قفسه کتاب<FontAwesomeIcon className='medium mr-1' icon={faShoppingBasket} />
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/cart' onClick={handleNavLinkClick} className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none block w-full'>
                    سبد خرید<FontAwesomeIcon className='small mr-1' icon={faShoppingCart} />
                  </NavLink>
                  {currentCartItems?.length === 0
                    ? null
                    : <span className="relative flex h-5 w-5 cart-ping-sidebar">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white font-bold justify-center items-center cart-ping-sidebar-font-size">{currentCartItems?.length}</span>
                    </span>}
                </li>
              </ul>
            </section>}
          </li>}
          <hr className='h-1 bg-slate-600 w-full' />
          {!isUserLoggedIn && <ul className='w-full flex flex-col flex-wrap'>
            <li>
              <NavLink to='/sign-up' onClick={handleNavLinkClick} className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none block w-full'>
                ثبت نام<FontAwesomeIcon className='mr-1 smaller' icon={faUserCheck} />
              </NavLink>
            </li>
            <li>
              <NavLink to='/sign-in' onClick={handleNavLinkClick} className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none block w-full'>
                ورود<FontAwesomeIcon className='mr-1 smaller' icon={faSignIn} />
              </NavLink>
            </li>
          </ul>}
        </ul>
      </nav>}
    </>
  );
}

export default Sidebar;