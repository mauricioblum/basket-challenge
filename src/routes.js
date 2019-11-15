import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProductList from './pages/ProductList';
import BasketCheckout from './pages/BasketCheckout';
import ConfirmCheckout from './pages/ConfirmCheckout';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ProductList} />
      <Route exact path="/checkout" component={BasketCheckout} />
      <Route exact path="/confirm" component={ConfirmCheckout} />
    </Switch>
  );
}
