import css from "../RegistrationPage/RegistrationPage.module.css";

import Header from "../../components/Header/Header";
import Wrapper from "../../components/AuthBlocks/Wrapper/Wrapper";
import LoginForm from "../../components/AuthBlocks/Forms/LoginForm";

const LoginPage = () => {
  return (
    <div className={css.banner}>
      <Header />
      <main>
        <Wrapper>
          <LoginForm />
        </Wrapper>
      </main>
    </div>
  );
};

export default LoginPage;
