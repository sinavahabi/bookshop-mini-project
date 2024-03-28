import './ProductList.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import Preview from '../Preview/Preview';
import Error from '../Error/Error';
import Message from '../Message/Message';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faAddressBook, faMoneyBill, faStickyNote, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';

function ProductList({ isProducts, products, loading, error, isBlur }) {
  const [isProductList, setIsProductList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsProductList(isProducts);
  }, [isProducts]);

  return (
    <>
      {/* Show 'Error' component if an error occurred during API requests */}
      {error && <Error message={error} />}
      {!error && <main className={`main container mx-auto ${isBlur ? 'blur-sm' : 'blur-none'}`}>
        <div className={products.length === 0 && !loading ? '' : 'grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-8 mt-2'}>
          {/* Show 'Preview' component for the time products are loading */}
          {loading
            ? Array.from({ length: 8 }, (_, index) => <Preview key={index} isProduct={false} />)
            : products.length === 0 ? <Message type={'error'} text={'اطلاعاتی برای نمایش یافت نشد!'} size={'medium'} />
              : products.map(product => (
                <div className='product hover:rotate-3 transition shadow-2xl shadow-zinc-400 rounded-lg h-9/12 min-w-250 w-3/5 mx-auto sm:w-full' key={product.id} >
                  <h2 className='large font-medium text-center text-white bg-gray-500 py-2 rounded-t-lg'>{product.title}</h2>
                  <img src={product.image} className='h-40 mx-auto mt-2' alt='book-cover' />
                  <div className='details p-2 flex flex-col space-y-3'>
                    <div className='flex items-center'>
                      <FontAwesomeIcon className='ml-1 text-slate-600' icon={faUserEdit} />
                      <h4 className='medium'>نویسنده: {product.author}</h4>
                    </div>
                    <div className='flex items-center'>
                      <FontAwesomeIcon className='ml-1 text-slate-600' icon={faAddressBook} />
                      <h5 className='text-sm lg:text-lg md:text-base'>دسته‌بندی: {product.genre}</h5>
                    </div>
                    <div className='flex items-center'>
                      <FontAwesomeIcon className='ml-1 text-slate-600' icon={faStickyNote} />
                      <p className='smaller'>تعداد صفحات: {product.pages}</p>
                    </div>
                    <div className='flex items-center'>
                      <FontAwesomeIcon className='ml-1 text-slate-600' icon={faMoneyBill} />
                      <p className='smaller'>قیمت: {product.price} تومان</p>
                    </div>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center'>
                        <FontAwesomeIcon className='ml-1 text-slate-600' icon={faCalendarTimes} />
                        <p className='smaller'>تاریخ انتشار: {product.publishedDate}</p>
                      </div>
                      {isProductList
                        ? <NavLink to={`products/${product.id}`} className='btn btn-primary small' >نمایش بیشتر</NavLink>
                        : <span onClick={() => navigate(`/products/${product.id}`)} className='btn btn-primary small cursor-pointer' >نمایش بیشتر</span>
                      }
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </main>}
    </>
  );
}

export default ProductList;
