import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Stack } from "@mui/system";
import { Alert, Divider, FormControlLabel, IconButton, Radio, RadioGroup, Snackbar, TextField } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useStore } from "../app/store";
import * as compensationServices from "../services/compensationServices";
const steps = [
  {
    label: "Quy định về thời gian gửi yêu cầu và phí bồi thường",
    description: [
      `Chính sách công ty yêu cầu, thời hạn gửi yêu cầu bồi thường không quá 60 ngày kể từ ngày phát sinh chi phí khám chữa bệnh.
     Chi phí hoàn trả đã được duy định trong chính sách.`,
    ],
  },
  {
    label: "Ngày nhận tiền",
    description: [
      `Quý khách có thể đến trực tiếp lại văn phòng công ty bảo hiểm tại tất cả các chi nhánh trên cả nước để nhận lại tiền
    sau khi yêu cầu hoàn trả chi phí khám bệnh.`,
      ` Nếu quý khách lựa chọn hình thức nhận tiền qua chuyển khoản, phí sẽ được chuyến đến sau 3 ngày nếu yêu cầu hợp lệ.`,
    ],
  },
  {
    label: "kiểm tra số tài khoản",
    description: [
      `Với trường hợp quý khách muốn nhận lại phí bảo hiểm bằng chuyển khoản, vui lòng cập nhật và kiểm tra chính xác số tài khoản
     của mình trước khi yêu cầu.`,
      `Công ty sẽ không chiu trách nhiệm với mọi sai sót xảy ra, xin quý khách lưu ý!.`,
    ],
  },
  {
    label: "Hỗ trợ",
    description: [
      `Quý khách cần bất kì hổ trợ nào trong quá trình yêu cầu chi trả phí, xin vui lòng liên hệ hotline 1900 180 650`,
    ],
  },
];

export default function CompensationRequest() {
  const [activeStep, setActiveStep] = useState(0);
  const { id } = useParams();
  const [isDisabled, setIsDisabled] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const account = useStore((state) => state.account);

  const defaultValues = {
    policyId: Number(id),
    date: new Date(),
    amount: 100000,
    hoptitalName: "",
    hopitalCode: "",
    dateRequest: new Date(),
    usedServices: "",
    getOption: 1,
    note: "",
    status: false,
  };
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      try {
        await compensationServices.insertCompensation(values);
        void formik.setValues(defaultValues);
        setOpenSnackbar(true);
      } catch (ex) {
        console.log(ex);
      }
    },
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    if (activeStep === steps.length) {
      setIsDisabled(false);
    }
  }, [activeStep]);

  const handleCloseSnackbarClick = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const action = (
    <Box>
      <Button
        color="secondary"
        size="small"
        onClick={() => {
          if (account) {
            navigate(`/compensation-request/customer/${account.userId}`);
          } else {
            alert("UserId is null!");
          }
        }}
      >
        Xem yêu cầu
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbarClick}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  return (
    <Container>
      <Box
        my={5}
        p={5}
        borderRadius={2}
        boxShadow={"8px 8px 8px rgba(79,79,79,.25)"}
        sx={{
          backgroundColor: "#f6f6f6",
        }}
      >
        <Typography variant="h5" align="center" fontWeight={600} sx={{ ml: 1, mb: 2 }}>
          Yêu cầu chi trả
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" sx={{ ml: 1, mb: 2 }}>
          Lưu ý
        </Typography>
        <Box mx={8}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  {step.description.map((row: any, index: any) => {
                    return <li key={index}>{row}</li>;
                  })}
                  <Box sx={{ my: 2 }}>
                    <div>
                      <Button onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                        {index === steps.length - 1 ? "xong" : "tiếp tục"}
                      </Button>
                      <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                        xem lại
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Box>
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                Hoàn thành. <Button onClick={handleReset}>reset</Button>
              </Alert>
            </Box>
          )}
        </Box>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" sx={{ ml: 1, mb: 5, mt: 3 }}>
          Thông tin yêu cầu
        </Typography>
        <Box sx={{ mx: 5, opacity: isDisabled ? 0.5 : 1, pointerEvents: isDisabled ? "none" : "" }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Bệnh viện thăm khám"
                fullWidth
                required
                {...formik.getFieldProps("hoptitalName")}
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Mã số bệnh viện"
                fullWidth
                required
                {...formik.getFieldProps("hopitalCode")}
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
              <TextField
                type="date"
                variant="outlined"
                color="secondary"
                label="Ngày khám"
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
                {...formik.getFieldProps("date")}
                onChange={formik.handleChange}
              />
              <TextField
                type="number"
                variant="outlined"
                color="secondary"
                label="Số tiền chi trả (VNĐ)"
                fullWidth
                required
                {...formik.getFieldProps("amount")}
              />
            </Stack>
            <Stack spacing={3} direction="row" sx={{ mb: 4 }}>
              <TextField
                id="outlined-multiline-static"
                label="Các dịch vụ đã sử dụng"
                multiline
                rows={3}
                fullWidth
                required
                {...formik.getFieldProps("usedServices")}
              />
            </Stack>
            <Stack spacing={3} direction="row" sx={{ mb: 4 }}>
              <TextField
                id="outlined-multiline-static"
                label="Ghi Chú"
                multiline
                rows={3}
                fullWidth
                {...formik.getFieldProps("note")}
              />
            </Stack>
            <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
              <RadioGroup
                itemType="number"
                aria-labelledby="demo-radio-buttons-group-label"
                {...formik.getFieldProps("getOption")}
              >
                <FormControlLabel value={1} control={<Radio />} label="Nhận tiền qua chuyển khoản liên ngân hàng." />
                <FormControlLabel value={0} control={<Radio />} label="Nhận tiền trực tiếp tại công ty bảo hiểm." />
              </RadioGroup>
            </Stack>
            <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
              <FormControlLabel control={<CheckBox />} label="" />
              <Typography variant="body1">
                Tôi cam kết thông tin được cung cấp trên là sự thật -<a href="#">Tìm hiểu thêm.</a>
              </Typography>
            </Stack>
            <Button variant="outlined" color="secondary" type="submit" sx={{ px: "4rem", py: 1 }}>
              Gửi thông tin
            </Button>
          </form>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbarClick}
        message="Yêu cầu thành công"
        action={action}
      />
    </Container>
  );
}
