import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function IntroDivider(props) {
  return (
    <Card variant="outlined" sx={{ maxWidth: 360 }}>
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography gutterBottom variant="h6" component="div">
            {props.enroll.formation.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            ${props.enroll.formation.price}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props.enroll.formation.description}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="body2">
          Statut:
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip color="primary" label={props.enroll.status === "draft" ? "brouillon" : "validé"} size="small" />
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="body2">
          Date de début:
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label={`Start Date: ${props.enroll.start_date ? new Date(props.enroll.start_date).toLocaleDateString() : "Indisponible"}`} size="small" />
        </Stack>
      </Box>
    </Card>
  );
}
