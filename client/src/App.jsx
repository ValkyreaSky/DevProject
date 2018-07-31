import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Aux from 'components/hoc/Aux/Aux';
import ScrollToTop from 'components/hoc/ScrollToTop/ScrollToTop';
import PrivateRoute from 'components/hoc/PrivateRoute/PrivateRoute';
import Navigation from 'components/Navigation/Navigation';
import Footer from 'components/Footer/Footer';
import Dashboard from 'components/Dashboard/Dashboard';
import Profile from 'components/Profile/Profile';
import Post from 'components/Post/Post';
import Developers from 'components/Developers/Developers';
import Feed from 'components/Feed/Feed';
import Landing from 'components/Landing/Landing';
import EditProfileForm from 'components/forms/EditProfileForm/EditProfileForm';
import AddExperienceForm from 'components/forms/AddExperienceForm/AddExperienceForm';
import AddEducationForm from 'components/forms/AddEducationForm/AddEducationForm';
import store from 'store/configureStore';
import setAuthToken from 'utils/setAuthToken';
import { setCurrentUser } from 'store/actions/auth';
import { asyncGetProfile } from 'store/actions/profile';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(asyncGetProfile());
}

const App = () => (
  <Provider store={store}>
    <BrowserRouter basename={process.env.NODE_ENV === 'development' ? '/' : '/app'}>
      <ScrollToTop>
        <Aux>
          {/* For Homepage (/) render Landing component */}
          <Route exact path="/" component={Landing} />
          {/* and for rest URL use Navigation (1) and Switch (2) */}
          <Route
            exact
            path="/(.+)"
            render={() => (
              <Aux>
                <Navigation />{/* 1 */}
                <div className="container">
                  <Switch>{/* 2 */}
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/developers" component={Developers} />
                    <PrivateRoute exact path="/feed" component={Feed} />
                    <PrivateRoute exact path="/profile/:handle" component={Profile} />
                    <PrivateRoute exact path="/post/:postId" component={Post} />
                    <PrivateRoute exact path="/edit-profile" render={() => <EditProfileForm loadProfile formName="Edit Profile" />} />
                    <PrivateRoute exact path="/add-experience" component={AddExperienceForm} />
                    <PrivateRoute exact path="/add-education" component={AddEducationForm} />
                    <Redirect to="/dashboard" />
                  </Switch>
                  <Footer />
                </div>
              </Aux>
            )}
          />
        </Aux>
      </ScrollToTop>
    </BrowserRouter>
  </Provider>
);

export default App;
