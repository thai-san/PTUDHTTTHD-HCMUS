import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Typography, Button, Box, Toolbar, IconButton, Menu, MenuItem, Divider } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import logo from "../assets/images/logo.png";
import { useStore } from "../app/store";
import AuthService from "../services/authServices";
import { b64_to_utf8 } from "../services/authServices";

function Header(): JSX.Element {
  const navigate = useNavigate();
  const { account, resetAccountAndToken } = useStore((state) => state); //
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  let role = "customer";
  if (account) {
    const localStorageRole = localStorage.getItem("role");
    if (localStorageRole) {
      role = b64_to_utf8(localStorageRole);
    }
  }

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    AuthService.logout();
    resetAccountAndToken();
    setAnchorEl(null);
    navigate("/login");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#C6B09F" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link to="/">
            <Button
              TouchRippleProps={{ style: { color: "white" } }}
              sx={{
                backgroundColor: "white",
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "whitesmoke",
                },
              }}
            >
              <img src={logo} className="App-logo" alt="logo" height={50} />
            </Button>
          </Link>
          <Typography variant="h6">Bảo Hiểm Y Tế</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Button color="inherit">Trang chủ</Button>
          {account ? (
            <Button
              component={Link}
              to="/register-insurance-1"
              color="inherit"
              sx={{
                "&:hover": {
                  backgroundColor: "gold",
                },
              }}
            >
              Đăng ký bảo hiểm
            </Button>
          ) : (
            <></>
          )}

          <Button color="inherit">Thông tin</Button>
          {account ? (
            <>
              <IconButton onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose}>{account.username}</MenuItem>
                {role === "customer" && (
                  <>
                    <MenuItem onClick={() => handleNavigate("/user/profile")}>Profile</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/payment-requests")}>Yêu cầu thanh toán</MenuItem>
                    <MenuItem onClick={() => handleNavigate(`/compensation-request/customer/${account.userId}`)}>
                      DS Yêu cầu bồi thường
                    </MenuItem>
                  </>
                )}

                {role === "employee" && (
                  <>
                    <MenuItem onClick={() => handleNavigate("/employee/list-requirement")}>Yêu cầu bảo hiểm</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/employee/list-approved-policy")}>
                      Chính sách phát hành
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigate("/employee/list-payment-request")}>
                      Thanh toán của khách hàng
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigate("/employee/list-customer")}>Danh sách khách hàng</MenuItem>
                    <MenuItem onClick={() => handleNavigate("/compensation-request/approval")}>
                      Duyệt Yêu cầu bồi thường
                    </MenuItem>
                  </>
                )}

                <Divider />
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              TouchRippleProps={{ style: { color: "white" } }}
              sx={{
                background: "gold",
                "&:hover": {
                  backgroundColor: "gold",
                },
              }}
            >
              Đăng nhập
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
