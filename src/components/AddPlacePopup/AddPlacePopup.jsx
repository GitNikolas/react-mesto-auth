import React from "react";
import PopupWithForm from "../Popups/PopupWithForm";
import Input from "../UI/Input/Input";
import SubmitButton from "../UI/SubmitButton/SubmitButton";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {

  const [values, setValues] = React.useState({ name:'', link:''});

const handleChange = (event) => {
  const { name, value } = event.target;

    setValues((state) => ({
    ...state,
    [name]:value,
  }))
}

function handleSubmit(event) {
  event.preventDefault();
  onAddPlace(values);
}

React.useEffect( () => {
  setValues({name:'' , link:''});
}, [isOpen])

return (
  <PopupWithForm
    name='add-photo'
    title='Новое место'
    formId="popupFormAddPhoto"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >
    <Input
      id="placeName"
      className="popup__input popup__input_type_place-name"
      minLength={2}
      maxLength={30}
      name="name"
      type="text"
      placeholder="Название"
      onChange={handleChange}
      value={values.name}
    />

    <Input
      id="pictureUrl"
      className="popup__input popup__input_type_picture-url"
      minLength={2}
      maxLength={300}
      name="link"
      type="url"
      placeholder="Ссылка на картинку"
      onChange={handleChange}
      value={values.link}
    />

    <SubmitButton>Создать{isLoading && '...'}</SubmitButton>
  </PopupWithForm>
  );
}

export default AddPlacePopup;
