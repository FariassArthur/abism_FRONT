import { useEffect, useState } from "react";

//styles
import styles from "./Poems.module.scss";

//components
import BodyHeader from "../../components/BodyHeader/BodyHeader";
import Header from "../../components/Header/Header";
import PoemModal from "../../components/PoemModal/PoemModal";

//redux
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { poems } from "../../slices/poemSlice";
import { takeUsers } from "../../slices/userSlice";
import { RootState } from "../../store";

const Poems = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const fetchPoems = async () => {
    await dispatch(poems());
  };

  useEffect(() => {
    fetchPoems();
    dispatch(takeUsers());
  }, []); // O useEffect só depende de dispatch

  const { poem } = useSelector((state: RootState) => state.poem);
  const { users } = useSelector((state: RootState) => state.user);
  
  // Criação do dicionário de usuários
  const usersDict = users?.reduce((acc: any, user: any) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

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
                  userName={usersDict ? usersDict[poemItem.userid] : "Unknown"}
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
