import "./config-render.css";

function ConfigRender({ configStatus, isDisplay }) {
  if (!configStatus?.body?.color) {
    return <p>Loading...</p>;
  }

  const uD = configStatus.index ? `uniqueId${configStatus.index}` : "";

  const uCD = configStatus.index ? `.uniqueId${configStatus.index}` : "";

  const customBg = isDisplay
    ? {
        background: `linear-gradient(328deg, ${configStatus["joyControllerLeft"].color.value}4D 0%, ${configStatus["joyControllerRight"].color.value}4D 100%)`,
      }
    : {};

  const styles = `
    ${uCD}.start::before, ${uCD}.start::after, ${uCD}.home::before, ${uCD}.capture::before {
      background-color: ${configStatus["utils"].color.value};
    }
    ${uCD}.stick::before, ${uCD}.stick::after {
      background-image: linear-gradient(to bottom, ${configStatus["thumbSticks"].color.value}bf, ${configStatus["thumbSticks"].color.value});
      box-shadow: inset 0 0 0.125em rgba(255, 255, 255, 0.08);
    }
    ${uCD}.stick::before {
      background-image: linear-gradient(to bottom, ${configStatus["thumbSticks"].color.value}, ${configStatus["thumbSticks"].color.value}), linear-gradient(to bottom, ${configStatus["thumbSticks"].color.value}, ${configStatus["thumbSticks"].color.value}), linear-gradient(to bottom, ${configStatus["thumbSticks"].color.value}4d, ${configStatus["thumbSticks"].color.value}80); 
      border: 1px solid ${configStatus["thumbSticks"].color.value};
    }
    ${uCD}.shoulder.l {
      background-image: radial-gradient(circle at 3em 0.125em, ${configStatus["joyControllerLeft"].color.value} 0.125em, rgba(15, 15, 15, 0) 0.15125em), radial-gradient(circle at 0.34375em 1.5em, ${configStatus["joyControllerLeft"].color.value} 0.125em, rgba(15, 15, 15, 0) 0.15125em), radial-gradient(circle at 0.875em -0.625em, ${configStatus["joyControllerLeft"].color.value} 1.75em, rgba(15, 15, 15, 1) 2.15625em, rgba(15, 15, 15, 0) 2.1875em);
    }
    ${uCD}.shoulder.r {
      background-image: radial-gradient(circle at 2.5em 0.125em, ${configStatus["joyControllerRight"].color.value} 0.125em, rgba(15, 15, 15, 0) 0.15125em), radial-gradient(circle at 5.1875em 1.5em, ${configStatus["joyControllerRight"].color.value} 0.125em, rgba(15, 15, 15, 0) 0.15125em), radial-gradient(circle at 4.5em -0.625em, ${configStatus["joyControllerRight"].color.value} 1.75em, rgba(15, 15, 15, 1) 2.15625em, rgba(15, 15, 15, 0) 2.1875em);
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div style={customBg} className="swGlobal">
        <div className="switch">
          <div
            className="swBody"
            style={{
              backgroundImage: `linear-gradient(to bottom, ${configStatus["body"].color.value}, ${configStatus["body"].color.value}), radial-gradient(circle at 0 0, rgba(56, 58, 61, 0) 0.5em, ${configStatus["body"].color.value}82), radial-gradient(circle at 100% 0, rgba(56, 58, 61, 0) 0.5em, ${configStatus["body"].color.value}82)`,
            }}
          >
            <div className="volume"></div>
            <div className="screen"></div>
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

            <div
              className="stick"
              style={{
                backgroundImage: `linear-gradient(to bottom, ${configStatus["thumbSticks"].color.value}1a, ${configStatus["thumbSticks"].color.value}), linear-gradient(to bottom, ${configStatus["thumbSticks"].color.value}80, ${configStatus["thumbSticks"].color.value}1a), linear-gradient(to bottom, ${configStatus["thumbSticks"].color.value}, ${configStatus["thumbSticks"].color.value})`,
              }}
            ></div>
            <div
              className="select"
              style={{
                background: configStatus["utils"].color.value,
              }}
            ></div>
            <div
              className={`capture ${uD}`}
              style={{
                background: configStatus["utils"].color.value,
              }}
            ></div>
            <div className={`shoulder l ${uD}`}></div>
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
            <div
              className={`stick ${uD}`}
              style={{
                backgroundImage: `linear-gradient(to bottom, ${configStatus["thumbSticks"].color.value}1a, ${configStatus["thumbSticks"].color.value}), linear-gradient(to bottom, ${configStatus["thumbSticks"].color.value}80, ${configStatus["thumbSticks"].color.value}1a), linear-gradient(to bottom, ${configStatus["thumbSticks"].color.value}, ${configStatus["thumbSticks"].color.value})`,
              }}
            ></div>
            <div className={`start ${uD}`}></div>
            <div
              className={`home ${uD}`}
              style={{
                backgroundColor: `${configStatus["utils"].color.value}e6`,
                boxShadow: `inset 0 0 0 0.09375em ${configStatus["utils"].color.value}, inset 0 0.25em 0.5em -0.0625em rgba(255, 255, 255, 0.1), inset 0 0.015625em 0.03125em -0.015625em rgba(255, 255, 255, 0.5), inset 0 0 0.03125em rgba(0, 0, 0, 1), 0 0.015625em 0.03125em 0.0625em rgba(0, 0, 0, 0.65)`,
              }}
            ></div>
            <div className={`shoulder r ${uD}`}></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ConfigRender;
