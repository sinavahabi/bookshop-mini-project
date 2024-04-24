import './Cart.scss';
import ProductList from '../../components/ProductList/ProductList';
import { useSelector } from 'react-redux';

function Cart({ isBlur }) {
  const currentCartItems = useSelector(state => state.cart.cartItems);

  return (
    <section className='mt-3'>
      <ProductList isProducts={false} products={currentCartItems} isBlur={isBlur} isCart={true} />
    </section>
  );
}

export default Cart;
