import './Filters.scss';
import ProductList from '../../components/ProductList/ProductList';
import Message from '../../components/Message/Message';
import { NavLink } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

function Filters({ isBlur, filterType }) {
  // Fetch the data using custom hook called "useFetch"
  const { data: filteredProducts, loading, error } = useFetch(`http://localhost:5000/products?q=${filterType}`);

  return (
    <>
      <Message type={'primary'} text={`دسته بندی: "${filterType}"`} size={'large'} />
      {filterType
        ? <ProductList isProducts={false} products={filteredProducts} loading={loading} error={error} isBlur={isBlur} />
        : <div className='main flex flex-col justify-center items-center space-y-4'>
          <p className='medium text-red-400'>دسته بندی مورد نظر خود را وارد کنید!</p>
          <NavLink to='/' className='btn btn-dark medium hover:bg-slate-600 focus:ring-slate-800 order-3 md:order-3'>بازگشت به خانه</NavLink>
        </div>
      }
    </>
  );
}

export default Filters;
