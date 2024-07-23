//css
import styles from "./Info.module.scss";

//image
import image from "../../assets/images/asidehome.jpg";

//types
import { ThemeType } from "../../types/themeTypes";

const Info = (props: ThemeType) => {
  return (
    <div id={props.theme === "dark" ? styles.infoDark : styles.info}>
      <h1>Informações</h1>

      <section>
        <p>
          Bem-vindo ao Abismo Poético, um espaço dedicado à expressão e à
          criatividade através da poesia. Aqui, você pode compartilhar seus
          poemas, explorar as criações de outros escritores e refinar suas obras
          com nossas ferramentas de edição intuitivas. Queremos que cada verso e
          estrofe ganhem vida, proporcionando uma plataforma onde a beleza das
          palavras pode ser apreciada e aprimorada. Entre, mergulhe em suas
          emoções e deixe sua criatividade fluir neste abismo de inspiração
          literária.
        </p>
        <img src={image} alt="" />
      </section>
    </div>
  );
};

export default Info;
