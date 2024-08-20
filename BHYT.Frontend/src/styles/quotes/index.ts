import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PromotionsContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    padding: "30px 0px 30px 0px",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 0px 10px 0px",
  overflow: "hidden",
  background: "#ECCA75",
}));

export const MessageText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Montez", "cursive"',
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
  color: "#18282D",
  fontSize: "1.5rem",
}));
