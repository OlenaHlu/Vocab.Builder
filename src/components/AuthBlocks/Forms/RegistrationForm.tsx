import css from "./Form.module.css";

const RegistrationForm = () => {
  return (
    <section className={css.formContainer}>
      <div className={css.info}>
        <h2 className={css.title}>Register</h2>
        <p className={css.text}>
          To start using our services, please fill out the registration form
          below. All fields are mandatory:
        </p>
      </div>
    </section>
  );
};
export default RegistrationForm;
