import './Filters.scss';
import ProductList from '../../components/ProductList/ProductList';
import Message from '../../components/Message/Message';
import { useFetch } from '../../hooks/useFetch';

function Filters({ isBlur, filterType }) {
  // Fetch the data using custom hook called "useFetch"
  const { data: filteredProducts, loading, error } = useFetch(`http://localhost:5000/products?q=${filterType}`);

  return (
    <>
      <Message type={'primary'} text={`دسته بندی: "${filterType}"`} />
      <ProductList isProducts={false} products={filteredProducts} loading={loading} error={error} isBlur={isBlur} />
    </>
  );
}

export default Filters;
