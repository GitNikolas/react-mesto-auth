import React from "react";
import Input from "../UI/Input/Input";
import SubmitButton from "../UI/SubmitButton/SubmitButton";

const Login = ({ handleLogin, isLoading }) => {

  const [values, setValues] = React.useState({password:'', email:''});

  const handleChange = (event) => {
    const { name, value } = event.target;

      setValues((state) => ({
      ...state,
      [name]:value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(values);
  }

  return (
    <form
    onSubmit={handleSubmit}
    className="form">
      <h2
      className="login-form__title"
      >Вход</h2>
      <Input
      value={values.email}
      onChange={handleChange}
      placeholder='Email'
      id="email"
      className="login-form__input"
      minLength={2}
      name="email" />

      <Input
      value={values.password}
      onChange={handleChange}
      placeholder='Пароль'
      id="password"
      className="login-form__input"
      minLength={2}
      maxLength={40}
      name="password"
      type="password"
      />
      <SubmitButton
      className="login-form__submit-button"
      >Войти{isLoading&& '...'} </SubmitButton>
    </form>
  );
}

export default Login;
