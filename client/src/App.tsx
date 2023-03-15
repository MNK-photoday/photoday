import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root, LoginRoot } from './routes/Route';
import Main from './pages/Main/Main';
import User from './pages/User/User';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import AccountRecovery from './pages/AccountRecovery/AccountRecovery';
import Upload from './pages/Upload/Upload';

function App() {
  const router = createBrowserRouter([
    {
      path: '/', // Header, Footer가 있는 페이지
      element: <Root />, // 템플릿
      children: [
        { path: '/', element: <Main /> },
        {
          path: '/users',
          element: <User />,
        },
        {
          path: '/upload',
          element: <Upload />,
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
