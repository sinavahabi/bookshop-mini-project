import './Home.scss';
import ProductList from '../../components/ProductList/ProductList';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function Home() {
  return (
    <>
      <Header />
      <ProductList />
      <Footer />
    </>
  );
}

export default Home;
