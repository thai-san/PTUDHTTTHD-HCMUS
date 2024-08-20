import { CheckBox } from "@mui/icons-material";
import {
  Alert,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useState, useEffect } from "react";
import { useStore } from "../../app/store";
import * as userServices from "../../services/userServices";
import { useFormik } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import * as bankServices from "../../services/bankServices";
interface UserInformation {
  id: number;
  fullname: string;
  address: string;
  phone: string;
  birthday: Date;
  sex: number;
  email: string;
  bankNumber: string | 0;
  bank: string | 0;
}

export default function GeneralProfile(): JSX.Element {
  const [userProfile, setUserProfile] = useState<UserInformation>();
  const [banks, setBannks] = useState<any>(null);

  const account = useStore((state: any) => state.account);
  const formik = useFormik({
    initialValues: {
      id: -1,
      fullname: "",
      address: "",
      phone: "",
      birthday: "",
      sex: 1,
      email: "",
      bankNumber: "",
      bank: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required(
        "Họ tên và số điện thoại không được để trống, vui lòng điền đầy đủ vào cả 2 trường này!"
      ),
    }),

    onSubmit: async (values) => {
      try {
        const res = await userServices.updateProfile(values);
        alert(res.message);
      } catch (error) {
        console.log("update profile Failed");
      }
    },
  });

  useEffect(() => {
    void getBankIn4();
  }, []);

  useEffect(() => {
    if (account) {
      void getUserProfile(account.id);
    }
  }, [account]);

  const getBankIn4 = async () => {
    try {
      const response = await bankServices.getBankInfor();
      setBannks(response);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const getUserProfile = async (id: number) => {
    try {
      const response = await userServices.getProfile(id);
      setUserProfile(response);
      void formik.setValues({
        id: response.id,
        fullname: response.fullname || "",
        address: response.address || "",
        phone: response.phone || "",
        birthday: response.birthday ? format(new Date(response.birthday), "yyyy-MM-dd") : "",
        sex: response.sex || undefined,
        email: response.email || "",
        bankNumber: response.bankNumber || "",
        bank: response.bank || "",
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Box
      my={3}
      borderRadius={2}
      p={3}
      boxShadow={"8px 8px 8px rgba(79,79,79,.25)"}
      sx={{
        backgroundColor: "#f6f6f6",
      }}
    >
      <Typography variant="h6">Thông tin chung</Typography>
      <Divider sx={{ width: "100%" }} />

      {userProfile && (
        <Container sx={{ marginTop: "3rem", marginBottom: "3rem" }}>
          <Box sx={{ mx: 5 }}>
            <form onSubmit={formik.handleSubmit}>
              {formik.errors.fullname && formik.touched.fullname && (
                <Alert severity="error">
                  <strong>{formik.errors.fullname}</strong>
                </Alert>
              )}
              <Stack mb={4} mt={3} spacing={3} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  label="Họ Tên"
                  fullWidth
                  required
                  {...formik.getFieldProps("fullname")}
                  onChange={formik.handleChange}
                />
                <TextField
                  type="text"
                  variant="outlined"
                  label="Số Điện Thoại"
                  fullWidth
                  required
                  {...formik.getFieldProps("phone")}
                  onChange={formik.handleChange}
                />
              </Stack>
              <Stack mb={4} mt={3} spacing={3} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  type="Date"
                  variant="outlined"
                  label="Ngày Sinh"
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...formik.getFieldProps("birthday")}
                  onChange={formik.handleChange}
                />
                <TextField
                  type="text"
                  variant="outlined"
                  label="Tình trạng tài khoản"
                  fullWidth
                  disabled
                  required
                  defaultValue={"Active"}
                />
              </Stack>
              <Stack mb={4} mt={3} spacing={3} direction="row" sx={{ mb: 4 }}>
                <TextField
                  type="email"
                  variant="outlined"
                  label="Email"
                  required
                  fullWidth
                  {...formik.getFieldProps("email")}
                  onChange={formik.handleChange}
                />
                <FormControl fullWidth>
                  <InputLabel id="adress-select-label">Giới tính</InputLabel>
                  <Select
                    labelId="adress-select-label"
                    id="adress-select"
                    label="Giới tính"
                    required
                    {...formik.getFieldProps("sex")}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={1}>Nam</MenuItem>
                    <MenuItem value={0}>Nữ</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack mb={4} mt={3} spacing={3} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  label="Số tài khoản"
                  fullWidth
                  required
                  {...formik.getFieldProps("bankNumber")}
                  onChange={formik.handleChange}
                />
                <FormControl fullWidth>
                  <InputLabel id="adress-select-label">Ngân Hàng</InputLabel>
                  <Select
                    labelId="adress-select-label"
                    id="adress-select"
                    label="Ngân hàng"
                    {...formik.getFieldProps("bank")}
                    onChange={formik.handleChange}
                  >
                    {banks.map((row: any, index: any) => {
                      return (
                        <MenuItem key={index} value={row.short_name}>
                          {row.short_name}
                          <img src={row.logo} alt="logo" width={80} height={35} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Stack>
              <Stack mb={4} mt={3} spacing={3} direction="row" sx={{ mb: 4 }}>
                <TextField
                  label="Địa chỉ"
                  multiline
                  rows={3}
                  fullWidth
                  required
                  {...formik.getFieldProps("address")}
                  onChange={formik.handleChange}
                />
              </Stack>
              <Stack mb={4} mt={3} spacing={3} direction="row" sx={{ marginBottom: 4 }}>
                <FormControlLabel control={<CheckBox />} label="" />
                <Typography variant="body1">
                  Tôi đồng ý cho BHYT Life Việt Nam sử dụng thông tin được cung cấp trên đây để phê duyệt và phân tích
                  chính sách bảo hiểm <a href="#">Tìm hiểu thêm.</a>
                </Typography>
              </Stack>
              <Button variant="outlined" color="secondary" type="submit" sx={{ px: "4rem", py: 1 }}>
                Cập nhật
              </Button>
            </form>
          </Box>
        </Container>
      )}
    </Box>
  );
}
