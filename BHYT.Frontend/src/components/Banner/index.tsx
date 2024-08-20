import { Typography } from "@mui/material";
import { BannerContainer, BannerContent, BannerDescription, BannerImage, BannerTitle } from "../../styles/banner";

export default function Banner() {
  return (
    <BannerContainer>
      <BannerImage src="src\assets\images\banner.png" />
      <BannerContent>
        <Typography variant="h6">Tươi sáng hơn trong từng khoảnh khắc</Typography>
        <BannerTitle variant="h2">VINA Life</BannerTitle>

        <BannerDescription variant="subtitle1">
          Bảo hiểm sức khỏe VINA Life giúp Khách hàng đạt được an toàn tài chính trọn đời và tận hưởng cuộc sống khỏe
          mạnh hơn
        </BannerDescription>
      </BannerContent>
    </BannerContainer>
  );
}
