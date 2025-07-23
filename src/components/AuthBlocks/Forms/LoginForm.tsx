import css from "./Form.module.css";

import { useState } from "react";
import { loginSchema } from "../../../utils/validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Icon from "../../common/Icon";
import { Link } from "react-router-dom";

type LoginFormValues = {
  email: string;
  password: string;
};

const RegistrationForm = () => {
  const [isVisiblePwd, setIsVisiblePwd] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const togglePwd = () => {
    setIsVisiblePwd(!isVisiblePwd);
  };

  const onSubmit = (data: LoginFormValues) => {
    console.log("form is valid:", data);
  };

  return (
    <section className={css.formContainer}>
      <div className={css.info}>
        <h2 className={css.title}>Login</h2>
        <p className={css.text}>
          Please enter your login details to continue using our service:
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`${css.inputsBlock} ${css.logInputBlocks}`}>
          <div className={css.inputWrapper}>
            <input
              className={css.input}
              type="text"
              {...register("email")}
              placeholder="Email"
              autoComplete="email"
            />
            {errors.email && (
              <p className={css.errorMessage}>
                <Icon className={css.errorIcon} iconName="error" />
                {errors.email.message}{" "}
              </p>
            )}
          </div>
          <div className={css.inputWrapper}>
            <input
              className={css.input}
              {...register("password")}
              placeholder="Password"
              type={isVisiblePwd ? "text" : "password"}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={togglePwd}
              className={css.togglePwdBtn}
            >
              {isVisiblePwd ? (
                <Icon className={css.icon} iconName="eye" />
              ) : (
                <Icon className={css.icon} iconName="eye-off" />
              )}
            </button>
            {errors.password && (
              <p className={css.errorMessage}>
                {" "}
                <Icon className={css.errorIcon} iconName="error" />
                {errors.password.message}
              </p>
            )}
          </div>
          <div className={css.submitBlock}>
            <button
              className={css.formBtn}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "loading..." : "Login"}
            </button>
            <Link className={css.navigation} to="/register">
              Register
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};
export default RegistrationForm;
