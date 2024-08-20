import { Typography, Container } from "@mui/material";

import Banner from "../components/Banner";
import Quotes from "../components/quotes";
import LandingCard from "../components/LandingCard";
import LandingCard2 from "../components/LandingCard2";
function Landing(): JSX.Element {
  return (
    <Container>
      <Container maxWidth="lg">
        <Banner />
        <Quotes />
        <LandingCard />

        <Container
          maxWidth="lg"
          sx={{
            margin: "40px 0 40px 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4"> Tươi Sáng Hơn Trong Từng Khoảnh Khắc</Typography>
          <Typography>
            Tương lai tươi sáng là quá trình tận hưởng và trải nghiệm từng khoảnh khắc trong cuộc sống, là chủ động về
            tài chính, xây dựng và thực hiện kế hoạch cho chính mình.
          </Typography>
        </Container>
        <Container
          maxWidth="lg"
          sx={{
            margin: "40px 0 40px 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Vì sao nên chọn VINA Life </Typography>
        </Container>
        <LandingCard2 />
      </Container>
    </Container>
  );
}

export default Landing;
