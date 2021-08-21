import React, {useEffect, useState} from 'react';
import {api} from "../utils/Api";
import Profile from "./Profile";
import Card from "./Card.jsx";

function Main({onCardClick,...props}) {
  const [userName, setUserName] = useState('aaa')
  const [userDescription, setUserDescription] = useState('xx')
  const [userAvatar, setUserAvatar] = useState()
  const [loading, setLoading] = useState(true)
  const [cards, setCards] = useState([]) // пустой массив для карточек


  // первичная отрисовка данных
  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
        setLoading(false)
      })
    api.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData)
      })
  }, [])

  return (
    loading
      ? 'LOADING'
      : <main className='content'>

        <Profile props={props}
                 title={userName}
                 prof={userDescription}
                 avatar={userAvatar}/>
        <section className="cards-grid">

          {cards.map(card =>
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
            />
          )}
        </section>

      </main>
  )
}

export default Main;
