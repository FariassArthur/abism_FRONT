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

//icons
import { FaPlus } from "react-icons/fa";

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

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (user && user) {
      console.log(user);
      setEmail(user.email);
      setName(user.name);
    }
  }, [user]);

  useEffect(() => {
    dispatch(takeUserPoemsSlice());
  }, []);

  const { userPoems } = useSelector((state: RootState) => state.poem);
  console.log(userPoems);

  return (
    <>
      {error && <h1>Error: {error}</h1>}
      {user ? (
        <div id={styles.userAccount}>
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
                      <div className="card">
                        <Card
                          create={false}
                          key={poemItem.id}
                          data={poemItem}
                        />
                      </div>
                    ))}
                </section>
              </section>
            </>
          </div>
        </div>
      ) : (
        loading && <h1>Loading...</h1>
      )}
    </>
  );
};

export default UserAccount;

/* 
<div id={styles.userAccount}>
            <img src={image} alt="" />
            <div className={styles.containner}>
              <>
                <BodyHeader />
                <section className={styles.infoUser}>
                  <div>
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
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
            </div>
          </div>
 */
