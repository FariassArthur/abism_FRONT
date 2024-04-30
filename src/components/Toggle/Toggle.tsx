import { useState } from "react";

//css
import styles from "./Toggle.module.scss";

//icon
import { FaArrowsAltH } from "react-icons/fa";

//components
import Header from "../Header/Header";

const Toggle = () => {
  const [click, setClick] = useState<boolean>(false);

  return (
    <div onClick={() => click ? setClick(false) : setClick(true)} id={styles.toggle}>

      {click && <Header toggle={true} />}
      
      <div className={styles.iconToggle}>
        <FaArrowsAltH />
      </div>
      
    </div>
  );
};

export default Toggle;
