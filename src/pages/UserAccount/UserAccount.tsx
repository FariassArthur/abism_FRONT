import { useState, useEffect } from "react";

// styles
import styles from "./UserAccount.module.scss";

// image
import image from "../../assets/images/headerimage.png";

// components
import Card from "../../components/Card/Card";
import BodyHeader from "../../components/BodyHeader/BodyHeader";

// icons
import { FaPencilAlt, FaPlus } from "react-icons/fa";

// router
import { Link } from "react-router-dom";

// redux
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../../slices/userSlice";
import { takeUserPoemsSlice } from "../../slices/poemSlice";
import { RootState } from "../../store";

const UserAccount = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  // Select
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const { userPoems } = useSelector((state: RootState) => state.poem);
  const { Theme } = useSelector((state: RootState) => state.extra);

  // Efeito para buscar o perfil do usuário e os poemas do usuário
  useEffect(() => {
    if (userPoems)
      if (!user) {
        // Verifica se o usuário já foi carregado antes de fazer a requisição
        dispatch(profile());
      }

    // Verifica se os poemas do usuário já foram carregados antes de fazer a requisição
    if (userPoems && !userPoems.length) {
      dispatch(takeUserPoemsSlice());
    }
  }, [dispatch, user, userPoems]);

  // Efeito para atualizar os estados locais de email e nome quando o usuário é carregado
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
    }
  }, [user]);

  return (
    <>
      {error && <h1>Error: {error}</h1>}
      {loading && <h1 className={styles.loading}>Loading...</h1>}
      {user && (
        <div
          id={Theme === "dark" ? styles.userAccountDark : styles.userAccount}
        >
          <img src={image} alt="" />
          <div className={styles.containner}>
            <>
              <BodyHeader searchAssets={false} />
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
                <Link to={"/create"}>
                  <section className={styles.card}>
                    <i className={styles.plusIcon}>
                      <FaPlus />
                    </i>
                  </section>
                </Link>

                <section className={styles.cardList}>
                  {userPoems &&
                    userPoems.map((poemItem) => (
                      <Card create={false} key={poemItem.id} data={poemItem} />
                    ))}
                </section>
              </section>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAccount;
