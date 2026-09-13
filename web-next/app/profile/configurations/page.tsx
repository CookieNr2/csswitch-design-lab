import type { Metadata } from "next";
import ConfigsList from "@/components/configurator/ConfigsList";
import { requireUser } from "@/lib/auth";
import { getUserConfigs } from "@/lib/queries";

export const metadata: Metadata = {
  title: "My Configurations",
};

const UserConfigsPage = async () => {
  const user = await requireUser();
  const configs = await getUserConfigs(user._id);

  return (
    <>
      <h1 className="text-light mb-5">Saved Configurations</h1>
      <ConfigsList
        configs={configs.map((config) => ({ id: config._id, colors: config.colors }))}
        owned
        emptyMessage="You have not saved any configurations yet."
      />
    </>
  );
};

export default UserConfigsPage;
