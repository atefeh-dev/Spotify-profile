/** @format */

import React, { useState, useEffect } from 'react';
import Profile from '../Components/Profile';
import LoginScreen from '../Components/LoginScreen';
import { getAccessToken } from '../Apis/Spotify';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    getAccessToken().then((token) => setAccessToken(token || null));
  }, []);

  return (
    <div className='App'>{accessToken ? <Profile /> : <LoginScreen />}</div>
  );
};
export default App;

/*return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route path="/info">
            <LoginScreen />
          </Route>
          <Route path="*">
            <div style={{ color: "white" }}>404 not found</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;




 <Router>
        <Switch>
          <Route path="/login" exact>
          </Route>
        </Switch>
      </Router>
 accessToken ? <Profile /> : <LoginScreen />;
 return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <ProtectedRoute path="/info">
            <Profile />
          </ProtectedRoute>
          <Route exact path="/">
            <Redirect exact from="/" to="info" />
          </Route>
          <Route path="*">
            <Redirect from="/" to="info" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
    <ProtectedRoute
            isAuthenticated={token}
            path="/info"
            component={Profile}
          />
          <Route exact path="/">
            <Redirect exact from="*" to="info" />
          </Route>
          <Route path="*">
            <Redirect from="*" to="info" />
          </Route>
                 {accessToken ? <Profile /> : <LoginScreen />} */
