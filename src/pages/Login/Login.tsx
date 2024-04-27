//components
import Account from "../../components/Account/Account";
import Header from "../../components/Header/Header";

//image
import image from "../../assets/images/asideimage.jpg";

const Login = () => {
  return (
    <div>
      <div className="containner">
        <Header />
      </div>

      <section>
        <aside>
          <img src={image} alt="" />
        </aside>
        <Account login={true} />
      </section>
    </div>
  );
};

export default Login;
