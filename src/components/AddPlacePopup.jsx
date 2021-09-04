import React, {useState} from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({...props}) => {

  const [place, setPlace] = useState('')
  const [link, setLink] = useState('')
  // const placeRef = useRef()
  // const linkRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()

    props.onAddPlace({
      name: place,
      link: link,
    })
    // обнуляем поле при submit
    setPlace('')
    setLink('')

    // Не могу понять как очистить инпуты при клике на overlay,X
  }

  function handleChangePlace(e) {
    setPlace(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  return (
    <PopupWithForm
      name='addPlace'
      title='Новое место'
      buttonText={'Создать'}
      active={props.active}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <>
        <label className="form__field" htmlFor="place-input">
          <input id="place-input" name="name" required autoFocus
                 className="form__input form__input_type_place"
                 type="text"
                 minLength="2" maxLength="30"
                 placeholder="Название"
                 value={place}
                 onChange={handleChangePlace}
                 // ref={placeRef}
          />
          <span className="place-input-error form__input-error form__input-error_active">

                  </span>
        </label>
        <label className="form__field" htmlFor="link-input">
          <input id="link-input" required
                 className="form__input form__input_type_link"
                 type="url" name="link"
                 placeholder="Ссылка на картинку"
                 value={link}
                 onChange={handleChangeLink}
                 // ref={linkRef}
          />
          <span className="link-input-error form__input-error form__input-error_active">
                  </span>
        </label>
      </>

    </PopupWithForm>
  );
};

export default AddPlacePopup;