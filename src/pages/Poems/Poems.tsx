import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import styles from "./Poems.module.scss";
import BodyHeader from "../../components/BodyHeader/BodyHeader";
import Header from "../../components/Header/Header";
import PoemModal from "../../components/PoemModal/PoemModal";
import { poems } from "../../slices/poemSlice";
import { RootState } from "../../store";

const Poems = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(poems());
  }, [dispatch]);

  const { poem } = useSelector((state: RootState) => state.poem);
  console.log(poem);

  return (
    <div id={styles.poems}>
      <Header toggle={false} sticky={false} auth={true} />

      <section className={styles.content}>
        <BodyHeader searchAssets={true} />
        <div>
          <ul>
            {Array.isArray(poem) &&
              poem.map((poemItem: any) => (
                <PoemModal
                  key={poemItem.id}
                  id={poemItem.id}
                  title={poemItem.title}
                  userName={""}
                  date={poemItem.createdat}
                />
              ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Poems;
