import React , { Component } from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../Modal/Modal";
import OrderSummery from "../../components/Burger/OrderSummery/OrderSummery";

import instance from '../../axios-orders'
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandling from "../../hoc/errorHandling/errorHandling";
import AuxHoc from "../../hoc/AuxHoc";
import Button from "../../components/UI/Button/Button";


class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    INGREDIENTS_PRICE = {
        meat: 1.2,
        cheese: 0.7,
        salad: 0.5,
        bacon: 0.4
    }

    componentDidMount(){
        this.fetchData();
    }

    fetchData = () => {
        instance
            .get('/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data})
            })
            .catch(er => {
                this.setState({error: true})
            })
    }

    addIngredient = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const updatedPrice = this.state.totalPrice + this.INGREDIENTS_PRICE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice,
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredient = (type) => {
        if(this.state.ingredients[type] <= 0){
            return;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] - 1 || 0;
        const updatedPrice = this.state.totalPrice - this.INGREDIENTS_PRICE[type] || 0;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice,
        });
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState(ings){
        const sum = Object.keys(ings).map( key => {
            return ings[key];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchasable: sum > 0})
    }

    onOrderBtnClick = () => {
        this.setState({purchasing: true})
    }

    onBackdropClick = () => {
        this.setState({purchasing: false})
    }

    acceptPurchase = () => {
        this.setState({loading: true})

        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customer: {
                name: 'Nastya',
                address: 'Kuprevicha 3V',
                phoneNumber: '1234567'
            }
        }
        instance.post('/orders.json', order).then(resp => this.setState({ purchasing: false, loading: false })).catch(er => console.log(er));
    }

    cancelPurchase = () => {
        this.setState({purchasing: false});
    }

    render(){
        const disabledControls = {
            ...this.state.ingredients
        };

        for (let key in disabledControls){
            disabledControls[key] = this.state.ingredients[key] <= 0;
        }

        let burger = this.state.error ? (
            <AuxHoc>
                <p>Server Error. Please reload the page</p>
                <Button type='Danger' onClickHandler={this.fetchData}>Reload</Button>
            </AuxHoc>
            )
                                        :<Spinner/>;

        if( this.state.ingredients ){
            burger = <AuxHoc>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls
                            totalPrice={this.state.totalPrice}
                            purchasable={this.state.purchasable}
                            disabledControls={disabledControls}
                            onAddClick={this.addIngredient}
                            onRemoveClick={this.removeIngredient}
                            onOrderBtnClick={this.onOrderBtnClick}/>
                    </AuxHoc>
        }

        return (
            <div>
                <Modal show={this.state.purchasing}
                       onBackdropClick={this.onBackdropClick}>
                    {this.state.loading || !this.state.ingredients ? <Spinner/>
                        : <OrderSummery
                            ingredients={this.state.ingredients}
                            totalPrice={this.state.totalPrice}
                            onContinueHandler={this.acceptPurchase}
                            onCancelHandler={this.cancelPurchase}/>
                    }
                </Modal>
                { burger }
            </div>
        );
    }
}

export default errorHandling(BurgerBuilder, instance);