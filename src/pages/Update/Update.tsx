//css
import styles from "./Update.module.scss";

//image
import image from "../../assets/images/asideimage.jpg";

//components
import Account from "../../components/Account/Account";
import Header from "../../components/Header/Header";

const Update = () => {
  return (
    <div id={styles.update}>
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
