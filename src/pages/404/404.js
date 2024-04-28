import './404.scss';
import { NavLink } from 'react-router-dom';
import notFoundImg from '../../assets/images/404.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

// The component for 404 not found error on UI
function NotFound({ isBlur }) {
  return (
    <main className={`main ${isBlur ? 'blur-sm' : 'blur-none'}`}>
      <div className="404 flex flex-row md:flex-col flex-wrap items-center justify-evenly md:justify-center space-y-6">
        <img src={notFoundImg} alt="404" className='order-1 w-full md:order-1 md:w-3/5 mx-auto rounded-xl' />
        <div className="flex flex-wrap order-2 md:order-2">
          <FontAwesomeIcon className='ml-1 text-red-500 large' icon={faExclamationTriangle} />
          <p className='text-red-500 large'>صفحه مورد نظر شما پیدا نشد!</p>
        </div>
        <NavLink to='/' className='btn btn-dark medium hover:bg-slate-600 focus:ring-slate-800 order-3 md:order-3'>بازگشت به صفحه اصلی</NavLink>
      </div>
    </main>
  );
}

export default NotFound;
