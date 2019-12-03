import React from 'react';
import classes from './Input.module.scss';

const input = (props) => {
    let inputElement;
    let inputClasses = [classes.Input];
    if (props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }
    switch (props.inputtype){
        case 'input':
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.onChangeHandler} onBlur={props.onBlurHandler}/>
            break;
        case 'textarea':
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} onChange={props.onChangeHandler}/>
            break;
        case 'select':
            inputElement = (
                <select className={inputClasses.join(' ')} value={props.elementConfig.value}  onChange={props.onChangeHandler}>
                    {
                        props.elementConfig.options.map(el => (
                            <option key={el.value} value={el.value}>{el.displayValue}</option>
                        ))
                    }
                </select>
                )
            break;
        default:
            inputElement = <input {...props.elementConfig} onChange={props.onChangeHandler}/>
    }

    return (
        <div>
            <label>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;