import { Box, Typography, Link, Divider } from "@mui/material";
import { LocationOn, Call } from "@mui/icons-material";

function Footer(): JSX.Element {
  return (
    <Box sx={{ backgroundColor: "#C6B09F", color: "black" }}>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1rem", marginTop: "1rem" }}>
          <Typography variant="h6">Về chúng tôi</Typography>
          <Link href="#" color="inherit" underline="none">
            Giới thiệu công ty
          </Link>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "white" }} />

        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1rem", marginTop: "1rem" }}>
          <Typography variant="h6">Thông tin</Typography>
          <Link href="#" color="inherit" underline="none">
            Dịch vụ bảo hiểm
          </Link>

          <Link href="#" color="inherit" underline="none">
            Thông tin chính sách
          </Link>
          <Divider orientation="vertical" flexItem />
        </Box>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "white" }} />

        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1rem", marginTop: "1rem" }}>
          <Typography variant="h6">Địa chỉ</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <LocationOn />
            <Link href="#" color="inherit" underline="none">
              Tòa nhà 1
            </Link>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <LocationOn />
            <Link href="#" color="inherit" underline="none">
              Tòa nhà 2
            </Link>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <LocationOn />
            <Link href="#" color="inherit" underline="none">
              Tòa nhà 3
            </Link>
          </Box>
          <Divider orientation="vertical" flexItem />
        </Box>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "white" }} />

        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1rem", marginTop: "1rem" }}>
          <Typography variant="h6">Liên hệ</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Call />
            <Link href="#" color="inherit" underline="none">
              0123456789
            </Link>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Call />
            <Link href="#" color="inherit" underline="none">
              0123456789
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
