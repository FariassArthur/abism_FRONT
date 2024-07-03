//css
import styles from "./PoemModal.module.scss";

//router
import { Link } from "react-router-dom";

//redux
import { useSelector } from "react-redux";
import { RootState } from "../../store";
interface Props {
  id: string;
  title: string;
  userName: string;
  date: number;
}

const PoemModal = (props: Props) => {

  const {Theme} = useSelector((state: RootState) => state.extra)
  
  return (
    <div id={Theme === "dark" ? styles.poemModelDark : styles.poemModel}>
      <Link to={`/poem/${props.id}`}>
        <h1>{props.title}</h1>
        <h3>by: {props.userName}</h3>

        <p>{props.date}</p>
      </Link>
    </div>
  );
};

export default PoemModal;
