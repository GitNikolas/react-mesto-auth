import React from "react";
import PopupWithForm from "../Popups/PopupWithForm";
import Input from "../UI/Input/Input";
import SubmitButton from "../UI/SubmitButton/SubmitButton";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {

  const [avatar , setAvatar ] = React.useState('');

  function handleAvatarChange(event) {
    setAvatar(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({avatar: avatar})
  }

  React.useEffect( () => {
    setAvatar('')
  }, [isOpen])

  return (
    <PopupWithForm
    name='avatar-update'
    title='Обновить аватар'
    formId="popupFormChangeAvatar"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >

    <Input
      id="avatarUrl"
      className="popup__input popup__input_type_avatar-Url"
      type="url"
      name="avatar"
      placeholder="Ссылка на картинку"
      value={avatar}
      onChange={handleAvatarChange}
    >
    </Input>

    <SubmitButton>Сохранить</SubmitButton>
  </PopupWithForm>
  );
}

export default EditAvatarPopup;
