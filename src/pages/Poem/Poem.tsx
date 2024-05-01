//css
import styles from "./Poem.module.scss";

//icon
import { MdArrowRight } from "react-icons/md";

//image
import image from "../../assets/images/headerimage.png";

const Poem = () => {
  return (
    <div id={styles.poem}>
      <img src={image} alt="" />

      <div className={styles.containner}>
        <div className={styles.nav}>
          <p>
            <span className={styles.inicio}>INICIO</span> {<MdArrowRight />}
            <span>USUARIO</span> {<MdArrowRight />} <span>TÍTULO</span>
          </p>
        </div>

        <section className={styles.titleHeader}>
          <div>
            <p>March 26, 2024</p>

            <h1>Não sei quantas almas tenho</h1>
            <h4>by Fernando Pessoa</h4>
          </div>
          <img src="" alt="Imagem" />
        </section>

        <p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Exercitationem deleniti culpa facere dolorum, expedita cupiditate!
          Natus harum quas aliquid eaque, esse, impedit perferendis nesciunt
          aspernatur quae tempore repellendus ad temporibus! Lorem ipsum, dolor
          sit amet consectetur adipisicing elit. Maxime doloribus cum quibusdam
          tempora ut dicta sit, nihil sunt ad. Eligendi soluta quasi blanditiis.
          Cupiditate eveniet nesciunt voluptate ab aliquam iusto! Lorem ipsum
          dolor, sit amet consectetur adipisicing elit. Consectetur rerum
          nostrum harum officia exercitationem, cumque perspiciatis consequatur?
          Libero labore, laboriosam illum dolor asperiores tempora temporibus
          architecto delectus officia veniam facilis. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quasi nulla culpa laborum magni
          voluptatum blanditiis. Laborum, porro architecto nisi neque non qui
          repudiandae dicta minus, voluptatum nobis aperiam aliquam molestiae!
        </p>
      </div>
    </div>
  );
};

export default Poem;
