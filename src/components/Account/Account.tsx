//css
import styles from "./Account.module.scss"

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
            Já possui conta? <a href="/login">Clique aqui</a>
          </p>
        </div>
      )}

      {props.update && (
        <>
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
        </>
      )}

      {props.login && (
        <>
          <form action="POST">
            <h2>LOG IN ACCOUNT</h2>

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
            Não possui conta? <a href="/signin">Clique aqui</a>
          </p>
        </>
      )}
    </div>
  );
};

export default Account;
