import React , { Component } from 'react';
import {connect} from 'react-redux';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../Modal/Modal";
import OrderSummery from "../../components/Burger/OrderSummery/OrderSummery";

import instance from '../../axios-orders'
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandling from "../../hoc/errorHandling/errorHandling";
import AuxHoc from "../../hoc/AuxHoc";
import Button from "../../components/UI/Button/Button";
import {withRouter} from "react-router-dom";
import * as actionTypes from '../../store/actions'


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount(){
        // this.fetchData();
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

    // addIngredient = (type) => {
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = this.state.ingredients[type] + 1;
    //     const updatedPrice = this.state.totalPrice + this.INGREDIENTS_PRICE[type];
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: updatedPrice,
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredient = (type) => {
    //     if(this.state.ingredients[type] <= 0){
    //         return;
    //     }
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = this.state.ingredients[type] - 1 || 0;
    //     const updatedPrice = this.state.totalPrice - this.INGREDIENTS_PRICE[type] || 0;
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: updatedPrice,
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    updatePurchaseState(){
        const sum = Object.keys(this.props.ingredients).map( key => {
            return this.props.ingredients[key];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

    onOrderBtnClick = () => {
        this.setState({purchasing: true})
    }

    onBackdropClick = () => {
        this.setState({purchasing: false})
    }

    acceptPurchase = () => {
        this.props.history.push('/checkout');
    }

    cancelPurchase = () => {
        this.setState({purchasing: false});
    }

    render(){
        console.log(this.props.ingredients)
        const disabledControls = {
            ...this.props.ingredients
        };

        for (let key in disabledControls){
            disabledControls[key] = this.props.ingredients[key] <= 0;
        }

        let burger = this.state.error
            ? (
                <AuxHoc>
                    <p>Server Error. Please reload the page</p>
                    <Button type='Danger' onClickHandler={this.fetchData}>Reload</Button>
                </AuxHoc>
            )
            :<Spinner/>;

        if( this.props.ingredients ){
            burger = <AuxHoc>
                        <Burger ingredients={this.props.ingredients} />
                        <BuildControls
                            totalPrice={this.props.totalPrice}
                            purchasable={this.updatePurchaseState()}
                            disabledControls={disabledControls}
                            onAddClick={this.props.onIngredientAdd}
                            onRemoveClick={this.props.onIngredientRemove}
                            onOrderBtnClick={this.onOrderBtnClick}/>
                    </AuxHoc>
        }

        return (
            <div>
                <Modal show={this.state.purchasing}
                       onBackdropClick={this.onBackdropClick}>
                    {this.state.loading || !this.props.ingredients ? <Spinner/>
                        : <OrderSummery
                            ingredients={this.props.ingredients}
                            totalPrice={this.props.totalPrice}
                            onContinueHandler={this.acceptPurchase}
                            onCancelHandler={this.cancelPurchase}/>
                    }
                </Modal>
                { burger }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => (
    {
        onIngredientAdd: (ingredientName) => { dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName})},
        onIngredientRemove: (ingredientName) => { dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName})}
    }
)

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(errorHandling(BurgerBuilder, instance));
