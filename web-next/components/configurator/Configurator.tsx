"use client";

import { useActionState, useMemo, useState } from "react";
import ConfigForm from "./ConfigForm";
import ConfigRender from "./ConfigRender";
import Modal from "@/components/ui/Modal";
import OrderFields from "@/components/forms/OrderForm";
import FormAlert from "@/components/ui/FormAlert";
import SubmitButton from "@/components/ui/SubmitButton";
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
    return <p className="text-light p-5">This configurator has no parts to show yet.</p>;
  }

  /** The current selection, carried into whichever form is submitted. */
  const colorInputs = PART_NAMES.map((part) => (
    <input key={part} type="hidden" name={part} value={colors[part]._id} readOnly />
  ));

  return (
    <>
      <div className="container-fluid d-flex flex-wrap px-0">
        <div className="col-12 col-lg-6">
          <ConfigRender colors={colors} />
        </div>
        <div className="col-12 col-lg-6 p-5 selection-section">
          <ConfigForm configStatus={configStatus} onColorChange={handleColorChange} />
        </div>
      </div>

      <div className="actions">
        <form action={saveFormAction}>
          {colorInputs}
          <div className="container d-flex justify-content-between align-items-center flex-wrap">
            <h3 className="text-light mt-2">Price: {PRICE}</h3>
            <div>
              <label htmlFor="configName" className="form-label text-white-50 mb-1">
                Name your design
              </label>
              <input
                id="configName"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="form-control bg-transparent border-0 rounded-0 text-light"
                placeholder="New config"
              />
            </div>
            <div>
              <SubmitButton
                pendingLabel="Saving…"
                className="btn btn-secondary btn-lg rounded-0 my-3 mx-2"
              >
                Save draft
              </SubmitButton>
              <button
                type="button"
                className="btn btn-primary btn-lg rounded-0 my-3 mx-2"
                onClick={() => setOrderOpen(true)}
              >
                Submit request
              </button>
            </div>
          </div>
        </form>

        <div className="container">
          <FormAlert state={saveState} />
        </div>
      </div>

      {/* The outcome is shown inside the modal, where the user is looking --
          no effect syncing modal state to the action result. */}
      <Modal open={orderOpen} onClose={() => setOrderOpen(false)}>
        {orderState.status === "success" ? (
          <div className="card-body p-5">
            <p className="text-light mb-3 mt-5">{orderState.message}</p>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-secondary rounded-0"
                onClick={() => setOrderOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form action={orderFormAction}>
            {colorInputs}
            <input type="hidden" name="name" value={name} readOnly />
            <div className="px-5 pt-5">
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
