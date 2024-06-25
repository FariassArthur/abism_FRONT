//css
import styles from "./PoemModal.module.scss";

//router
import { Link } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  userName: string;
  date: number;
}

const PoemModal = (props: Props) => {
  return (
    <div id={styles.poemModel}>
      <Link to={`/poem/${props.id}`}>
        <h1>{props.title}</h1>
        <h3>by: {props.userName}</h3>

        <p>{props.date}</p>
      </Link>
    </div>
  );
};

export default PoemModal;
