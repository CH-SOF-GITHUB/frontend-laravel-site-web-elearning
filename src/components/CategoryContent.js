import React, { useEffect, useState } from "react";
import "../css/Cards.css";
import { fetchFormationsOfCatgoryById } from "../services/categoriesservice";
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CategoryContent = (props) => {
  const { id } = useParams();
  const [formationsCat, SetFormationsCat] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCatgoryFormations = async () => {
    try {
      const response = await fetchFormationsOfCatgoryById(id);
      SetFormationsCat(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatgoryFormations();
  }, [id]);

  // Show CircularProgress if loading is true
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="cards">
      <div className="carddeck">
      {formationsCat.map((catFor, index) => (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={catFor.photo}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {catFor.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {catFor.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      ))}
      </div>
      <br></br>
    </div>
  );
};

export default CategoryContent;
