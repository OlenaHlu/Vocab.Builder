import css from "./RegistrationPage.module.css";

import Header from "../../components/Header/Header";
import Wrapper from "../../components/AuthBlocks/Wrapper/Wrapper";
import RegistrationForm from "../../components/AuthBlocks/Forms/RegistrationForm";

const RegistrationPage = () => {
  return (
    <div className={css.banner}>
      <Header />
      <main>
        <Wrapper>
          <RegistrationForm />
        </Wrapper>
      </main>
    </div>
  );
};

export default RegistrationPage;
