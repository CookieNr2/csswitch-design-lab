"use client";

import { useActionState, useMemo, useState } from "react";
import ConfigForm from "./ConfigForm";
import ConfigRender from "./ConfigRender";
import Modal from "@/components/custom/ui/Modal";
import OrderFields from "@/components/custom/forms/OrderForm";
import FormAlert from "@/components/custom/forms/FormAlert";
import SubmitButton from "@/components/custom/forms/SubmitButton";
import { Button } from "@/components/shadcn/button";
import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";
import { placeOrderAction, saveConfigAction } from "@/app/actions/configs";
import { idleState } from "@/lib/form-state";
import {
  PART_NAMES,
  type Color,
  type ConfigStatus,
  type PartColors,
  type PartName,
  type SwitchPart,
} from "@/lib/types";

const PRICE = "400€";

type ConfiguratorProps = {
  parts: SwitchPart[];
  /** Part -> color id, taken from the query string when arriving from a template. */
  template: Partial<Record<PartName, string>>;
};

const buildInitialStatus = (
  parts: SwitchPart[],
  template: Partial<Record<PartName, string>>
): ConfigStatus => {
  const status = {} as ConfigStatus;

  for (const part of parts) {
    const templatedId = template[part.name];
    const templated = part.colorOptions.find((option) => option._id === templatedId);
    status[part.name] = { ...part, color: templated ?? part.defaultColor };
  }

  return status;
};

const Configurator = ({ parts, template }: ConfiguratorProps) => {
  const [configStatus, setConfigStatus] = useState<ConfigStatus>(() =>
    buildInitialStatus(parts, template)
  );
  const [orderOpen, setOrderOpen] = useState(false);
  // Controlled so the name can ride along with the order form too.
  const [name, setName] = useState("");

  const [saveState, saveFormAction] = useActionState(saveConfigAction, idleState);
  const [orderState, orderFormAction] = useActionState(placeOrderAction, idleState);

  const colors = useMemo(() => {
    const picked = {} as PartColors;
    for (const part of PART_NAMES) {
      const selection = configStatus[part];
      if (selection) picked[part] = selection.color;
    }
    return picked;
  }, [configStatus]);

  const handleColorChange = (part: PartName, color: Color) => {
    setConfigStatus((current) => ({
      ...current,
      [part]: { ...current[part], color },
    }));
  };

  const ready = PART_NAMES.every((part) => colors[part]);
  if (!ready) {
    return <p className="p-10">This configurator has no parts to show yet.</p>;
  }

  /** The current selection, carried into whichever form is submitted. */
  const colorInputs = PART_NAMES.map((part) => (
    <input key={part} type="hidden" name={part} value={colors[part]._id} readOnly />
  ));

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <ConfigRender colors={colors} />
        </div>
        <div className="w-full lg:w-1/2">
          <ConfigForm configStatus={configStatus} onColorChange={handleColorChange} />
        </div>
      </div>

      <div className="bg-black">
        <form action={saveFormAction}>
          {colorInputs}
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
            <h2 className="text-2xl font-semibold">Price: {PRICE}</h2>

            <div className="grid gap-1.5">
              <Label htmlFor="configName" className="text-neutral-400">
                Name your design
              </Label>
              <Input
                id="configName"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="New config"
                className="rounded-none border-0 border-b border-neutral-400 bg-transparent px-0 shadow-none focus-visible:border-emerald-400 focus-visible:ring-0 dark:bg-transparent"
              />
            </div>

            <div className="flex gap-2">
              <SubmitButton pendingLabel="Saving…" variant="outline">
                Save draft
              </SubmitButton>
              <Button
                type="button"
                className="h-11 rounded-none px-6 text-base"
                onClick={() => setOrderOpen(true)}
              >
                Submit request
              </Button>
            </div>
          </div>
        </form>

        <div className="container mx-auto px-4 pb-4">
          <FormAlert state={saveState} />
        </div>
      </div>

      {/* The outcome is shown inside the modal, where the user is looking --
          no effect syncing modal state to the action result. */}
      <Modal
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
        title="Place your order"
      >
        {orderState.status === "success" ? (
          <div className="p-8">
            <p className="mb-6">{orderState.message}</p>
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-none px-6"
                onClick={() => setOrderOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form action={orderFormAction}>
            {colorInputs}
            <input type="hidden" name="name" value={name} readOnly />
            <div className="px-8 pt-8">
              <FormAlert state={orderState} />
            </div>
            <OrderFields />
          </form>
        )}
      </Modal>
    </>
  );
};

export default Configurator;
