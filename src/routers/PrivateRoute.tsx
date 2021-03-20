import React from 'react';
import { Route, Redirect } from 'react-router-dom';
interface PrivateRouteProps {
  component: any;
  exact: boolean;
  path: String;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, exact, path, ...rest } = props;
  let currentUser = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  );
};

export default PrivateRoute;
