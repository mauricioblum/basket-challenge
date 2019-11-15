import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductList from './pages/ProductList';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ProductList} />
    </Switch>
  );
}
