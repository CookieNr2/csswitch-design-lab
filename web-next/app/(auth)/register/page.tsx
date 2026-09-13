import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/server/auth";
import RegisterForm from "./_components/RegisterForm";

export const metadata: Metadata = { title: "Register" };

const RegisterPage = async () => {
  if (await getCurrentUser()) redirect("/");

  return <RegisterForm />;
};

export default RegisterPage;
