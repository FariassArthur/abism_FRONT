import { useEffect, useRef } from "react";
import styles from "./CreatePoem.module.scss";

// image
import image from "../../assets/images/headerimage.png";

//icons
import { IoIosArrowDropright } from "react-icons/io";

// component
import BodyHeader from "../../components/BodyHeader/BodyHeader";

type Props = {};

const CreatePoem = (props: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to calculate scroll height correctly
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      resizeTextarea();
      textareaRef.current.addEventListener("input", resizeTextarea);
    }

    return () => {
      if (textareaRef.current) {
        textareaRef.current.removeEventListener("input", resizeTextarea);
      }
    };
  }, [textareaRef]);

  return (
    <div id={styles.createPoem}>
      <img src={image} alt="" />
      <div className={styles.container}>
        <BodyHeader searchAssets={false} />

        <form>
          <section className={styles.infoPoem}>
            <div>
              <span>9/02/2002</span>
              <h1>Title</h1>
              <p> 
                by: <span>Florencio</span>
              </p>
            </div>

            <button>
              <i>
                <IoIosArrowDropright />
              </i>
              <input type="submit" placeholder="nada" />
            </button>
          </section>

          <div className={styles.containnerForm}>
            <textarea
              ref={textareaRef}
              name="content"
              id=""
              required
              placeholder="Digite seu texto"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePoem;
