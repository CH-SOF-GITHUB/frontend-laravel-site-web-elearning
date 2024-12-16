import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
// Pour afficher du contenu HTML
import { Markup } from 'interweave' 
// Pour gérer les commentaires
import CommentsBlock from 'simple-react-comments' 
import '../../css/CourseContent.css'

export default function CourseContent () {
  // Récupère l'ID du cours depuis l'URL
  const { id } = useParams()
  // Stocke les données du cours
  const [course, setCourse] = useState(null)
  // Stocke les commentaires
  const [comments, setComments] = useState([])
  // Stocke le commentaire en cours de saisie
  const [newComment, setNewComment] = useState('')

  // Récupération des données du cours
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Remplacez par votre API
        const response = await axios.get(`/api/courses/${id}`)
        setCourse(response.data)
        // Charge les commentaires existants
        setComments(response.data.comments || [])
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des données du cours :',
          error
        )
      }
    }

    fetchCourseData()
  }, [id])

  // Gestion de l'ajout d'un commentaire
  const handleAddComment = () => {
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
  }

  // changer ce component par un spinner
  if (!course) {
    return <p>Chargement des données du cours...</p>
  }

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

      {/* Contenu du cours */}
      <div className='course-details'>
        <Markup content={course.content} />
      </div>

      {/* Section des commentaires */}
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
    </div>
  )
}
