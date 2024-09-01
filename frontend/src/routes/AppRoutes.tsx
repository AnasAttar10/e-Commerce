import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
// layouts
const MainLayout = lazy(() => import('@layouts/MainLayout/MainLayout'));
//pages
const Home = lazy(() => import('@pages/Home/Home'));
const Products = lazy(() => import('@pages/Products/Products'));
const Categories = lazy(() => import('@pages/Categories/Categories'));
const AboutUs = lazy(() => import('@pages/AboutUs/AboutUs'));
const Login = lazy(() => import('@pages/Login/Login'));
const Register = lazy(() => import('@pages/Register/Register'));
const Cart = lazy(() => import('@pages/Cart/Cart'));
const Wishlist = lazy(() => import('@pages/Wishlist/Wishlist'));
import Error from '@pages/Error/Error';
// component
import MySuspense from '@components/feedback/MySuspense/MySuspense';
import MainSuspense from '@components/feedback/MainSuspense/MainSuspense';
import ProtectedRoutes from '@components/Auth/ProtectedRoutes';
import Order from '@pages/Order/Order';
import { ProfileLayout } from '@layouts/index';
import Profile from '@pages/Profile/Profile';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainSuspense>
        <MainLayout />
      </MainSuspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <MySuspense>
            <Home />
          </MySuspense>
        ),
      },
      {
        path: '/wishlist',
        element: (
          <ProtectedRoutes>
            <MySuspense>
              <Wishlist />
            </MySuspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: '/cart',
        element: (
          <ProtectedRoutes>
            <MySuspense>
              <Cart />
            </MySuspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'categories/products/:prefix',
        element: (
          <ProtectedRoutes>
            <MySuspense>
              <Products />
            </MySuspense>
          </ProtectedRoutes>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== 'string' ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response('Bad Request', {
              statusText: 'Category not found ',
              status: 400,
            });
          }

          return true;
        },
      },
      {
        path: 'categories',
        element: (
          <ProtectedRoutes>
            <MySuspense>
              <Categories />
            </MySuspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'about-us',
        element: (
          <ProtectedRoutes>
            <MySuspense>
              <AboutUs />
            </MySuspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: 'login',
        element: (
          <MySuspense>
            <Login />
          </MySuspense>
        ),
      },
      {
        path: 'register',
        element: (
          <MySuspense>
            <Register />
          </MySuspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <MySuspense>
            <ProfileLayout />
          </MySuspense>
        ),
        children: [
          { index: true, element: <Profile /> },
          {
            path: 'orders',
            element: <Order />,
          },
        ],
      },
      {
        path: 'orders',
        element: (
          <MySuspense>
            <Order />
          </MySuspense>
        ),
      },
    ],
  },
]);
const AppRoutes = () => {
  return <RouterProvider router={routes}></RouterProvider>;
};

export default AppRoutes;
