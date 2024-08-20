import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as insuranceApprovalServices from "../../services/InsuranceApprovalServices";
import * as insurancePaymentServices from "../../services/insurancePaymentServices";
import { Stack } from "@mui/system";
import { Close } from "@mui/icons-material";

interface IApprovedPolicy {
  guid: string;
  policyId: number;
  customerId: number;
  customerName: string;
  insuranceId: number;
  insuranceName: string;
  paymentOpption: string;
  approvalDate: string;
  employeeName: string;
  StartDate: Date;
  EndDate: Date;
}

function ApprovedInsurancePolicies(): JSX.Element {
  const [approvedPolicyList, setApprovedPolicyList] = useState<IApprovedPolicy[]>([]);
  const [open, setOpen] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [openCreatePayment, setOpenCreatePayment] = useState(false);
  const [amount, setAmout] = useState<number>(0);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const columns: GridColDef[] = [
    { field: "policyId", headerName: "Mã CS", flex: 0.35, align: "center" },
    { field: "customerId", headerName: "Mã khách hàng", flex: 0.65, align: "center" },
    { field: "customerName", headerName: "Tên khách hàng", flex: 1 },
    { field: "insuranceName", headerName: "Gói bảo hiểm", flex: 1 },
    { field: "paymentOpption", headerName: "Kỳ trả", flex: 0.5 },
    {
      field: "approvalDate",
      headerName: "Ngày duyệt",
      flex: 1,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "endDate",
      headerName: "Ngày hết hạn",
      flex: 1,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
    { field: "employeeName", headerName: "NV duyệt", flex: 1 },
    {
      field: "actions",
      align: "center",
      headerName: "Actions",
      width: 130,
      renderCell: () => {
        return <Button onClick={() => setOpen(true)}>Chi tiết</Button>;
      },
    },
  ];
  useEffect(() => {
    void getApprovedPolicyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getApprovedPolicyList = async () => {
    try {
      const response = await insuranceApprovalServices.getApprovedPolicyList();
      setApprovedPolicyList(response);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleOpenCreatePayment = async () => {
    try {
      const response = await insurancePaymentServices.getPaymentRequest(selectedRow.row.customerId);
      setPaymentRequest(response);
      setOpenCreatePayment(true);
    } catch (error: any) {
      setOpenCreatePayment(true);
    }
  };

  const handleCreatePaymentRequest = async (): Promise<void> => {
    try {
      await insurancePaymentServices.createPaymentRequest(selectedRow.row.customerId, {
        PolicyId: selectedRow.row.policyId,
        Amount: amount,
        Status: false,
        Type: "Thanh toán",
        Note: selectedRow.row.insuranceName,
      });
      alert("Tạo thanh toán thành công");
      setOpenCreatePayment(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseCreatePayment = () => {
    setOpenCreatePayment(false);
  };
  return (
    <Box sx={{ width: "100%", mx: 5, mb: 5, mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{
            textAlign: "center",
            padding: "20px",
          }}
        >
          Chính sách đã được phát hành
        </Typography>
        {approvedPolicyList.length != 0 ? (
          <DataGrid
            getRowId={(row) => row.guid}
            rows={approvedPolicyList}
            columns={columns}
            onRowClick={(row) => {
              console.log(row);
              setSelectedRow(row);
              console.log("sêc:", selectedRow);
            }}
          />
        ) : (
          <Box sx={{ height: 300, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography>không có chính sách nào đã phát hành !</Typography>
          </Box>
        )}
      </Box>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              marginTop: "-5vh",
              minHeight: "40vh",
              minWidth: "45vw",
              maxHeight: 650,
            },
          }}
        >
          <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={handleClose}>
            <Close />
          </IconButton>
          <DialogTitle sx={{ backgroundColor: "#2596be", color: "#fff" }} align="center" mb={1}>
            Thông tin chi tiết
          </DialogTitle>
          <DialogContent>
            <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
              <Typography variant="body1">
                <strong>Mã số chính sách : </strong>
                {selectedRow.row.policyId}
              </Typography>
            </Stack>
            <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
              <Typography variant="body1">
                <strong>Khách hàng:</strong>
                {selectedRow.row.customerName}
              </Typography>
              <Typography variant="body1">
                <strong>Mã số khách hàng:</strong>
                {selectedRow.row.customerId}
              </Typography>
            </Stack>

            <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
              <Typography variant="body1">
                <strong>Ngày bắt đầu:</strong>
                {new Date(selectedRow.row.startDate).toLocaleString().split(",")[0].trim()}
              </Typography>
            </Stack>
            <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
              <Typography variant="body1">
                <strong>Ngày kết thúc:</strong>
                {new Date(selectedRow.row.endDate).toLocaleString().split(",")[0].trim()}
              </Typography>
            </Stack>
            <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
              <Typography variant="body1">
                <strong>Trả theo:</strong>
                {selectedRow.row.paymentOpption}
              </Typography>
            </Stack>
            <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
              <Typography variant="body1">
                <strong>Tên gói bảo hiểm:</strong>
                {selectedRow.row.insuranceName}
              </Typography>
              <Typography variant="body1">
                <strong>Mã gói bảo hiểm:</strong>
                {selectedRow.row.insuranceId}
              </Typography>
            </Stack>
            <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
              <Typography variant="body1">
                <strong>Nhân viên phê duyệt:</strong>
                {selectedRow.row.employeeName}
              </Typography>
            </Stack>
            <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
              <Typography variant="body1">
                <strong>Ngày duyệt:</strong>
                {new Date(selectedRow.row.approvalDate).toLocaleString().split(",")[0].trim()}
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Đóng
              </Button>
            </DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Gửi thông báo
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {openCreatePayment && (
        <Dialog open={openCreatePayment} onClose={handleCloseCreatePayment}>
          <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={handleCloseCreatePayment}>
            <Close />
          </IconButton>
          <DialogTitle sx={{ backgroundColor: "#2596be", color: "#fff" }} align="center" mb={1}>
            Tạo Thanh Toán
          </DialogTitle>
          <DialogContent>
            {paymentRequest ? (
              <Typography>Khách hàng này đã có thanh toán</Typography>
            ) : (
              <TextField
                sx={{ marginTop: 2 }}
                label="Số tiền thanh toán"
                variant="outlined"
                value={amount}
                onChange={(event) => setAmout(Number(event.target.value))}
                fullWidth
              />
            )}
          </DialogContent>
          <DialogActions>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenCreatePayment(false);
                }}
              >
                Đóng
              </Button>
              {!paymentRequest && <Button onClick={() => void handleCreatePaymentRequest()}>Tạo Thanh Toán</Button>}
            </DialogActions>
          </DialogActions>
        </Dialog>
      )}
      {selectedRow && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            sx={{ width: "20%", bgcolor: "#FFCF63" }}
            onClick={() => void handleOpenCreatePayment()}
          >
            Tạo Thanh Toán
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ApprovedInsurancePolicies;
