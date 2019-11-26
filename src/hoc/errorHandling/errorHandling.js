import React, { Component } from 'react';
import AuxHoc from "../AuxHoc";
import Modal from "../../containers/Modal/Modal";



const errorHandling = (WrappedComponent, axios) =>{
    return class extends Component{
        state = {
            error: null
        }
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null});
                return req;
            })

            this.respInterceptor = axios.interceptors.response.use(res => res, er => {this.setState({error: er})})
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterceptor);
        }

        confirmError = () => {
            this.setState({error: null})
        }

        render(){
            return (
                <AuxHoc>
                    <Modal show={this.state.error} onBackdropClick={this.confirmError}>
                        {this.state.error && this.state.error.message}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </AuxHoc>
            )
        }
    }
}

export default errorHandling;