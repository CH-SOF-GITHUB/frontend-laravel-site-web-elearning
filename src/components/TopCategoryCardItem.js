import React from 'react'
import { Link } from 'react-router-dom'

function CardItem (props) {
  return (
      <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              style={{maxHeight: '120px'}}
              src={props.photo}
            />
          <div className='cards__item__info'>
            <h4 className='cards__item__text' style={{fontFamily:'inherit', textAlign:'center'}}>{props.label}</h4>
          </div>
        </Link>
      </li>
    </>
  )
}

export default CardItem
