import './Search.scss';
import ProductList from '../../components/ProductList/ProductList';
import { useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import Pagination from '../../components/Pagination/Pagination';
import { useState } from 'react';

function Search({ isBlur }) {
  // Create and set query
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q');

  // Define how many products should be displayed on one page
  const pageLimit = 8;
  // Current page number state
  const [pageNum, setPageNum] = useState(1);

  // Fetch the data using custom hook called "useFetch"
  const { data, loading, error } = useFetch(`http://localhost:5000/products`, 'GET');

  const searchedProducts = data.filter(product => {
    // Search queries will only happen between following properties
    const { genre, author, title } = product;
    const normalizedQuery = query.toLowerCase().trim();

    return (
      genre.toLowerCase().includes(normalizedQuery) || author.toLowerCase().includes(normalizedQuery) || title.toLowerCase().includes(normalizedQuery)
    );
  });

  return (
    <section>
      <h3 className='large'>نتایج جستجو برای: "{query}"</h3>
      <br />
      <ProductList isProducts={false} products={searchedProducts} loading={loading} error={error} isBlur={isBlur} isCart={false} />
      <Pagination totalCount={searchedProducts?.length} limit={pageLimit} pageNum={pageNum} setPageNum={setPageNum} />
    </section>
  );
}

export default Search;
