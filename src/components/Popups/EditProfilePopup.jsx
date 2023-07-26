import React from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "../UI/Input/Input";
import SubmitButton from "../UI/SubmitButton/SubmitButton";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description , setDescription ] = React.useState(currentUser.about);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });

  }

  React.useEffect( () => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen])

  return (
    <PopupWithForm
    name='profile-edit'
    title='Редактировать профиль'
    formId='popupFormEditProfile'
    isOpen={isOpen}
    onClose={onClose}
    onSubmit = {handleSubmit}
  >
    <Input
      id="userName"
      className="popup__input popup__input_type_user-name"
      minLength={2}
      maxLength={40}
      name="userName"
      placeholder="Как вас зовут?"
      type='text'
      value={name}
      onChange={handleNameChange}
    >
    </Input>

    <Input
      id="userStatus"
      className="popup__input popup__input_type_user-status"
      minLength={2}
      maxLength={200}
      name="userStatus"
      placeholder="Чем вы занимаетесь?"
      value={description}
      onChange={handleDescriptionChange}
    >
    </Input>

    <SubmitButton>Сохранить</SubmitButton>
  </PopupWithForm>
  );
}

export default EditProfilePopup;
