import valid from "card-validator";

export default function Validation(values) {
    // errors dict
    let errors = {};

    // credit card object using the valid package
    let creditCard = valid.number(values.cardNumber);

    // filling out details of the credit card object
    creditCard.expirationDate = valid.expirationDate(values.cardExpiration);
    creditCard.cvv = valid.cvv(values.cardSecurityCode);
    creditCard.cardholderName = valid.cardholderName(values.cardName);

    // default errors
    errors.show = true;
    errors.variant = "danger";
    errors.message = "An unknown error occured. Please try again later"
    errors.cname = false;
    errors.cnumber = false;
    errors.cexp = false;
    errors.ccvv = false;

    // series of if else statements to handle errors for each detail

    // CVV
    if (!values.cardSecurityCode) {
        errors.message = "Credit card CVC is required";
    } else if (creditCard.cvv.isValid) {
        errors.ccvv = true;
    } else {
        errors.message = "Credit card CVC is invalid";
    }

    // Expiration
    if (!values.cardExpiration) {
        errors.message = "Credit card expiration date is required";
    } else if (creditCard.expirationDate.isValid) {
        errors.cexp = true;
    } else {
        errors.message = "Credit card expiration date is invalid";
    }

    // Card Number
    if (!values.cardNumber) {
        errors.message = "Credit card number is required";
    } else if (values.cardNumber.toString().length !== 16) {
        errors.message = "Credit card number needs to be 16 digits";
    } else if (values.cardNumber || creditCard.isValid) {
        errors.cnumber = true;
    } else {
        errors.message = "Credit card number is invalid";
    }

    // Owner Name
    if (!values.cardName) {
        errors.message = "Owner name is required";
    } else if (creditCard.cardholderName.isValid) {
        errors.cname = true;
    } else {
        errors.message = "Cardholder name is invalid";
    }

    // After every detail is valid
    if ( errors.cname && errors.cnumber && errors.cexp && errors.ccvv) {
        errors.variant = "success";
        errors.message = "Credit Card is valid";
    }

    return errors;
}