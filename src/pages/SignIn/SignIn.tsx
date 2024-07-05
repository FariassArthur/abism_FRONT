//css
import styles from "./SignIn.module.scss";

//image
import image from "../../assets/images/asideimage.jpg";

//components
import Account from "../../components/Account/Account";
import Header from "../../components/Header/Header";

//redux
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const SignIn = () => {
  const { Theme } = useSelector((state: RootState) => state.extra);

  return (
    <div id={Theme === "dark" ? styles.signInDark : styles.signIn}>
      <div>
        <Header sticky={false} toggle={false} config={true} />
      </div>

      <section className={styles.content}>
        <aside>
          <img src={image} alt="" />
        </aside>
        <Account create={true} />
      </section>
    </div>
  );
};

export default SignIn;
