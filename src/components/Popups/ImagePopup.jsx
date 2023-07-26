import React from "react";

const ImagePopup = ({ card, onClose }) => {

    return (
      <div className={`popup popup_type_view-photo ${ card ? 'popup_open' : '' }`}>
        <div className="popup__overlay">
          <div className="popup__view-photo">
            <button type="button" className="popup__close" onClick={onClose} />
            <img className="popup__image" src={card?.link} alt={card?.name} />
            <p className="popup__caption" >
              {card?.name}
            </p>
          </div>
        </div>
      </div>
    );

}

export default ImagePopup;
