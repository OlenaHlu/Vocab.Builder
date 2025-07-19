import Header from "../../components/Header/Header";
import Wrapper from "../../components/AuthBlocks/Wrapper/Wrapper";
import LoginForm from "../../components/AuthBlocks/Forms/LoginForm";

const LoginPage = () => {
  return (
    <>
      <Header />
      <main>
        <Wrapper>
          <LoginForm />
        </Wrapper>
      </main>
    </>
  );
};

export default LoginPage;
