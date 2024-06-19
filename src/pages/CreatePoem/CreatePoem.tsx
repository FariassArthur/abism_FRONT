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
          </div>
    </div>
  )
}

export default CreatePoem