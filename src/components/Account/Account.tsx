//react
import { useState } from "react";

//css
import styles from "./Account.module.scss";

//router
import { Link } from "react-router-dom";

//redux
import { useDispatch } from "react-redux";
import { register } from "../../slices/authSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

type Props = {
  create?: boolean;
  update?: boolean;
  login?: boolean;
};

const Account = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
    };

    try {
      await dispatch(register(user)); // Aguarde a conclusão da ação register
      console.log(user);
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      {props.create && (
        <div id={styles.create}>
          <h2>CREATE YOUR ACCOUNT</h2>

          <form onSubmit={handleSubmit}>
            <div className="input">
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

            <div className="input">
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

            <div className="input">
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

            <input type="submit" value="Create Account" />
          </form>

          <p>
            Já possui conta? <Link to={"/login"}>Clique aqui</Link>
          </p>
        </div>
      )}

      {props.update && (
        <div>
          <h2>UPDATE YOUR ACCOUNT</h2>

          <form action="POST">
            <div className="input">
              <label htmlFor="name">Name:</label>
              <input required type="text" name="name" />
            </div>

            <div className="input">
              <label htmlFor="email">Email:</label>
              <input required type="email" name="email" />
            </div>

            <div className="input">
              <label htmlFor="pass">Password:</label>
              <input required type="text" name="pass" />
            </div>

            <div className="input">
              <label htmlFor="confirmPass">Confirm Password:</label>
              <input required type="text" name="confirmPass" />
            </div>

            <input type="submit" value="Update Account" />
          </form>
        </div>
      )}

      {props.login && (
        <div id={styles.login}>
          <h2>LOG IN ACCOUNT</h2>
          <form action="POST">
            <div className="input">
              <label htmlFor="email">Email:</label>
              <input required type="email" name="email" />
            </div>

            <div className="input">
              <label htmlFor="pass">Password:</label>
              <input required type="text" name="pass" />
            </div>

            <input type="submit" value="LOG IN" />
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
