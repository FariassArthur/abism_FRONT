//image
import image from "../../assets/images/asideimage.jpg";

//components
import Account from "../../components/Account/Account";
import Header from "../../components/Header/Header";

const SignIn = () => {
  return (
    <div>
      <div>
        <Header />
      </div>

      <section>
        <aside>
          <img src={image} alt="" />
        </aside>
        <Account create={true} />
      </section>
    </div>
  );
};

export default SignIn;
