import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/forms/LoginForm";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Login" };

const LoginPage = async () => {
  if (await getCurrentUser()) redirect("/");

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-self-center">
          <div className="card shadow-lg border-0 mt-5">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
