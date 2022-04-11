import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
// import './payment-form-styles'
import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form-styles";


const PaymentForm = () => {

  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: 1000 })
    }).then((res) => res.json())

    const { paymentIntent: { client_secret } } = response;
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'irshad chauhan'
        }
      }
    });
    if (paymentResult.error) {
      alert("payment failed");
      console.log(paymentResult.error)
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("success")
      }
    }

  }

  return (
    <PaymentFormContainer>
      <FormContainer onClick={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} > Pay Now</Button>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm