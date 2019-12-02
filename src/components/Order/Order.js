import React from 'react';

import classes from './Order.module.scss'

const order = (props) => {
    let ingredients = [];
    for ( let ing in props.ingredients){
        ingredients.push(<span className={classes.Ingredient}>{ing} ({props.ingredients[ing]}), </span>)
    }

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: USD {props.price.toFixed(2)}</p>
        </div>
    )

};

export default order;
