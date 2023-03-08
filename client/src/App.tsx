// import GlobalStyle from './Styles/GlobalStyles';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root, LoginRoot } from './routes/Route';
import Main from './pages/Main/Main';
import MyPage from './pages/MyPage/MyPage';
import Login from './pages/Login/Login';

function App() {
  const router = createBrowserRouter([
    {
      path: '/', // Header, Footer가 있는 페이지
      element: <Root />, // 템플릿
      children: [
        { path: '/', element: <Main /> },
        // { element: <Main /> },
        {
          path: '/mypage',
          element: <MyPage />,
        },
      ],
    },
    {
      path: '/login',
      element: <LoginRoot />,
      children: [{ path: '/login', element: <Login /> }],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
