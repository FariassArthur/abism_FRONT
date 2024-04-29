//css
import styles from "./Title.module.scss"

//image
import image from "../../assets/images/homeimage.png"

const Title = () => {
  return (
    <div id={styles.title}>
        <div className={styles.containner}>
            <div className={styles.text}>
                <h1>Abismo</h1>
                <h1 className={styles.last}>Poetico</h1>
            </div>
            <img src={image} alt="" />
        </div>
    </div>
  )
}

export default Title