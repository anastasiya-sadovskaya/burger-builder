import React from 'react';

import classes from './Backdrop.module.scss'
import AuxHoc from "../../../Auxillary/AuxHoc";

const backdrop = (props) => (
    props.show && <div className={classes.Backdrop} onClick={props.onBackdropClick}></div>
)

export default backdrop;