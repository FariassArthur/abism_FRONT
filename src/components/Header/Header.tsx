import { useState, useEffect } from "react";

//css
import styles from "./Header.module.scss";

//router
import { Link, useLocation } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

//icons
import { FaUserPlus, FaUserCog, FaMoon } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { IoLogOutSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

interface Props {
  config?: boolean;
  auth?: boolean;
  logout?: boolean;

  sticky: boolean;
  toggle: boolean;
}

const Header = (props: Props) => {
  const [navLinks, setNavLinks] = useState<JSX.Element | null>(null);
  const location = useLocation();

  const { userState } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setNavLinks(
          <>
            <Link className={styles.underline} to="/">
              INICIO
            </Link>
            <Link to="/signin">USUARIO</Link>
            <Link to="/poems">POEMAS</Link>
          </>
        );
        break;
      case "/login":
        setNavLinks(
          <>
            <Link to="/">INICIO</Link>
            {userState && (
              <Link className={styles.underline} to="/signin">
                USUARIO
              </Link>
            )}

            <Link to="/poems">POEMAS</Link>
          </>
        );
        break;
      case "/signin":
        setNavLinks(
          <>
            <Link to="/">INICIO</Link>
            <Link className={styles.underline} to="/signin">
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
            <Link to="/signin">USUARIO</Link>
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

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <div
      className={
        props.toggle
          ? styles.toggleContainner
          : props.sticky
          ? `${styles.containner} ${styles.sticky}`
          : styles.containner
      }
    >
      {props.toggle ? (
        <>
          <section className={styles.navlinks}>{navLinks}</section>

          <section className={styles.iconsSection}>
            <div className={styles.icon}>
              {!userState && (
                <Link to="/signin">
                  <FaUserPlus />
                </Link>
              )}
              {userState && <FaUserCog />}
            </div>

            <div className={styles.icon}>
              {/* <FaSun /> */}

              <FaMoon />
            </div>

            <div className={styles.icon}>
              <GrLanguage />
            </div>

            {props.logout && (
              <div className={styles.icon}>
                <IoLogOutSharp />
              </div>
            )}
          </section>
        </>
      ) : (
        <>
          <section className={styles.navLinks}>{navLinks}</section>

          <section className={styles.navIcons}>
            <div className={styles.icon}>
              {!userState && (
                <Link to="/signin">
                  <FaUserPlus />
                </Link>
              )}
              {userState && <FaUserCog />}
            </div>

            <div className={styles.icon}>
              {/* <FaSun /> */}

              <FaMoon />
            </div>

            <div className={styles.icon}>
              <GrLanguage />
            </div>

            {userState && (
              <div onClick={handleLogout} className={styles.iconLogout}>
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
