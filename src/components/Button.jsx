import React from 'react';

const Button = ({ name, buttonText}) => {
  return (
    <button
             className={`form__submit popup__button-submit popup__button-${name}`}
             type="submit">{buttonText}
    </button>
  );
};

export default Button;