import React, {useEffect, useState} from 'react';
import {api} from "../utils/Api";
import Profile from "./Profile";
import Loader from "./UI/Loader";
import Card from "./Card";

function Main({...props}) {
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState()
  const [loading, setLoading] = useState(true)
  const [cards, setCards] = useState([]) // пустой массив для карточек

  // первичная отрисовка данных
  useEffect(() => {
    api.getUserInfo()     // запрос для Profile
      .then((userData) => {
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
        console.log(`Данные для Profile получены - ${new Date()}`)

      })
      .catch(console.error)

    api.getInitialCards()      // запрос для отрисовки карточек
      .then((cardsData) => {
        setCards(cardsData)
        setLoading(false)
        console.log(`Данные для карточек получены - ${new Date()}`)

      })
      .catch(console.error)
  }, [])

  return (
    loading
      ? <><Loader/></>
      : <main className='content'>
        <Profile {...props}
                 title={userName}
                 prof={userDescription}
                 avatar={userAvatar}
        />
        <section className="cards-grid">
          {cards.map(card => (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
            />
          ))}
        </section>

      </main>
  )
}

export default Main;
