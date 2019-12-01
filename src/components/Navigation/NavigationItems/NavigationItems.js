import React from 'react';

import classes from './NavigationItems.module.scss'
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link='/' active> Constructor </NavigationItem>
        <NavigationItem exact link='/orders'> My Orders </NavigationItem>
        {/*<NavigationItem link='/checkout'> Checkout </NavigationItem>*/}
    </ul>
);

export default navigationItems;