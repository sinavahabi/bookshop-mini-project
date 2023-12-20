import React from 'react';
import errorImg from '../../assets/images/error.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

// The component for error preview on UI
function Error({ message }) {
  return (
    <section className='main flex flex-col justify-center items-center'>
      <div dir='ltr' className='error w-4/5 mx-auto rounded-xl bg-red-400 h-800 flex flex-col items-center justify-center space-y-6'>
        <img src={errorImg} alt='error' className='w-4/5 mx-auto rounded-xl' />
        <div className="animate-bounce flex items-center flex-col sm:flex-row">
          <FontAwesomeIcon className='mr-1 text-white large' icon={faExclamationCircle} />
          <p className='large text-white text-center'>{message}</p>
        </div>
      </div>
    </section>
  );
}

export default Error;
