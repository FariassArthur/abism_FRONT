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
import { BsSun } from "react-icons/bs";

//redux
import { RootState } from "../../store";
import { toggleTheme } from "../../slices/extraSlice";

interface Props {
  config?: boolean;
  auth?: boolean;
  logout?: boolean;

  sticky: boolean;
  toggle: boolean;
}

const Header = (props: Props) => {
  const [userLink, setUserLink] = useState("/signin");
  const [navLinks, setNavLinks] = useState<JSX.Element | null>(null);
  const location = useLocation();

  const { token } = useSelector((state: RootState) => state.auth);
  const { Theme } = useSelector((state: RootState) => state.extra);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    setUserLink(token ? "/account" : "/login");
  }, [token]);
  
  const handleLogout = async () => {
    await dispatch(logout());
    setUserLink("/login");
  };
  

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setNavLinks(
          <>
            <Link className={styles.underline} to="/">
              INICIO
            </Link>
            <Link to={userLink}>USUARIO</Link>
            <Link to="/poems">POEMAS</Link>
          </>
        );
        break;
      case "/login":
        setNavLinks(
          <>
            <Link to="/">INICIO</Link>
            <Link className={styles.underline} to={userLink}>
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
            <Link className={styles.underline} to={userLink}>
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
            <Link to={userLink}>USUARIO</Link>
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
            <Link to={userLink}>USUARIO</Link>
            <Link to="/poems">POEMAS</Link>
          </>
        );
    }
  }, [location.pathname]);

  const handleChangeTheme = () => {
    dispatch(toggleTheme());
    console.log("deu certo");
    console.log(Theme);
  };

  return (
    <div
      className={Theme === "dark" ? styles.containnerDark : styles.containner}
    >
      {props.toggle ? (
        <>
          <section id={styles.sectionLinks}>
            <div className={styles.navlinks}>{navLinks}</div>
          </section>

          <section className={styles.iconsSection}>
            <div className={styles.icon}>
              {!token && (
                <Link to="/signin">
                  <FaUserPlus />
                </Link>
              )}
              {token && (
                <Link to={"/update"}>
                  <FaUserCog />
                </Link>
              )}
            </div>

            <i className={styles.icon} onClick={handleChangeTheme}>
              {Theme === "light" ? (
                <FaMoon onClick={handleChangeTheme} />
              ) : (
                <BsSun />
              )}
            </i>

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
          <section className={styles.navlinks}>{navLinks}</section>

          <section className={styles.navIcons}>
            <div className={styles.icon}>
              {!token && (
                <Link to="/signin">
                  <FaUserPlus size={15} />
                </Link>
              )}
              {token && (
                <Link to={"/update"}>
                  <FaUserCog size={15} />
                </Link>
              )}
            </div>

            <div className={styles.icon} onClick={handleChangeTheme}>
              {Theme === "dark" ? <BsSun size={15} /> : <FaMoon size={15} />}
            </div>

            <div className={styles.icon}>
              <GrLanguage size={15} />
            </div>

            {token && (
              <div onClick={handleLogout} className={styles.icon}>
                <IoLogOutSharp size={15} />
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Header;
