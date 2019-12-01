import React from 'react';
import { Route, Switch } from 'react-router-dom';

import classes from './App.module.scss';
// import Layout from "./components/Layout/Layout";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

function App() {
  return (
    <div className={classes.App}>
        <Toolbar />
        <main className={classes.Content}>
            <Switch>
                <Route path='/checkout'  component={ Checkout } />
                <Route path='/orders'  component={ Orders } />
                <Route path='/'  component={ BurgerBuilder } />
            </Switch>
        </main>
    </div>
  );
}

export default App;
