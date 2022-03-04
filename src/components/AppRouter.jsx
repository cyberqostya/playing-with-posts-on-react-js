import { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router/routes';
import { AuthContext } from '../context';
import MyLoader from './UI/loader/MyLoader';

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);

  if(isLoading) {
    return <MyLoader/>;
  }

  return (
    isAuth 
      ?
      <Routes>
        {privateRoutes.map(route =>
          <Route 
            key={route.path}
            path={route.path} 
            element={route.element}
          />
        )}
        <Route path="/" element={<Navigate replace to="/posts" />}/>
        <Route path="/login" element={<Navigate replace to="/posts" />}/>
        <Route path="*" element={<Navigate replace to="/error" />}/>
      </Routes>
      :
      <Routes>
        {publicRoutes.map(route =>
          <Route 
            key={route.path}
            path={route.path} 
            element={route.element}
          />
        )}
        <Route path="*" element={<Navigate replace to="/login" />}/>
      </Routes>
  );
}

export default AppRouter;