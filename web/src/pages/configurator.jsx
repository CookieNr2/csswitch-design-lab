import { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/auth.context";
import { useLocation, useNavigate } from "react-router-dom";
import ConfigForm from "../components/configurator/config-form/Config-form";
import ConfigRender from "../components/configurator/config-render/Config-render";
import Modal from "../components/ui/modal/Modal";
import OrderForm from "../components/forms/OrderForm";
import { createConfig, createOrder, getParts } from "../services/api.services";

function Configurator() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);
  const [configStatus, setConfigStatus] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let retrievedStatus = {};
        (await getParts()).data.forEach((element) => {
          retrievedStatus[element.name] = {
            ...element,
            color: element.defaultColor,
          };
        });
        if (location.state?.config)
          Object.keys(retrievedStatus).forEach(function (key, index) {
            retrievedStatus[key].color = location.state?.config[key];
          });
        setConfigStatus(retrievedStatus);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const saveConfig = () => {
    const modStatus = { ...configStatus };
    Object.keys(configStatus).forEach(function (key, index) {
      modStatus[key] = modStatus[key].color;
    });

    return createConfig({
      ...modStatus,
      name: "New config",
    });
  };

  const handleSubmitRequest = () => {
    setModalContent(<OrderForm onSubmit={handleOrderSubmit} />);
  };

  const handleSaveDraft = () => {
    if (isLoggedIn()) {
      console.log("hi");
      saveConfig();
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleOrderSubmit = async (data) => {
    let submitMessage;
    try {
      const config = await saveConfig();
      const orderData = { ...data, switchConfig: config.data };
      await createOrder(orderData);
      console.log("Order submitted:", orderData);
      submitMessage = "Your order has been created successfully!";
    } catch (error) {
      console.error("Error creating order:", error);
      submitMessage = "Error creating order";
    }
    setModalContent(
      <>
        <div className="card-body p-5">
          <p className="text-light mb-3 mt-5">{submitMessage}</p>
          <div className="modal-footer border-0">
            <button
              type="button"
              className="btn btn-secondary rounded-0"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </>
    );
  };

  function displayConfigurator() {
    if (!configStatus) return <p>Loading...</p>;
    else
      return (
        <>
          <div className="container-fluid d-flex flex-wrap px-0">
            <div className="col-12 col-lg-6">
              <ConfigRender configStatus={configStatus} />
            </div>
            <div className="col-12 col-lg-6 p-5 selection-section">
              <ConfigForm
                configStatus={configStatus}
                setConfigStatus={setConfigStatus}
              />
            </div>
          </div>
          <div className="actions">
            <div className="container d-flex justify-content-between align-items-center flex-wrap">
              <h3 className="text-light mt-2">Price: 400€</h3>
              <input id="configName"></input>
              <div>
                <button
                  className="btn btn-secondary btn-lg rounded-0 my-3 mx-2"
                  onClick={handleSaveDraft}
                >
                  Save draft
                </button>
                <button
                  className="btn btn-primary btn-lg rounded-0 my-3 mx-2"
                  data-bs-toggle="modal"
                  data-bs-target="#modal"
                  onClick={handleSubmitRequest}
                >
                  Submit request
                </button>
              </div>
            </div>
          </div>
          <Modal>{modalContent}</Modal>
        </>
      );
  }

  return <>{displayConfigurator()}</>;
}
export default Configurator;
