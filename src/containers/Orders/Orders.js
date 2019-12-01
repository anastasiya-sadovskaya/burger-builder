import React, { Component } from 'react';
import Order from "../../components/Order/Order";

import instance from '../../axios-orders'
import errorHandling from "../../hoc/errorHandling/errorHandling";

class Orders extends Component{
    state = {
        orders: [],
        error: false
    }

    componentDidMount(){
        instance.get('/orders.json')
            .then(res => {
                let orders = [];
                for ( let key in res.data ){
                    orders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({orders: orders})

            })
            .catch(er => {this.setState({error: true})})
    }

    render(){
        return ( this.state.error
                    ? <p> Some Error</p>
                    : <div>
                        {this.state.orders.length
                            ? this.state.orders.map(order => (
                                <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
                            ))
                            : <p>There is no orders yet</p>
                        }
                      </div>
        )
    }
};

export default errorHandling(Orders, instance);