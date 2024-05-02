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
import { useNavigate } from 'react-router-dom';

function Cart({ isBlur }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const currentCartItems = useSelector(state => state.cart.cartItems);
  const totalQuantity = currentCartItems?.map(item => item?.quantity);
  const totalPrice = currentCartItems?.map(item => Number(item?.price?.replace(',', '')) * item?.quantity);
  const currentUserId = useSelector(state => state.currentUser.id);
  const { data: currentUserData } = useFetch(currentUserId ? `http://localhost:5001/users/${currentUserId}` : '', 'GET');
  const { saveInfo } = useFetch(currentUserId ? `http://localhost:5001/users/${currentUserId}` : '', 'PUT');

  // After user successfully purchased the products
  const purchase = () => {
    window.alert('درحال انقال به درگاه هستید...');

    saveInfo({
      ...currentUserData,
      cartItems: [...currentUserData.cartItems, currentCartItems]
    });

    dispatch(cartActions.removeAll());
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
    }, 10000);
  };

  const finalPrice = totalPrice?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const convertPriceFormat = result => String(result).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <section className='mt-3 main'>
      {/* {showModal && <Modal closeBtn={true} children={<div>Test</div>} />} */}
      <div className={`relative flex justify-center items-start ${isBlur ? 'blur-sm' : 'blur-none'}`}>
        <img src={cartBackground} alt='cart-shop-img' className={`opacity-80 w-800 -z-10 absolute hidden md:block ${currentCartItems?.length > 0 ? 'h-700' : 'h-600'}`} />
      </div>
      {currentCartItems?.length > 0 && <button type='button' className={`btn btn-error medium block mx-auto mb-6 ${isBlur ? 'blur-sm' : 'blur-none'}`} onClick={() => dispatch(cartActions.removeAll())}>
        {`حذف همه (${totalQuantity?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}) `}
        <FontAwesomeIcon icon={faTrash} />
      </button>}
      <ProductList isProducts={false} products={currentCartItems} isBlur={isBlur} isCart={true} />
      {currentCartItems?.length > 0 && <button type='button' className={`btn btn-success medium block mx-auto mt-6 ${isBlur ? 'blur-sm' : 'blur-none'}`} onClick={purchase}>
        {`خرید نهایی (${totalQuantity?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}) `}
        <br />
        {`${convertPriceFormat(finalPrice)} تومان`}
        <FontAwesomeIcon className='mr-2' icon={faShoppingCart} />
      </button>}
      <img src={cartBackground} alt={'cart-shop-img'} className={`opacity-80 block md:hidden mx-auto ${isBlur ? 'blur-sm' : 'blur-none'} ${currentCartItems?.length > 0 ? '' : 'absolute top-40'}`} />
      {
        showModal &&
        <>
          <button className='btn btn-dark medium block mt-5 mx-auto hover:bg-slate-500 focus:ring-0 focus:ring-offset-0' onClick={() => navigate('/bookshelf')}>
            قفسه کتاب‌ها
            <FontAwesomeIcon className='mr-2' icon={faHandPointLeft} />
          </button>
          <div className="success-purchase-message">
            <Message type={'success'} text={'خرید شما با موفقیت انجام شد!'} size={'large'} />
          </div>
        </>
      }
    </section>
  );
}

export default Cart;
