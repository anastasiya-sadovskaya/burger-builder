import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from "../../../components/UI/Button/Button";

import instance from '../../../axios-orders'
import Spinner from "../../../components/UI/Spinner/Spinner";
import errorHandling from "../../../hoc/errorHandling/errorHandling";
import Input from "../../../components/UI/Input/Input";


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                    value: ''
                },
                validationRules: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email',
                    value: ''
                },
                validationRules: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                    value: ''
                },
                validationRules: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false
            },
            building: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Building',
                    value: ''
                },
                validationRules: {
                    required: true
                },
                valid: true,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ],
                    value: 'fastest'
                }
            },
        },
        formValid: false,
        loading: false,
        error: false

    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const formData = {};

        for ( let inputEl in this.state.orderForm){
            formData[inputEl] = this.state.orderForm[inputEl].elementConfig.value;
        }

        const order = {
            ingredients: this.props.ingredients,
            formData: formData,
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

    validate = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.trim().length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.trim().length <= rules.minLength && isValid;
        }

        return isValid;
    }

    onInputChange = (event, input) => {
        const updatedOrderForm = {
            ...this.state.orderForm,
            [input]: {
                ...this.state.orderForm[input],
                touched: true,
                elementConfig: {
                    ...this.state.orderForm[input].elementConfig ,
                    value: event.target.value
                },
                valid: this.state.orderForm[input].validationRules ?this.validate(event.target.value, this.state.orderForm[input].validationRules) :true
            }
        }

        let formIsValid = true;
        for ( let i in updatedOrderForm){
            formIsValid = updatedOrderForm[i].valid && formIsValid;
        }


        // const updatedOrderForm = {
        //     ...this.state.orderForm
        // };

        // const updatedElement = {
        //     ...updatedOrderForm[input]
        // };
        //
        // const updatedElementConfig = {
        //     ...updatedElement.elementConfig
        // }
        //
        // updatedElementConfig.value = event.target.value;

        // updatedElement.elementConfig = updatedElementConfig;
        // this.validate(updatedElementConfig.value, updatedElement.validationRules )
        // updatedOrderForm[input] = updatedElement;
        this.setState({
            orderForm: updatedOrderForm,
            formValid: formIsValid
        })
    }

    onInputBlur = (event, input) => {
        const updatedOrderForm = {
            ...this.state.orderForm,
            [input]: {
                ...this.state.orderForm[input],
                touched: true,}
        };
        this.setState({
            orderForm: updatedOrderForm
        })
    }


    render(){
        const inputElements = [];
        for ( let key in this.state.orderForm){
            inputElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        return (
            <div>
                {
                    this.state.error ? <h1>Server Error</h1>
                        : this.state.loading
                            ? <Spinner />
                            : <form name='contact-data'>
                                {
                                    inputElements.map(el => (
                                        <Input
                                            key={el.id}
                                            inputtype={el.config.elementType}
                                            elementConfig={el.config.elementConfig}
                                            onChangeHandler={(event) => this.onInputChange(event, el.id)}
                                            invalid={!el.config.valid}
                                            shouldValidate={el.config.validationRules}
                                            touched={el.config.touched}
                                            onBlurHandler={e => this.onInputBlur(e, el.id)}
                                        />
                                    ))
                                }


                                <Button type='Success' disabled={!this.state.formValid} onClickHandler={this.orderHandler} > Order </Button>
                            </form>
                }

            </div>
        )
    }
}

export default errorHandling(ContactData, instance);