import './Cart.scss';
import { useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import Message from '../../components/Message/Message';
import Modal from '../../components/Modal/Modal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { useFetch } from '../../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash, faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import cartBackground from '../../assets/images/cart-background.png';
import cartOrder from '../../assets/images/purchase.gif';
import { useNavigate } from 'react-router-dom';
import { blurActions } from '../../store/blur-slice';
import { useRef } from 'react';
import JDate from 'jalali-date';

function Cart({ isBlur }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const purchaseBtn = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentCartItems = useSelector(state => state.cart.cartItems);
  const totalQuantity = currentCartItems?.map(item => item?.quantity);
  const totalPrice = currentCartItems?.map(item => Number(item?.price?.replace(',', '')) * item?.quantity);
  const currentUserId = useSelector(state => state.currentUser.id);
  const { data: currentUserData } = useFetch(currentUserId ? `http://localhost:5001/users/${currentUserId}` : '', 'GET');
  const { saveInfo, error } = useFetch(currentUserId ? `http://localhost:5001/users/${currentUserId}` : '', 'PUT');

  const finalPrice = totalPrice?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const convertPriceFormat = result => String(result).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const gotoBookshelf = () => {
    navigate('/bookshelf');
    dispatch(blurActions.blurOut());
  };

  // Create persian formatted date value
  const currentDate = new JDate();
  const [year, month, day] = currentDate.date;
  const formattedDate = `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;

  // After user successfully purchased the products
  const purchase = () => {
    saveInfo({
      ...currentUserData,
      cartItems: [
        ...currentUserData.cartItems,
        {
          id: currentUserData.cartItems?.length > 0 ? currentUserData.cartItems?.length + 1 : 1,
          totalPrice: finalPrice,
          purchaseDate: formattedDate,
          items: currentCartItems
        }
      ]
    });

    setLoading(true);
    purchaseBtn.current.disabled = true;

    if (!error) {
      setTimeout(() => {
        dispatch(cartActions.removeAll());
        setShowModal(true);
        setLoading(false);
      }, 2000);
    }
  };

  const modalChildren = (
    <main className='flex flex-col justify-center items-center space-y-3'>
      <img className='w-48 h-48 sm:w-80 sm:h-80' src={cartOrder} alt="success-purchase" />
      <button
        className={`btn small block mx-auto text-gray-700 focus:ring-0 focus:ring-offset-0 ${isHovered ? 'hovered' : ''}`}
        onClick={gotoBookshelf}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {`${isHovered ? 'برو به ' : ''}`}قفسه کتاب‌ها
        <FontAwesomeIcon className='mr-2 mt-1 text-gray-700 goto-shelf-icon opacity-0 transition-opacity duration-300' icon={faHandPointLeft} />
      </button>
      <div className="success-purchase-message">
        <Message type={'success'} text={'خرید شما با موفقیت انجام شد!'} size={'small'} />
      </div>
    </main>
  );

  return (
    <section className='mt-3 main'>
      {error && <Message type={'error'} text={'خرید شما با موفقیت انجام نشد!'} size={'small'} />}
      {showModal && <Modal modalTitle={'خرید موفق!'} showModal={showModal} setShowModal={setShowModal} children={<div>{modalChildren}</div>} />}
      <div className={`relative flex justify-center items-start ${isBlur ? 'blur-sm' : 'blur-none'}`}>
        <img src={cartBackground} alt='cart-shop-img' className={`opacity-80 w-800 -z-10 absolute hidden md:block ${currentCartItems?.length > 0 ? 'h-700' : 'h-600'}`} />
      </div>
      {currentCartItems?.length > 0 && <button
        type='button'
        className={`btn btn-error medium block mx-auto mb-6 ${isBlur ? 'blur-sm' : 'blur-none'}`}
        onClick={() => dispatch(cartActions.removeAll())}
      >
        {`حذف همه (${totalQuantity?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}) `}
        <FontAwesomeIcon icon={faTrash} />
      </button>}
      <ProductList isProducts={false} products={currentCartItems} isBlur={isBlur} isCart={true} />
      {currentCartItems?.length > 0 && <button
        ref={purchaseBtn}
        type='button'
        className={`btn btn-success medium ${purchaseBtn?.current?.disabled ? 'opacity-60 cursor-not-allowed' : 'opacity-100 cursor-pointer'} ${!loading ? 'block w-auto' : 'flex justify-center items-center w-32'}  mx-auto mt-6 ${isBlur ? 'blur-sm' : 'blur-none'}`}
        onClick={purchase}
      >
        {loading && <svg className="spinner" viewBox="0 0 50 50">
          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        </svg>}
        {!loading && `خرید نهایی (${totalQuantity?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}) `}
        {!loading && <br />}
        {!loading && `${convertPriceFormat(finalPrice)} تومان`}
        {!loading && <FontAwesomeIcon className='mr-2' icon={faShoppingCart} />}
      </button>}
      <img src={cartBackground} alt={'cart-shop-img'} className={`opacity-80 block md:hidden mx-auto ${isBlur ? 'blur-sm' : 'blur-none'} ${currentCartItems?.length > 0 ? '' : 'absolute top-40'}`} />
    </section>
  );
}

export default Cart;
