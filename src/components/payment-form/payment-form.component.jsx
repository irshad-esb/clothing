import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
// import './payment-form-styles'
import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form-styles";


const PaymentForm = () => {

  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();
  }

  return (
    <PaymentFormContainer>
      <FormContainer>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} > Pay Now</Button>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm