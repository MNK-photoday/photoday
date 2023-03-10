import { GlobalStyle } from '../styles/GlobalStyles';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';

export function Root() {
  return (
    <>
      <GlobalStyle />
      <Header />
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
