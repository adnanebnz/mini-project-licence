import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function SideCard({ card }) {
    return (
        <Card
            sx={{ maxWidth: 200, backgroundColor: "#d4d4d5" }}
            variant="elevation"
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={card.img}
                    alt=""
                    sx={{
                        objectFit: "fit",
                        height: "100px",
                        width: "200px",
                    }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {card.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontWeight="500">
                        {card.desc}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
