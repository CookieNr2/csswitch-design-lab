import { useEffect, useState } from "react";
import UserNavbar from "../../components/ui/user-navbar/UserNavbar";
import Modal from "../../components/ui/modal/Modal";
import { useForm } from "react-hook-form";
import { updateUser, deleteUser } from "../../services/api.services";
import { useAuth } from "../../contexts/auth.context";
import { useAlert } from "../../contexts/alert.context";

function UpdateUserData() {
  const { user, doLogout } = useAuth();
  const { showAlert } = useAlert();

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      showAlert("Your account has been deleted successfully.");
      doLogout();
    } catch (error) {
      showAlert("Error deleting account. Please try again later.");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    console.log(user);
    if (user) {
      setValue("firstName", user?.firstName);
      setValue("lastName", user?.lastName);
      setValue("street", user?.location?.street);
      setValue("postalCode", user?.location?.postalCode);
      setValue("paymentMethodType", user?.paymentMethod?.type);
      setValue("cardNumber", user?.paymentMethod?.cardNumber);
      setValue("email", user?.email);
    }
  }, [user]);

  async function onSubmit(data) {
    try {
      await updateUser(data);
      //showAlert("Account updated successfully");
      navigate("/profile/data");
    } catch (err) {
      showAlert("Error updating account. Please review the form data.");
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex align-self-stretch">
          <UserNavbar activeTab="My Data" />
          <div className="col-sm-8 col-md-8 col-lg-8 mt-5">
            <h1 className="text-light mb-5">Update Account</h1>
            <form
              className="d-flex justify-content-between mb-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-sm-4 col-md-4 col-lg-4">
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
                    } bg-transparent border-0 rounded-0 px-0`}
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
                    } bg-transparent border-0 rounded-0 px-0`}
                    {...register("lastName")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="street" className="form-label text-white-50">
                    Street
                  </label>
                  <input
                    id="street"
                    type="text"
                    className={`form-control ${
                      errors.street ? "is-invalid" : ""
                    } bg-transparent border-0 rounded-0 px-0`}
                    {...register("street")}
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
                    type="text"
                    className={`form-control ${
                      errors.postalCode ? "is-invalid" : ""
                    } bg-transparent border-0 rounded-0 px-0`}
                    {...register("postalCode")}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="paymentMethodType"
                    className="form-label text-white-50"
                  >
                    Payment Method Type
                  </label>
                  <select
                    id="paymentMethodType"
                    className={`form-select ${
                      errors.paymentMethodType ? "is-invalid" : ""
                    } bg-transparent border-0 rounded-0 px-0`}
                    {...register("paymentMethodType")}
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Visa">Visa</option>
                    <option value="Master Card">Master Card</option>
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
                    id="cardNumber"
                    type="text"
                    className={`form-control ${
                      errors.cardNumber ? "is-invalid" : ""
                    } bg-transparent border-0 rounded-0 px-0`}
                    {...register("cardNumber")}
                  />
                </div>
              </div>
              <div className="col-sm-4 col-md-4 col-lg-4">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white-50">
                    Email address
                  </label>
                  <input
                    required
                    id="email"
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    } bg-transparent border-0 rounded-0 px-0`}
                    {...register("email")}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn btn-primary rounded-0 my-3"
                >
                  Update Account
                </button>
              </div>
            </form>
            <h2 className="text-light mb-5">Delete Account</h2>
            <p className="text-light">
              Once you delete your account, there is no going back. Please, be
              certain.
            </p>
            <button
              type="button"
              className="btn btn btn-secondary rounded-0 my-3"
              data-bs-toggle="modal"
              data-bs-target="#modal"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <Modal>
        <div className="card-body p-5">
          <h3 className="text-light">Confirm Deletion</h3>
          <div className="text-light">
            <p>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
          </div>
          <div className="modal-footer border-top-0">
            <button
              type="button"
              className="btn btn-secondary rounded-0"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger rounded-0"
              onClick={handleDeleteAccount}
              data-bs-dismiss="modal"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default UpdateUserData;
