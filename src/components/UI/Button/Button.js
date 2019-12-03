import React from 'react';

import classes from './Button.module.scss'

const button = (props) => (
    <button
        className={[classes.Button, classes[props.type]].join(' ')}
        onClick={props.onClickHandler}
        disabled={props.disabled}>
        {props.children}
    </button>
)

export default button;