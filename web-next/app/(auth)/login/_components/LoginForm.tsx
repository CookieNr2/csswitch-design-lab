"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";
import { Field } from "@/components/custom/forms/Field";
import FormAlert from "@/components/custom/forms/FormAlert";
import SubmitButton from "@/components/custom/forms/SubmitButton";
import { idleState } from "@/lib/form-state";

const LoginForm = () => {
  const [state, formAction] = useActionState(loginAction, idleState);

  return (
    <div className="p-8">
      <h1 className="mb-4 text-3xl font-semibold">Login</h1>
      <FormAlert state={state} />

      <form action={formAction}>
        <Field
          required
          id="email"
          name="email"
          type="email"
          label="Email address"
          autoComplete="email"
        />
        <Field
          required
          id="password"
          name="password"
          type="password"
          label="Password"
          autoComplete="current-password"
        />
        <SubmitButton pendingLabel="Logging in…" className="mt-2">
          Login
        </SubmitButton>
      </form>

      <p className="mt-4 text-sm text-neutral-400">
        Not a member?{" "}
        <Link className="text-white underline underline-offset-4" href="/register">
          Create an Account
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
