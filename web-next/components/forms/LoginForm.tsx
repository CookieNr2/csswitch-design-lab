"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";
import FormAlert from "@/components/ui/FormAlert";
import SubmitButton from "@/components/ui/SubmitButton";
import { idleState } from "@/lib/form-state";

const LoginForm = () => {
  const [state, formAction] = useActionState(loginAction, idleState);

  return (
    <div className="card-body p-5">
      <h1 className="text-light mb-3">Login</h1>
      <FormAlert state={state} />

      <form action={formAction}>
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
          <input
            required
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="form-control bg-transparent border-0 rounded-0"
          />
        </div>

        <SubmitButton pendingLabel="Logging in…">Login</SubmitButton>
      </form>

      <p className="text-white-50 mt-2">
        <small>
          Not a member?{" "}
          <Link className="link-light" href="/register">
            Create an Account
          </Link>
        </small>
      </p>
    </div>
  );
};

export default LoginForm;
