import React from 'react';
import Layout from './Components/Layout';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './Components/Home';

const Routes = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={ Home } />
        </Switch>
      </Layout>
    </Router>
  );
};

export default Routes;