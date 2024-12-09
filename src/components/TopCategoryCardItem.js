import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { MdDescription } from "react-icons/md";

function CardItem (props) {
  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src='images/logocategorie.jpg'
            />
          </figure>
          <div className='cards__item__info'>
            <h6 className='cards__item__text'><MdDescription /> : {props.description}</h6>
          </div>
        </Link>
      </li>
    </>
  )
}

export default CardItem
