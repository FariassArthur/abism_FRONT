import { useEffect, useRef, useState } from "react";
import styles from "./ShowPoem.module.scss";

// image
import image from "../../assets/images/headerimage.png";

//icons
import { IoIosArrowDropright } from "react-icons/io";

// component
import BodyHeader from "../../components/BodyHeader/BodyHeader";

//router
import { useParams } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { takeById } from "../../slices/poemSlice";
import { RootState } from "../../store";

const ShowPoem = () => {
  const { id } = useParams();

  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [owner, setOwner] = useState<boolean>(false);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    if (id) {
      dispatch(takeById(id));
    }
  }, []);

  const { poemUnique: poem } = useSelector((state: RootState) => state.poem);
  const { user } = useSelector((state: RootState) => state.user);

  if (user && user.id === poem?.user_id) {
    setOwner(true);
  }

  useEffect(() => {
    if (poem) {
      setTitle(poem.title);
      setContent(poem.content);

      console.log(poem);
    }
  }, [poem]);

  return (
    <div id={styles.showPoem}>
      <img src={image} alt="" />
      <div className={styles.container}>
        <BodyHeader searchAssets={false} />

        <form>
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
              name="content"
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

export default ShowPoem;
