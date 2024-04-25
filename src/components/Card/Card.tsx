//router
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div id="card">
      <section>
        <h3>Título</h3>
        <h4>by: Pedro</h4>
      </section>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, magni soluta nobis officia incidunt accusamus natus at! Eum est voluptate aliquam amet sed maxime incidunt. Odit dignissimos eaque impedit quo.
      </p>

      <h4>
        <Link to="">Seguir Lendo</Link>
      </h4>
    </div>
  );
};

export default Card;
