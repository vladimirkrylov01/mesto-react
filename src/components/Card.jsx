import React from 'react'

const Card = ({...props}) => {

  console.log(`карточки отрисовались ${new Date()}`)

  function handleCardClick () {
    props.onCardClick(props.card)
  }
  return (
    <article className="card" >
      <button className="card__delete-button" type="button" aria-label="Удалить"/>
      <div className="card__image" onClick={handleCardClick}
           style={{backgroundImage: `url(${props.card.link})`}}

      />
      <div className="card__content">
        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__likes-container">
          <button className="card__like" type="button"
                  aria-label="Оценить"/>
          <span className="card__likes-count">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  );
};

export default Card;