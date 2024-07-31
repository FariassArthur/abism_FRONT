import { useEffect, useRef, useState } from "react";
import styles from "./ShowPoem.module.scss";

// image
import image from "../../assets/images/headerimage.png";

//icons
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

// component
import BodyHeader from "../../components/BodyHeader/BodyHeader";

//router
import { useNavigate, useParams } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { takeById, editPoemSlice, deletePoem } from "../../slices/poemSlice";
import { takeUserById } from "../../slices/userSlice";
import { RootState } from "../../store";

const ShowPoem = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate()

  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [owner, setOwner] = useState<boolean>(false);

  const checkOwner = (userId: string) => {
    const userIdLocal = localStorage.getItem("id");
    if (userId == userIdLocal) {
      setOwner(true);
    } else {
      setOwner(false);
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
      checkOwner(poem.userid);
      dispatch(takeUserById(poem.userid));
    }
  }, [poem]);

  const { userById } = useSelector((state: RootState) => state.user);
  console.log({ userById });

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
      navigate("/account")
    } catch (error) {
      console.error("Erro ao atualizar poema:", error);
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();

    try {
      await dispatch(deletePoem(id!))
      navigate("/account")
    } catch (error) {
      console.error("Erro ao deletar poema:", error);
    }
  }

  return (
    <div id={Theme === "dark" ? styles.showPoemDark : styles.showPoem}>
      <img src={image} alt="" />
      <div className={styles.containner}>
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
              {userById && (
                <p>
                  by: <span>{userById.name}</span>
                </p>
              )}
            </div>

            {owner && (
              <section className={styles.sectionBtn}>
                <div className={styles.btnDelete} onClick={handleDelete}>
                  <FaRegTrashAlt size={20} />
                </div>
                <button className={styles.btnSubmit} type="submit">
                  <MdEdit size={20} className={styles.iconArrow} />
                </button>
              </section>
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
