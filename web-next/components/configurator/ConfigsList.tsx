import styles from "@/styles/configs-list.module.css";
import Link from "next/link";
import ConfigRender from "./ConfigRender";
import DeleteConfigButton from "./DeleteConfigButton";
import { configuratorHref } from "@/lib/template-link";
import type { PartColors } from "@/lib/types";

export type ConfigCard = {
  id: string;
  colors: PartColors;
};

type ConfigsListProps = {
  configs: ConfigCard[];
  /** Owned cards can be deleted and are edited rather than used as a template. */
  owned?: boolean;
  emptyMessage?: string;
};

const ConfigsList = ({
  configs,
  owned = false,
  emptyMessage = "No configurations yet.",
}: ConfigsListProps) => {
  if (configs.length === 0) {
    return <p className="text-white-50">{emptyMessage}</p>;
  }

  return (
    <div className={styles.list}>
      {configs.map((config) => (
        <div key={config.id} className={styles.card} data-bs-theme="dark">
          {owned && (
            <DeleteConfigButton configId={config.id} className={styles.delete} />
          )}
          <ConfigRender colors={config.colors} className={styles.console} isDisplay />
          <Link
            href={configuratorHref(config.colors)}
            className={`${styles.cta} btn btn-link link-light text-decoration-none`}
          >
            {owned ? "Edit my configuration" : "Use as a template"}
            <i className="mx-1 bi bi-chevron-right" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ConfigsList;
