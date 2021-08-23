import React from 'react';

const PopupWithForm = ({...props}) => {
  return (
    <section className={props.active ?
      `popup popup_type_${props.name}` :
      `popup popup_type_${props.name} popup_opened`}
             onClick={props.onClose}>
      <div className='popup__container' onClick={e => e.stopPropagation()}>
        <button className="popup__button-close" type="button"
                aria-label="Закрыть" onClick={props.onClose}>
        </button>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`form ${props.name}`} name={props.name} onSubmit={props.submit}>
          <fieldset className="form__set">
          {props.children}
          </fieldset>
        </form>
        <button
          className={`form__submit popup__button-submit popup__button-${props.name}`}
          type="submit">{props.buttonText}
        </button>
      </div>
    </section>
  );
};

export default PopupWithForm;


