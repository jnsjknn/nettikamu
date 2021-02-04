import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/routing/Routes';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

import { LOGOUT } from './actions/types';
import setAuthToken from './utils/setAuthToken';
import handleThemeSelection from './utils/handleThemeSelection';

import AlertContainer from './components/UI/Alerts/AlertContainer';
import Navbar from './components/UI/Navbar/Navbar';
import Footer from './components/UI/Footer/Footer';

const App = () => {
  useEffect(() => {
    const token = localStorage.token;
    if (token) {
      setAuthToken(token);
    }
    store.dispatch(loadUser(true));

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });

    handleThemeSelection();
  });

  return (
    <Provider store={store}>
      <AlertContainer />
      <Router>
        <Navbar />
        <div
          style={{
            minHeight: 'calc(100vh - var(--footer-height))',
            position: 'relative'
          }}
        >
          <Routes />
        </div>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
