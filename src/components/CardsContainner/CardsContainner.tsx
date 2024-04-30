//css
import styles from "./CardsContainner.module.scss"

//components
import Card from "../Card/Card"

const CardsContainner = () => {
  return (
    <div id={styles.cardsContainner}>
        <h2>Poemas</h2>

        <section>
            <Card />
            <Card />
            <Card />
        </section>
    </div>
  )
}

export default CardsContainner