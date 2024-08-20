import {
  Box,
  FormControlLabel,
  Checkbox,
  FormGroup,
  TextField,
  Typography,
  Button,
  Divider,
  Container,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import Title from "../components/Title";
import LoginImage from "../assets/images/login.png";
import GoogleIcon from "@mui/icons-material/Google";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthService from "../services/authServices";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useStore } from "../app/store";
function Login(): JSX.Element {
  const { setAccount, setToken, account } = useStore((state) => state);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await AuthService.login(values.username, values.password);
        setAccount(response.account);
        setToken(response.token);
        alert(response.message);
      } catch (error) {
        console.log("Login Failed");
      }
    },
  });

  return (
    <Box sx={{ width: "100%" }}>
      {account && <Navigate to="/" />}
      <Title title="Đăng nhập" path="Trang chủ / Đăng nhập"></Title>
      <Box sx={{ display: "flex", mt: 5, px: 5 }}>
        <Container>
          <img src={LoginImage} className="App-logo" alt="logo" />
        </Container>
        <Container className="InputField" sx={{ display: "flex", flexDirection: "column", minWidth: "200px" }}>
          <Typography variant="h4" fontWeight={600} sx={{ textAlign: "center", padding: "1rem" }}>
            Đăng nhập
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              {formik.errors.username && formik.touched.username && (
                <Alert severity="error">
                  <strong>{formik.errors.username}</strong>
                </Alert>
              )}
              <TextField
                id="outlined-basic"
                label="Tên tài khoản"
                variant="outlined"
                {...formik.getFieldProps("username")}
                onChange={formik.handleChange}
                sx={{
                  textAlign: "center",
                  height: "60px",
                  borderRadius: "15px",
                  mt: 1,
                  mb: 3,
                }}
              />
              {formik.errors.password && formik.touched.password && (
                <Alert severity="error">
                  <strong>{formik.errors.password}</strong>
                </Alert>
              )}

              <TextField
                label="Mật khẩu"
                variant="outlined"
                type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                {...formik.getFieldProps("password")}
                onChange={formik.handleChange}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Link
                to="/forgot-password/otp"
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, mt: 2 }}
              >
                <FormControlLabel control={<Checkbox defaultChecked />} label="ghi nhớ mật khẩu" />
                <Typography
                  sx={{
                    fontSize: "1em",
                    color: "#FF0000",
                    "&:hover": {
                      opacity: "70%",
                      cursor: "pointer",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Quên mật khẩu?
                </Typography>
              </Link>
              <Button
                sx={{
                  backgroundColor: "#FFCF63",
                  borderRadius: "10px",
                  my: 1,
                  height: "2.75em",
                  fontSize: "1em",
                  fontWeight: "600",
                  textTransform: "none",
                }}
                type="submit"
              >
                Đăng nhập
              </Button>
              <Box display="flex" justifyContent="center" sx={{ my: 2 }}>
                <Divider sx={{ width: "70%" }} />
              </Box>
              <Button
                sx={{
                  backgroundColor: "black",
                  color: "#FFFFFF",
                  borderRadius: "10px",
                  my: 1,
                  height: "2.75em",
                  fontSize: "1em",
                  fontWeight: "600",
                  textTransform: "none",
                }}
              >
                <GoogleIcon sx={{ color: "red", mx: 2 }}></GoogleIcon>
                Hoặc đăng nhập với Google
              </Button>

              <Typography sx={{ my: 2, fontSize: "1rem" }}>
                Chưa có tài khoản?
                <Link to="/register">Đăng ký tại đây</Link>
              </Typography>
            </FormGroup>
          </form>
        </Container>
      </Box>
    </Box>
  );
}

export default Login;
