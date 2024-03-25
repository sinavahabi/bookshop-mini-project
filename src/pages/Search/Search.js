import './Search.scss';
import ProductList from '../../components/ProductList/ProductList';
import { useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

function Search({ isBlur }) {
  // Create and set query
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q');

  // Fetch the data using custom hook called "useFetch"
  const { data: searchedProducts, loading, error } = useFetch(`http://localhost:5000/products?q=${query}`, 'GET');

  return (
    <>
      <h3 className='large'>نتایج جستجو برای: "{query}"</h3>
      <ProductList isProducts={false} products={searchedProducts} loading={loading} error={error} isBlur={isBlur} />
    </>
  );
}

export default Search;
