import React, {useEffect, useState} from "react"
import '../pages/index.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Main from "./Main.jsx";
import ImagePopup from "./ImagePopup.jsx";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import Loader from "./UI/Loader";
import AddPlacePopup from "./AddPlacePopup";

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(true)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(true)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(true)
  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(true)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([]) // пустой массив для карточек
  const [loading, setLoading] = useState(true)

  // забираем карточки с сервера -cardsData-
  useEffect(() => {
    api.getCardList()
      .then((cardsData) => {
        setCards(cardsData)
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  // запрос для Profile
  useEffect(() => {
    api.getUserInfo()
      .then(userData => {
        setCurrentUser(userData)
      })
  }, [])


  function closeAllPopups() {
    setIsEditAvatarPopupOpen(true)
    setIsEditProfilePopupOpen(true)
    setIsAddPlacePopupOpen(true)
    setIsPreviewPopupOpen(true)
    setSelectedCard({})
  }
  function handleCardClick(card) {
    setIsPreviewPopupOpen(false)
    setSelectedCard(card)
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(false)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(false)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(false)
  }

  // Обновление данных Edit Profile
  function handleUpdateUser(data) {
    api.updateUserInfo(data)
      .then(userData => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch(console.error)
  }

  // Обновление Edit Avatar
  function handleUpdateAvatar(data) {
    api.updateAvatar(data)
      .then(avatar => {
        setCurrentUser(avatar)
        closeAllPopups()
      })
      .catch(console.error)
  }

  // Обновление Add Card
  function handleAddCard(data) {
    api.addNewCard(data)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(console.error)
  }

  // обработчик кнопки LIKE
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    // запросы на обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then(newCard => {
        const newCards = cards.map(c => c._id === card._id ? newCard : c)
        setCards(newCards)
      })
  }

  //обработчик кнопки DELETE
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        // сортируем массив. сравниваем id card
        const filteredArray = [...cards].filter(c => c._id !== card._id)
        setCards(filteredArray)
      })
  }

  return (
    loading
      ? <><Loader/></>
      : <div className='wrapper'>
        <div className="page">
          <CurrentUserContext.Provider value={currentUser}>
            <Header/>
            <Main
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <EditProfilePopup
              active={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              active={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddCard}
            />
            <EditAvatarPopup
              active={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}
              active={isPreviewPopupOpen}
            />
            <Footer/>
          </CurrentUserContext.Provider>
        </div>
      </div>
  )
}