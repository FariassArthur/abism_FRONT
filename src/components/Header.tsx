//router
import { Link } from "react-router-dom";

//icons
import { FaUserPlus, FaSun, FaMoon } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";

interface Props {
  config?: boolean,
  auth?: boolean,
  noAuth?: boolean
}

const Header = (props: Props) => {
  return (
    <div>
      <section>
        <Link to="/">INICIO</Link>
        <Link to="">USUARIO</Link>
        <Link to="">POEMAS</Link>
      </section>

      <section>
        <div className="icon">
          <FaUserPlus />
        </div>

        <div className="icon">
          {/* <FaSun /> */}

          <FaMoon />
        </div>

        <div className="icon">
          <GrLanguage />
        </div>
      </section>
    </div>
  );
};

export default Header;
