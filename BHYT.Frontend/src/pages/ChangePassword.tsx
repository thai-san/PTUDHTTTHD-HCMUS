import { Box, FormGroup, TextField, Typography, Button, Divider, Container, IconButton } from "@mui/material";
//import { Link } from "react-router-dom";
import Title from "../components/Title";
import LoginImage from "../assets/images/login.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { resetPassword } from "../services/forgotServices";
//import GoogleIcon from "@mui/icons-material/Google";
function ForgotPassword(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  useEffect(() => {
    if (!location?.state) {
      navigate("/login");
    }
  }, [location?.state, navigate]);

  const handleReset = () => {
    const data = {
      userId: location.state?.data[0].toString(),
      resetCode: location.state?.data[1],
      newPassword: password,
    };
    resetPassword(data)
      .then((res: any) => {
        if (res) {
          alert("Password reset");
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          alert(err.response.data.message);
        }
      });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleRePasswordVisibility = () => {
    setShowRePassword(!showRePassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (password.length < 8 || !/[A-Z]/.test(password)) {
      newErrors.password = "Password must be at least 8 characters with at least one uppercase letter";
    }

    if (rePassword.trim() === "") {
      newErrors.rePassword = "Please re-enter your password";
    } else if (password !== rePassword) {
      newErrors.rePassword = "Passwords do not match";
    }

    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      handleReset();
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Title title="Quên mật khẩu" path="Trang chủ / Quên mật khẩu"></Title>
      <Box sx={{ display: "flex", mt: 5, px: 5 }}>
        <Container>
          <img src={LoginImage} className="App-logo" alt="logo" />
        </Container>
        <Container className="InputField" sx={{ display: "flex", flexDirection: "column", minWidth: "200px" }}>
          <Typography
            variant="h4"
            fontWeight={600}
            sx={{
              textAlign: "center",
              padding: "20px",
            }}
          >
            Thay đổi mật khẩu
          </Typography>
          <FormGroup>
            <TextField
              id="outlined-basic"
              label="Mật khẩu mới"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              sx={{
                textAlign: "center",
                height: "60px",
                borderRadius: "15px",
                my: 1,
                borderColor: error.password ? "red" : "",
              }}
              value={password || ""}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(error.password)}
              helperText={error.password}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    sx={{
                      backgroundColor: "transparent",
                      borderRadius: "0px 15px 15px 0px",
                      padding: "0",
                    }}
                  >
                    {showRePassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              id="outlined-basic"
              label="Xác nhận mật khẩu"
              type={showRePassword ? "text" : "password"}
              variant="outlined"
              sx={{
                textAlign: "center",
                height: "60px",
                borderRadius: "15px",
                my: 3,
                borderColor: error.rePassword ? "red" : "",
              }}
              value={rePassword || ""}
              name="rePassword"
              onChange={(e) => setRePassword(e.target.value)}
              error={Boolean(error.rePassword)}
              helperText={error.rePassword}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleToggleRePasswordVisibility}
                    sx={{
                      backgroundColor: "transparent",
                      borderRadius: "0px 15px 15px 0px",
                      padding: "0",
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <Button
              component={Link}
              to="#"
              variant="outlined"
              sx={{
                backgroundColor: "#FFCF63",
                borderRadius: "10px",
                my: 3,
                height: "2.75em",
                fontSize: "1em",
                fontWeight: "600",
                textTransform: "none",
              }}
              onClick={handleSubmit}
            >
              Xác nhận
            </Button>
            <Box display="flex" justifyContent="center" sx={{ my: 2 }}>
              <Divider
                sx={{
                  width: "70%",
                }}
              />
            </Box>
          </FormGroup>
        </Container>
      </Box>
    </Box>
  );
}

export default ForgotPassword;
