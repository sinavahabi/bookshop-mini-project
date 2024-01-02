import './SharedLayout.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SharedLayout() {
  const isBlur = useSelector(state => state.blur.isBlur);

  return (
    <>
      <Header />
      <Outlet />
      <Footer isBlur={isBlur} />
    </>
  );
}

export default SharedLayout;
