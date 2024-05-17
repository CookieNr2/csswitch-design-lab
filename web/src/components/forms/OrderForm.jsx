import { useForm } from "react-hook-form";

function OrderForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-self-center">
          <div className="card shadow-lg border-0 mt-5">
            <div className="card-body p-5">
              <h1 className="text-light mb-3">Place Order</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label
                    htmlFor="firstName"
                    className="form-label text-white-50"
                  >
                    First Name
                  </label>
                  <input
                    required
                    id="firstName"
                    type="text"
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    } bg-transparent border-0 rounded-0`}
                    {...register("firstName")}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="lastName"
                    className="form-label text-white-50"
                  >
                    Last Name
                  </label>
                  <input
                    required
                    id="lastName"
                    type="text"
                    className={`form-control ${
                      errors.lastName ? "is-invalid" : ""
                    } bg-transparent border-0 rounded-0`}
                    {...register("lastName")}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white-50">
                    Email Address
                  </label>
                  <input
                    required
                    id="email"
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    } bg-transparent border-0 rounded-0`}
                    {...register("email")}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="street" className="form-label text-white-50">
                    Street
                  </label>
                  <input
                    id="street"
                    type="text"
                    className="form-control bg-transparent border-0 rounded-0"
                    {...register("location.street")}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="postalCode"
                    className="form-label text-white-50"
                  >
                    Postal Code
                  </label>
                  <input
                    id="postalCode"
                    type="number"
                    className="form-control bg-transparent border-0 rounded-0"
                    {...register("location.postalCode")}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="paymentType"
                    className="form-label text-white-50"
                  >
                    Payment Method
                  </label>
                  <select
                    required
                    id="paymentType"
                    className={`form-control bg-transparent border-0 rounded-0 ${
                      errors.paymentType ? "is-invalid" : ""
                    }`}
                    {...register("paymentMethod.type")}
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Visa">Visa</option>
                    <option value="MasterCard">MasterCard</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="cardNumber"
                    className="form-label text-white-50"
                  >
                    Card Number
                  </label>
                  <input
                    required
                    id="cardNumber"
                    type="text"
                    className={`form-control ${
                      errors.cardNumber ? "is-invalid" : ""
                    } bg-transparent border-0 rounded-0`}
                    {...register("paymentMethod.cardNumber")}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg rounded-0 my-3"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
