import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import otp from "../assets/images/otp.png";
import { requestResetPassword } from "../services/forgotServices";
import { useNavigate } from "react-router-dom";

export default function OTP(): JSX.Element {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [codeOtp, setCodeOtp] = useState("");
  const [error, setError] = useState({});
  const [data, setData] = useState("");

  const fetch = () => {
    requestResetPassword(email)
      .then((res: any) => {
        setData(res.data);
        setError("");
        setOtpSent(true);
      })
      .catch((err: any) => {
        console.log(err);
        if (err.response.request.status === 404) {
          alert("Invalid email address.");
          setError("Không có email");
          setEmail("");
        }
      });
  };

  const handleSubmitOtp = () => {
    navigate("/change-password", {
      state: {
        data: data,
      },
    });
    // const data = {
    //   userId: userId,
    //   resetCode: codeOtp,
    //   newPassword: password,
    // };
    // resetPassword(data)
    //   .then((res: any) => {
    //     if (res) {
    //       alert("Password reset")
    //       navigate('/login')
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.response.data.message) {
    //       alert(err.response.data.message)
    //     }
    //   })
  };

  const handleCheckOTP = () => {
    const newErrors = {};

    if (codeOtp.trim() === "") {
      newErrors.codeOtp = "OTP is required";
      if (otpSent != codeOtp) {
        setError({ codeOtp: "Mã xác thực không đúng" });
      }
    }

    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      handleSubmitOtp();
    }
  };

  const isEmailValid = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmail = () => {
    if (email.trim() === "") {
      setError({ email: "Email is required" });
    } else if (!isEmailValid(email)) {
      setError({ email: "Incorrect format" });
    } else {
      fetch();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
      }}
    >
      <img src={otp} alt="otp-image" />
      <Box width={450} sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          fontWeight={600}
          sx={{
            textAlign: "center",
            padding: "20px",
          }}
        >
          Xác thực OTP
        </Typography>
        {otpSent ? (
          <>
            <Typography sx={{ my: 2, fontSize: "1rem" }}>Nhập mã xác nhận đã được gửi đến email của bạn</Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                id="outlined-basic"
                label="OTP"
                type="password"
                value={codeOtp || ""}
                variant="outlined"
                sx={{
                  mb: 3,
                  borderColor: error ? "red" : "", // Set border color to red if there's an error
                }}
                name="otp"
                onChange={(e) => setCodeOtp(e.target.value)}
                error={Boolean(error.codeOtp)}
                helperText={error.codeOtp}
              />
              <Button
                sx={{
                  backgroundColor: "#FFCF63",
                }}
                onClick={handleCheckOTP}
              >
                Xác nhận
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography sx={{ my: 2, fontSize: "1rem" }}>
              Chúng tôi sẽ gửi mã xác nhận đến địa chỉ email của bạn
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                id="outlined-basic"
                label="Email"
                value={email || ""}
                variant="outlined"
                sx={{
                  mb: 3,
                  borderColor: error ? "red" : "",
                }}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(error.email)}
                helperText={error.email}
              />
              <Button
                sx={{
                  backgroundColor: "#FFCF63",
                }}
                onClick={handleEmail}
              >
                Lấy OTP
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
