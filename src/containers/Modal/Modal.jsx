import React, { Component } from 'react';


import classes from './Modal.module.scss'
import AuxHoc from "../../hoc/AuxHoc";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

class Modal extends Component{
    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    componentWillUpdate(){
        console.log('[Modal] Updating...')
    }

    render(){
        return (
            <AuxHoc>
                <Backdrop show={this.props.show} onBackdropClick={this.props.onBackdropClick}/>
                <div className={classes.Modal}
                     style={{transform: this.props.show ? 'translate(0)' : 'translate(-2999px)'}}>{ this.props.children }</div>
            </AuxHoc>
        );
    }

}

export default Modal;