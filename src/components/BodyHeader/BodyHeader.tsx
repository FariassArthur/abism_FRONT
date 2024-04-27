import { useState } from "react";

//icons
import { MdArrowRight } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

type Props = {};

const BodyHeader = (props: Props) => {
  const [onFilter, setOnFilter] = useState<boolean>(false);

  return (
    <div>
      <div>
        <p>
          <span>INICIO</span> {<MdArrowRight />} <span>USUARIO</span>{" "}
        </p>
      </div>

      <form action="">
        <div>
          <FaSearch />
          <input type="text" />
        </div>
      </form>

      <p
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
        <section>
          <a href="">Data de criação</a>
          <a href="">Por nome: A...Z</a>
          <a href="">Por nome: Z...A</a>
        </section>
      )}

      {/* map para os dados */}
    </div>
  );
};

export default BodyHeader;
