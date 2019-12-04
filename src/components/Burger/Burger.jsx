import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredient from "./BurgerIngridients/BurgerIngredient";

import classes from './Burger.module.scss'
import { connect } from 'react-redux';

const burger = (props) => {
    let ingredientsArr = Object.keys(props.ingredients).map( igKey => {
        return [ ...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if(!ingredientsArr.length){
        ingredientsArr = <p>Start adding your ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {ingredientsArr}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}

// burger.PropTypes = {
//
// };

export default connect(mapStateToProps)(burger);