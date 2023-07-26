import React from "react";

const Card = ({ card, onCardClick, currentUser, onCardLike, onCardDislike, onCardDelete }) => {

  //если в массиве лайкнувших есть id текущего пользователя, для данной карточки возвращаем true
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const isOwn = card.owner._id === currentUser._id;

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDislike() {
    onCardDislike(card);
  }

  return (
    <>
      {isOwn && <button className="photo-card__delete" aria-label="Удалить" type="button" onClick={handleDeleteClick}></button>}
      <img className="photo-card__image" src={card.link} alt={card.name} role="button" onClick={handleClick} />
      <div className="photo-card__title">
        <h2 className="photo-card__text">{card.name}</h2>
        {!isLiked && <button className='photo-card__like' aria-label="Мне нравится" type="button" onClick={handleLike}></button>}
        {isLiked && <button className='photo-card__like photo-card__like_active' aria-label="Мне нравится" type="button" onClick={handleDislike} ></button>}
        <p className="photo-card__like-counter">{card.likes.length}</p>
      </div>
    </>
  )
}

export default Card;
