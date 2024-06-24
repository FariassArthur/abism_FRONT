import { useEffect, useRef, useState } from "react";
import styles from "./ShowPoem.module.scss";

// image
import image from "../../assets/images/headerimage.png";

//icons
import { IoIosArrowDropright } from "react-icons/io";

// component
import BodyHeader from "../../components/BodyHeader/BodyHeader";

//redux
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

const ShowPoem = () => {
  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);


  const handleShowPoem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTitle("")
    setContent("")
  };

  return (
    <div id={styles.ShowPoem}>
      <img src={image} alt="" />
      <div className={styles.container}>
        <BodyHeader searchAssets={false} />

        <form onSubmit={handleShowPoem}>
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

export default ShowPoem;
