import { Field, SelectField } from "@/components/custom/forms/Field";
import SubmitButton from "@/components/custom/forms/SubmitButton";

/**
 * Just the order fields. The enclosing <form> lives in the configurator so the
 * chosen colours can ride along as hidden inputs in the same submission.
 */
const OrderFields = () => (
  <div className="p-8">
    <h2 className="mb-4 text-2xl font-semibold">Place Order</h2>

    <Field
      required
      id="order-firstName"
      name="firstName"
      type="text"
      label="First Name"
      autoComplete="given-name"
    />
    <Field
      required
      id="order-lastName"
      name="lastName"
      type="text"
      label="Last Name"
      autoComplete="family-name"
    />
    <Field
      required
      id="order-email"
      name="email"
      type="email"
      label="Email Address"
      autoComplete="email"
    />
    <Field
      required
      id="order-street"
      name="street"
      type="text"
      label="Street"
      autoComplete="street-address"
    />
    <Field
      required
      id="order-postalCode"
      name="postalCode"
      type="text"
      inputMode="numeric"
      label="Postal Code"
      autoComplete="postal-code"
    />
    <SelectField required id="order-paymentType" name="paymentType" label="Payment Method" defaultValue="">
      <option value="">Select Payment Method</option>
      <option value="Visa">Visa</option>
      <option value="MasterCard">MasterCard</option>
    </SelectField>
    <Field
      required
      id="order-cardNumber"
      name="cardNumber"
      type="text"
      inputMode="numeric"
      label="Card Number"
      autoComplete="cc-number"
    />

    <SubmitButton pendingLabel="Placing order…" className="mt-2">
      Place Order
    </SubmitButton>
  </div>
);

export default OrderFields;
