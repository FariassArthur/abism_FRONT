//css
import styles from "./PoemModal.module.scss";

const PoemModal = () => {
  return (
    <div id={styles.poemModel}>
      <h1>Título</h1>
      <h3>by: {"Pedro"}</h3>

      <p>Maio 1, 2024</p>
    </div>
  );
};

export default PoemModal;
