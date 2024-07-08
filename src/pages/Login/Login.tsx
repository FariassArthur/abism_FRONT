//css
import styles from "./Login.module.scss";

//components
import Account from "../../components/Account/Account";
import Header from "../../components/Header/Header";

//image
import image from "../../assets/images/asideimage.jpg";

//redux
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Login = () => {
  const { Theme } = useSelector((state: RootState) => state.extra);

  return (
    <div id={Theme === "dark" ? styles.loginDark : styles.login}>
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
