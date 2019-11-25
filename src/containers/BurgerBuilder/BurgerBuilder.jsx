import React , { Component } from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummery from "../../components/Burger/OrderSummery/OrderSummery";


class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 2,
            bacon: 1
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    INGREDIENTS_PRISE = {
        meat: 1.2,
        cheese: 0.7,
        salad: 0.5,
        bacon: 0.4
    }

    addIngredient = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const updatedPrice = this.state.totalPrice + this.INGREDIENTS_PRISE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice,
        });
        this.updatePurchaseState();
    }

    removeIngredient = (type) => {
        if(this.state.ingredients[type] <= 0){
            return;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] - 1 || 0;
        const updatedPrice = this.state.totalPrice - this.INGREDIENTS_PRISE[type] || 0;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice,
        });
        this.updatePurchaseState();
    }

    updatePurchaseState(){
        const sum = Object.keys(this.state.ingredients).map( key => {
            return this.state.ingredients[key];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchasable: !sum})
    }

    onOrderBtnClick = () => {
        this.setState({purchasing: true})
    }

    onBackdropClick = () => {
        this.setState({purchasing: false})
    }

    acceptPurchase = () => {
        alert('Continue')
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

        const purchasable = Object.keys(this.state.ingredients).map( key => {
            return this.state.ingredients[key];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0)


        return (
            <div>
                <Modal show={this.state.purchasing}
                       onBackdropClick={this.onBackdropClick}>
                    <OrderSummery
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice}
                        onContinueHandler={this.acceptPurchase}
                        onCancelHandler={this.cancelPurchase}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    totalPrice={this.state.totalPrice}
                    purchasable={purchasable}
                    disabledControls={disabledControls}
                    onAddClick={this.addIngredient}
                    onRemoveClick={this.removeIngredient}
                    onOrderBtnClick={this.onOrderBtnClick}/>

            </div>
        );
    }
}

export default BurgerBuilder;