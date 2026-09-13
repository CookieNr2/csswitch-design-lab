"use client";

import { useActionState, useState } from "react";
import { deleteAccountAction, updateAccountAction } from "@/app/actions/account";
import FormAlert from "@/components/ui/FormAlert";
import Modal from "@/components/ui/Modal";
import SubmitButton from "@/components/ui/SubmitButton";
import { idleState } from "@/lib/form-state";
import type { SessionUser } from "@/lib/types";

const UserDataForm = ({ user }: { user: SessionUser }) => {
  const [updateState, updateFormAction] = useActionState(updateAccountAction, idleState);
  const [deleteState, deleteFormAction] = useActionState(deleteAccountAction, idleState);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <>
      <h1 className="text-light mb-5">Update Account</h1>
      <FormAlert state={updateState} />
      <FormAlert state={deleteState} />

      {/* defaultValue, not value: the server supplies the initial data and the
          browser owns it from there, so no client state is needed. */}
      <form className="d-flex justify-content-between mb-5" action={updateFormAction}>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label text-white-50">
              First Name
            </label>
            <input
              required
              id="firstName"
              name="firstName"
              type="text"
              defaultValue={user.firstName}
              className="form-control bg-transparent border-0 rounded-0 px-0"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label text-white-50">
              Last Name
            </label>
            <input
              required
              id="lastName"
              name="lastName"
              type="text"
              defaultValue={user.lastName}
              className="form-control bg-transparent border-0 rounded-0 px-0"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="street" className="form-label text-white-50">
              Street
            </label>
            <input
              id="street"
              name="street"
              type="text"
              defaultValue={user.location?.street ?? ""}
              className="form-control bg-transparent border-0 rounded-0 px-0"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="postalCode" className="form-label text-white-50">
              Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              inputMode="numeric"
              defaultValue={user.location?.postalCode ?? ""}
              className="form-control bg-transparent border-0 rounded-0 px-0"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="paymentMethodType" className="form-label text-white-50">
              Payment Method Type
            </label>
            <select
              id="paymentMethodType"
              name="paymentMethodType"
              defaultValue={user.paymentMethod?.type ?? ""}
              className="form-select bg-transparent border-0 rounded-0 px-0"
            >
              <option value="">Select Payment Method</option>
              <option value="Visa">Visa</option>
              <option value="Master Card">Master Card</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label text-white-50">
              Card Number
            </label>
            <input
              id="cardNumber"
              name="cardNumber"
              type="text"
              inputMode="numeric"
              defaultValue={user.paymentMethod?.cardNumber ?? ""}
              className="form-control bg-transparent border-0 rounded-0 px-0"
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
              name="email"
              type="email"
              defaultValue={user.email}
              className="form-control bg-transparent border-0 rounded-0 px-0"
            />
          </div>
          <SubmitButton
            pendingLabel="Saving…"
            className="btn btn-primary rounded-0 my-3"
          >
            Update Account
          </SubmitButton>
        </div>
      </form>

      <h2 className="text-light mb-5">Delete Account</h2>
      <p className="text-light">
        Once you delete your account, there is no going back. Please, be certain.
      </p>
      <button
        type="button"
        className="btn btn-secondary rounded-0 my-3"
        onClick={() => setConfirmingDelete(true)}
      >
        Delete Account
      </button>

      <Modal open={confirmingDelete} onClose={() => setConfirmingDelete(false)}>
        <div className="card-body p-5">
          <h3 className="text-light">Confirm Deletion</h3>
          <div className="text-light">
            <p>
              Are you sure you want to delete your account? This action cannot be
              undone.
            </p>
          </div>
          <form action={deleteFormAction} className="modal-footer border-top-0">
            <button
              type="button"
              className="btn btn-secondary rounded-0"
              onClick={() => setConfirmingDelete(false)}
            >
              Cancel
            </button>
            <SubmitButton
              pendingLabel="Deleting…"
              className="btn btn-danger rounded-0"
            >
              Delete
            </SubmitButton>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default UserDataForm;
