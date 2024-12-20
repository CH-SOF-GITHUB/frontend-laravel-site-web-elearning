import React, { useEffect, createElement, useState } from "react";
import { useParams } from "react-router-dom";
//import { Comment, Avatar, Tooltip } from "antd";
//import "antd/dist/antd.css";
/*
import {
  LikeOutlined,
  DislikeFilled,
  DislikeOutlined,
  LikeFilled
} from "@ant-design/icons";
 */
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import "../../css/CourseContent.css";
import { fetchCourseById } from "../../services/coursesservice";
// Importation des icônes
import { FaRegClock, FaEuroSign, FaRegCommentDots } from "react-icons/fa";
import { fetchCommentsByCourse } from "../../services/commentsservice";
import Comment from "../Comment";
import CommentForm from "../CommentForm";
import { toast } from "react-toastify";

export default function CourseContent() {
  // Récupère l'ID du cours depuis l'URL
  const { id } = useParams();
  // To maintain Like state
  // const [likesCount, setLikesCount] = useState(0);
  // To maintain Dislike state
  // const [dislikesCount, setDislikesCount] = useState(0);
  // To maintain action state
  // const [action, setAction] = useState(null);
  // Stocke les données du cours
  const [course, setCourse] = useState(null);
  // Stocke les commentaires
  const [comments, setComments] = useState([]);
  // Stocke le commentaire en cours de saisie
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  // Récupération du statut d'authentification
  const [isloginned, setLoginStatus] = useState(false);
  // Récupération des données du cours
  const fetchCourseData = async () => {
    try {
      // Remplacez par votre API
      const response = await fetchCourseById(id);
      setCourse(response.data.course);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données du cours :",
        error
      );
    }
  };

  // Debugging: Log comments whenever they change
  useEffect(() => {
    console.log("Loaded comments:", comments);
  }, [comments]);

  // Récupération les commentaires de course
  const fetchCommentsCourse = async () => {
    try {
      // Remplacez par votre API
      const response = await fetchCommentsByCourse(id);
      // Charge les commentaires existants
      setComments(response.data.comments);
      console.log("comments: " + comments);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des commentaires du cours :",
        error
      );
    }
  };

  const storedUser = JSON.parse(localStorage.getItem("user-info"));
  const validateToken = async () => {
    if (storedUser) {
      const current = Math.round(Date.now() / 1000);
      const tokenIssuedAt =
        Math.floor(Date.now() / 1000) - (3600 - storedUser.expires_in);
      const tokenExpiryTime = tokenIssuedAt + storedUser.expires_in;

      if (current > tokenExpiryTime) {
        setLoginStatus(false);
        localStorage.removeItem("user-info");
      } else {
        setLoginStatus(true);
      }
    } else {
      setLoginStatus(false);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  // Récupération des cours du cours
  useEffect(() => {
    if (isloginned) {
      fetchCourseData();
    }
  }, [isloginned, id]);

  // Récupération des commentaires du cours
  useEffect(() => {
    if (isloginned) {
      fetchCommentsCourse();
    }
  }, [isloginned, id]);
  // Affichage conditionnel selon l'état de connexion
  if (!isloginned) {
    return <p>Veuillez vous connecter pour accéder au contenu du cours.</p>;
  }

  // Gestion de l'ajout d'un commentaire [Handle adding a new comment]
  const handleAddComment = (event) => {
    event.preventDefault();
    const comment = {
      author: author, // Use the author from the form
      text: content
    };

    // Update local comments state
    setComments((prevComments) => [...prevComments, comment]);

    // Reset the input field
    setAuthor("");
    setContent("");
    // CONFIG TOKENS
    const token = storedUser.access_token;
    // Send the comment to the API using fetch
    fetch(`http://localhost:8000/api/learning/user/courses/${id}/comments`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(comment)
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("user-comment", JSON.stringify(data));
        // alert("Vous avez connecté avec succès !");
        toast.success("Vous avez ajouté un commentaire avec succès !", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true
        });
      })
      .catch(async (err) => {
        let x = await err.json();
        console.log(x.message);
        toast.error(x.message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true
        });
      });
  };

  const handleReply = (commentId, reply) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, replies: [...comment.replies, reply] };
      }
      return comment;
    });
    setComments(updatedComments);
  };
  // Affichage du spinner si le cours est en cours de chargement
  if (!course) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  // Calcul de la durée en heures (si disponible)
  // const durationInHours = course.duration ? `${(course.duration / 60).toFixed(1)} heures` : 'Non spécifiée';

  return (
    <div className="course-content">
      <div>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </div>
      {/* durée de course et le prix */}
      <div className="course-meta">
        <div className="course-duration">
          <FaRegClock className="icon" /> : {course.duration} heures
        </div>
        <div className="course-price">
          <FaEuroSign className="icon" /> :{" "}
          {course.price ? `${course.price} €` : "Prix non disponible"}
        </div>
      </div>
      {/* Vidéo YouTube */}
      <div className="video-container">
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${course.videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      {/* Section des commentaires */}
      <div className="nav-tab-info">
        <h3>
          <FaRegCommentDots /> commentaires:{" "}
        </h3>
        {/*<h2>Commentaires:</h2>*/}
        <div className="comments-list">
          {comments.length === 0 ? (
            <p>
              Aucun commentaire pour ce cours. Soyez le premier à laisser un
              commentaire !
            </p>
          ) : (
            <div>
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onReply={(reply) => handleReply(comment.id, reply)}
                />
              ))}
              <form onSubmit={handleAddComment} className="comment-form">
                <input
                  type="text"
                  value={author}
                  onChange={(event) => setAuthor(event.target.value)}
                  placeholder="Author"
                />
                <textarea
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder="Comment"
                />
                <button type="submit">submit</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
