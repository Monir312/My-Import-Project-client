import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Loading from '../pages/Loading';

const PrivateRoute = ({children}) => {

  const { user, loading } = useContext(AuthContext);
  // console.log(user);
  const location = useLocation();
  // console.log(location);

  if(loading){
    return <Loading></Loading>;
  }

  if(user && user?.email) {
    return children;
  }
  
  return <Navigate state={location.pathname} to='/auth/login'></Navigate>


};

export default PrivateRoute;