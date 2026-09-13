"use client";

import { useActionState } from "react";
import { registerAction } from "@/app/actions/auth";
import FormAlert from "@/components/ui/FormAlert";
import SubmitButton from "@/components/ui/SubmitButton";
import { idleState } from "@/lib/form-state";
import { PASSWORD_MESSAGE, PASSWORD_REGEX } from "@/lib/password";

const RegisterForm = () => {
  const [state, formAction] = useActionState(registerAction, idleState);

  return (
    <div className="card-body p-5">
      <h1 className="text-light mb-3">Register</h1>
      <FormAlert state={state} />

      <form action={formAction}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label text-white-50">
            First Name
          </label>
          <input
            required
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            className="form-control bg-transparent border-0 rounded-0"
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
            autoComplete="family-name"
            className="form-control bg-transparent border-0 rounded-0"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label text-white-50">
            Email address
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="form-control bg-transparent border-0 rounded-0"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label text-white-50">
            Password
          </label>
          {/* The browser checks the same rule the server enforces, so an
              obvious mistake is caught before a round trip. */}
          <input
            required
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            pattern={PASSWORD_REGEX.source}
            title={PASSWORD_MESSAGE}
            className="form-control bg-transparent border-0 rounded-0"
          />
        </div>

        <p className="text-white-50 mt-2">
          <small>
            Your password must include at least 1 upper case, numeric, and special
            character.
          </small>
        </p>

        <SubmitButton pendingLabel="Creating account…">Register</SubmitButton>
      </form>
    </div>
  );
};

export default RegisterForm;
