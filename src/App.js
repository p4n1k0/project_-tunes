import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/search" component={Search} />
        <Route path="/album/:id" component={Album} />
        <Route path="/favorites" render={(props) => (<Favorites {...props} />)} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/profile/edit" render={(props) => (<ProfileEdit {...props} />)} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default App;
