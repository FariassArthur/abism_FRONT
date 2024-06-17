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
import { RootState } from "../../store";

const UserAccount = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <>
      {user && (
        <>
          <div id={styles.userAccount}>
            <img src={image} alt="" />
            <div className={styles.containner}>
              <>
                <BodyHeader />
                <section className={styles.infoUser}>
                  <div>
                    <h1>{user?.name}</h1>
                    <p>{user?.email}</p>
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
        </>
      )}
      {error && <h1>Error: {error}</h1>}
      {loading && <h1>Loading...</h1>}
    </>
  );
};

export default UserAccount;
