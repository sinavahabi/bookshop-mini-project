import './Filters.scss';
import ProductList from '../../components/ProductList/ProductList';
import Message from '../../components/Message/Message';
import { NavLink } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { decryption } from '../../token/token';
import Pagination from '../../components/Pagination/Pagination';
import { useState } from 'react';

function Filters({ isBlur, filterType }) {
  // Define how many products should be displayed on one page
  const pageLimit = 8;
  // Current page number state
  const [pageNum, setPageNum] = useState(1);

  // Fetch the data using custom hook called "useFetch"
  const { data: filteredProducts, loading, error } = useFetch(`http://localhost:5000/products?q=${filterType || decryption('1E633C454A2C5BD6', 'sf')}`, 'GET');

  return (
    <main>
      <Message type={'primary'} text={`دسته بندی: "${filterType || decryption('1E633C454A2C5BD6', 'sf')}"`} size={'large'} />
      {filterType || decryption('1E633C454A2C5BD6', 'sf')
        ? <section>
          <ProductList isProducts={false} products={filteredProducts} loading={loading} error={error} isBlur={isBlur} isCart={false} />
          <Pagination totalCount={filteredProducts?.length} limit={pageLimit} pageNum={pageNum} setPageNum={setPageNum} isBlur={isBlur} />
        </section>
        : <div className='main flex flex-col justify-center items-center space-y-4'>
          <p className='medium text-red-400'>دسته بندی مورد نظر خود را وارد کنید!</p>
          <NavLink to='/' className='btn btn-dark medium hover:bg-slate-600 focus:ring-slate-800 order-3 md:order-3'>بازگشت به خانه</NavLink>
        </div>
      }
    </main>
  );
}

export default Filters;
