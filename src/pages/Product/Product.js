import './Product.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit, faAddressBook, faMoneyBill, faStickyNote, faCalendarTimes, faPen, faArrowRight, faArrowLeft, faAngleDoubleLeft, faCartPlus, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import Preview from '../../components/Preview/Preview';
import Error from '../../components/Error/Error';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { useEffect, useState } from 'react';
import { decryption, encryption } from '../../token/token';

function Product({ isBlur }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentCartItems = useSelector(state => state.cart.cartItems);
  const { data: product, loading, error } = useFetch(`http://localhost:5000/products/${productId}`, 'GET');
  const { data: products } = useFetch('http://localhost:5000/products', 'GET');
  const isUserLoggedIn = useSelector(state => state.currentUser.id ? state.currentUser.id : false);
  const isItemInCart = currentCartItems.some(item => item.id === product.id);
  const itemQuantity = currentCartItems.find(item => item.id === product.id)?.quantity || 0;
  const [isHomePage, setIsHomePage] = useState(false);

  const previousPath = location.state?.previousPath;
  const isFromBookshelf = location.state?.isFromBookshelf;

  // Create a function to add cart items to user cart
  const addOneItem = (product) => {
    const { id, title, author, genre, publishedDate, pages, price, image, productLink } = product;
    dispatch(cartActions.increment({ id, title, author, genre, publishedDate, pages, price, image, productLink }));
  };

  const removeOneItem = (product) => {
    const { id } = product;
    dispatch(cartActions.decrement({ id }));
  };

  useEffect(() => {
    // Decide how to set local storage value based on the path user is currently in
    return () => {
      if (isFromBookshelf) {
        encryption('126D9EB673FD4F19', 'hp', JSON.stringify(false));
      } else {
        decryption('A1DBD3FBC2B9D5AC', 'pp') === '/' ? encryption('126D9EB673FD4F19', 'hp', JSON.stringify(true)) : encryption('126D9EB673FD4F19', 'hp', JSON.stringify(false));
      }
    };
  }, [isFromBookshelf]);

  return (
    <>
      {/* Show 'Error' component if an error occurred during API requests */}
      {error && <Error message={error} />}
      {!error && <main className={`main flex flex-col justify-center items-center ${isBlur ? 'blur-sm' : 'blur-none'}`}>
        {/* Show 'Preview' component for the time products are loading */}
        {loading
          ? <Preview isProduct={true} isBookshelf={false} />
          : <div className='product dark:shadow-lg dark:shadow-zinc-700 shadow-2xl shadow-zinc-400 rounded-lg min-h-max sm:min-h-400 md:min-h-500 lg:min-h-600 min-w-250 w-3/5 mx-auto' >
            <h2 className='larger font-medium text-center text-white bg-gray-500 py-2 rounded-t-lg'>{product.title}</h2>
            <img src={`http://localhost:3000/${product.image}`} className='h-48 md:h-64 lg:h-80 mx-auto mt-2' alt='book-cover' />
            <div className='details p-2 flex flex-col space-y-3 '>
              <div className='flex md:justify-between md:items-center md:flex-row flex-col items-start'>
                <div className='flex items-center order-2 md:order-1'>
                  <FontAwesomeIcon className='ml-1 text-slate-600 dark:text-gray-300' icon={faUserEdit} />
                  <h4 className='medium'>نویسنده: {product.author}</h4>
                </div>
                <button
                  type='button'
                  className='btn btn-dark mb-3 md:mb-0 order-1 md:order-2 hover:bg-slate-500 focus:ring-0 focus:ring-offset-0 smaller w-20 md:w-24'
                  onClick={() => !isFromBookshelf ? previousPath === '/' || isHomePage || decryption('126D9EB673FD4F19', 'hp')?.length === 4 ? navigate('/') : navigate(-1) : navigate(-1)}
                >
                  بازگشت<FontAwesomeIcon icon={faAngleDoubleLeft} className='mr-2' />
                </button>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon className='ml-1 text-slate-600 dark:text-gray-300' icon={faAddressBook} />
                <h5 className='text-md lg:text-xl md:text-lg'>دسته‌بندی: {product.genre}</h5>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon className='ml-1 text-slate-600 dark:text-gray-300' icon={faStickyNote} />
                <p className='small'>تعداد صفحات: {product.pages}</p>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon className='ml-1 text-slate-600 dark:text-gray-300' icon={faMoneyBill} />
                <p className='small'>قیمت: {product.price} تومان</p>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon className='ml-1 text-slate-600 dark:text-gray-300' icon={faCalendarTimes} />
                <p className='small'>تاریخ انتشار: {product.publishedDate}</p>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon className='ml-1 text-slate-600 dark:text-gray-300' icon={faPen} />
                <p className='small'>درباره کتاب: {product.about}</p>
              </div>
              <div className="navigation-buttons flex justify-between items-center flex-wrap">
                {!isFromBookshelf
                  ? previousPath === '/' || isHomePage || decryption('126D9EB673FD4F19', 'hp')?.length === 4
                    ? <button
                      disabled={Number(productId) === 1 ? true : false}
                      className={`btn hover:bg-slate-500 hover:text-white btn-circle w-8 h-8 medium ${Number(productId) === 1 ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
                      onClick={() => {
                        navigate(`${location.pathname.match(/\/(.*?)\//g)}${Number(productId) - 1}`);
                        setIsHomePage(true);
                      }
                      }
                    >
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                    : null
                  : null}
                {isUserLoggedIn
                  ? isItemInCart
                    ? <div className='flex justify-center items-center mx-auto'>
                      <button className='btn btn-circle hover:btn-primary focus:btn-primary w-7 h-7 ml-2' type='button' onClick={() => addOneItem(product)}>
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                      </button>
                      <p>{itemQuantity}</p>
                      <button className='btn btn-circle hover:btn-error focus:btn-error w-7 h-7 mr-2' type='button' onClick={() => removeOneItem(product)}>
                        <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                      </button>
                    </div>
                    : <button className={`btn btn-success medium w-1/4 ${previousPath === '/' || isHomePage ? '' : 'mx-auto'}`} type='button' onClick={() => addOneItem(product)}>
                      خرید<FontAwesomeIcon className='mt-1 mr-1' icon={faCartPlus}></FontAwesomeIcon>
                    </button>
                  : <NavLink className={`btn btn-success medium w-1/4 min-w-90 text-center ${previousPath === '/' || isHomePage ? '' : 'mx-auto'}`} to='/sign-in'>
                    خرید<FontAwesomeIcon className='mt-1 mr-1' icon={faCartPlus}></FontAwesomeIcon>
                  </NavLink>}
                {!isFromBookshelf
                  ? previousPath === '/' || isHomePage || decryption('126D9EB673FD4F19', 'hp')?.length === 4
                    ? <button
                      disabled={Number(productId) === products?.length ? true : false}
                      className={`btn hover:bg-slate-500 hover:text-white btn-circle w-8 h-8 medium ${Number(productId) === products?.length ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
                      onClick={() => {
                        navigate(`${location.pathname.match(/\/(.*?)\//g)}${Number(productId) + 1}`);
                        setIsHomePage(true);
                      }
                      }
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    : null
                  : null}
              </div>
            </div>
          </div>}
      </main>}
    </>
  );
}

export default Product;
