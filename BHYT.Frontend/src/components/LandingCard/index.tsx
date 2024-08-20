import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container } from "@mui/material";

export default function LandingCard() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        margin: "20px 0 20px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <Card sx={{ minWidth: "325px", maxWidth: "325px" }}>
        <CardActionArea>
          <CardMedia component="img" height="300" image="src\assets\images\savemoney.png" alt="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Bảo hiểm Tiết kiệm
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Giúp Khách hàng đạt được bảo vệ tài chính trước các rủi ro và tận hưởng cuộc sống khoẻ mạnh
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ minWidth: "325px", maxWidth: "325px" }}>
        <CardActionArea>
          <CardMedia component="img" height="300" image="src\assets\images\health.png" alt="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Bảo hiểm Sức khỏe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Nhiều dự án góp phần vào sự phát triển và nâng cao sức khỏe cộng đồng từ Sun Life Việt Nam
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ minWidth: "325px", maxWidth: "325px" }}>
        <CardActionArea>
          <CardMedia component="img" height="300" image="src\assets\images\travel.png" alt="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Giải pháp hưu trí
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Những trải nghiệm của Khách hàng khi tham gia Bảo hiểm Nhân thọ Sun Life
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
}
