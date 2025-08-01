import css from "./Form.module.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";

import Icon from "../../common/Icon";
import ShowToast from "../../common/ShowToast";
import { loginSchema } from "../../../utils/validation";
import { useAppDispatch } from "../../../redux/hooks";
import { signIn, getCurrentUser } from "../../../redux/auth/operations";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [isVisiblePwd, setIsVisiblePwd] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const onSubmit = async (data: LoginFormValues) => {
    console.log("form is valid:", data);

    try {
      await dispatch(signIn(data)).unwrap();
      ShowToast({ message: "Login successful! Welcome!", type: "success" });
      await dispatch(getCurrentUser()).unwrap();
      navigate("/dictionary");
    } catch (error: any) {
      console.error("Operation failed:", error);
      const errorMessage = error?.message || "Something went wrong.";
      ShowToast({ message: errorMessage, type: "error" });
    }
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
export default LoginForm;
