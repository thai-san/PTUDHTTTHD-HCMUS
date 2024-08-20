/* eslint-disable @typescript-eslint/prefer-for-of */
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack } from "@mui/system";
import InfoIcon from "@mui/icons-material/Info";
import { CheckCircle } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { Close } from "@mui/icons-material";
import ConfirmDialog from "../../components/ConfirmDialog";
import Paper from "@mui/material/Paper";
import * as userServices from "../../services/userServices";
import * as customerPolicyServices from "../../services/customerPolicyServices";

interface customer {
  id: number;
  guid: string;
  fullname: string;
  address: string;
  phone: string;
  birthday: string;
  sex: number;
  email: string;
  statusId: number;
}

function CustomerList(): JSX.Element {
  const [customerList, setCustomerList] = useState<customer[]>([]);
  const [selectedRowList, setSelectedRowList] = useState<any>([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [purchasedPolicies, setPurchasedPolies] = useState<any>(null);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Mã khách hàng", flex: 1, align: "left" },
    { field: "fullname", headerName: "Tên khách hàng", flex: 1 },
    { field: "phone", headerName: "số điện thoại", flex: 1 },
    { field: "sex", headerName: "Giới tính", flex: 1, valueFormatter: (params) => (params.value === 0 ? "Nữ" : "Nam") },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "birthday",
      headerName: "Ngày sinh",
      flex: 1,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "statusId",
      headerName: "Trạng thái",
      flex: 0.5,
      align: "center",
      renderCell: (params) =>
        params.value === 0 ? <CloseIcon style={{ color: "red" }} /> : <CheckCircle style={{ color: "green" }} />,
    },
  ];
  useEffect(() => {
    void getCustomerList();
  }, []);

  const getCustomerList = async () => {
    try {
      const response = await userServices.getlistCustomer();
      setCustomerList(response);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handlePersonOffIconClick = () => {
    setOpenConfirmDialog(true);
  };

  const changeUserStatus = async (customerId: number, newStatus: number) => {
    try {
      const data = {
        customerId: customerId,
        newStatus: newStatus,
      };
      const response = await userServices.updateStatus(data);
      console.log(response.message);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeStatus = async (newStatus: number) => {
    try {
      await Promise.all(
        selectedRowList.map(async (id: number) => {
          try {
            await changeUserStatus(id, newStatus);
          } catch (error: any) {
            console.log("Error: ", error.message);
          }
        })
      );

      setCustomerList([]);
      setOpenConfirmDialog(false);

      await getCustomerList();
    } catch (error: any) {
      console.log("Error: ", error.message);
    }
  };

  const checkActiveBtn = (listId: []) => {
    for (let i = 0; i < listId.length; i++) {
      const temp = customerList.find((ele) => {
        if (ele.statusId == 1 && ele.id == listId[i]) {
          return ele;
        }
      });
      if (temp) {
        return false;
      }
    }
    return true;
  };

  const handleDisplayPurchasedPolicies = async () => {
    if (selectedRowList.length >= 2) {
      alert("vui lòng chọn duy nhất 1 khách hàng để xem ds bảo hiểm !");
      return;
    }

    const customerId = selectedRowList[0];
    try {
      const response = await customerPolicyServices.getListCustomerPolicy(customerId);
      setPurchasedPolies(response);
      setOpenDialog(true);
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <Box sx={{ height: "100%", width: "100%", mx: 5, mb: 5, my: 4 }}>
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        title="Xác nhận"
        message="Bạn có chắc chắn muốn disable trạng thái các khách hàng đã chọn ?"
        onConfirm={() => {
          void handleChangeStatus(0);
        }}
      />

      {openDialog && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          PaperProps={{
            style: {
              marginTop: "-5vh",
              minHeight: "40vh",
              minWidth: "65vw",
              maxHeight: 650,
            },
          }}
        >
          <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={handleCloseDialog}>
            <Close />
          </IconButton>
          <DialogTitle sx={{ backgroundColor: "#2596be", color: "#fff" }} align="center" mb={1}>
            Danh sách bảo hiểm khách hàng đã mua
          </DialogTitle>
          <DialogContent>
            <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">MaCS </TableCell>
                      <TableCell align="left">Ngày đến hạn</TableCell>
                      <TableCell align="left">Loại bảo hiểm</TableCell>
                      <TableCell align="left">phí BH</TableCell>
                      <TableCell align="left">Miễn trừ</TableCell>
                      <TableCell align="left">Tình trạng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {purchasedPolicies.map((row: any, index: number) => (
                      <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell align="left">{row.insuranceId}</TableCell>
                        <TableCell align="left">{new Date(row.endDate).toLocaleString()}</TableCell>
                        <TableCell align="left">{row.coverageType}</TableCell>
                        <TableCell align="left">{row.premiumAmount}</TableCell>
                        <TableCell align="left">{row.deductibleAmount}</TableCell>
                        <TableCell align="left">{row.status == true ? "active" : "chưa duyệt"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </DialogContent>
          <DialogActions>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenDialog(false);
                }}
              >
                Đóng
              </Button>
            </DialogActions>
          </DialogActions>
        </Dialog>
      )}
      <Typography variant="h6" align="center" my={1} fontWeight={600}>
        Danh sách khách hàng
      </Typography>

      {selectedRowList.length != 0 ? (
        <Box py={1} px={1} sx={{ width: "100%", background: "rgba(25, 118, 210, 0.12)" }}>
          <Stack spacing={3} direction="row">
            <Button
              onClick={() => {
                void handleDisplayPurchasedPolicies();
              }}
            >
              DS Bảo hiểm
            </Button>
            <Tooltip title="More detail">
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="disable khách hàng">
              <IconButton onClick={handlePersonOffIconClick}>
                <PersonOffIcon />
              </IconButton>
            </Tooltip>
            {checkActiveBtn(selectedRowList) ? (
              <Tooltip title="active khách hàng">
                <Button
                  onClick={() => {
                    void handleChangeStatus(1);
                  }}
                >
                  Active
                </Button>
              </Tooltip>
            ) : (
              <></>
            )}
          </Stack>
        </Box>
      ) : (
        <></>
      )}
      <DataGrid
        getRowId={(row) => row.id}
        rows={customerList}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(ids) => {
          setSelectedRowList(ids);
        }}
      />
    </Box>
  );
}

export default CustomerList;
