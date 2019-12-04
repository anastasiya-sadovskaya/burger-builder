import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        meat: 0,
        salad: 0,
        cheese: 0,
        bacon: 0
    },
    totalPrice: 4,
};

const INGREDIENTS_PRICE = {
    meat: 1.2,
    cheese: 0.7,
    salad: 0.5,
    bacon: 0.4
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            };

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            };
        default: return state;
    }
};

export default reducer;