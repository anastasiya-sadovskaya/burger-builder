import React from 'react';

import classes from './NavigationItems.module.scss'
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' > Tab 1 </NavigationItem>
        <NavigationItem link='/' active> Tab 2 </NavigationItem>
    </ul>
);

export default navigationItems;