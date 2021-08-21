import React from 'react';

const Button = ({onSubmit, name, textValue}) => {
  return (
    <button
             className={`form__submit popup__button-submit popup__button-${name}`}
             type="submit" onClick={onSubmit}>{textValue}
    </button>
  );
};

export default Button;