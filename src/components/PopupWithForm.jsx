import React from 'react';

const PopupWithForm = ({active, name, title, onClose, children}) => {
  return (
    <section className={active ?
      `popup popup_type_${name}` :
      `popup popup_type_${name} popup_opened`}
             onClick={onClose}>
      <div className='popup__container' onClick={e => e.stopPropagation()}>
        <button className="popup__button-close" type="button"
                aria-label="Закрыть" onClick={onClose}>
        </button>
        <h2 className="popup__title">{title}</h2>
        <form className={`form ${name}`} name={name} noValidate>
          {children}
        </form>
      </div>
    </section>
  );
};

export default PopupWithForm;


