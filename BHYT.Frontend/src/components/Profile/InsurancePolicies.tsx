/* eslint-disable @typescript-eslint/prefer-for-of */
import { useEffect, useState } from "react";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import InfoIcon from "@mui/icons-material/Info";
import { CheckCircle } from "@mui/icons-material";
import ConfirmDialog from "../../components/ConfirmDialog";
import * as customerPolicyServices from "../../services/customerPolicyServices";
import { useStore } from "../../app/store";
import { Stack } from "@mui/system";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { useNavigate } from "react-router-dom";

interface InsuranceData {
  id: number;
  guid: null | string;
  startDate: string;
  createdDate: string;
  endDate: string;
  premiumAmount: number;
  paymentOption: boolean;
  coverageType: string;
  deductibleAmount: number;
  benefitId: number;
  insuranceId: number;
  latestUpdate: string;
  description: null | string;
  status: boolean;
  company: string;
}

function InsurancePolicies(): JSX.Element {
  const [policies, setPolicies] = useState<InsuranceData[]>([]);
  const [selectedRowList, setSelectedRowList] = useState<any>([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const account = useStore((state) => state.account);

  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: "id", headerName: "Mã CS", flex: 0.5, align: "left" },
    {
      field: "paymentOption",
      headerName: "Kì thanh toán",
      flex: 1,
      valueFormatter: (params) => (params.value === 0 ? "Tháng" : "Năm"),
    },
    { field: "premiumAmount", headerName: "Phí bảo hiểm", flex: 1 },
    { field: "coverageType", headerName: "Loại bảo hiểm", flex: 1.5 },
    {
      field: "latestUpdate",
      headerName: "Cập nhật gần nhất",
      flex: 1.5,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "endDate",
      headerName: "Hết hạn",
      flex: 1,
      valueFormatter: (params) => new Date(params.value).toLocaleString().split(",")[0].trim(),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 0.75,
      align: "center",
      renderCell: (params) =>
        params.value === false ? (
          <HourglassTopIcon style={{ color: "orange" }} />
        ) : (
          <CheckCircle style={{ color: "green" }} />
        ),
    },
  ];

  useEffect(() => {
    if (account) {
      void getPolicyList(Number(account.userId));
    }
  }, [account]);

  const getPolicyList = async (userId: number) => {
    try {
      const response = await customerPolicyServices.getListCustomerPolicy(userId);
      setPolicies(response);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <Box
      mt={3}
      mb={10}
      borderRadius={2}
      boxShadow={"8px 8px 8px rgba(79,79,79,.25)"}
      sx={{
        width: "75vw",
        height: "65vh",
        backgroundColor: "#f6f6f6",
      }}
    >
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        title="Xác nhận"
        message="Bạn có chắc chắn muốn yêu cầu hủy các chính sách đã chọn ?"
        onConfirm={() => {
          alert("test, chưa xử lý logic");
        }}
      />
      {selectedRowList.length != 0 ? (
        <Box py={1} px={1} sx={{ width: "100%", background: "rgba(25, 118, 210, 0.12)" }}>
          <Stack spacing={3} direction="row">
            <Button
              onClick={() => {
                if (selectedRowList.length > 1) {
                  alert("chọn một chính sách để yêu cầu bồi thường!");
                } else {
                  navigate(`/compensation-request/policy/${selectedRowList[0]}`);
                }
              }}
            >
              Yêu cầu bồi thường
            </Button>
            <Button
              onClick={() => {
                if (selectedRowList.length > 1) {
                  alert("chọn một chính sách để yêu cầu gia hạn!");
                }
              }}
            >
              Gia hạn/ Nâng cấp
            </Button>
            <Button
              onClick={() => {
                setOpenConfirmDialog(true);
              }}
            >
              Yêu cầu hủy CS
            </Button>

            <Tooltip title="More detail">
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      ) : (
        <></>
      )}
      <DataGrid
        getRowId={(row) => row.id}
        rows={policies}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(ids) => {
          setSelectedRowList(ids);
        }}
      />
    </Box>
  );
}

export default InsurancePolicies;
