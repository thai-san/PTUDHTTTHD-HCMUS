import * as insurancePaymentServices from "../../services/insurancePaymentServices";
import { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Close } from "@mui/icons-material";
import { useStore } from "../../app/store";

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Ngày yêu cầu",
    flex: 1,
    valueFormatter: (params) => new Date(params.value).toLocaleString(),
  },
  { field: "amount", headerName: "Tổng", type: "number", flex: 1 },
  { field: "status", headerName: "Trạng Thái", type: "boolean", flex: 1 },
  { field: "type", headerName: "Loại", flex: 1 },
  { field: "note", headerName: "Ghi chú", flex: 1 },
];
const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

interface IPaymentRequestsDetails {
  id: number;
  companyName: string;
  policyNumber: string;
  requestDate: string;
  amount: number;
  status: string;
}

function AllPaymentRequests(): JSX.Element {
  const account = useStore((state) => state.account);
  const [open, setOpen] = useState(false);
  const [insurancePayment, setInsurancePayment] = useState<IPaymentRequestsDetails[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  useEffect(() => {
    if (account) {
      void getPaymentRequest();
    }
  }, [account]);

  const getPaymentRequest = async () => {
    try {
      const response = await insurancePaymentServices.getAllPaymentRequest();
      setInsurancePayment(response.insurancePayments);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const deletePaymentRequest = async () => {
    try {
      await insurancePaymentServices.deletePaymentRequest(selectedRow.id);
      setOpen(false);
      await getPaymentRequest();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%", mx: 3, mb: 5, mt: 2 }}>
      {" "}
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
          Yêu cầu thanh toán
        </Typography>
        <DataGrid
          getRowId={(row) => row.guid}
          rows={insurancePayment}
          columns={columns}
          onRowClick={(row) => {
            setSelectedRow(row);
          }}
        />
        {selectedRow && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              sx={{ width: "20%", bgcolor: "#FFCF63" }}
              onClick={() => void deletePaymentRequest()}
            >
              Xóa Thanh Toán
            </Button>
          </Box>
        )}
        <Modal open={open} onClose={handleClose}>
          <Box sx={{ ...style, position: "relative" }}>
            <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={handleClose}>
              <Close />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ mb: 2, textAlign: "center" }}>
              Chi tiết chính sách thanh toán
            </Typography>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{ marginTop: "1rem", width: "100%", bgcolor: "#FFCF63" }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default AllPaymentRequests;
