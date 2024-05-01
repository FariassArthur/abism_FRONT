//css
import styles from "./Poems.module.scss";

//components
import BodyHeader from "../../components/BodyHeader/BodyHeader";
import Header from "../../components/Header/Header";
import PoemModal from "../../components/PoemModal/PoemModal";

const Poems = () => {
  return (
    <div id={styles.poems}>
      <Header toggle={false} sticky={false} auth={true} />

      <section className={styles.content}>
        <BodyHeader />
        <div>
          <PoemModal />
          <PoemModal />
          <PoemModal />
          <PoemModal />
        </div>
      </section>
    </div>
  );
};

export default Poems;
