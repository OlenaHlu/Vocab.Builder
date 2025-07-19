import css from "./Form.module.css";

const RegistrationForm = () => {
  return (
    <section className={css.formContainer}>
      <div className={css.info}>
        <h2 className={css.title}>Login</h2>
        <p className={css.text}>
          Please enter your login details to continue using our service:
        </p>
      </div>
    </section>
  );
};
export default RegistrationForm;
