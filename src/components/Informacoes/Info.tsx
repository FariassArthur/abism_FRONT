//css
import styles from "./Info.module.scss";

//image
import image from "../../assets/images/asidehome.jpg";

//types
import { ThemeType } from "../../types/themeTypes";

const Info = (props: ThemeType) => {
  return (
    <div id={props.theme === "dark" ? styles.infoDark : styles.info}>
      <h1>Informações</h1>

      <section>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          eum optio ab numquam doloremque alias quis voluptatibus iste
          architecto, nesciunt eaque quo, animi similique minima mollitia ipsa
          dolores. Laboriosam, vel. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Hic vero voluptatibus ducimus, quo sunt provident!
          Necessitatibus corporis reiciendis quos natus itaque eligendi
          molestias expedita error nostrum illum, repellat blanditiis
          voluptatibus.
        </p>
        <img src={image} alt="" />
      </section>
    </div>
  );
};

export default Info;
