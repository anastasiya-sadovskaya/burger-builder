import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import classes from './Checkout.module.scss'
import Burger from "../../components/Burger/Burger";
import Button from "../../components/UI/Button/Button";
import ContactData from "./ContactData/ContactDataForm";

class Checkout extends Component{
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for( let i of query ){
            if(i[0] === 'price'){
                this.setState({price: i[1]})
            } else {
                ingredients[i[0]] = +i[1];
            }
        }
        this.setState({
            ingredients: ingredients
        })
    }

    cancelCheckout = () => {
        this.props.history.goBack();
    }

    confirmCheckout = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        return (
            <div className={classes.Checkout}>
                <h1>We hope you like!</h1>
                <Burger ingredients={this.state.ingredients}/>

                <Button type="Danger" onClickHandler={this.cancelCheckout}> Cancel </Button>
                <Button type="Success" onClickHandler={this.confirmCheckout}> Confirm </Button>

                <Route path={this.props.match.path + '/contact-data'} component={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />)} />
            </div>


        );
    }
}

export default Checkout;