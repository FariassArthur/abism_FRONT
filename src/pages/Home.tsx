//css
import styles from "./Home.module.scss";

//component
import Title from "../components/Title/Title";
import Info from "../components/Informacoes/Info";
import CardsContainner from "../components/CardsContainner/CardsContainner";
import Toggle from "../components/Toggle/Toggle";
import Header from "../components/Header/Header";

const Home = () => {
  return (
    <div id={styles.home}>
      <Header toggle={false} sticky={true} />

      <Title />
      <Info />
      <CardsContainner />

      <footer>&#169;2024 - fariassarthur | all rights reserved</footer>
    </div>
  );
};

export default Home;
