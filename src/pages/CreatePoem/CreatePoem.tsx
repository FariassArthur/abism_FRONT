import { useEffect, useRef } from "react";
import styles from "./CreatePoem.module.scss";

// image
import image from "../../assets/images/headerimage.png";

//icons
import { IoIosArrowDropright } from "react-icons/io";

// component
import BodyHeader from "../../components/BodyHeader/BodyHeader";

const CreatePoem = () => {
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

  const handleCreatePoem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


  };

  return (
    <div id={styles.createPoem}>
      <img src={image} alt="" />
      <div className={styles.container}>
        <BodyHeader searchAssets={false} />

        <form onSubmit={handleCreatePoem}>
          <section className={styles.infoPoem}>
            <div>
              <input type="text" placeholder="Insira o título" />
              <p>
                by: <span>Florencio</span>
              </p>
            </div>

            <button className={styles.btnSubmit} type="submit">
              <IoIosArrowDropright size={20} className={styles.iconArrow} />
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
