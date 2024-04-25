
//image
import image from "../../assets/images/homeimage.png"

const Title = () => {
  return (
    <div id="title">
        <div className="containner">
            <div className="text">
                <h1>Abismo</h1>
                <h1>Poetico</h1>
            </div>
            <img src={image} alt="" />
        </div>
    </div>
  )
}

export default Title