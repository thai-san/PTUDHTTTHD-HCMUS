import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container } from "@mui/material";

export default function LandingCard2() {
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
          <CardMedia component="img" height="300" image="src\assets\images\reason1.jpg" alt="green iguana" />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              Tạo dựng nền tảng tài chính, xây đắp cuộc sống sung túc cho bạn và gia đình. Truyền thụ tinh hoa cho thế
              hệ mai sau
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ minWidth: "325px", maxWidth: "325px" }}>
        <CardActionArea>
          <CardMedia component="img" height="300" image="src\assets\images\reason3.jpg" alt="green iguana" />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              Giải pháp bảo vệ toàn diện, giúp bạn đảm bảo dự phòng tài chính cần thiết trước những rủi ro bệnh tật
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ minWidth: "325px", maxWidth: "325px" }}>
        <CardActionArea>
          <CardMedia component="img" height="300" image="src\assets\images\reason2.jpg" alt="green iguana" />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              Bảo hiểm VINA Life uy tín cung cấp những giải pháp hưu trí đa dạng cho doanh nghiệp và cá nhân
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
}
