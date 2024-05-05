import "./config-render.css";

function ConfigRender({ configStatus }) {
  console.log(configStatus);
  return (
    <>
      <div class="swGlobal">
        <div class="switch">
          <div class="swBody">
            <div class="volume"></div>
            <div class="screen">
              <div class="logo">
                <div class="icon">
                  <div class="icon-part left"></div>
                  <div class="icon-part right"></div>
                </div>
                <h1>
                  <span>Nintendo</span>Switch
                </h1>
              </div>
            </div>
          </div>

          <div
            class="joy-con left"
            style={{ backgroundColor: configStatus["joyControllerLeft"].color }}
          >
            <div class="button-group">
              <div class="button arrow up"></div>
              <div class="button arrow right"></div>
              <div class="button arrow down"></div>
              <div class="button arrow left"></div>
            </div>

            <div class="stick"></div>
            <div class="select"></div>
            <div class="capture"></div>
            <div class="shoulder l"></div>
          </div>

          <div
            class="joy-con right"
            style={{
              backgroundColor: configStatus["joyControllerRight"].color,
            }}
          >
            <div class="button-group">
              <div
                class="button letter"
                data-letter="X"
                style={{
                  backgroundColor: configStatus["abxy"].color,
                }}
              ></div>
              <div class="button letter" data-letter="A"></div>
              <div class="button letter" data-letter="B"></div>
              <div class="button letter" data-letter="Y"></div>
            </div>

            <div class="stick"></div>
            <div class="start"></div>
            <div class="home"></div>
            <div class="shoulder r"></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ConfigRender;
