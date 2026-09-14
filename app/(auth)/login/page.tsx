import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/server/auth";
import LoginForm from "./_components/LoginForm";

export const metadata: Metadata = { title: "Login" };

const LoginPage = async () => {
  if (await getCurrentUser()) redirect("/");

  return <LoginForm />;
};

export default LoginPage;
