//css
import styles from "./Home.module.scss";

//component
import Header from "../components/Header/Header";
import Title from "../components/Title/Title";
import Info from "../components/Informacoes/Info";
import CardsContainner from "../components/CardsContainner/CardsContainner";

const Home = () => {
  return (
    <>
      <Header toggle={true} auth={true} logout={true} />

      <Title />
      <Info />
      <CardsContainner />

      <footer>&#169;2024 - fariassarthur | all rights reserved</footer>
    </>
  );
};

export default Home;
