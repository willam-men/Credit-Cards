import "./InfoForm.css";

// Custom hook used to handle real time input
import useForm from "../Hooks/useForm";

// React Bootstrap import to easily format info form
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// React Credit Cards import to easily display credit card overlay
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const InfoForm = () => {

    // Custom hook used to handle real time input, focusing, and validation
    const { handleChange, handleFocus, handleSubmit, values, errors } = useForm();
    return (
            <div className="FormBackground">
                <div className="FormContainer">
                    <div className="CreditCard">
                        <Cards
                            // feed through all details of credit card from 
                            // the use form hook
                            cvc={values.cardSecurityCode}
                            expiry={values.cardExpiration}
                            focused={values.focus}
                            name={values.cardName}
                            number={values.cardNumber}
                        />
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            Owner
                            <Form.Control
                                type="text"
                                id="cardName"
                                name="cardName"
                                placeholder="Owner"
                                value={values.cardName}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                isValid={errors.cname}
                            />
                        </Form.Group>
                        <Form.Group>
                            Card Number
                            <Form.Control
                                type="number"
                                id="cardNumber"
                                name="cardNumber"
                                placeholder="Card Number"
                                value={values.cardNumber}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                isValid={errors.cnumber}
                            />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group>
                                    Expiration
                                    <Form.Control
                                        type="text"
                                        id="cardExpiration"
                                        name="cardExpiration"
                                        placeholder="Expiration Date"
                                        value={values.cardExpiration}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        isValid={errors.cexp}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    Security Code
                                    <Form.Control
                                        type="number"
                                        id="cardSecurityCode"
                                        name="cardSecurityCode"
                                        placeholder="Security Code"
                                        value={values.cardSecurityCode}
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        isValid={errors.ccvv}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button
                            className="Submit"
                            size={"block"}
                            id="validateButton"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Form>
                    <Alert
                        id="alertMessage"
                        variant={errors.variant}
                        show={errors.show}
                    >
                        {errors.message}
                    </Alert>{" "}
                </div>
            </div>
    );
};

export default InfoForm;