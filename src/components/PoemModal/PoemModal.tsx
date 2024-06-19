//css
import styles from "./PoemModal.module.scss";

interface Props {
  title: string;
  userName: string;
  date: number;
}

const PoemModal = (props: Props) => {
  return (
    <div id={styles.poemModel}>
      <h1>{props.title}</h1>
      <h3>by: {props.userName}</h3>

      <p>{props.date}</p>
    </div>
  );
};

export default PoemModal;
