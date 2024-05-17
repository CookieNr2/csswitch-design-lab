import "./config-render.css";

function ConfigRender({ configStatus }) {
  return (
    <>
      <div className="swGlobal">
        <div className="switch">
          <div
            className="swBody"
            style={{
              backgroundImage: `linear-gradient(to bottom, ${configStatus["body"].color.value}, ${configStatus["body"].color.value}), radial-gradient(circle at 0 0, rgba(56, 58, 61, 0) 0.5em, ${configStatus["body"].color.value}82), radial-gradient(circle at 100% 0, rgba(56, 58, 61, 0) 0.5em, ${configStatus["body"].color.value}82)`,
            }}
          >
            <div className="volume"></div>
            <div className="screen">
              <div className="logo">
                <div className="icon">
                  <div className="icon-part left"></div>
                  <div className="icon-part right"></div>
                </div>
                <h1>
                  <span>Nintendo</span>Switch
                </h1>
              </div>
            </div>
          </div>

          <div
            className="joy-con left"
            style={{
              backgroundColor: configStatus["joyControllerLeft"].color.value,
              boxShadow: `inset 0.125em -0.125em 0.375em rgba(0,0,0,0.5),
              inset -0.3125em 0 0.0625em -0.25em rgba(0,0,0,0.25),
              inset 0.375em 0.5625em 0.5em -0.25em ${configStatus["joyControllerLeft"].color.value},
              0.40625em 0.25em 0 -0.375em ${configStatus["joyControllerLeft"].color.value}`,
            }}
          >
            <div className="button-group">
              <div
                className="button arrow up"
                style={{
                  backgroundColor: configStatus["dpad"].color.value,
                }}
              ></div>
              <div
                className="button arrow right"
                style={{
                  backgroundColor: configStatus["dpad"].color.value,
                }}
              ></div>
              <div
                className="button arrow down"
                style={{
                  backgroundColor: configStatus["dpad"].color.value,
                }}
              ></div>
              <div
                className="button arrow left"
                style={{
                  backgroundColor: configStatus["dpad"].color.value,
                }}
              ></div>
            </div>

            <div className="stick"></div>
            <div className="select"></div>
            <div className="capture"></div>
            <div className="shoulder l"></div>
          </div>

          <div
            className="joy-con right"
            style={{
              background: configStatus["joyControllerRight"].color.value,
              boxShadow: `inset -0.125em -0.125em 0.375em rgba(0, 0, 0, 0.5), 
              inset 0.3125em 0 0.0625em -0.25em rgba(0, 0, 0, 0.25), 
              inset -0.375em 0.5625em 0.5em -0.25em ${configStatus["joyControllerRight"].color.value}, 
              -0.40625em 0.25em 0 -0.375em ${configStatus["joyControllerRight"].color.value}`,
            }}
          >
            <div className="button-group">
              <div
                className="button letter"
                data-letter="X"
                style={{
                  backgroundColor: configStatus["abxy"].color.value,
                }}
              ></div>
              <div
                className="button letter"
                data-letter="A"
                style={{
                  backgroundColor: configStatus["abxy"].color.value,
                }}
              ></div>
              <div
                className="button letter"
                data-letter="B"
                style={{
                  backgroundColor: configStatus["abxy"].color.value,
                }}
              ></div>
              <div
                className="button letter"
                data-letter="Y"
                style={{
                  backgroundColor: configStatus["abxy"].color.value,
                }}
              ></div>
            </div>

            <div className="stick"></div>
            <div className="start"></div>
            <div
              className="home"
              style={{
                backgroundColor: configStatus["utils"].color.value,
              }}
            ></div>
            <div className="shoulder r"></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ConfigRender;
