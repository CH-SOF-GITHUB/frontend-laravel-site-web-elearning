import React from 'react';
import { Link } from 'react-router-dom';
import { GiDuration } from "react-icons/gi";
import { MdOutlinePriceChange } from "react-icons/md";

function CardItem(props) {
  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.photo}
              style={{maxHeight: '150px'}}
            />     
          <div className='cards__item__info'>
            <p className='cards__item__label'>{props.label}</p>
            <p className='cards__item__text'>{props.description.substring(0, 94)}...</p>
            <p className="cards__item__details">
            <GiDuration /> : {props.duration} heures || <MdOutlinePriceChange /> : {props.price} €
            </p>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;