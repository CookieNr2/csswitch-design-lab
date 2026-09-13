import type { Metadata } from "next";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/forms/RegisterForm";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Register" };

const RegisterPage = async () => {
  if (await getCurrentUser()) redirect("/");

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-self-center">
          <div className="card shadow-lg border-0 mt-5">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
