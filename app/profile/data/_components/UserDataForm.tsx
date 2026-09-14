"use client";

import { useActionState, useState } from "react";
import { deleteAccountAction, updateAccountAction } from "@/lib/actions/account";
import { Button } from "@/components/shadcn/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/shadcn/alert-dialog";
import { Field, SelectField } from "@/components/custom/forms/Field";
import FormAlert from "@/components/custom/forms/FormAlert";
import SubmitButton from "@/components/custom/forms/SubmitButton";
import { idleState } from "@/lib/form-state";
import type { SessionUser } from "@/lib/types";

const UserDataForm = ({ user }: { user: SessionUser }) => {
  const [updateState, updateFormAction] = useActionState(updateAccountAction, idleState);
  const [deleteState, deleteFormAction] = useActionState(deleteAccountAction, idleState);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <>
      <h1 className="mb-8 text-3xl font-semibold">Update Account</h1>
      <FormAlert state={updateState} />
      <FormAlert state={deleteState} />

      {/* defaultValue, not value: the server supplies the initial data and the
          browser owns it from there, so no client state is needed. */}
      <form action={updateFormAction} className="mb-12 grid gap-x-12 md:grid-cols-2">
        <div>
          <Field
            required
            id="firstName"
            name="firstName"
            label="First Name"
            defaultValue={user.firstName}
          />
          <Field
            required
            id="lastName"
            name="lastName"
            label="Last Name"
            defaultValue={user.lastName}
          />
          <Field
            id="street"
            name="street"
            label="Street"
            defaultValue={user.location?.street ?? ""}
          />
          <Field
            id="postalCode"
            name="postalCode"
            label="Postal Code"
            inputMode="numeric"
            defaultValue={user.location?.postalCode ?? ""}
          />
          <SelectField
            id="paymentMethodType"
            name="paymentMethodType"
            label="Payment Method Type"
            defaultValue={user.paymentMethod?.type ?? ""}
          >
            <option value="">Select Payment Method</option>
            <option value="Visa">Visa</option>
            <option value="Master Card">Master Card</option>
          </SelectField>
          <Field
            id="cardNumber"
            name="cardNumber"
            label="Card Number"
            inputMode="numeric"
            defaultValue={user.paymentMethod?.cardNumber ?? ""}
          />
        </div>

        <div>
          <Field
            required
            id="email"
            name="email"
            type="email"
            label="Email address"
            defaultValue={user.email}
          />
          <SubmitButton pendingLabel="Saving…" className="mt-2">
            Update Account
          </SubmitButton>
        </div>
      </form>

      <h2 className="mb-4 text-2xl font-semibold">Delete Account</h2>
      <p className="text-white">
        Once you delete your account, there is no going back. Please, be certain.
      </p>
      <Button
        type="button"
        variant="outline"
        className="mt-4 h-11 rounded-none px-6 text-base"
        onClick={() => setConfirmingDelete(true)}
      >
        Delete Account
      </Button>

      {/* AlertDialog, not Dialog: a destructive confirmation should not close
          on an outside click, and Radix focuses Cancel first. */}
      <AlertDialog open={confirmingDelete} onOpenChange={setConfirmingDelete}>
        <AlertDialogContent className="gap-6 rounded-none border-neutral-700 bg-neutral-800 p-8 data-[size=default]:max-w-[calc(100%-2rem)] data-[size=default]:sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold">
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">
              Are you sure you want to delete your account? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {/* A plain submit button rather than AlertDialogAction, which would
              close the dialog before the pending state could show. */}
          <form action={deleteFormAction} className="flex justify-end gap-2">
            <AlertDialogCancel className="h-11 rounded-none px-6">
              Cancel
            </AlertDialogCancel>
            <SubmitButton
              pendingLabel="Deleting…"
              variant="destructive"
              className="h-11 rounded-none px-6"
            >
              Delete
            </SubmitButton>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserDataForm;
