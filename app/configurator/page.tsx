import type { Metadata } from "next";
import { getSwitchParts } from "@/lib/server/queries";
import { readTemplate } from "@/lib/template-link";
import Configurator from "./_components/Configurator";

export const metadata: Metadata = { title: "Configurator" };

const ConfiguratorPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const [parts, params] = await Promise.all([getSwitchParts(), searchParams]);
  const template = readTemplate(params);

  return (
    <Configurator
      key={new URLSearchParams(template).toString()}
      parts={parts}
      template={template}
    />
  );
};

export default ConfiguratorPage;
