import React from 'react'
import { Link } from 'react-router-dom'

function CourseItem (props) {
  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.label}</h5>
          </div>
          <div className='details-button'>
            <Link to={props.path} className='btn btn-primary'>
              Détails
            </Link>
          </div>
        </Link>
      </li>
    </>
  )
}

export default CourseItem
