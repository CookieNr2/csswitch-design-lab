import type { Metadata } from "next";
import { requireUser } from "@/lib/server/auth";
import UserDataForm from "./_components/UserDataForm";

export const metadata: Metadata = { title: "My Data" };

const UserDataPage = async () => {
  const user = await requireUser();

  return <UserDataForm user={user} />;
};

export default UserDataPage;
