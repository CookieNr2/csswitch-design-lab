import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/custom/forms/LoginForm";
import { Card } from "@/components/shadcn/card";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Login" };

const LoginPage = async () => {
  if (await getCurrentUser()) redirect("/");

  return (
    <div className="container mx-auto flex justify-center px-4 py-12">
      <Card className="w-full max-w-md rounded-none border-neutral-700 bg-neutral-800 p-0 shadow-lg">
        <LoginForm />
      </Card>
    </div>
  );
};

export default LoginPage;
