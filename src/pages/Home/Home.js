import './Home.scss';
import ProductList from '../../components/ProductList/ProductList';
import { useFetch } from '../../hooks/useFetch';

function Home({ isBlur }) {
  // Fetch the data using custom hook called "useFetch"
  const { data: products, loading, error } = useFetch('http://localhost:5000/products', 'GET');

  return (
    <ProductList isProducts={true} products={products} loading={loading} error={error} isBlur={isBlur} isCart={false} />
  );
}

export default Home;
