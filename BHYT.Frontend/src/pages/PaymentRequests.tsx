import * as insurancePaymentServices from "../services/insurancePaymentServices";
import * as customerPolicyServices from "../services/customerPolicyServices";
import * as paymentLinkServices from "../services/paymentLinkServices";
import { useEffect, useState } from "react";
import { Box, Button, Typography, Grid, Modal, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Close } from "@mui/icons-material";
import { useStore } from "../app/store";

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
  note: string;
  subscriptionId: string;
}

function PaymentRequests(): JSX.Element {
  const account = useStore((state) => state.account);
  const [open, setOpen] = useState(false);
  const [insurancePayment, setInsurancePayment] = useState<IPaymentRequestsDetails[]>([]);
  const [customerPolicy, setCustomerPolicy] = useState<any>(null);
  const [selectedRow, setSelectedRow] = useState<IPaymentRequestsDetails | null>(null);

  useEffect(() => {
    if (account) {
      void getPaymentRequest(account.id);
    }
  }, [account]);

  const getPaymentRequest = async (id: string) => {
    try {
      const response = await insurancePaymentServices.getPaymentRequest(id);
      setInsurancePayment(response.insurancePayments);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleRowClick = async (param: GridRowParams) => {
    try {
      const response = await customerPolicyServices.getCustomerPolicy(param.row.policyId);
      setCustomerPolicy(response.customerPolicy);
      setSelectedRow(param.row as IPaymentRequestsDetails);
      setOpen(true);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePayment = async () => {
    try {
      const response = await paymentLinkServices.createPaymentLink(account?.id ?? "", {
        Amount: selectedRow?.amount,
        ProductName: selectedRow?.note,
        PaymentOption: customerPolicy?.paymentOption ? "month" : "year",
      });
      window.open(response.link);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      await paymentLinkServices.cancelSubscription(selectedRow?.subscriptionId ?? "");
      setOpen(false);
      await getPaymentRequest(account?.id ?? "");
      alert("Hủy thanh toán thành công");
    } catch (error: any) {
      alert(error.response.data);
    }
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
            void handleRowClick(row);
          }}
        />
        <Modal open={open} onClose={handleClose}>
          <Box sx={{ ...style, position: "relative" }}>
            <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={handleClose}>
              <Close />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ mb: 2, textAlign: "center" }}>
              Chi tiết chính sách thanh toán
            </Typography>
            {selectedRow && customerPolicy && (
              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Công Ty: </strong> {customerPolicy.company}
                  </Typography>
                  <Typography>
                    <strong>Loại bảo hiểm:</strong> {customerPolicy.coverageType}
                  </Typography>
                  <Typography>
                    <strong>Mô tả bảo hiểm:</strong> {customerPolicy.description}
                  </Typography>
                  <Typography>
                    <strong>Thời điểm yêu cầu:</strong> {new Date(customerPolicy.createdDate).toLocaleString()}
                  </Typography>
                  <Typography>
                    <strong>Thời điểm bắt đầu:</strong> {new Date(customerPolicy.startDate).toLocaleString()}
                  </Typography>
                  <Typography>
                    <strong>Thời điểm kết thúc:</strong> {new Date(customerPolicy.endDate).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Trả theo:</strong> {customerPolicy.paymentOption ? "Tháng" : "Năm"}
                  </Typography>
                  <Typography>
                    <strong>Trạng thái:</strong> {customerPolicy.status ? "Còn hạn" : "Hết hạn"}
                  </Typography>
                  <Typography>
                    <strong>Số tiền bảo hiểm:</strong> {customerPolicy.premiumAmount}
                  </Typography>
                  <Typography>
                    <strong>Số tiền được khấu trừ:</strong> {customerPolicy.deductibleAmount}
                  </Typography>
                </Grid>
              </Grid>
            )}
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{ marginTop: "1rem", width: "100%", bgcolor: "#FFCF63" }}
            >
              Close
            </Button>
            {selectedRow?.subscriptionId && (
              <Button
                variant="contained"
                onClick={() => void handleCancelSubscription()}
                sx={{ marginTop: "1rem", width: "100%", bgcolor: "#FFCF63" }}
              >
                Hủy Thanh toán
              </Button>
            )}
          </Box>
        </Modal>
        {selectedRow && !selectedRow?.status && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" sx={{ width: "20%", bgcolor: "#FFCF63" }} onClick={() => void handlePayment()}>
              Thanh Toán
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default PaymentRequests;
