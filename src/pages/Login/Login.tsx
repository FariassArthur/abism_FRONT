//css
import styles from "./Login.module.scss";

//components
import Account from "../../components/Account/Account";
import Header from "../../components/Header/Header";

//image
import image from "../../assets/images/asideimage.jpg";

const Login = () => {
  return (
    <div id={styles.login}>
      <div className="containner">
        <Header toggle={false} auth={true} sticky={false} />
      </div>

      <section className={styles.content}>
        <aside>
          <img src={image} alt="" />
        </aside>
        <Account login={true} />
      </section>
    </div>
  );
};

export default Login;
