import { useEffect, useRef, useState } from "react";
import styles from "./CreatePoem.module.scss";

// image
import image from "../../assets/images/headerimage.png";

//icons
import { IoIosArrowDropright } from "react-icons/io";

// component
import BodyHeader from "../../components/BodyHeader/BodyHeader";

//redux
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { createPoem } from "../../slices/poemSlice";
import { RootState } from "../../store";

const CreatePoem = () => {
  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const {Theme} = useSelector((state: RootState) => state.extra)
  
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

  const handleCreatePoem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const poem = {
      title,
      content,
    };

    try {
      await dispatch(createPoem(poem));
    } catch (err) {
      console.error("Erro ao criar poema:", err);
    }

    setTitle("")
    setContent("")
  };

  return (
    <div id={Theme === "dark" ? styles.createPoemDark : styles.createPoem}>
      <img src={image} alt="" />
      <div className={styles.container}>
        <BodyHeader searchAssets={false} />

        <form onSubmit={handleCreatePoem}>
          <section className={styles.infoPoem}>
            <div>
              <input
                type="text"
                placeholder="Insira o título"
                name="title"
                value={title || ""}
                onChange={(e) => setTitle(e.target.value)}
              />
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
              value={content || ""}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Digite seu texto"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePoem;
