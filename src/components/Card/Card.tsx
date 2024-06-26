import { useState } from "react";

//router
import { Link } from "react-router-dom";

//css
import styles from "./Card.module.scss";

//icons
import { FcLike } from "react-icons/fc";


interface Props {
  create: boolean;
  data: any;
}

const Card = (props: Props) => {
  const [countLikes, setCountLikes] = useState<number>(3);

  return (
    <div id={styles.card}>
      <i className={styles.likeIcon}>
        {" "}
        <span>{countLikes}</span>
        <FcLike />
      </i>

      <section className={styles.info}>
        <h3>{props.data && props.data.title}</h3>
        <h4>by: Pedro</h4>
      </section>

      <p className={styles.textCard}>{props.data && props.data.content}</p>

      <h4>
        <Link to="">Seguir Lendo</Link>
      </h4>
    </div>
  );
};

export default Card;
