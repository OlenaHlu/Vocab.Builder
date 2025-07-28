import css from "./Form.module.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { registrationSchema } from "../../../utils/validation";
import { useAppDispatch } from "../../../redux/hooks";
import Icon from "../../common/Icon";
import { signUp } from "../../../redux/auth/operations";

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
};

const RegistrationForm = () => {
  const [isVisiblePwd, setIsVisiblePwd] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationFormValues>({
    resolver: yupResolver(registrationSchema),
  });

  const togglePwd = () => {
    setIsVisiblePwd(!isVisiblePwd);
  };

  const onSubmit = async (data: RegistrationFormValues) => {
    console.log("Form data:", data);
    try {
      await dispatch(signUp(data)).unwrap();
      toast.success("Registration successful! Welcome!");
      reset();
      navigate("/dictionary");
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast.error(error || "Something went wrong during registration.");
    }
  };

  return (
    <section className={css.formContainer}>
      <div className={css.info}>
        <h2 className={css.title}>Register</h2>
        <p className={css.text}>
          To start using our services, please fill out the registration form
          below. All fields are mandatory:
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputsBlock}>
          <div className={css.inputWrapper}>
            <input
              className={css.input}
              type="text"
              {...register("name")}
              placeholder="Name"
              autoComplete="name"
            />
            {errors.name && (
              <p className={css.errorMessage}>
                <Icon className={css.errorIcon} iconName="error" />
                {errors.name.message}
              </p>
            )}
          </div>
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
              {isSubmitting ? "loading" : "Register"}
            </button>
            <Link className={css.navigation} to="/login">
              Login
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};
export default RegistrationForm;
