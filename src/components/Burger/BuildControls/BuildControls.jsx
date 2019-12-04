import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.scss'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' }
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Cost: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {
                controls.map( el => (
                    <BuildControl
                        key={el.type}
                        type={el.type}
                        label={el.label}
                        added={() => props.onAddClick(el.type)}
                        removed={() => props.onRemoveClick(el.type)}
                        disabled={props.disabledControls[el.type]}/>
                ))
            }
            <button
                disabled={!props.purchasable}
                onClick={props.onOrderBtnClick}
                className={classes.OrderButton}>ORDER NOW</button>
        </div>
    )
}

export default buildControls;