import profilePen from "../images/profile/profilePen.png";
import React from "react";
const Profile = ({title,prof,avatar,props}) => {

  // props.profileData = ([title, prof]) => {
  //   return {title, prof}
  // }

  return (
    <section className="profile">
      <div className="profile__content">
        <div className="profile__container">
          <img className="profile__avatar"
               style={{ backgroundImage: `url(${avatar})` }}
               src="#"
               alt="#"/>
          <div className="profile__overlay" onClick={props.onEditAvatar}>
            <img className="profile__pen" src={profilePen}
                 alt="Карандаш"/>
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__edit">
            <h1 className="profile__title">{title}</h1>
            <p className="profile__profession">{prof}</p>
          </div>
          <button className="profile__button-edit"
                  type="button" onClick={props.onEditProfile}/>
        </div>
      </div>
      <button className="profile__button-add" type="button" onClick={props.onAddPlace}/>
    </section>
  );
};

export default Profile;