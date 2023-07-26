import React from "react";
import Union from '../../images/Union.svg';
import UnionError from '../../images/Union-error.svg';

const InfoTooltip = ({isOpen, onClose, successRegistration}) => {


  return (
    <div className={`popup popup_type_info-tooltip ${isOpen ? `popup_open` : ''}`}>
      <div className="popup__overlay">
        <div className="popup__content">
          <button type="button" className="popup__close" onClick={onClose} />
          {successRegistration ?
          <>
          <img
          className="popup__union-image"
          src={Union}
          alt='Успешно' />
          <p
          className="popup__title_type_info-tooltip"
          > Вы успешно зарегистрировались</p>
          </>
          :
          <>
          <img
          className="popup__union-image"
          src={UnionError}
          alt='Неуспешно' />
          <p
          className="popup__title_type_info-tooltip"
          > Что-то пошло не так! Попробуйте ещё раз!</p>
          </>
          }
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
