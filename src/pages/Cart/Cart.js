import './Cart.scss';
import ProductList from '../../components/ProductList/ProductList';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import cartBackground from '../../assets/images/cart-background.png'

function Cart({ isBlur }) {
  const dispatch = useDispatch();
  const currentCartItems = useSelector(state => state.cart.cartItems);
  const totalQuantity = currentCartItems?.map(item => item?.quantity);

  console.log(currentCartItems);

  return (
    <section className='mt-3 main'>
      <div className={`relative flex justify-center items-start ${isBlur ? 'blur-sm' : 'blur-none'}`}>
        <img src={cartBackground} alt='cart-shop-img' className={`opacity-80 w-800 -z-10 absolute hidden md:block ${currentCartItems?.length > 0 ? 'h-700' : 'h-600'}`} />
      </div>
      {currentCartItems?.length > 0 && <button type='button' className={`btn btn-error medium block mx-auto mb-6 ${isBlur ? 'blur-sm' : 'blur-none'}`} onClick={() => dispatch(cartActions.removeAll())}>
        {`حذف همه (${totalQuantity?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}) `}
        <FontAwesomeIcon icon={faTrash} />
      </button>}
      <ProductList isProducts={false} products={currentCartItems} isBlur={isBlur} isCart={true} />
      {currentCartItems?.length > 0 && <button type='button' className={`btn btn-success medium block mx-auto mt-6 ${isBlur ? 'blur-sm' : 'blur-none'}`} onClick={() => window.alert('درحال انقال به درگاه هستید...')}>
        {`خرید نهایی (${totalQuantity?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}) `}
        <FontAwesomeIcon icon={faShoppingCart} />
      </button>}
      <img src={cartBackground} alt={'cart-shop-img'} className={`opacity-80 block md:hidden mx-auto ${isBlur ? 'blur-sm' : 'blur-none'} ${currentCartItems?.length > 0 ? '' : 'absolute top-40'}`} />
    </section>
  );
}

export default Cart;
