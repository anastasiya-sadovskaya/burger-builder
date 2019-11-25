import React from 'react';
import classes from './App.module.scss';
// import Layout from "./components/Layout/Layout";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

function App() {
  return (
    <div className={classes.App}>
        <Toolbar />
        <main className={classes.Content}>
            <BurgerBuilder />
        </main>
    </div>
  );
}

export default App;
