import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
// Pour afficher du contenu HTML
import { Markup } from 'interweave'
// Pour gérer les commentaires
import CommentsBlock from 'simple-react-comments'
import '../../css/CourseContent.css'
import { fetchCourseById } from '../../services/coursesservice'
// Importation des icônes
import { FaRegClock, FaEuroSign } from 'react-icons/fa'; 



export default function CourseContent() {
  // Récupère l'ID du cours depuis l'URL
  const { id } = useParams()
  // Stocke les données du cours
  const [course, setCourse] = useState(null)
  // Stocke les commentaires
  const [comments, setComments] = useState([])
  // Stocke le commentaire en cours de saisie
  const [newComment, setNewComment] = useState('')
  const [isloginned, setLoginStatus] = useState(false)
  // Récupération des données du cours
  const fetchCourseData = async () => {
    try {
      // Remplacez par votre API
      const response = await fetchCourseById(id);
      setCourse(response.data)
      // Charge les commentaires existants
      // setComments(response.data.comments || [])
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des données du cours :',
        error
      )
    }
  }

  const storedUser = JSON.parse(localStorage.getItem('user-info'))
  const validateToken = async () => {
    if (storedUser) {
      const current = Math.round(Date.now() / 1000)
      const tokenIssuedAt =
        Math.floor(Date.now() / 1000) - (3600 - storedUser.expires_in)
      const tokenExpiryTime = tokenIssuedAt + storedUser.expires_in

      if (current > tokenExpiryTime) {
        setLoginStatus(false)
        localStorage.removeItem('user-info')
      } else {
        setLoginStatus(true)
      }
    } else {
      setLoginStatus(false)
    }
  }

  useEffect(() => {
    validateToken()
  }, [])

  useEffect(() => {
    if (isloginned) {
      fetchCourseData()
    }
  }, [isloginned, id])

  // Affichage conditionnel selon l'état de connexion
  if (!isloginned) {
    return <p>Veuillez vous connecter pour accéder au contenu du cours.</p>
  }

  // Gestion de l'ajout d'un commentaire
  /*const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        // Remplacez par le nom de l'utilisateur connecté
        author: 'Utilisateur',
        text: newComment,
        date: new Date().toISOString()
      }

      // Ajoute le commentaire localement
      setComments([...comments, comment])

      // Réinitialise le champ de saisie
      setNewComment('')
      // Envoyer le commentaire à l'API (optionnel)
      axios.post(`/api/courses/${id}/comments`, comment).catch(error => {
        console.error("Erreur lors de l'ajout du commentaire :", error)
      })
    }
  }*/

  // Affichage du spinner si le cours est en cours de chargement
  if (!course) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    )
  }

  // Calcul de la durée en heures (si disponible)
  // const durationInHours = course.duration ? `${(course.duration / 60).toFixed(1)} heures` : 'Non spécifiée';

  return (
    <div className='course-content'>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      {/* Vidéo YouTube */}
      <div className='video-container'>
        <iframe
          width='100%'
          height='400'
          src={`https://www.youtube.com/embed/${course.videoId}`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>
      {/* durée de course et le prix */}
      <div className="course-meta">
        <div className="course-duration">
          <FaRegClock className="icon" /> : {course.duration} heures
        </div>
        <div className="course-price">
          <FaEuroSign className="icon" /> : {course.price ? `${course.price} €` : 'Prix non disponible'}
        </div>
      </div>
      {/* Contenu du cours 
      <div className='course-details'>
        <Markup content={course.content} />
      </div>
      */}
      {/* Section des commentaires 
      <div className='comments-section'>
        <h2>Commentaires</h2>
        <CommentsBlock
          comments={comments}
          isLoggedIn={true}
          onSubmit={text => {
            setNewComment(text)
            handleAddComment()
          }}
        />
      </div>
      */}
    </div>
  )
}
