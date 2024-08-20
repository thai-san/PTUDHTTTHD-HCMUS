import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack } from "@mui/system";
import { Close } from "@mui/icons-material";
import * as compensationServices from "../../services/compensationServices";
import { useStore } from "../../app/store";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { CheckCircle } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

interface ICompensation {
  id: number;
  guid: string;
  policyId: number;
  employeeId: number | null;
  date: string;
  amount: number;
  hoptitalName: string;
  hopitalCode: string;
  dateRequest: string;
  usedServices: string;
  getOption: number;
  note: string;
  status: boolean;
}

function CompensationApproval(): JSX.Element {
  const account = useStore((state) => state.account);
  const [conpensations, setCompensations] = useState<ICompensation[]>([]);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const columns: GridColDef[] = [
    {
      field: "policyId",
      headerName: "Mã chính sách",
      flex: 0.35,
      align: "center",
    },
    {
      field: "dateRequest",
      headerName: "Ngày yêu cầu",
      flex: 1,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
    { field: "amount", headerName: "Số tiền", flex: 0.5 },
    {
      field: "getOption",
      headerName: "Hình thức hoàn trả",
      flex: 0.5,
      renderCell: (params) => (params.value === 1 ? "Ngân hàng" : "Tiền mặt"),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 0.75,
      renderCell: (params) =>
        params.value === false ? (
          <Box display={"flex"}>
            <HourglassTopIcon style={{ color: "orange" }} />
            <Typography>Đang chờ</Typography>
          </Box>
        ) : params.value === true ? (
          <Box display={"flex"}>
            <CheckCircle style={{ color: "green" }} />
            <Typography>Đã chi trả</Typography>
          </Box>
        ) : (
          <Box display={"flex"}>
            <CloseIcon style={{ color: "red" }} />

            <Typography>Từ chối thanh toán</Typography>
          </Box>
        ),
    },
    {
      field: "actions",
      align: "left",
      headerName: "Actions",
      width: 140,
      renderCell: () => {
        return (
          <Button style={{ fontSize: "0.8rem" }} onClick={() => setOpen(true)}>
            Chi tiết/phê duyệt
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    if (account) {
      void getconpensations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getconpensations = async () => {
    try {
      const response = await compensationServices.getCompensationRequests();
      setCompensations(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCompensation = async (newStatus: any) => {
    try {
      const data = {
        compensationId: selectedRow.row.id,
        newStatus: newStatus,
      };
      const response = await compensationServices.updateCompensationStatus(data);
      alert(response.message);
      void getconpensations();
    } catch (error: any) {
      console.log(error);
    }
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
          Danh sách yêu cầu chỉ trả bảo hiểm
        </Typography>

        <DataGrid
          getRowId={(row) => row.guid}
          rows={conpensations}
          columns={columns}
          onRowClick={(row) => {
            setSelectedRow(row);
          }}
          sortModel={[{ field: "status", sort: "desc" }]}
        />
      </Box>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              marginTop: "-5vh",
              minWidth: "45vw",
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
                <strong>Bệnh viện : </strong>
                {selectedRow.row.hoptitalName}
              </Typography>
              <Typography variant="body1">
                <strong>Mã số bệnh viện: </strong>
                {selectedRow.row.hopitalCode}
              </Typography>
            </Stack>
            <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
              <Typography variant="body1">
                <strong>Ngày khám bệnh :</strong>
                {new Date(selectedRow.row.date).toLocaleString()}
              </Typography>
            </Stack>
            <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
              <Typography variant="body1">
                <strong>Ngày yêu cầu:</strong>
                {new Date(selectedRow.row.dateRequest).toLocaleString()}
              </Typography>
            </Stack>
            <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
              <Typography variant="body1">
                <strong>Các dịch vụ sử dụng:</strong>
                {selectedRow.row.usedServices.trim()}
              </Typography>
            </Stack>
            <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
              <Typography variant="body1">
                <strong>Ghi chú yêu cầu:</strong>
                {selectedRow.row.note}
              </Typography>
            </Stack>
            <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
              <Typography variant="body1">
                <strong>Hình thức nhận tiền:</strong>
                {selectedRow.row.getOption == 1 ? "Chuyển khoản ngân hàng" : "Tiền mặt"}
              </Typography>
            </Stack>
            <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
              <Typography variant="body1">
                <strong>Trạng thái :</strong>
                {selectedRow.row.status === true
                  ? "Đã duyệt."
                  : selectedRow.row.status === false
                    ? "Chưa duyệt."
                    : "Từ chối thanh toán."}
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions>
            <DialogActions>
              {selectedRow && selectedRow.row.status != true && (
                <>
                  <Button
                    onClick={() => {
                      setOpen(false);
                      setOpenConfirm(true);
                    }}
                  >
                    Phê duyệt chi trả
                  </Button>
                  {selectedRow.row.status != null && (
                    <Button
                      onClick={() => {
                        setOpen(false);
                        void handleCompensation(null);
                      }}
                    >
                      Từ chối
                    </Button>
                  )}
                </>
              )}
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Đóng
              </Button>
            </DialogActions>
          </DialogActions>
        </Dialog>
      )}
      <Dialog
        open={openConfirm}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setOpenConfirm(false);
            void handleCompensation(true);
          },
        }}
      >
        <DialogTitle>Xác nhận </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Số tiền được hệ thống tự động chuyển đến số tài khoản của khách hàng nếu thực hiện phê duyệt thành công.
          </DialogContentText>
          <Box height={25}></Box>
          <TextField
            autoFocus
            required
            defaultValue={selectedRow ? selectedRow.row.amount : 0}
            label="Tổng tiền chi trả (VND)"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>hủy</Button>
          <Button type="submit">chi trả</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CompensationApproval;
