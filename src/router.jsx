import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './layouts/Main';
import { useSelector } from 'react-redux';
import {
  CreatePost,
  Home,
  Login,
  MyPosts,
  Register,
  UpdatePost,
} from './pages';
import GuardedRoute from './GuardadRoute';
import { UpdateUser } from './pages/user/UpdateUser';

export default function Routes() {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />

        <Route>
          <Main>
            <Switch>
              <Route path='/' exact component={Home} />
              <GuardedRoute
                path='/my-posts'
                component={MyPosts}
                auth={auth ? true : false}
              />

              <GuardedRoute
                path='/create-post'
                exact
                component={CreatePost}
                auth={auth ? true : false}
              />
              <GuardedRoute
                path='/update-post/:id'
                exact
                component={UpdatePost}
                auth={auth ? true : false}
              />
              <GuardedRoute
                path='/update-user'
                exact
                component={UpdateUser}
                auth={auth ? true : false}
              />
            </Switch>
          </Main>
        </Route>
      </Switch>
    </Router>
  );
}
