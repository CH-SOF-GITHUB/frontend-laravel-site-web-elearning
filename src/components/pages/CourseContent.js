import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/CourseContent.css";
import { fetchCourseById } from "../../services/coursesservice";
import { fetchCommentsByCourse } from "../../services/commentsservice";
import { toast } from "react-toastify";
import CommentBlock from "../Comment";
import { useDialogs } from "@toolpad/core";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function CourseContent() {
  const dialogs = useDialogs();
  // Récupère l'ID du cours depuis l'URL
  const { id } = useParams();
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

  // handle dialog save course
  const handleCourseDialog = async () => {
    /*const id = await dialogs.prompt('Enter the ID to delete', {
        okText: 'Delete',
        cancelText: 'Cancel',
      });*/
    if (id) {
      const enrollConfirmed = await dialogs.confirm(
        `Are you sure you want to enroll Course N° : ${id} ?`
      );
      if (enrollConfirmed) {
        try {
          window.location.replace(`/courses/enroll/${id}`);
        } catch (error) {
          alert(error.message);
        }
      }
    }
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-hourglass-bottom"
            viewBox="0 0 16 16"
          >
            <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5m2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702s.18.149.5.149.5-.15.5-.15v-.7c0-.701.478-1.236 1.011-1.492A3.5 3.5 0 0 0 11.5 3V2z" />
          </svg>{" "}
          <p>{course.duration} heures</p>
        </div>
        <div className="course-price">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-tags"
            viewBox="0 0 16 16"
          >
            <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z" />
            <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z" />
          </svg>
          <p>{course.price ? `${course.price} €` : "Prix non disponible"}</p>
        </div>
        <div className="course-register">
          <i class="fas fa-file-invoice-dollar"></i>
          <button
            type="button"
            onClick={handleCourseDialog}
            className="btn btn-link"
          >
            S'inscrire à ce cours
          </button>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            className="bi bi-chat-left-dots"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>{" "}
          commentaires:{" "}
        </h3>
        <div className="comments-list">
          {comments.length === 0 ? (
            <p>
              Aucun commentaire pour ce cours. Soyez le premier à laisser un
              commentaire !
            </p>
          ) : (
            <div>
              {comments.map((comment) => (
                <CommentBlock
                  key={comment.id}
                  comment={comment}
                  onReply={(reply) => handleReply(comment.id, reply)}
                />
              ))}
            </div>
          )}
          <form onSubmit={handleAddComment}>
            <div className="mb-0">
              <label
                for="author"
                className="form-label"
                style={{ alignItems: "center", alignContent: "center" }}
              >
                Utilisateur :
              </label>
              <input
                type="text"
                className="form-control"
                id="author"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                style={{ maxWidth: "500px" }}
              />
            </div>
            <div className="mb-0">
              <label
                for="content"
                className="form-label"
                style={{ alignItems: "center", alignContent: "center" }}
              >
                Commentaire :
              </label>
              <textarea
                className="form-control"
                id="content"
                rows="3"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                style={{ maxWidth: "500px" }}
              ></textarea>
            </div>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              style={{ maxWidth: "100px", Height: "100px" }}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
