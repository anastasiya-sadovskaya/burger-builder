import React from 'react';
import Aux from './../../../Auxillary/AuxHoc'
import Button from "../../UI/Button/Button";

const orderSummery = (props) => {
    const ingredientsSummery = Object.keys(props.ingredients).map(ingKey => {
        return <li key={ingKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}
                </li>
    })
    return(
        <Aux>
            <h3>Your order</h3>
            <p>Burger with</p>
            <ul>
                {ingredientsSummery}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}$</strong></p>
            <p>Continue to Checkout?</p>
            <Button type='Danger' onClickHandler={props.onCancelHandler}>CANCEL</Button>
            <Button type='Success' onClickHandler={props.onContinueHandler}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummery;