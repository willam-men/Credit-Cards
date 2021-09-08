import { useState } from 'react'
import Validation from '../Functions/Validation';

const useForm = () => {
    // values state that holds all details of a credit card
    const [values, setValues] = useState({
        cardName: '',
        cardNumber: '',
        cardExpiration: '',
        cardSecurityCode: '',
        focus: ''
    })

    // errors state that sends errors for each detail of a credit card
    const [errors, setErrors] = useState({})

    // focus effect to flip the card when editing details
    const handleFocus = e => {
        console.log(e);
        setValues({ 
            ...values,
            focus: (e.target.name === 'cardSecurityCode') ? 'cvc' : e.target.name
        });
    }

    // change effect to show real time input
    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    // submit effect to run validation function and show errors 
    const handleSubmit = e => {
        // if submit doesn't necessarily occur, don't run the default 
        // actions of validation, which are set to 'false'
        e.preventDefault()
        setErrors(Validation(values))
    };
    
    // return all effects and states with the custom useForm hook
    return { handleChange, handleFocus, handleSubmit, values, errors };
};

export default useForm; 
