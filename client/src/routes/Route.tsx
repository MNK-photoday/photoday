import { GlobalStyle } from '../styles/GlobalStyles';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';

export function Root() {
  const { pathname } = useLocation();
  return (
    <>
      <GlobalStyle />
      <Header activeSearchBar={pathname !== '/'} />
      <Outlet />
      <Footer />
    </>
  );
}

export function LoginRoot() {
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
}
