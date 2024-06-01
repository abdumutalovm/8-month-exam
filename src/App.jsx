import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './redux/store';
import Home from './pages/Home';
import Musics from './pages/Musics';
import Favourites from './pages/Favourites';
import Search from './pages/Search';
import ErrorPage from './pages/ErrorPage';
import Layout from './layout/Layout';
import { getToken } from './components/Utils';
import { create } from './redux/authSlice';
import './font.css';
import './index.css'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const tokenData = await getToken();
        if (tokenData) {
          dispatch(create({
            token: tokenData.token,
            date: tokenData.date,
          }));
        }
      } catch (error) {
        console.error('Failed to fetch token', error);
      }
    };
    fetchToken();
  }, [dispatch]);

  return (
    <>

      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/playlist/:id"
          element={
            <Layout>
              <Musics />
            </Layout>
          }
        />
        <Route
          path="/favourites"
          element={
            <Layout>
              <Favourites />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <div className='text-white'>1</div>
    </>
  );
};

const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default WrappedApp;
