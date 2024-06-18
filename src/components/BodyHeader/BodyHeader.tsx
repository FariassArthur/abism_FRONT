import { useState } from "react";

//icons
import { MdArrowRight } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

//css
import styles from "./BodyHeader.module.scss";

//router
import { Link } from "react-router-dom";

type Props = {
  searchAssets: boolean;
};

const BodyHeader = (props: Props) => {
  const [onFilter, setOnFilter] = useState<boolean>(false);

  return (
    <div id={styles.bodyheader}>
      <div className={styles.nav}>
        <p>
          <span className={styles.inicio}>
            <Link to="/">INICIO</Link>
          </span>
          {<MdArrowRight />}
          <span>USUARIO</span>
          {<MdArrowRight />}
          <span>
            <Link to={"/poems"}>POEMS</Link>
          </span>
        </p>
      </div>

      {props.searchAssets && (
        <div className={styles.headerassets}>
        <form action="">
          <i className={styles.search}>
            <FaSearch />
          </i>

          <input type="text" />
        </form>

        <div className={styles.filter}></div>

        <p
          className={styles.filterClick}
          onClick={() => {
            if (onFilter === true) {
              setOnFilter(false);
            } else {
              setOnFilter(true);
            }
          }}
        >
          FILTRO
        </p>

        {onFilter && (
          <section className={styles.filterOptions}>
            <a href="">Data de criação</a>
            <a href="">Por nome: A...Z</a>
            <a href="">Por nome: Z...A</a>
          </section>
        )}

        {/* map para os dados */}
      </div>
      )}

      
    </div>
  );
};

export default BodyHeader;
