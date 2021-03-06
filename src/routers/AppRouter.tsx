import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RepoDetails from '../pages/RepoDetails';

const Dashboard = React.lazy(
  () => import(/* webpackChunkName: "chunk-dashboard" */ '../pages/HomePage')
);

const UserDetails = React.lazy(
  () => import(/* webpackChunkName: "chunk-dashboard" */ '../pages/UserDetails')
);

const PageNotFound = React.lazy(
  () =>
    import(/* webpackChunkName: "chunk-dashboard" */ '../pages/PageNotFound')
);

function AppRouter() {
  return (
    <React.Suspense fallback={<span></span>}>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/users/:id" component={UserDetails} />
          <Route exact path="/repo/:name/:id" component={RepoDetails} />
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </React.Suspense>
  );
}

export default AppRouter;
