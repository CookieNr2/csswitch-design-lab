import SubmitButton from "@/components/ui/SubmitButton";

/**
 * Just the order fields. The enclosing <form> lives in the configurator so the
 * chosen colours can ride along as hidden inputs in the same submission.
 */
const OrderFields = () => (
  <div className="card-body p-5">
    <h1 className="text-light mb-3">Place Order</h1>

    <div className="mb-3">
      <label htmlFor="order-firstName" className="form-label text-white-50">
        First Name
      </label>
      <input
        required
        id="order-firstName"
        name="firstName"
        type="text"
        autoComplete="given-name"
        className="form-control bg-transparent border-0 rounded-0"
      />
    </div>

    <div className="mb-3">
      <label htmlFor="order-lastName" className="form-label text-white-50">
        Last Name
      </label>
      <input
        required
        id="order-lastName"
        name="lastName"
        type="text"
        autoComplete="family-name"
        className="form-control bg-transparent border-0 rounded-0"
      />
    </div>

    <div className="mb-3">
      <label htmlFor="order-email" className="form-label text-white-50">
        Email Address
      </label>
      <input
        required
        id="order-email"
        name="email"
        type="email"
        autoComplete="email"
        className="form-control bg-transparent border-0 rounded-0"
      />
    </div>

    <div className="mb-3">
      <label htmlFor="order-street" className="form-label text-white-50">
        Street
      </label>
      <input
        required
        id="order-street"
        name="street"
        type="text"
        autoComplete="street-address"
        className="form-control bg-transparent border-0 rounded-0"
      />
    </div>

    <div className="mb-3">
      <label htmlFor="order-postalCode" className="form-label text-white-50">
        Postal Code
      </label>
      <input
        required
        id="order-postalCode"
        name="postalCode"
        type="text"
        inputMode="numeric"
        autoComplete="postal-code"
        className="form-control bg-transparent border-0 rounded-0"
      />
    </div>

    <div className="mb-3">
      <label htmlFor="order-paymentType" className="form-label text-white-50">
        Payment Method
      </label>
      <select
        required
        id="order-paymentType"
        name="paymentType"
        defaultValue=""
        className="form-control bg-transparent border-0 rounded-0"
      >
        <option value="">Select Payment Method</option>
        <option value="Visa">Visa</option>
        <option value="MasterCard">MasterCard</option>
      </select>
    </div>

    <div className="mb-3">
      <label htmlFor="order-cardNumber" className="form-label text-white-50">
        Card Number
      </label>
      <input
        required
        id="order-cardNumber"
        name="cardNumber"
        type="text"
        inputMode="numeric"
        autoComplete="cc-number"
        className="form-control bg-transparent border-0 rounded-0"
      />
    </div>

    <SubmitButton pendingLabel="Placing order…">Place Order</SubmitButton>
  </div>
);

export default OrderFields;
