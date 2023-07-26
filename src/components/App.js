import React from 'react';
import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';
import Footer from './Footer/Footer.jsx';
import EditProfilePopup from './Popups/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import ImagePopup from './Popups/ImagePopup.jsx';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
import PopupConfirmation from './Popups/PopupConfirmation.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import {register, login, checkToken} from '../utils/auth.js';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx';
import InfoTooltip from './Popups/InfoTooltip.jsx';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  const [isConfirmationPopup, setConfirmationPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState(null);

  const [currentCard, setCurrentCard] = React.useState(null);

  const [cards, setCards] = React.useState([]);

  const [isInfoTooltipPopup, setInfoTooltipPopupOpen] = React.useState(false);

  const [loggedIn , setloggedIn] = React.useState(false);

  const [successRegistration , setSuccessRegistration] = React.useState(false);

  const [ email, setEmail ] = React.useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt){
    Promise.all([api.getInitialCards(), api.getUserInformation(), checkToken(jwt)])
    .then(([dataCard, dataUser, checkData]) => {
      if (checkData.data) {
        navigate('/')
        setCards(dataCard);
        setCurrentUser(dataUser);
        setEmail(checkData.data.email);
        setloggedIn(true);
      } else {
        navigate('/sign-in')
      }
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
    }
  }, [loggedIn])

  function handleRegister ({ password, email }){
    return register(password, email)
    .then( (res) => {
      setInfoTooltipPopupOpen(true);
      if(res.error){
        setSuccessRegistration(false);
      }else{
        setSuccessRegistration(true);
        navigate('/sign-in')
      }
    })
    .catch( (err) => {
      console.error(err);
    })

  }

  function handleLogin ({ password, email }){
    return login(password, email)
    .then( (res) => {
      if (res.token){
        localStorage.setItem('jwt', res.token);
        setloggedIn(true);
        navigate('/');
      }
    })
    .catch( (err) => {
      console.error(err);
    })
  }

  function handleSignout() {
    setEmail('');
    localStorage.clear();
    setloggedIn(false);
    navigate('/sign-in')
  }

  //функции открытия попапов
  function handleEditProfileClick(){
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(){
    setAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick(){
    setEditAvatarPopupOpen(true)
  }

  //функция открытия попапа с фотографией
  function handleCardClick (card) {
    setSelectedCard(card)
  }

  // функция закрытия попапов
  function closeAllPopups () {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmationPopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard(null);
    setCurrentCard(null);
  }

  //открытие попапа подтверждения, запись данных выбранной карточки;
  function handleCardDelete(card) {
    setCurrentCard(card);
    setConfirmationPopupOpen(true);
  }

  //запросы к api
  function handleCardLike(card) {
    api.handleLike(card._id)
    .then((newCard) => {
      setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
    })
    .catch((err) => console.error(`Ошибка: ${err}`));
  }

  function handleCarDislike(card) {
    api.deleteLike(card._id)
    .then((newCard) => {
      setCards( (state) => state.map((item) => item._id === card._id ? newCard : item));
    })
    .catch((err) => console.error(`Ошибка: ${err}`));
  }

    function handleConfirmationSubmit() {
    api.deleteCard(currentCard._id)
    .then( () => {
      setCards( (state) => state.filter((item) => item._id !== currentCard._id));
      closeAllPopups();
    })
    .catch((err) => console.error(`Ошибка: ${err}`));
  }

function handleUpdateUser(userData) {
  api.setUserInformation(userData)
  .then( () => {
    setCurrentUser((state)=>({ ...state, name:userData.name, about:userData.about }));
    closeAllPopups();
  })
  .catch((err) => console.error(`Ошибка: ${err}`));
}

function handleUpdateAvatar(avatarData) {
  api.setUserAvatar(avatarData)
  .then( () => {
    setCurrentUser((state)=>({ ...state, avatar:avatarData.avatar }));
    closeAllPopups();
  })
  .catch((err) => console.error(`Ошибка: ${err}`));
}

function handleAddPlaceSubmit(cardData) {
  api.setInitialCard(cardData)
  .then( (newCard) => {
    setCards([newCard, ...cards]);
    closeAllPopups();
  })
  .catch((err) => console.error(`Ошибка: ${err}`));
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
        <div className="flex-container">

          <Header
          loggedIn={loggedIn}
          currentEmail={email}
          signOut={handleSignout}
          />

          <Routes>

            <Route path="/" element={
              <ProtectedRoute
                loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDislike={handleCarDislike}
                onCardDelete={handleCardDelete}
                component={Main}
              />}
            />

            <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />

            <Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />

            <Route
              path='*'
              element={loggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />}
            />

          </Routes>
        </div>

        {loggedIn && <Footer />}

        </div>

        <InfoTooltip
            isOpen={isInfoTooltipPopup}
            onClose={closeAllPopups}
            successRegistration={successRegistration}
        />

        { currentUser && <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} />}

        <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit} />

        { currentUser && <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />}

        <PopupConfirmation
        isOpen={isConfirmationPopup}
        onClose={closeAllPopups}
        onSubmit={handleConfirmationSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

    </CurrentUserContext.Provider>


  );
}

export default App;
