import React from 'react';


import classes from './Modal.module.scss'
import AuxHoc from "../../../Auxillary/AuxHoc";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {
    return (
        <AuxHoc>
            <Backdrop show={props.show} onBackdropClick={props.onBackdropClick}/>
            <div className={classes.Modal}
                style={{transform: props.show ? 'translate(0)' : 'translate(-2999px)'}}>{ props.children }</div>
        </AuxHoc>
    );
}

export default modal;