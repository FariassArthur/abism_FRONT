import { useState } from "react";

//styles
import styles from "./UserAccount.module.scss";

//image
import image from "../../assets/images/headerimage.png";

//components
import Card from "../../components/Card/Card";

//icons
import { FaPencilAlt } from "react-icons/fa";

//router
import { Link, redirect } from "react-router-dom";

const UserAccount = () => {
  const [name, setName] = useState("Pedro");
  const [email, setEmail] = useState("Pedro@gmail.com");

  return (
    <div id={styles.userAccount}>
      <img src={image} alt="" />
      <div className={styles.containner}>
        <section className={styles.infoUser}>
          <div>
            <h1>{name}</h1>
            <p>{email}</p>
          </div>
          <aside>
            <Link to={"/update"}>
              <FaPencilAlt />
            </Link>
          </aside>
        </section>

        <section className={styles.cards}>
          <Card />
        </section>
      </div>
    </div>
  );
};

export default UserAccount;
