import React, {useState} from "react"
import '../pages/index.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Main from "./Main.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import Button from "./Button.jsx";
import ImagePopup from "./ImagePopup.jsx";

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(false)

  const [profileData,setProfileData] = useState(
    {
      name:'',
      prof:''
    })

  const [placeTitle, setPlaceTitle] = useState('')
  const [placeLink, setPlaceLink] = useState('')

  const[avatarLink,setAvatarLink] = useState('')

  const [selectedCard, setSelectedCard] = useState({})

  const submitEditProfile = (e) => {
    e.preventDefault()
    // передаём из инпутов в Профайл
    // console.log(`я вызван при сабмите {profileName}`)
    setIsEditProfilePopupOpen(false) // закрываем попап
  }

  // Значения из Профайла



  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsPreviewPopupOpen(false)
    setSelectedCard({})
  }

  function handleCardClick(card) {
    setIsPreviewPopupOpen(true)
    setSelectedCard(card)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  // submit - создаём новую карточку
  function submitAddPlace() {

  }

  // submit - редактируем аватар
  function submitEditAvatar() {

  }

  return (
    <div className='wrapper'>
      <div className="page">

        <Header/>

        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          // profileData={profileData}
        />

        <PopupWithForm
          name={'editProfile'}
          title={'Редактировать профиль'}
          children={
            <fieldset className="form__set">
              <label className="form__field" htmlFor="name-input">

                <input required autoFocus tabIndex="1" id="name-input"
                       className="form__input form__input_type_name form__input_type_error"
                       minLength="2" maxLength="40" type="text"
                       name="name" placeholder="Имя" value={profileData.name}
                       onChange={e => setProfileData({...profileData, name: e.target.value})}
                />
                <span className="name-input-error form__input-error form__input-error_active">

                  </span>
              </label>
              <label className="form__field" htmlFor="prof-input">
                <input required tabIndex="2" id="prof-input"
                       className="form__input form__input_type_prof form__input_type_error"
                       minLength="2" maxLength="200" type="text" value={profileData.prof}
                       onChange={e => setProfileData({...profileData, prof: e.target.value})}
                       name="profession" placeholder="Профессия"
                />
                <span className="prof-input-error form__input-error form__input-error_active">

                  </span>
              </label>
              <Button onSubmit={submitEditProfile} textValue={'Сохранить'} name={'editProfile'}/>
            </fieldset>}
          active={!isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          name='addPlace'
          title='Новое место'
          children={
            <fieldset className="form__set">
              <label className="form__field" htmlFor="place-input">
                <input id="place-input" name="name" required autoFocus
                       className="form__input form__input_type_place"
                       type="text" value={placeTitle}
                       minLength="2" maxLength="30"
                       placeholder="Название"
                       onChange={e => setPlaceTitle(e.target.value)}
                />
                <span className="place-input-error form__input-error form__input-error_active">

                  </span>
              </label>
              <label className="form__field" htmlFor="link-input">
                <input id="link-input" required
                       className="form__input form__input_type_link"
                       type="url" value={placeLink} name="link"
                       placeholder="Ссылка на картинку"
                       onChange={e => setPlaceLink(e.target.value)}
                />
                <span className="link-input-error form__input-error form__input-error_active">

                  </span>
              </label>
              <Button onSubmit={submitAddPlace} textValue={'Создать'} name={'addPlace'}/>
            </fieldset>
          }
          active={!isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          name='editAvatar'
          title='Редактировать аватар'
          children={
            <fieldset className="form__set">
              <label className="form__field" htmlFor="avatar-input">
                <input required tabIndex="1" id="avatar-input"
                       className="form__input form__input_type_avatar form__input_type_error"
                       minLength="2" maxLength="200" type="url" value={avatarLink}
                       name="avatar" placeholder="Ссылка на аватар"
                       onChange={e => setAvatarLink(e.target.value)}
                />
                <span className="avatar-input-error form__input-error form__input-error_active">
                    </span>
              </label>
              <Button onSubmit={submitEditAvatar} textValue={'Сохранить'} name={'editAvatar'}/>
            </fieldset>
          }
          active={!isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          active={!isPreviewPopupOpen}
        />

        <Footer/>
      </div>
    </div>
  )
}