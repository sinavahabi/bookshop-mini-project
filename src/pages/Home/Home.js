import './Home.scss';
import ProductList from '../../components/ProductList/ProductList';
import { useFetch } from '../../hooks/useFetch';
import Pagination from '../../components/Pagination/Pagination';
import { useState } from 'react';

function Home({ isBlur }) {
  // Define how many products should be displayed on one page
  const pageLimit = 8;
  // Current page number state
  const [pageNum, setPageNum] = useState(1);

  // Fetch the data using custom hook called "useFetch"
  const { data: products, loading, error } = useFetch('http://localhost:5000/products', 'GET');

  return (
    <section>
      <ProductList isProducts={true} products={products} loading={loading} error={error} isBlur={isBlur} isCart={false} page={pageNum} limit={pageLimit} />
      <Pagination totalCount={products?.length} limit={pageLimit} pageNum={pageNum} setPageNum={setPageNum} />
    </section>
  );
}

export default Home;
