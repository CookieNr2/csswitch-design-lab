import type { Metadata } from "next";
import UserDataForm from "@/components/forms/UserDataForm";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "My Data" };

const UserDataPage = async () => {
  const user = await requireUser();

  return <UserDataForm user={user} />;
};

export default UserDataPage;
