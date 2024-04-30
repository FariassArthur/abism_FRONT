import { useState, useEffect } from "react";

//css
import styles from "./Header.module.scss";

//router
import { Link, useLocation } from "react-router-dom";

//icons
import { FaUserPlus, FaUserCog, FaMoon } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { IoLogOutSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

interface Props {
  config?: boolean;
  auth?: boolean;
  logout?: boolean;

  toggle: boolean;
}

const Header = (props: Props) => {
  const [navLinks, setNavLinks] = useState<JSX.Element | null>(null);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setNavLinks(
          <>
            <Link className={styles.underline} to="/">
              INICIO
            </Link>
            <Link to="">USUARIO</Link>
            <Link to="/poems">POEMAS</Link>
          </>
        );
        break;
      case "/login":
        setNavLinks(
          <>
            <Link to="/">INICIO</Link>
            <Link className={styles.underline} to="">
              USUARIO
            </Link>
            <Link to="/poems">POEMAS</Link>
          </>
        );
        break;
      case "/signin":
        setNavLinks(
          <>
            <Link to="/">INICIO</Link>
            <Link className={styles.underline} to="">
              USUARIO
            </Link>
            <Link to="/poems">POEMAS</Link>
          </>
        );
        break;
      case "/poems":
        setNavLinks(
          <>
            <Link to="/">INICIO</Link>
            <Link to="">USUARIO</Link>
            <Link className={styles.underline} to="/poems">
              POEMAS
            </Link>
          </>
        );
        break;
      default:
        setNavLinks(
          <>
            <Link to="/">INICIO</Link>
            <Link to="">USUARIO</Link>
            <Link to="/poems">POEMAS</Link>
          </>
        );
    }
  }, [location.pathname]);

  return (
    <div className={props.toggle ? styles.toggleContainner : styles.containner}>
      {props.toggle ? (
        <>
          
          <section className={styles.navlinks}>{navLinks}</section>

          <section className={styles.iconsSection}>
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
        </>
      ) : (
        <>
          <section className="section-nav">{navLinks}</section>

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
        </>
      )}
    </div>
  );
};

export default Header;
