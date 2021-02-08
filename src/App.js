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
    if(!localStorage.greeted) {
      store.dispatch(setAlert({
        msg: 'Tervetuloa nettikamuun! Sivusto on upouusi, eikä täällä valitettavasti ole montaa ilmoitusta, mutta lähetä rohkeasti oma ilmoitus, niin teen parhaani, että muut näkevät sen :) Sivuston käyttö on ilmaista',
        type: 'Info',
        timeout: 10000
      }));
      localStorage.setItem('greeted', true);
    }
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });

    handleThemeSelection();
    if (!document.querySelector('script[data-ad-client]')) {
      const scriptElement = document.createElement('script');
      scriptElement.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      scriptElement.setAttribute('data-ad-client', 'ca-pub-8064636821608705');
      document.body.appendChild(scriptElement);
    }
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
