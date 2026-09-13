"use client";

import { useActionState } from "react";
import { registerAction } from "@/app/actions/auth";
import { Field } from "./Field";
import FormAlert from "./FormAlert";
import SubmitButton from "./SubmitButton";
import { idleState } from "@/lib/form-state";
import { PASSWORD_MESSAGE, PASSWORD_REGEX } from "@/lib/password";

const RegisterForm = () => {
  const [state, formAction] = useActionState(registerAction, idleState);

  return (
    <div className="p-8">
      <h1 className="mb-4 text-3xl font-semibold">Register</h1>
      <FormAlert state={state} />

      <form action={formAction}>
        <Field
          required
          id="firstName"
          name="firstName"
          type="text"
          label="First Name"
          autoComplete="given-name"
        />
        <Field
          required
          id="lastName"
          name="lastName"
          type="text"
          label="Last Name"
          autoComplete="family-name"
        />
        <Field
          required
          id="email"
          name="email"
          type="email"
          label="Email address"
          autoComplete="email"
        />
        {/* The browser checks the same rule the server enforces, so an obvious
            mistake is caught before a round trip. */}
        <Field
          required
          id="password"
          name="password"
          type="password"
          label="Password"
          autoComplete="new-password"
          pattern={PASSWORD_REGEX.source}
          title={PASSWORD_MESSAGE}
          hint={
            <p className="text-xs text-neutral-400">
              Your password must include at least 1 upper case, numeric, and special
              character.
            </p>
          }
        />
        <SubmitButton pendingLabel="Creating account…" className="mt-2">
          Register
        </SubmitButton>
      </form>
    </div>
  );
};

export default RegisterForm;
