import styles from "@/styles/config-render.module.css";
import type { CSSProperties } from "react";
import type { PartColors } from "@/lib/types";

type ConfigRenderProps = {
  colors: PartColors;
  /** Gallery cards get the tinted backdrop; the live configurator does not. */
  isDisplay?: boolean;
  /** Lets a parent size the console without reaching into this module. */
  className?: string;
};

/** React types `style` as CSSProperties, which has no index signature for `--*`. */
type StyleWithVars = CSSProperties & Record<`--${string}`, string>;

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

const ConfigRender = ({ colors, isDisplay, className }: ConfigRenderProps) => {
  const body = colors.body.value;
  const left = colors.joyControllerLeft.value;
  const right = colors.joyControllerRight.value;
  const sticks = colors.thumbSticks.value;
  const buttons = colors.abxy.value;
  const dpad = colors.dpad.value;
  const utils = colors.utils.value;

  // Everything the stylesheet needs for pseudo-elements, inherited by the
  // whole subtree. Alpha variants are precomputed so the CSS stays plain.
  const palette: StyleWithVars = {
    "--sw-utils": utils,
    "--sw-sticks": sticks,
    "--sw-sticks-bf": `${sticks}bf`,
    "--sw-sticks-4d": `${sticks}4d`,
    "--sw-sticks-80": `${sticks}80`,
    "--sw-joy-left": left,
    "--sw-joy-right": right,
    ...(isDisplay
      ? { background: `linear-gradient(328deg, ${left}4D 0%, ${right}4D 100%)` }
      : {}),
  };

  const stickBackground = `linear-gradient(to bottom, ${sticks}1a, ${sticks}), linear-gradient(to bottom, ${sticks}80, ${sticks}1a), linear-gradient(to bottom, ${sticks}, ${sticks})`;

  const arrows = ["up", "right", "down", "left"] as const;

  return (
    <div className={cx(styles.swGlobal, className)} style={palette}>
      <div className={styles.switch}>
        <div
          className={styles.swBody}
          style={{
            backgroundImage: `linear-gradient(to bottom, ${body}, ${body}), radial-gradient(circle at 0 0, rgba(56, 58, 61, 0) 0.5em, ${body}82), radial-gradient(circle at 100% 0, rgba(56, 58, 61, 0) 0.5em, ${body}82)`,
          }}
        >
          <div className={styles.volume} />
          <div className={styles.screen} />
        </div>

        <div
          className={cx(styles["joy-con"], styles.left)}
          style={{
            backgroundColor: left,
            boxShadow: `inset 0.125em -0.125em 0.375em rgba(0,0,0,0.5),
            inset -0.3125em 0 0.0625em -0.25em rgba(0,0,0,0.25),
            inset 0.375em 0.5625em 0.5em -0.25em ${left},
            0.40625em 0.25em 0 -0.375em ${left}`,
          }}
        >
          <div className={styles["button-group"]}>
            {arrows.map((direction) => (
              <div
                key={direction}
                className={cx(styles.button, styles.arrow, styles[direction])}
                style={{ backgroundColor: dpad }}
              />
            ))}
          </div>

          <div className={styles.stick} style={{ backgroundImage: stickBackground }} />
          <div className={styles.select} style={{ background: utils }} />
          <div className={styles.capture} style={{ background: utils }} />
          <div className={cx(styles.shoulder, styles.l)} />
        </div>

        <div
          className={cx(styles["joy-con"], styles.right)}
          style={{
            background: right,
            boxShadow: `inset -0.125em -0.125em 0.375em rgba(0, 0, 0, 0.5),
            inset 0.3125em 0 0.0625em -0.25em rgba(0, 0, 0, 0.25),
            inset -0.375em 0.5625em 0.5em -0.25em ${right},
            -0.40625em 0.25em 0 -0.375em ${right}`,
          }}
        >
          <div className={styles["button-group"]}>
            {["X", "A", "B", "Y"].map((letter) => (
              <div
                key={letter}
                className={cx(styles.button, styles.letter)}
                data-letter={letter}
                style={{ backgroundColor: buttons }}
              />
            ))}
          </div>
          <div className={styles.stick} style={{ backgroundImage: stickBackground }} />
          <div className={styles.start} />
          <div
            className={styles.home}
            style={{
              backgroundColor: `${utils}e6`,
              boxShadow: `inset 0 0 0 0.09375em ${utils}, inset 0 0.25em 0.5em -0.0625em rgba(255, 255, 255, 0.1), inset 0 0.015625em 0.03125em -0.015625em rgba(255, 255, 255, 0.5), inset 0 0 0.03125em rgba(0, 0, 0, 1), 0 0.015625em 0.03125em 0.0625em rgba(0, 0, 0, 0.65)`,
            }}
          />
          <div className={cx(styles.shoulder, styles.r)} />
        </div>
      </div>
    </div>
  );
};

export default ConfigRender;
