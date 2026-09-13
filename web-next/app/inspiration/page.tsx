import type { Metadata } from "next";
import ConfigsList from "@/components/custom/configurator/ConfigsList";
import { getPopularConfigs } from "@/lib/queries";

export const metadata: Metadata = { title: "Inspiration Gallery" };

const InspirationPage = async () => {
  const configs = await getPopularConfigs(0);

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="my-6 text-3xl font-semibold">Inspiration Gallery</h1>
      </div>
      <div className="flex flex-col px-2 py-8">
        <ConfigsList
          configs={configs.map((colors, index) => ({ id: `gallery-${index}`, colors }))}
          emptyMessage="No designs have been saved yet — be the first."
        />
      </div>
    </>
  );
};

export default InspirationPage;
