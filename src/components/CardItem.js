import React from 'react';
import { Link } from 'react-router-dom';
import { GiDuration } from "react-icons/gi";
import { MdOutlinePriceChange } from "react-icons/md";

function CardItem(props) {
  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src='images/60109.jpg'
            />
          </figure>
          <div className='cards__item__info'>
            <h6 className='cards__item__text'>{(props.description || "").substring(0, 30)}...</h6>
            <p className="cards__item__details">
            <GiDuration /> : {props.duration} heures
            </p>
            <p className="cards__item__details">
            <MdOutlinePriceChange /> : {props.price} €
            </p>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;