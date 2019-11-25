import React from 'react';

import classes from './NavigationItem.module.scss'

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <a
            href={props.link}
            className={props.active && classes.active}>{ props.children }</a>
    </li>
);

export default navigationItem;