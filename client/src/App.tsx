import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root, LoginRoot } from './routes/Route';
import Main from './pages/Main/Main';
import MyPage from './pages/MyPage/MyPage';
import Login from './components/Login/Login/Login';
import Signup from './components/Login/Signup/Signup';
import AccountRecovery from './components/Login/AccountRecovery/AccountRecovery';

function App() {
  const router = createBrowserRouter([
    {
      path: '/', // Header, Footer가 있는 페이지
      element: <Root />, // 템플릿
      children: [
        { path: '/', element: <Main /> },
        {
          path: '/mypage',
          element: <MyPage />,
        },
      ],
    },
    {
      element: <LoginRoot />,
      children: [
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <Signup /> },
        { path: '/account-recovery', element: <AccountRecovery /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
