//css
import styles from "./Account.module.scss";

//router
import { Link } from "react-router-dom";

type Props = {
  create?: boolean;
  update?: boolean;
  login?: boolean;
};

const Account = (props: Props) => {
  return (
    <div>
      {props.create && (
        <div id={styles.create}>
          <h2>CREATE YOUR ACCOUNT</h2>

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
