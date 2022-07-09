import {FormContainer, PaymentButton, PaymentFormContainer} from "./payment-form.styles";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {useSelector} from "react-redux";
import {cartTotalSelector} from "../../store/cart/cart.selectors";
import {currentUserDisplayNameSelector} from "../../store/user/user.selectors";
import {useState} from "react";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const totalAmountInCents = useSelector(cartTotalSelector) * 100;
    const currentUserDisplayName = useSelector(currentUserDisplayNameSelector);

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        try {
            setIsProcessingPayment(true);
            const response = await fetch('/.netlify/functions/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: totalAmountInCents
                })
            }).then(res => res.json());

            if (response) {
                const client_secret = response.paymentIntent.client_secret;
                const paymentResult = await stripe.confirmCardPayment(client_secret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: currentUserDisplayName
                        }
                    }
                });

                setIsProcessingPayment(false);
                if (paymentResult.error) {
                    alert(paymentResult.error)
                } else {
                    if (paymentResult.paymentIntent.status === 'succeeded') {
                        alert('Payment Successful');
                    }
                }
            }
        }
        catch (e) {
            setIsProcessingPayment(false);
            alert(`Payment failed. ${e.message}`);
        }
    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <PaymentButton buttonType={BUTTON_TYPE_CLASSES.inverted} isLoading={isProcessingPayment}> Pay Now </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
}

export default PaymentForm;
