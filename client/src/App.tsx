import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root, LoginRoot } from './routes/Route';
import Main from './pages/Main/Main';
import User from './pages/User/User';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import AccountRecovery from './pages/AccountRecovery/AccountRecovery';
import Upload from './pages/Upload/Upload';
import TagSearch from './pages/Search/Search';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Detail from './pages/Detail/Detail';
import ItemStore from './context/ItemContext';
import React from 'react';
import SearchStore from './context/SearchContext';
import PageNumStore from './context/PageNumContext';

const AppProvider = ({
  contexts,
  children,
}: {
  contexts: any[];
  children: React.ReactNode;
}) =>
  contexts.reduce(
    (prev, context) =>
      React.createElement(context, {
        children: prev,
      }),
    children,
  );

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { path: '/', element: <Main /> },
        {
          path: '/users',
          element: <User />,
        },
        {
          path: '/users/:userId',
          element: <User />,
        },
        {
          path: '/upload',
          element: <Upload />,
        },
        {
          path: '/detail/:id',
          element: <Detail />,
        },
        {
          path: '/tags/:search',
          element: <TagSearch />,
        },
        {
          path: '/*',
          element: <ErrorPage />,
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

  return (
    <AppProvider contexts={[ItemStore, SearchStore, PageNumStore]}>
      <RouterProvider router={router}></RouterProvider>
    </AppProvider>
  );
}

export default App;
