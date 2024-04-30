//css
import styles from "./Poems.module.scss";

//components
import BodyHeader from "../../components/BodyHeader/BodyHeader";
import Header from "../../components/Header/Header";
import PoemsContent from "../../components/Poems/Poems";

const Poems = () => {
  return (
    <div id={styles.poems}>
      <Header toggle={false} sticky={false} />

      <section className={styles.content}>
        <BodyHeader />
        <PoemsContent />
      </section>
    </div>
  );
};

export default Poems;
