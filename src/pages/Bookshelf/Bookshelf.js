import React from 'react';
import './Bookshelf.scss';
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks/useFetch';
import Preview from '../../components/Preview/Preview';
import emptyShelfCover from '../../assets/images/empty-shelf.png';
import Message from '../../components/Message/Message';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faCircleCheck, faDownload } from '@fortawesome/free-solid-svg-icons';

function Bookshelf({ isBlur }) {
  const currentUserId = useSelector(state => state.currentUser.id);
  const { data, loading } = useFetch(currentUserId ? `http://localhost:5001/users/${currentUserId}` : '', 'GET');
  const { cartItems: boughtProducts } = data || {};

  const convertPriceFormat = result => String(result).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <main className={`main larger ${isBlur ? 'blur-sm' : 'blur-none'}`}>
      <ul>
        {loading ? (
          // Display placeholders when loading
          Array.from({ length: 4 }, (_, index) => <Preview key={index} isProduct={false} isBookshelf={true} />)
        ) : boughtProducts && boughtProducts.length > 0 ? (
          // Display bought products if available
          boughtProducts.map((bp, index) => (
            <article key={index}>
              <div className="titles bg-slate-100 py-2 px-1 flex flex-col sm:flex-row items-center mt-1 medium space-y-2 sm:space-y-0">
                <span className='hidden sm:inline bg-pink-400 text-white rounded-full py-2 px-4'>{index + 1}</span>
                <p className='mr-0 sm:mr-2 bg-sky-400 text-white p-2 rounded-xl w-full text-center sm:w-auto'>{`تاریخ خرید: ${bp?.purchaseDate}`}<FontAwesomeIcon className='mr-1' icon={faCalendarDay} /></p>
                <span className='hidden sm:inline' style={{ flexGrow: 15 }}></span>
                <p className='bg-green-400 text-white p-2 rounded-xl w-full text-center sm:w-auto'>{`قیمت کل: ${convertPriceFormat(bp?.totalPrice)} تومان`}<FontAwesomeIcon className='mr-1' icon={faCircleCheck} /></p>
                <span className='hidden sm:inline' style={{ flexGrow: 15 }}></span>
              </div>
              <span className='inline-block mt-2 sm:hidden sm:mt-0 bg-pink-400 text-white rounded-full py-2 px-4'>{index + 1}</span>
              <li>
                <ul className='flex min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-normal max-[480px]:flex-col max-[480px]:items-center max-[480px]:justify-center flex-wrap border-b-4 py-3'>
                  {bp.items.map((row, i) => (
                    <div key={i}>
                      <li className='mx-2 my-3'>
                        <NavLink to={`/products/${row.id}`} state={{ isFromBookshelf: true }} className='flex flex-col justify-between items-center rounded-md shadow-2xl shadow-zinc-400 w-52 h-60 p-2'>
                          <h2 className='small font-medium text-center text-gray-700'>{row.title}</h2>
                          <img src={row.image} className='h-32 mx-auto mt-2' alt='book-cover' />
                          <div className="w-full flex justify-between items-center flex-wrap mt-2">
                            <h4 className='smaller font-medium text-gray-500'>{row.author}</h4>
                            <p className='smaller text-gray-500'>{`${row.quantity} عدد`}</p>
                          </div>
                        </NavLink>
                      </li>
                      <a
                        href={`${row.productLink}`}
                        className='product-download-link inline-block text-center w-10/12 ml-4 mr-5 my-2 p-2 bg-white shadow-2xl shadow-zinc-400 rounded-lg text-blue-500 small'
                        download
                      >
                        لینک دانلود <FontAwesomeIcon icon={faDownload} />
                      </a>
                    </div>
                  ))}
                </ul>
              </li>
            </article>
          ))
        ) : (
          // Display message if no bought products available
          <main>
            <Message text={'قفسه کتاب شما خالی است!'} size={'large'} />
            <img src={emptyShelfCover} className='h-52 w-68 sm:h-400 sm:w-600 mx-auto mt-2' alt='shelf-cover' />
          </main>
        )}
      </ul>
    </main>
  );
}

export default Bookshelf;
