import React, {useEffect, useState} from 'react';
import {api} from "../utils/Api";
import Profile from "./Profile";
import Loader from "./UI/Loader";
import Card from "./Card.jsx";

function Main({onCardClick, ...props}) {
  const [userName, setUserName] = useState('aaa')
  const [userDescription, setUserDescription] = useState('xx')
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
      })
      .catch(console.error)

    api.getInitialCards()      // запрос для отрисовки карточек
      .then((cardsData) => {
        setCards(cardsData)
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  return (


    loading
      ? <><Loader/></>
      : <main className='content'>

        <Profile props={props}
                 title={userName}
                 prof={userDescription}
                 avatar={userAvatar}/>
        <section className="cards-grid">

          {cards.map(card => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
            />
          ))}
        </section>

      </main>
  )
}

export default Main;
