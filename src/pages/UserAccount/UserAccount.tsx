import { useState, useEffect } from "react";

// styles
import styles from "./UserAccount.module.scss";

// image
import image from "../../assets/images/headerimage.png";

// components
import Card from "../../components/Card/Card";
import BodyHeader from "../../components/BodyHeader/BodyHeader";

// icons
import { FaPencilAlt } from "react-icons/fa";

// router
import { Link } from "react-router-dom";

// redux
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../../slices/userSlice";

const UserAccount = () => {
  const { user, loading, error } = useSelector((state: any) => state.user);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [name, setName] = useState("Pedro");
  const [email, setEmail] = useState("teste@teste.com");

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div id={styles.userAccount}>
      <img src={image} alt="" />
      <div className={styles.containner}>
        {user ? (
          <>
            <BodyHeader />
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
          </>
        ) : (
          <h1>Não há usuário</h1>
        )}
      </div>
    </div>
  );
};

export default UserAccount;
