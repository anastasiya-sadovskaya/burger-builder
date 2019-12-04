import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import classes from './Checkout.module.scss'
import Burger from "../../components/Burger/Burger";
import Button from "../../components/UI/Button/Button";
import ContactData from "./ContactData/ContactDataForm";

class Checkout extends Component{
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
                <Burger/>

                <Button type="Danger" onClickHandler={this.cancelCheckout}> Cancel </Button>
                <Button type="Success" onClickHandler={this.confirmCheckout}> Confirm </Button>

                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>


        );
    }
}

export default Checkout;