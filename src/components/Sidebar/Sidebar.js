import './Sidebar.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterActions } from '../../store/filter-slice';
import { blurActions } from '../../store/blur-slice';
import { userActions } from '../../store/user-slice';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilter, faUserFriends, faUserCheck, faSignIn, faSignOut, faUser, faUserCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ visibleSidebar, setVisibleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const { data: userInfo, error: userError, loading } = useFetch(localStorage.getItem('userId')?.length > 0 ? `http://localhost:5001/users/${localStorage.getItem('userId')}` : '', 'GET');
  const { saveInfo } = useFetch(userInfo?.id ? `http://localhost:5001/users/${userInfo?.id}` : '', 'PUT');

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter === selectedFilter ? null : filter);
    localStorage.setItem('selectedFilter', filter);
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
        {userError && <div className='absolute z-20 top-72 left-1 right-1 small animate-bounce bg-red-200 text-red-500 p-3 rounded-md'>خطایی رخ داده است! ممکن است درحال حاضر اطلاعات به روز نشوند!</div>}
        {loading && <div className='absolute z-20 top-72 right-1 medium animate-bounce bg-white p-3 rounded-md shadow-2xl shadow-zinc-400'>لطفا صبر نمایید...</div>}
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
          {localStorage.getItem('userLoggedIn')?.length === 4 && <li className='user-profile'>
            <button className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none'>
              {userInfo?.name && userInfo?.lastName ? (
                userInfo.name.length >= 11 ? `${userInfo.name.slice(0, 11)}...` :
                  userInfo.name.length >= 10 ? `${userInfo.name} ${userInfo.lastName?.slice(0, 2)}...` :
                    userInfo.name.length >= 9 ? `${userInfo.name} ${userInfo.lastName?.slice(0, 3)}...` :
                      `${userInfo.name} ${userInfo.lastName?.slice(0, 8)}...`
              ) : 'کاربر نامشخص'}
            </button>
            <div className='user-profile-info hidden'>
              <section className='relative'>
                <div className='mini-modal absolute z-20 min-w-250 min-h-50 w-1/4 h-max bg-white shadow-2xl shadow-zinc-500 rounded-md'>
                  <ul className='flex justify-center items-center flex-wrap'>
                    <li className='dropdown-item w-full md:text-center text-right'>
                      <NavLink to='/dashboard' onClick={handleNavLinkClick} className='profile-link btn focus:ring-0 focus:ring-offset-0'>
                        پروفایل کاربر<FontAwesomeIcon className='medium mr-1' icon={faUserCircle} />
                      </NavLink>
                    </li>
                    <li className='dropdown-item w-full md:text-center text-right'>
                      <NavLink to='/cart' onClick={handleNavLinkClick} className='cart-link btn focus:ring-0 focus:ring-offset-0'>
                        سبد خرید<FontAwesomeIcon className='small mr-1' icon={faShoppingCart} />
                      </NavLink>
                    </li>
                    <li className='dropdown-item w-full md:text-center text-right'>
                      <button type='button' className='btn focus:ring-0 focus:ring-offset-0' onClick={async () => {
                        // handle user logout process
                        saveInfo({
                          ...userInfo,
                          loggedIn: false
                        });
                        dispatch(userActions.loggedOut());

                        if (!userError) {
                          localStorage.setItem('userLoggedIn', JSON.stringify(false));
                          localStorage.setItem('userId', '');
                          localStorage.setItem('userPhone', '');
                        }
                      }}>
                        خروج از حساب<FontAwesomeIcon className='small mr-1' icon={faSignOut} />
                      </button>
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </li>}
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
          <hr className='h-1 bg-slate-600 w-full' />
          {localStorage.getItem('userLoggedIn')?.length !== 4 && <ul className='w-full flex flex-col flex-wrap'>
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