/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from "react";
//import $ from "jquery";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function CardItem(props) {
  useEffect(() => {
    // Vérifier que jQuery est bien chargé
    if (window.$) {
      // Utiliser jQuery pour ajuster la taille des images
      window.$(".cards__item__img").css({
        width: "100%", // Adapte la largeur à celle du conteneur
        height: "200px", // Hauteur fixe pour toutes les images
        objectFit: "cover", // Ajuste l'image pour remplir sans déformer
        borderRadius: "10px" // Coins arrondis optionnels
      });
    } else {
      console.error(
        "jQuery is not loaded. Make sure the CDN is included in index.html."
      );
    }
  }, []); // Exécute une seule fois après le rendu initial du composant
  return (
    <>
      <li className="cards__item">
        <Link className="cards__item__link" to={props.path}>
          <figure className="cards__item__pic-wrap" data-category={props.label}>
            <img
              className="cards__item__img"
              alt="Travel Image"
              src={props.photo}
            />
          </figure>
          <div className="cards__item__info">
            <p className="cards__item__text" style={{ fontSize: "12px" }}>
              <FontAwesomeIcon
                icon={faInfoCircle}
                style={{ marginRight: "5px", color: "#007bff" }}
              />
              {props.description}
            </p>
            <p style={{ color: "black" }}>
              <FontAwesomeIcon icon={faClock} /> <strong>Durée :</strong>{" "}
              {props.duration} heures
              <br />
              <FontAwesomeIcon icon={faEuroSign} />
              &nbsp; <strong>Prix :</strong> {props.price}€
            </p>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
