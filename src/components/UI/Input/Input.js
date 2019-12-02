import React from 'react';

const input = (props) => {
    let inputElement;
    switch (props.inputtype){
        case 'input':
            inputElement = <input {...props.elementConfig} onChange={props.onChangeHandler}/>
            break;
        case 'textarea':
            inputElement = <textarea {...props.elementConfig} onChange={props.onChangeHandler}/>
            break;
        case 'select':
            inputElement = (
                <select value={props.elementConfig.value}  onChange={props.onChangeHandler}>
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