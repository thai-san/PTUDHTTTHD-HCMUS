import InsuranceForm2 from "../components/InsuranceForm2";
import { Typography, Container } from "@mui/material";

function InsuranceRegister2(): JSX.Element {
  return (
    <Container>
      <Typography variant="h4" fontWeight={600} sx={{ textAlign: "center", marginTop: "20px" }} gutterBottom>
        Phiếu sức khỏe
      </Typography>
      <InsuranceForm2 />
    </Container>
  );
}

export default InsuranceRegister2;
