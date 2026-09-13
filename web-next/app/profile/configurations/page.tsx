import type { Metadata } from "next";
import ConfigsList from "@/components/custom/configurator/ConfigsList";
import { requireUser } from "@/lib/server/auth";
import { getUserConfigs } from "@/lib/server/queries";

export const metadata: Metadata = { title: "My Configurations" };

const UserConfigsPage = async () => {
  const user = await requireUser();
  const configs = await getUserConfigs(user._id);

  return (
    <>
      <h1 className="mb-8 text-3xl font-semibold">Saved Configurations</h1>
      <ConfigsList
        configs={configs.map((config) => ({ id: config._id, colors: config.colors }))}
        owned
        emptyMessage="You have not saved any configurations yet."
      />
    </>
  );
};

export default UserConfigsPage;
