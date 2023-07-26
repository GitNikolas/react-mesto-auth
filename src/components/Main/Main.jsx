import React from "react";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Main = ({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDislike, onCardDelete}) => {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar"
          style={{ backgroundImage: `url(${currentUser?.avatar})` }}
          type="button"
          onClick={onEditAvatar}
        />
        <div className="profile__info">
          <h1 className="profile__name" >
            {currentUser?.name}
          </h1>
          <p className="profile__status" >
            {currentUser?.about}
          </p>
          <button
            aria-label="Редактировать профиль"
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          />
        </div>
        <button
          aria-label="Добавить фотокарточку"
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__list list-style">
          {cards.map((data) => {
            return (
              <li className="photo-card" key={data._id}>
                <Card
                card={data}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDislike={onCardDislike}
                currentUser={currentUser}
                onCardDelete = {onCardDelete}
                />
              </li>
            )
          })
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;
