import { Card, CardHeader, CardContent, Typography, CardActions, Button, CardMedia } from "@mui/material";
import { useState } from "react";
import InsuranceInformation from "./InsuranceInfor";

const styles = {
  borderRadius: "15px",
  width: "250px",
  "&:hover": {
    // Đổi giá trị để có sự thay đổi rõ ràng
    border: "2px solid #84C7E7",
  },
  "&:focus": {
    border: "2px solid #84C7E7",
  },
};

function OptionCard({ option, handleClick }: any): JSX.Element {
  const [openInfo, setOpenInfo] = useState(false);

  const handleOpen = () => {
    console.log("opdeijdede: ", option);
    setOpenInfo(true);
  };
  const handleCloseInfo = () => setOpenInfo(false);
  return (
    <>
      <InsuranceInformation
        openInfo={openInfo}
        handleCloseInfo={() => handleCloseInfo()}
        option={option}
      ></InsuranceInformation>
      <Card tabIndex={0} sx={styles} onClick={handleClick}>
        <CardHeader title={option.name} />
        <CardContent>
          <Typography
            fontWeight={600}
            style={{ border: "1px solid #000", backgroundColor: "#feeee1", padding: "5px", borderRadius: "10px" }}
          >
            {option.price} VNĐ / Tháng
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2">{option.summary}</Typography>
        </CardContent>
        <CardMedia
          sx={{ height: 140 }}
          image="https://images.pexels.com/photos/7821498/pexels-photo-7821498.jpeg?auto=compress&cs=tinysrgb&w=600"
          title="green iguana"
        />
        <CardActions>
          <Button size="small" onClick={handleOpen}>
            Xem chi tiết
          </Button>
        </CardActions>
        {/* </CardActionArea> */}
      </Card>
    </>
  );
}

export default OptionCard;
