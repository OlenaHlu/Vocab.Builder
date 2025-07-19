import Header from "../../components/Header/Header";
import Wrapper from "../../components/AuthBlocks/Wrapper/Wrapper";
import RegistrationForm from "../../components/AuthBlocks/Forms/RegistrationForm";

const RegistrationPage = () => {
  return (
    <>
      <Header />
      <main>
        <Wrapper>
          <RegistrationForm />
        </Wrapper>
      </main>
    </>
  );
};

export default RegistrationPage;
