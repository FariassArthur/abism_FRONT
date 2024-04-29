//css
import styles from "./Home.module.scss";

//component
import Title from "../components/Title/Title";
import Info from "../components/Informacoes/Info";
import CardsContainner from "../components/CardsContainner/CardsContainner";
import Toggle from "../components/Toggle/Toggle";

const Home = () => {
  return (
    <>
      <Toggle />

      <Title />
      <Info />
      <CardsContainner />

      <footer>&#169;2024 - fariassarthur | all rights reserved</footer>
    </>
  );
};

export default Home;
