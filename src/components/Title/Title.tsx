//css
import styles from "./Title.module.scss";

//image
import image from "../../assets/images/homeimage.png";

//types
import { ThemeType } from "../../types/themeTypes";

const Title = (props: ThemeType) => {
  return (
    <div id={styles.title}>
      <div className={styles.containner}>
        <div className={props.theme === "dark" ? styles.textDark : styles.text}>
          <h1>Abismo</h1>
          <h1 className={styles.last}>Poetico</h1>
        </div>
        <img
          className={props.theme === "dark" ? styles.imgDark : ""}
          src={image}
          alt=""
        />
      </div>
    </div>
  );
};

export default Title;
