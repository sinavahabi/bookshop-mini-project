import './Header.scss';
import Searchbar from '../Searchbar/Searchbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { blurActions } from '../../store/blur-slice';
import { filterActions } from '../../store/filter-slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilter, faUserFriends, faUserCheck, faSignIn, faSignOut, faBars } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [show, setShow] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter === selectedFilter ? null : filter); // Toggle the selected filter
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

  return (
    <header className='mb-6 shadow-2xl shadow-zinc-400 sticky bg-slate-50 top-0 z-10'>
      <nav className='navbar flex justify-between items-center medium'>
        <button type="button" className='expand-navbar btn rounded-none focus:ring-0 focus:ring-offset-0 lg:hidden block relative' onClick={showSidebar}>
          <FontAwesomeIcon icon={faBars} className={show ? 'rotate-90' : 'rotate-0'} />
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
          {/* <li>
            <NavLink to='/dashboard' className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none'>حساب کاربری</NavLink>
          </li>
          <li>خروج</li> */}
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
        </ul>
        {/* Smaller screen sizes sidebar view */}
        {show && <Sidebar />}
        <Searchbar />
      </nav>
    </header>
  );
}

export default Header;
