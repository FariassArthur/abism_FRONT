import styles from "./CreatePoem.module.scss"

// image
import image from "../../assets/images/headerimage.png";

//component
import BodyHeader from "../../components/BodyHeader/BodyHeader";

type Props = {}

const CreatePoem = (props: Props) => {
  return (
    <div id={styles.createPoem}>
          <img src={image} alt="" />
          <div className={styles.containner}>
              <BodyHeader searchAssets={false} />

              <section className={styles.infoPoem}>
                <span>9/02/2002</span>
                <h1>Title</h1>
                <p>by: <span>Florencio</span></p>
              </section>

              <form>
                <textarea name="" id="">
                  
                </textarea>
              </form>
          </div>
    </div>
  )
}

export default CreatePoem