import React, { useContext } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import { privateRoutes, publicRoutes } from "../router";
import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />
  }

  return (
    isAuth
      ? <Routes>
        <Route path="/" element={ <Posts /> } />
        <Route path="/login" element={ <Posts /> } />
        { privateRoutes.map(route =>
          <Route
            key={ route.path }
            element={ route.element }
            path={ route.path }
            exact={ route.exact }
          />
        ) }
        <Route path="*" element={ <Error /> } />
      </Routes>
      : <Routes>
        { publicRoutes.map(route =>
          <Route
            key={ route.path }
            element={ route.element }
            path={ route.path } exact={ route.exact }
          />
        ) }
        <Route path="*" element={ <Navigate replace to="/login" /> } />
      </Routes>
  );
};

export default AppRouter;