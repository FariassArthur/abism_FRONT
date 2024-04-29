//css
import styles from "./Toggle.module.scss";

//icon
import { FaArrowsAltH } from "react-icons/fa";

const Toggle = () => {
  return (
    <div id={styles.toggle}>
      <FaArrowsAltH />
    </div>
  );
};

export default Toggle;
