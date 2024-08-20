import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CheckBox } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InsuranceInformation({ openInfo, handleCloseInfo, option }: any) {
  return (
    <Box>
      {option ? (
        <Dialog fullScreen open={openInfo} onClose={handleCloseInfo} TransitionComponent={Transition}>
          <AppBar sx={{ position: "sticky", top: 0 }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleCloseInfo} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Thông Tin Chi Tiết
              </Typography>
            </Toolbar>
          </AppBar>

          <Grid container>
            <Grid item xs={9}>
              <List sx={{ marginLeft: "8rem", mr: 1, height: "100%", backgroundColor: "#f7f7f7", pb: 5 }}>
                <Box sx={{ mt: 5, mx: 1 }}>
                  <Typography
                    fontWeight={700}
                    style={{
                      border: "1px solid #000",
                      backgroundColor: "#feeee1",
                      padding: "1rem",
                      borderRadius: "10px",
                      marginBottom: "2rem",
                      margin: "1rem",
                    }}
                  >
                    {option.price} VNĐ / Tháng
                  </Typography>
                  <Typography variant="h6">Bảo hiểm : {option.name}</Typography>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    - Tóm tắc : {option.summary}
                  </Typography>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    - Mô tả: Bảo hiểm sức khỏe cung cấp bảo vệ cho cá nhân mua bảo hiểm trong trường hợp cần điều trị y
                    tế hoặc chăm sóc sức khỏe. Gói bảo hiểm này bao gồm các khoản bồi thường cho chi phí y tế, thuốc
                    men, khám chữa bệnh, và các dịch vụ khám sức khỏe định kỳ.
                  </Typography>

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {" "}
                    Quyền lợi (Benefits):
                  </Typography>
                  {option.benefit ? (
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      - {option.benefit}
                    </Typography>
                  ) : (
                    <></>
                  )}

                  <Typography variant="body1" sx={{ ml: 1 }}>
                    - Bồi thường chi phí y tế: Bảo hiểm sẽ chi trả một phần hoặc toàn bộ chi phí y tế của việc điều trị,
                    bao gồm cả viện phí, xét nghiệm, phẫu thuật, và các dịch vụ khám chữa bệnh khác.
                  </Typography>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    - Thuốc men và dược phẩm: Bảo hiểm bao phần hoặc toàn bộ chi phí của thuốc men và dược phẩm cần
                    thiết trong quá trình điều trị.{" "}
                  </Typography>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    - Khám sức khỏe định kỳ: Bảo hiểm cung cấp khoản bồi thường cho các cuộc khám sức khỏe định kỳ, giúp
                    phát hiện sớm các vấn đề sức khỏe và tăng cường phòng ngừa bệnh tật.{" "}
                  </Typography>

                  <Typography variant="body1" sx={{ ml: 1 }}>
                    - Phạm vi bảo hiểm: Gói bảo hiểm này bao gồm các vấn đề sức khỏe thông thường như bệnh tật, tai nạn,
                    nội khoa, ngoại khoa, và các dịch vụ chăm sóc sức khỏe khác theo quy định của chính sách.
                  </Typography>

                  <Typography variant="h6">Thời hạn bảo hiểm:</Typography>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    - Gói bảo hiểm có thể có thời hạn từ 1 năm đến nhiều năm, tùy thuộc vào sự lựa chọn của khách hàng.
                  </Typography>

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Phí bảo hiểm:
                  </Typography>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    - Phí bảo hiểm sẽ được tính dựa trên nhiều yếu tố như độ tuổi, giới tính, và lựa chọn phạm vi bảo
                    hiểm. Bảo hiểm có thể yêu cầu khách hàng thanh toán phí hàng tháng, hàng năm hoặc theo chu kỳ khác.
                  </Typography>

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Điều kiện và loại trừ:
                  </Typography>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    - Chính sách chúng tôi sẽ liệt kê rõ ràng các điều kiện và trường hợp không được bảo hiểm, ví dụ như
                    các bệnh mãn tính, bệnh lý di truyền, và các hành động tự tử.
                  </Typography>

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Quy trình yêu cầu giải quyết bồi thường:
                  </Typography>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    - Chính sách cung cấp hướng dẫn về quy trình và thủ tục để yêu cầu bồi thường khi có yêu cầu bồi
                    thường. Điều này bao gồm việc liên hệ với công ty bảo hiểm, cung cấp các tài liệu và thông tin cần
                    thiết, và tuân thủ quy trình xử lý yêu cầu bồi thường.
                  </Typography>

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Điều khoản và điều kiện:
                  </Typography>
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    - Chính sách bảo hiểm sức khỏe sẽ đưa ra các điều khoản và điều kiện cụ thể, bao gồm cả các quy định
                    về chính sách hủy bỏ, chuyển nhượng, và điều chỉnh phạm vi bảo hiểm.
                  </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />
                <Typography variant="h5" sx={{ my: 1, ml: 1 }}>
                  Tài liệu bạn nên tham khảo
                </Typography>
                <ul>
                  <li>
                    <Link
                      to="chrome-extension://oemmndcbldboiebfnladdacbdfmadadm/https://www.sunlife.com.vn/content/dam/sunlife/regional/vietnam/documents/bhbs-benh-hiem-ngheo-toan-dien-qtdk.pdf"
                      color="inherit"
                    >
                      <PictureAsPdfIcon /> Tiết Quy Tắc & điều khoản
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="chrome-extension://oemmndcbldboiebfnladdacbdfmadadm/https://www.sunlife.com.vn/content/dam/sunlife/regional/vietnam/documents/bhbs-benh-hiem-ngheo-toan-dien-bang-ty-le-phi-bao-hiem.pdf"
                      color="inherit"
                    >
                      <PictureAsPdfIcon /> Tỉ lệ phí
                    </Link>
                  </li>
                  <li>
                    <Link to="chrome-extension://oemmndcbldboiebfnladdacbdfmadadm/https://www.sunlife.com.vn/content/dam/sunlife/regional/vietnam/documents/benh-hiem-ngheo-toan-dien-thong-tin-luu-y.pdf">
                      <PictureAsPdfIcon /> Thông Tin cần chú ý
                    </Link>
                  </li>
                </ul>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h5" sx={{ ml: 1, mb: 2, mt: 3 }}>
                  Tìm hiểu thêm
                </Typography>
                <Box sx={{ mx: 5 }}>
                  <form>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                      <TextField type="text" variant="outlined" color="secondary" label="Họ Tên" fullWidth required />
                      <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Số Điện Thoại"
                        fullWidth
                        required
                      />
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
                      <TextField type="email" variant="outlined" color="secondary" label="Email (Nếu có)" fullWidth />

                      <FormControl fullWidth>
                        <InputLabel id="adress-select-label">Địa điểm</InputLabel>
                        <Select labelId="adress-select-label" id="adress-select" label="Địa điểm">
                          <MenuItem value={1}>Đà Đẵng</MenuItem>
                          <MenuItem value={2}>Hồ Chí Minh</MenuItem>
                          <MenuItem value={3}>Hà Nội</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
                      <TextField id="outlined-multiline-static" label="Ghi Chú" multiline rows={3} fullWidth />
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                      <FormControlLabel control={<CheckBox />} label="" />
                      <Typography variant="body1">
                        Tôi đồng ý cho BHYT Life Việt Nam sử dụng thông tin được cung cấp trên đây để kết nối với Tư vấn
                        Tài chính phù hợp, đồng thời phục vụ cho việc đánh giá, tối ưu hóa các chương trình Marketing.{" "}
                        <a href="#">Tìm hiểu thêm.</a>
                      </Typography>
                    </Stack>
                    <Button variant="outlined" color="secondary" type="submit" sx={{ px: "4rem", py: 1 }}>
                      Gửi thông tin
                    </Button>
                  </form>
                </Box>
              </List>
            </Grid>
            <Grid item xs={3}>
              <List sx={{ mt: 3, marginRight: "8rem", ml: 1, height: "500px" }}>
                <Card sx={{ maxWidth: 345, my: 5 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="https://images.pexels.com/photos/3184429/pexels-photo-3184429.jpeg?auto=compress&cs=tinysrgb&w=600"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Insurance WAO
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Thương hiệu Bảo hiểm Nhân thọ tốt nhất tại Việt Nam năm 2023
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
                <Card sx={{ maxWidth: 345, my: 5 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="https://images.pexels.com/photos/7735630/pexels-photo-7735630.jpeg?auto=compress&cs=tinysrgb&w=600"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Insurance Policy
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Công ty Bảo hiểm WAO được vinh danh vì dịch vụ xuất sắc.Giải thưởng và đánh giá tích cực từ khách
                      hàng và ngành công nghiệp. Chất lượng dịch vụ, sự tận tâm với khách hàng, quy trình đền bù nhanh
                      chóng và hiệu quả.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
                <Card sx={{ maxWidth: 345, my: 5 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="https://images.pexels.com/photos/7821498/pexels-photo-7821498.jpeg?auto=compress&cs=tinysrgb&w=600"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Insurance advisor
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                      continents except Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </List>
            </Grid>
          </Grid>
        </Dialog>
      ) : (
        <></>
      )}
    </Box>
  );
}
