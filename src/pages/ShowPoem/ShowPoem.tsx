import { useEffect, useRef, useState } from "react";
import styles from "./ShowPoem.module.scss";

// image
import image from "../../assets/images/headerimage.png";

//icons
import { MdEdit } from "react-icons/md";

// component
import BodyHeader from "../../components/BodyHeader/BodyHeader";

//router
import { useParams } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { takeById } from "../../slices/poemSlice";
import { RootState } from "../../store";
import { editPoemSlice } from "../../slices/poemSlice";

interface Poem {
  id: string;
  title: string;
  content: string;
}

interface poemEdit {
  poem: Poem;
  id: string;
}

const ShowPoem = () => {
  const { id } = useParams();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [owner, setOwner] = useState<boolean>(false);

  const checkOwner = (userId: string) => {
    const userIdLocal = localStorage.getItem("id");

    if (userId == userIdLocal) {
      setOwner(true);
      console.log("deu certo");
    } else {
      setOwner(false);
      console.log("não é o dono");
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to calculate scroll height correctly
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(takeById(id));
    }
  }, [dispatch, id]);

  const { poemUnique: poem } = useSelector((state: RootState) => state.poem);
  const { Theme } = useSelector((state: RootState) => state.extra);

  useEffect(() => {
    if (poem) {
      setTitle(poem.title);
      setContent(poem.content);

      checkOwner(poem.userid); // Certifique-se de que o poema tem uma propriedade userId ou algo similar
    }
  }, [poem]);

  useEffect(() => {
    resizeTextarea(); // Initial resize

    const handleResize = () => resizeTextarea();
    if (textareaRef.current) {
      textareaRef.current.addEventListener("input", handleResize);
    }

    return () => {
      if (textareaRef.current) {
        textareaRef.current.removeEventListener("input", handleResize);
      }
    };
  }, [content]); // Run effect when content changes

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      id,
      title,
      content,
    };

    try {
      await dispatch(editPoemSlice(data));
    } catch (error) {
      return { "Erro ao atualizar poema:": error };
    }
  };

  return (
    <div id={Theme === "dark" ? styles.showPoemDark : styles.showPoem}>
      <img src={image} alt="" />
      <div className={styles.container}>
        <BodyHeader searchAssets={false} />

        <form onSubmit={handleEdit}>
          <section className={styles.infoPoem}>
            <div>
              <input
                type="text"
                placeholder="Insira o título"
                name="title"
                value={title || ""}
                onChange={(e) => setTitle(e.target.value)}
                disabled={!owner}
              />
              <p>
                by: <span>Florencio</span>
              </p>
            </div>

            {owner && (
              <button className={styles.btnSubmit} type="submit">
                <MdEdit size={20} className={styles.iconArrow} />
              </button>
            )}
          </section>

          <div className={styles.containnerForm}>
            <textarea
              name="content"
              ref={textareaRef}
              required
              disabled={!owner}
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

export default ShowPoem;
