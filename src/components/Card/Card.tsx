import { useEffect, useState } from "react";

//router
import { Link } from "react-router-dom";

//css
import styles from "./Card.module.scss";

//icons
import { FcLike } from "react-icons/fc";

//redux
import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { takeUsers } from "../../slices/userSlice";

interface Props {
  create: boolean;
  data: any;
}

const Card = (props: Props) => {
  /* const [countLikes, setCountLikes] = useState<number>(3); */
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const takeUsersFunc = () => {
    if (!users) {
      dispatch(takeUsers());
    }
  };

  const { users } = useSelector((state: RootState) => state.user);
  const { Theme } = useSelector((state: RootState) => state.extra);

  useEffect(() => {
    takeUsersFunc();
  }, []);

  // Criação do dicionário de usuários
  const usersDict = users?.reduce((acc: any, user: any) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

  return (
    <div id={Theme === "dark" ? styles.cardDark : styles.card}>
      {/* <i className={styles.likeIcon}>
        {" "}
        <span>{countLikes}</span>
        <FcLike />
      </i> */}

      <section className={styles.info}>
        <h3>{props.data && props.data.title}</h3>
        {usersDict && <h4>by: {usersDict[props.data.userid]}</h4>}
      </section>

      <p className={styles.textCard}>{props.data && props.data.content}</p>

      <h4>
        <Link to={`/poem/${props.data.id}`}>Seguir Lendo</Link>
      </h4>
    </div>
  );
};

export default Card;
