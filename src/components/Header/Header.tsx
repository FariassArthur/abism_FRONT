//css
import "./Header.module.scss";

//router
import { Link } from "react-router-dom";

//icons
import {
  FaUserPlus,
  FaUserCog,
  FaUserTimes,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { IoLogOutSharp } from "react-icons/io5";

interface Props {
  config?: boolean;
  auth?: boolean;
  logout?: boolean;
}

const Header = (props: Props) => {
  return (
    <div>
      <section>
        <Link to="/">INICIO</Link>
        <Link to="">USUARIO</Link>
        <Link to="/poems">POEMAS</Link>
      </section>

      <section>
        <div className="icon">
          {props.auth && (
            <Link to="/signin">
              <FaUserPlus />
            </Link>
          )}
          {props.config && <FaUserCog />}
        </div>

        <div className="icon">
          {/* <FaSun /> */}

          <FaMoon />
        </div>

        <div className="icon">
          <GrLanguage />
        </div>

        {props.logout && (
          <div className="icon">
            <IoLogOutSharp />
          </div>
        )}
      </section>
    </div>
  );
};

export default Header;
