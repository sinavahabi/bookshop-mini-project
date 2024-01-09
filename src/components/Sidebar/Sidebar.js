import './Sidebar.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterActions } from '../../store/filter-slice';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilter, faUserFriends, faUserCheck, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter === selectedFilter ? null : filter);
  };

  const filters = [
    { label: 'مالی', action: filterActions.financial },
    { label: 'فلسفه', action: filterActions.philosophy },
    { label: 'روانشناسی', action: filterActions.psychology },
    { label: 'خودسازی', action: filterActions.selfDevelopment },
  ];

  return (
    <div className='sidebar lg:hidden py-6 flex justify-start items-start fixed z-10 top-10 md:top-11 h-screen w-1/2 min-w-250 shadow-2xl shadow-zinc-400 bg-slate-50'>
      <ul>
        <li className='mb-3'>
          <NavLink to='/' className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none'>
            خانه<FontAwesomeIcon className='mr-1 smaller' icon={faHome} />
          </NavLink>
        </li>
        <li className='mb-3'>
          <NavLink to='/about-us' className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none'>
            درباره ما<FontAwesomeIcon className='mr-1 smaller' icon={faUserFriends} />
          </NavLink>
        </li>
        {/* <li>
            <NavLink to='/dashboard' className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none'>حساب کاربری</NavLink>
          </li>
          <li>خروج</li> */}
        <li className='mb-1'>
          <div className="dropdown relative inline-block">
            <button type='button' className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none dropdown-btn'>
              دسته‌بندی‌ها<FontAwesomeIcon className='mr-1 smaller' icon={faFilter} />
            </button>
            <ul className='dropdown-list absolute z-10 right-28 top-0 md:right-32 hidden bg-slate-50 shadow-2xl shadow-zinc-400 rounded-l-md rounded-b-md lg:rounded-l-none'>
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
            {/* <ul className='dropdown-list absolute z-10 right-28 top-0 md:right-32 hidden bg-slate-50 shadow-2xl shadow-zinc-400 rounded-l-md rounded-b-md lg:rounded-l-none'>
              <li className='dropdown-item flex justify-start items-center'>
                <label className='cursor-pointer small ml-1' htmlFor="sidebar-financial">مالی</label>
                <input type="checkbox" name="financial-filter" id="sidebar-financial" className='cursor-pointer w-4 h-4 accent-teal-600 hover:accent-teal-500 rounded' />
              </li>
              <li className='dropdown-item flex justify-start items-center'>
                <label className='cursor-pointer small ml-1' htmlFor="sidebar-philosophy">فلسفه</label>
                <input type="checkbox" name="philosophy-filter" id="sidebar-philosophy" className='cursor-pointer w-4 h-4 accent-teal-600 hover:accent-teal-500 rounded' />
              </li>
              <li className='dropdown-item flex justify-start items-center'>
                <label className='cursor-pointer small ml-1' htmlFor="sidebar-psychology">روانشناسی</label>
                <input type="checkbox" name="psychology-filter" id="sidebar-psychology" className='cursor-pointer w-4 h-4 accent-teal-600 hover:accent-teal-500 rounded' />
              </li>
              <li className='dropdown-item flex justify-start items-center'>
                <label className='cursor-pointer small ml-1' htmlFor="sidebar-self-development">خودسازی</label>
                <input type="checkbox" name="self-development-filter" id="sidebar-self-development" className='cursor-pointer w-4 h-4 accent-teal-600 hover:accent-teal-500 rounded' />
              </li>
            </ul> */}
          </div>
        </li>
        <hr className='h-1 bg-slate-950' />
        <li className='mb-3 mt-1'>
          <NavLink to='/sign-up' className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none'>
            ثبت نام<FontAwesomeIcon className='mr-1 smaller' icon={faUserCheck} />
          </NavLink>
        </li>
        <li className='mb-3'>
          <NavLink to='/sign-in' className='btn hover:btn-dark focus:ring-0 focus:ring-offset-0 rounded-none'>
            ورود<FontAwesomeIcon className='mr-1 smaller' icon={faSignIn} />
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;