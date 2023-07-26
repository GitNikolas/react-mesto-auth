import React from "react";

const PopupWithForm = ({onChange, ...props}) => {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? `popup_open` : ''}`}>
      <div className="popup__overlay">
        <div className="popup__content">
          <button type="button" className="popup__close" onClick={props.onClose} />
          <h2 className="popup__title">{props.title}</h2>
          <form
            id={props.formId}
            className="popup__form"
            name={props.name}
            onSubmit={props.onSubmit}
          >
            {props.children}
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;


