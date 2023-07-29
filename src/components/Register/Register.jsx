import React from "react";
import Input from "../UI/Input/Input";
import SubmitButton from "../UI/SubmitButton/SubmitButton";
import {Link} from 'react-router-dom';

const Register = ({ handleRegister, isLoading }) => {

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
    handleRegister(values);

  }

  return (
    <form
    onSubmit={handleSubmit}
    className="form">
      <h2
      className="login-form__title"
      >Регистрация</h2>
      <Input
      placeholder='Email'
      value={values.email}
      id="email"
      className="login-form__input"
      minLength={2}
      name="email"
      onChange={handleChange}
      />

      <Input
      placeholder='Пароль'
      value={values.password}
      id="password"
      className="login-form__input"
      minLength={2}
      maxLength={40}
      name="password"
      onChange={handleChange}
      type="password"
      />

      <SubmitButton
      className="login-form__submit-button"
      >Зарегистрироваться{isLoading && '...'} </SubmitButton>
      <p
      className="login-form__subtitle">
      Вы уже зарегистрированы? <Link to='sign-in' className='login-form__link'>Войти</Link></p>

    </form>
  );
}

export default Register;
