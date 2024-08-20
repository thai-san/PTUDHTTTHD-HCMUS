import InsuranceForm1 from "../components/InsuranceForm1";
import { Typography, Container } from "@mui/material";
function InsuranceRegister(): JSX.Element {
  return (
    <Container>
      <Typography variant="h4" fontWeight={600} sx={{ textAlign: "center", marginTop: "20px" }} gutterBottom>
        Đăng ký bảo hiểm
      </Typography>
      <InsuranceForm1 />
    </Container>
  );
}

export default InsuranceRegister;
