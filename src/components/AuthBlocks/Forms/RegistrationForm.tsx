import css from "./Form.module.css";

import { useState } from "react";
import { registrationSchema } from "../../../utils/validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Icon from "../../common/Icon";
import { Link } from "react-router-dom";

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
};

const RegistrationForm = () => {
  const [isVisiblePwd, setIsVisiblePwd] = useState(false);

  const initialValues: RegistrationFormValues = {
    name: "",
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: yupResolver(registrationSchema),
    defaultValues: initialValues,
  });

  const togglePwd = () => {
    setIsVisiblePwd(!isVisiblePwd);
  };

  const onSubmit = (data: RegistrationFormValues) => {
    console.log("form is valid:", data);
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
        <div>
          <div>
            <input
              className={css.input}
              type="text"
              {...register("name")}
              placeholder="Name:"
              autoComplete="name"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div>
            <input
              className={css.input}
              type="text"
              {...register("email")}
              placeholder="Email:"
              autoComplete="email"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <input
              className={css.input}
              {...register("password")}
              placeholder="Password:"
              type={isVisiblePwd ? "text" : "password"}
              autoComplete="current-password"
            />
            <button type="button" onClick={togglePwd}>
              {isVisiblePwd ? (
                <Icon className={css.icon} iconName="eye" />
              ) : (
                <Icon className={css.icon} iconName="eye-off" />
              )}
            </button>
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "loading" : "Register"}
            </button>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </section>
  );
};
export default RegistrationForm;
