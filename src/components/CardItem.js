import React from 'react'
import { Link } from 'react-router-dom'
//import { GiDuration } from "react-icons/gi";
//import { MdOutlinePriceChange } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faEuroSign } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

function CardItem (props) {
  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.photo}
            />
          </figure>
          <div className='cards__item__info'>
            <p className='cards__item__text' style={{ fontSize: '12px' }}>
              <FontAwesomeIcon
                icon={faInfoCircle}
                style={{ marginRight: '5px', color: '#007bff' }}
              />
              {props.description}
            </p>
            <p style={{ color: 'black' }}>
              <FontAwesomeIcon icon={faClock} /> <strong>Durée :</strong>{' '}
              {props.duration} heures
              <br />
              <FontAwesomeIcon icon={faEuroSign} />
              &nbsp; <strong>Prix :</strong> {props.price}€
            </p>
          </div>
        </Link>
      </li>
    </>
  )
}

export default CardItem
