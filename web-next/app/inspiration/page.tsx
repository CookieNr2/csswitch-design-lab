import type { Metadata } from "next";
import ConfigsList from "@/components/configurator/ConfigsList";
import { getPopularConfigs } from "@/lib/queries";

export const metadata: Metadata = { title: "Inspiration Gallery" };

const InspirationPage = async () => {
  const configs = await getPopularConfigs(0);

  return (
    <>
      <div className="container">
        <h1 className="text-light my-4">Inspiration Gallery</h1>
      </div>
      <div className="container-fluid d-flex flex-column my-5">
        <ConfigsList
          configs={configs.map((colors, index) => ({ id: `gallery-${index}`, colors }))}
          emptyMessage="No designs have been saved yet — be the first."
        />
      </div>
    </>
  );
};

export default InspirationPage;
