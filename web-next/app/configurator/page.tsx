import type { Metadata } from "next";
import Configurator from "@/components/custom/configurator/Configurator";
import { getSwitchParts } from "@/lib/queries";
import { readTemplate } from "@/lib/template-link";

export const metadata: Metadata = { title: "Configurator" };

const ConfiguratorPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const [parts, params] = await Promise.all([getSwitchParts(), searchParams]);

  return <Configurator parts={parts} template={readTemplate(params)} />;
};

export default ConfiguratorPage;
