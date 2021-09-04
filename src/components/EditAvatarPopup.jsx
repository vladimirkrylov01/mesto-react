import React, {useState} from 'react';
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({...props}) => {
  const [avatar, setAvatar] = useState('')

  // обновляем данные и чистим поле
  function handleSubmit(e) {
    e.preventDefault()

    props.onUpdateAvatar({
      avatar: avatar,
    })
    // обнуляем поле при submit
    setAvatar('')
  }

  function handleChangeAvatar(e){
    setAvatar(e.target.value)
  }

  return (
    <PopupWithForm
      name='editAvatar'
      title='Редактировать аватар'
      buttonText={'Сохранить'}
      active={props.active}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <>
        <label className="form__field" htmlFor="avatar-input">
          <input required tabIndex="1" id="avatar-input"
                 className="form__input form__input_type_avatar form__input_type_error"
                 minLength="2" maxLength="200" type="url" value={avatar}
                 name="avatar" placeholder="Ссылка на аватар"
                 onChange={handleChangeAvatar}
          />
          <span className="avatar-input-error form__input-error form__input-error_active">
                    </span>
        </label>
      </>

    </PopupWithForm>
  );
};

export default EditAvatarPopup;