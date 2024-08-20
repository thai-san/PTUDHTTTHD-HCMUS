import { Box, Typography } from "@mui/material";

interface TitleProps {
  title: string;
  path: string;
}

function Title(props: TitleProps): JSX.Element {
  const { title, path } = props;
  return (
    <Box
      style={{
        backgroundColor: "#D9D9D9",
        marginTop: "20px",
        width: "100%",
        height: "50px",
        display: "flex",
        alignItems: "Center",
        justifyContent: "space-between",
        padding: " 0 2em 0 2em ",
      }}
    >
      <Typography sx={{ fontSize: "1.5em" }}>{title}</Typography>
      <Typography sx={{ fontSize: "1.5em" }}>{path}</Typography>
    </Box>
  );
}

export default Title;
