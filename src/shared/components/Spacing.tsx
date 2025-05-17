import clsx from "clsx";

import styles from "./Spacing.module.scss";

const cx = clsx.bind(styles);

function Spacing() {
  return <div className={cx(styles.spacing)} />;
}

export default Spacing;
