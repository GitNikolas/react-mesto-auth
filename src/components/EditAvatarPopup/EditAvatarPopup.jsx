import React from "react";
import PopupWithForm from "../Popups/PopupWithForm";
import Input from "../UI/Input/Input";
import SubmitButton from "../UI/SubmitButton/SubmitButton";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {

  const [avatar , setAvatar ] = React.useState('');
  const avatarRef = React.useRef();

  function handleAvatarChange(event) {
    setAvatar(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });

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
      ref={avatarRef}
    >
    </Input>

    <SubmitButton>Сохранить</SubmitButton>
  </PopupWithForm>
  );
}

export default EditAvatarPopup;
