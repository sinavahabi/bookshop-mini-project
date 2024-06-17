import './ProductList.scss';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Preview from '../Preview/Preview';
import Error from '../Error/Error';
import Message from '../Message/Message';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faAddressBook, faMoneyBill, faStickyNote, faCalendarTimes, faCartPlus, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { decryption, encryption } from '../../token/token';

function ProductList({ isProducts, products, loading, error, isBlur, isCart, page, limit }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentCartItems = useSelector(state => state.cart.cartItems);
  const isUserLoggedIn = useSelector(state => state.currentUser.id ? state.currentUser.id : false);
  const [isProductList, setIsProductList] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setIsProductList(isProducts);
  }, [isProducts]);

  useEffect(() => {
    setItems(page && limit ? products?.filter(item => item.id > (limit * page - limit) && item.id <= (limit * page)) : products);
  }, [page, limit, products]);

  // Create a function to add cart items to user cart
  const addOneItem = (product) => {
    const { id, title, author, genre, publishedDate, pages, price, image, productLink } = product;
    dispatch(cartActions.increment({ id, title, author, genre, publishedDate, pages, price, image, productLink }));
  };

  const removeOneItem = (product) => {
    const { id } = product;
    dispatch(cartActions.decrement({ id }));
  };

  const removeCartItem = (product) => {
    const { id } = product
    dispatch(cartActions.removeItem({ id }))
  };

  return (
    <>
      {/* Show 'Error' component if an error occurred during API requests */}
      {error && <Error message={error} />}
      {!error && <main className={`main container mx-auto ${isBlur ? 'blur-sm' : 'blur-none'}`}>
        <div className={items.length === 0 && !loading ? '' : 'grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-8 mt-2'}>
          {/* Show 'Preview' component for the time products are loading */}
          {loading
            ? Array.from({ length: 8 }, (_, index) => <Preview key={index} isProduct={false} isBookshelf={false} />)
            : items.length === 0 ? isCart ? <Message text={'سبد خرید شما خالی است!'} size={'large'} /> : <Message type={'error'} text={'اطلاعاتی برای نمایش یافت نشد!'} size={'medium'} />
              : items.map(product => {
                const isItemInCart = currentCartItems.some(item => item.id === product.id);
                const itemQuantity = currentCartItems.find(item => item.id === product.id)?.quantity || 0;

                return (
                  <div className={`products hover:rotate-3 transition dark:shadow-lg dark:shadow-zinc-700 shadow-2xl shadow-zinc-400 rounded-lg h-9/12 min-w-250 w-3/5 mx-auto sm:w-full ${isCart ? 'bg-white dark:bg-zinc-800' : ''}`} key={product.id} >
                    <h2 className='large font-medium text-center text-white bg-gray-500 py-2 rounded-t-lg'>{product.title}</h2>
                    <img src={product.image} className='h-40 mx-auto mt-2' alt='book-cover' />
                    <div className='details p-2 flex flex-col space-y-3'>
                      <div className='flex items-center'>
                        <FontAwesomeIcon className='ml-1 text-slate-600 dark:text-gray-300' icon={faUserEdit} />
                        <h4 className='medium'>نویسنده: {product.author}</h4>
                      </div>
                      <div className='flex items-center'>
                        <FontAwesomeIcon className='ml-1 text-slate-600 dark:text-gray-300' icon={faAddressBook} />
                        <h5 className='text-sm lg:text-lg md:text-base'>دسته‌بندی: {product.genre}</h5>
                      </div>
                      <div className='flex items-center'>
                        <FontAwesomeIcon className='ml-1 text-slate-600 dark:text-gray-300' icon={faStickyNote} />
                        <p className='smaller'>تعداد صفحات: {product.pages}</p>
                      </div>
                      <div className='flex items-center justify-between'>
                        <div className='flex justify-center items-center flex-wrap'>
                          <FontAwesomeIcon className='ml-1 text-slate-600 dark:text-gray-300' icon={faMoneyBill} />
                          <p className='smaller'>قیمت: {product.price} تومان</p>
                        </div>
                        {
                          isUserLoggedIn
                            ? isItemInCart
                              ? <div className='flex justify-center items-center'>
                                <button className='btn btn-circle hover:btn-primary focus:btn-primary w-7 h-7 ml-2' type='button' onClick={() => addOneItem(product)}>
                                  <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                </button>
                                <p>{itemQuantity}</p>
                                <button className='btn btn-circle hover:btn-error focus:btn-error w-7 h-7 mr-2' type='button' onClick={() => removeOneItem(product)}>
                                  <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                                </button>
                              </div>
                              : <button className='btn btn-circle btn-success w-8 h-8' type='button' onClick={() => addOneItem(product)}>
                                <FontAwesomeIcon className='mt-1' icon={faCartPlus}></FontAwesomeIcon>
                              </button>
                            : <NavLink className='btn btn-circle btn-success w-8 h-8 flex justify-center items-center' to='/sign-in'>
                              <FontAwesomeIcon className='mt-1' icon={faCartPlus}></FontAwesomeIcon>
                            </NavLink>
                        }
                      </div>
                      <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                          <FontAwesomeIcon className='ml-1 text-slate-600 dark:text-gray-300' icon={faCalendarTimes} />
                          <p className='smaller'>تاریخ انتشار: {product.publishedDate}</p>
                        </div>
                        {
                          isCart
                            ? <button className='btn btn-error font-semibold smaller' onClick={() => removeCartItem(product)}>{`حذف (${itemQuantity})`}</button>
                            : isProductList
                              ? <NavLink
                                to={`products/${product.id}`} state={{ previousPath: location.pathname }}
                                className='btn btn-primary small'
                                onClick={() => location.pathname ? encryption('A1DBD3FBC2B9D5AC', 'pp', location.pathname) : encryption('A1DBD3FBC2B9D5AC', 'pp', decryption('A1DBD3FBC2B9D5AC', 'pp'))}
                              >نمایش بیشتر</NavLink>
                              : <span
                                onClick={() => {
                                  navigate(`/products/${product.id}`, { state: { previousPath: location.pathname } });
                                  location.pathname ? encryption('A1DBD3FBC2B9D5AC', 'pp', location.pathname) : encryption('A1DBD3FBC2B9D5AC', 'pp', decryption('A1DBD3FBC2B9D5AC', 'pp'));
                                }}
                                className='btn btn-primary small cursor-pointer'
                              >نمایش بیشتر</span>
                        }
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </main>}
    </>
  );
}

export default ProductList;
