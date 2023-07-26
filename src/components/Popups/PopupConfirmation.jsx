import React from "react";
import PopupWithForm from "./PopupWithForm";
import SubmitButton from "../UI/SubmitButton/SubmitButton";

const PopupConfirmation = ({ isOpen, onClose, onSubmit }) => {

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <PopupWithForm
      name='confirmation'
      title='Вы уверены?'
      formId="popupFormConfirmation"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <SubmitButton>Да</SubmitButton>

    </PopupWithForm>
  );
}

export default PopupConfirmation;
