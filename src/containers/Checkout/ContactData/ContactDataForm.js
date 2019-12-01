import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from "../../../components/UI/Button/Button";

import instance from '../../../axios-orders'
import Spinner from "../../../components/UI/Spinner/Spinner";
import errorHandling from "../../../hoc/errorHandling/errorHandling";


class ContactData extends Component {
    state = {
        customer: {
            name: '',
            email: '',
            address: {
                street: '',
                building: ''
            }
        },
        loading: false,
        error: false

    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true})

        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.customer,
            price: this.props.price
        }
        instance.post('/orders.json', order)
            .then(resp => {
                this.setState({ loading: false });
                this.props.history.push('/');
                return resp;
            })
            .catch(er => {this.setState({ loading: false, error: true })});
    }

    render(){
        return (
            <div>
                {
                    this.state.error ? <h1>Server Error</h1>
                        : this.state.loading
                            ? <Spinner />
                            : <form name='contact-data'>
                                <input name='name' type='text' value={this.state.name} placeholder="Your Name"/>
                                <input name='email' type='email' value={this.state.email} placeholder="Your Email"/>
                                <input name='street' type='text' value={this.state.street} placeholder="Street"/>
                                <input name='building' type='text' value={this.state.building} placeholder="Building"/>
                                <Button type='Success' onClickHandler={this.orderHandler} > Order </Button>
                            </form>

                }

            </div>
        )
    }
}


export default errorHandling(ContactData, instance);