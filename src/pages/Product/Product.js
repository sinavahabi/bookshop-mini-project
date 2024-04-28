import './Product.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit, faAddressBook, faMoneyBill, faStickyNote, faCalendarTimes, faPen, faArrowRight, faArrowLeft, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import Preview from '../../components/Preview/Preview';
import Error from '../../components/Error/Error';

function Product({ isBlur }) {
  const { productId } = useParams();
  const { data: product, loading, error } = useFetch(`http://localhost:5000/products/${productId}`, 'GET');
  const { data: products } = useFetch('http://localhost:5000/products', 'GET');
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* Show 'Error' component if an error occurred during API requests */}
      {error && <Error message={error} />}
      {!error && <main className={`main flex flex-col justify-center items-center ${isBlur ? 'blur-sm' : 'blur-none'}`}>
        {/* Show 'Preview' component for the time products are loading */}
        {loading
          ? <Preview isProduct={true} />
          : <div className='product shadow-2xl shadow-zinc-400 rounded-lg min-h-max sm:min-h-400 md:min-h-500 lg:min-h-600 min-w-250 w-3/5 mx-auto' >
            <h2 className='larger font-medium text-center text-white bg-gray-500 py-2 rounded-t-lg'>{product.title}</h2>
            <img src={`http://localhost:3000/${product.image}`} className='h-48 md:h-64 lg:h-80 mx-auto mt-2' alt='book-cover' />
            <div className='details p-2 flex flex-col space-y-3 '>
              <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                  <FontAwesomeIcon className='ml-1 text-slate-600' icon={faUserEdit} />
                  <h4 className='large'>نویسنده: {product.author}</h4>
                </div>
                <button type='button' className='btn btn-dark hover:bg-slate-500 focus:ring-0 focus:ring-offset-0 small w-1/6' onClick={() => navigate(-1)}>
                  بازگشت<FontAwesomeIcon icon={faAngleDoubleLeft} className='mr-2' />
                </button>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon className='ml-1 text-slate-600' icon={faAddressBook} />
                <h5 className='text-md lg:text-xl md:text-lg'>دسته‌بندی: {product.genre}</h5>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon className='ml-1 text-slate-600' icon={faStickyNote} />
                <p className='small'>تعداد صفحات: {product.pages}</p>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon className='ml-1 text-slate-600' icon={faMoneyBill} />
                <p className='small'>قیمت: {product.price} تومان</p>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon className='ml-1 text-slate-600' icon={faCalendarTimes} />
                <p className='small'>تاریخ انتشار: {product.publishedDate}</p>
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon className='ml-1 text-slate-600' icon={faPen} />
                <p className='small'>درباره کتاب: {product.about}</p>
              </div>
              <div className="navigation-buttons flex justify-between items-center flex-wrap">
                <button
                  disabled={Number(productId) === 1 ? true : false}
                  className={`btn hover:bg-slate-500 hover:text-white btn-circle w-8 h-8 medium ${Number(productId) === 1 ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
                  onClick={() => navigate(`${location.pathname.match(/\/(.*?)\//g)}${Number(productId) - 1}`)}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <button
                  className='btn btn-success medium w-1/4'
                >خرید</button>
                <button
                  disabled={Number(productId) === products?.length ? true : false}
                  className={`btn hover:bg-slate-500 hover:text-white btn-circle w-8 h-8 medium ${Number(productId) === products?.length ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
                  onClick={() => navigate(`${location.pathname.match(/\/(.*?)\//g)}${Number(productId) + 1}`)}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
              </div>
            </div>
          </div>}
      </main>}
    </>
  );
}

export default Product;
