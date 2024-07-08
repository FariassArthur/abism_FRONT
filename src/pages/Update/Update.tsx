//css
import styles from "./Update.module.scss";

//image
import image from "../../assets/images/asideimage.jpg";

//components
import Account from "../../components/Account/Account";
import Header from "../../components/Header/Header";

//redux
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Update = () => {

  const {Theme} = useSelector((state: RootState) => state.extra)
  
  return (
    <div id={Theme === "dark" ? styles.updateDark : styles.update}>
      <div>
        <Header sticky={false} toggle={false} />
      </div>

      <section className={styles.content}>
        <aside>
          <img src={image} alt="" />
        </aside>
        <Account update={true} />
      </section>
    </div>
  );
};

export default Update;
