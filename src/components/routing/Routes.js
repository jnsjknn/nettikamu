import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import pathnames from '../../assets/data/pathnames';
import Spinner from '../UI/Spinner/Spinner';
/*
import Index from '../pages/Index/Index';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import Verify from '../pages/Verify/Verify';
import Profile from '../pages/Profile/Profile';
import Post from '../pages/Post/Post';
import CreatePost from '../pages/CreatePost/CreatePost';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import CookiePolicy from '../pages/CookiePolicy/CookiePolicy';
import ReportIssue from '../pages/ReportIssue/ReportIssue';
*/
import Index from '../pages/Index/Index';
const Register = React.lazy(() => import('../pages/Register/Register'));
const Login = React.lazy(() => import('../pages/Login/Login'));
const ResetPassword = React.lazy(() =>
  import('../pages/ResetPassword/ResetPassword')
);
const Verify = React.lazy(() => import('../pages/Verify/Verify'));
const Profile = React.lazy(() => import('../pages/Profile/Profile'));
const Post = React.lazy(() => import('../pages/Post/Post'));
const CreatePost = React.lazy(() => import('../pages/CreatePost/CreatePost'));
const PrivacyPolicy = React.lazy(() =>
  import('../pages/PrivacyPolicy/PrivacyPolicy')
);
const CookiePolicy = React.lazy(() =>
  import('../pages/CookiePolicy/CookiePolicy')
);
const Contact = React.lazy(() => import('../pages/Contact/Contact'));

const Routes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path={pathnames.INDEX} component={Index} />
        <Route exact path={pathnames.REGISTER} component={Register} />
        <Route
          exact
          path={pathnames.REGISTER_W_USERNAME}
          component={Register}
        />
        <Route exact path={pathnames.LOGIN} component={Login} />
        <Route
          exact
          path={pathnames.RESET_PASSWORD}
          component={ResetPassword}
        />
        <Route
          exact
          path={pathnames.PRIVACY_POLICY}
          component={PrivacyPolicy}
        />
        <Route exact path={pathnames.COOKIE_POLICY} component={CookiePolicy} />
        <Route exact path={pathnames.CONTACT} component={Contact} />

        <PrivateRoute exact path={pathnames.VERIFY} component={Verify} />
        <PrivateRoute exact path={pathnames.PROFILE} component={Profile} />
        <PrivateRoute exact path={pathnames.POST} component={Post} />
        <PrivateRoute exact path={pathnames.NEW_POST} component={CreatePost} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
