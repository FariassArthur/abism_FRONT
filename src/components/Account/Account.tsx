//react
import { useState, useEffect } from "react";

//css
import styles from "./Account.module.scss";

//router
import { Link } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { register, login, reset } from "../../slices/authSlice";
import { update, profile } from "../../slices/userSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../store";

//icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { FaArrowRightToBracket } from "react-icons/fa6";

type Props = {
  create?: boolean;
  update?: boolean;
  login?: boolean;
};

const Account = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading, error } = useSelector((state: any) => state.auth);
  const { user } = useSelector((state: RootState) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const takeProfileForEdit = async (User: any) => {
    if (!User) {
      await dispatch(profile());
    }

    setName(User.name);
    setEmail(User.email);
  };

  useEffect(() => {
    takeProfileForEdit(user);
  }, [user]);

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
    };

    try {
      await dispatch(register(user)); // Aguarde a conclusão da ação register
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }

    setName("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      await dispatch(login(user));
    } catch (error) {
      console.error("Erro ao logar:", error);
    }

    setEmail("");
    setPassword("");
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (confirmPass === password) {
      const user = {
        name,
        email,
        password,
      };

      try {
        await dispatch(update(user));
      } catch (error) {
        console.error("Erro ao atualizar:", error);
      }
    }

    setPassword("");
    setConfirmPass("");

    takeProfileForEdit(user);
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div>
      {props.create && (
        <div id={styles.create}>
          <h2>CREATE YOUR ACCOUNT</h2>

          <form onSubmit={handleCreateAccount}>
            <div className={styles.inputContainner}>
              <label htmlFor="name">Name:</label>
              <input
                placeholder="Adicione seu nome"
                required
                type="text"
                name="name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.inputContainner}>
              <label htmlFor="email">Email:</label>
              <input
                placeholder="Adicione seu email"
                required
                type="email"
                name="email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.inputContainner}>
              <label htmlFor="pass">Password:</label>
              <input
                placeholder="Adicione sua senha"
                required
                type="password"
                name="pass"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!loading && (
              <div className={styles.submit}>
                <i>
                  <FaArrowRightToBracket />
                </i>
                <input type="submit" value="Create Account" />
              </div>
            )}
            {loading && (
              <div className={styles.submit}>
                <i>
                  <AiOutlineLoading3Quarters />
                </i>
                <input type="submit" value="Carregando" />
              </div>
            )}
            {error && (
              <div className={styles.submit}>
                <i>
                  <MdErrorOutline />
                </i>
                <input type="submit" value="Tente novamente" />
              </div>
            )}
          </form>

          <p>
            Já possui conta? <Link to={"/login"}>Clique aqui</Link>
          </p>
        </div>
      )}

      {props.update && (
        <div id={styles.update}>
          <h2>UPDATE YOUR ACCOUNT</h2>

          <form onSubmit={handleUpdate}>
            <div className={styles.inputContainner}>
              <label htmlFor="name">Name:</label>
              <input
                required
                type="text"
                name="name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.inputContainner}>
              <label htmlFor="email">Email:</label>
              <input
                required
                type="email"
                name="email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.inputContainner}>
              <label htmlFor="pass">Password:</label>
              <input
                required
                type="text"
                name="pass"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={styles.inputContainner}>
              <label htmlFor="confirmPass">Confirm Password:</label>
              <input
                required
                type="text"
                name="confirmPass"
                value={confirmPass || ""}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>

            {!loading && (
              <div className={styles.submit}>
                <i>
                  <FaArrowRightToBracket />
                </i>
                <input type="submit" value="UPDATE" />
              </div>
            )}
            {loading && (
              <div className={styles.submit}>
                <i>
                  <AiOutlineLoading3Quarters />
                </i>
                <input type="submit" value="Carregando" />
              </div>
            )}
            {error && (
              <div className={styles.submit}>
                <i>
                  <MdErrorOutline />
                </i>
                <input type="submit" value="Tente novamente" />
              </div>
            )}
          </form>
        </div>
      )}

      {props.login && (
        <div id={styles.login}>
          <h2>LOG IN ACCOUNT</h2>
          <form onSubmit={handleLogin}>
            <div className={styles.inputContainner}>
              <label htmlFor="email">Email:</label>
              <input
                placeholder="Adicione seu email"
                required
                type="email"
                name="email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.inputContainner}>
              <label htmlFor="pass">Password:</label>
              <input
                required
                type="password"
                name="pass"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!loading && (
              <div className={styles.submit}>
                <i>
                  <FaArrowRightToBracket />
                </i>
                <input type="submit" value="LOG IN" />
              </div>
            )}
            {loading && (
              <div className={styles.submit}>
                <i>
                  <AiOutlineLoading3Quarters />
                </i>
                <input type="submit" value="Carregando" />
              </div>
            )}
            {error && (
              <div className={styles.submit}>
                <i>
                  <MdErrorOutline />
                </i>
                <input type="submit" value="Tente novamente" />
              </div>
            )}
          </form>

          <p>
            Não possui conta? <Link to={"/signin"}>Clique aqui</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Account;
