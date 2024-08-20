import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useState, useEffect, useMemo } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Stack } from "@mui/system";
import { stableSort, getComparator } from "../../helpers/sort";
import * as insuranceApprovalServices from "../../services/InsuranceApprovalServices";
import * as customerPolicyServices from "../../services/customerPolicyServices";
import * as healthHistoryServices from "../../services/healthHistoryServices";
import { Close } from "@mui/icons-material";
import ConfirmDialog from "../../components/ConfirmDialog";
interface Data {
  policyID: number;
  customerID: number;
  customerName: string;
  customerBirthday: string;
  customerSex: string;
  customerPhone: string;
  customerEmail: string;
  customerAdrress: string;
  startDate: string;
  endDate: string;
  insuranceID: number;
  insuranceName: string;
  createdDate: string;
  paymentOption: string;
  status: string;
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}
const headCells: readonly HeadCell[] = [
  {
    id: "customerName",
    numeric: false,
    disablePadding: true,
    label: "Khách Hàng",
  },
  {
    id: "customerBirthday",
    numeric: false,
    disablePadding: false,
    label: "Ngày sinh",
  },
  {
    id: "customerPhone",
    numeric: false,
    disablePadding: false,
    label: "Điện thoại",
  },
  {
    id: "customerSex",
    numeric: false,
    disablePadding: false,
    label: "Giới tính",
  },
  {
    id: "insuranceName",
    numeric: false,
    disablePadding: false,
    label: "Gói BH",
  },
  {
    id: "createdDate",
    numeric: false,
    disablePadding: false,
    label: "Ngày tạo",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Trạng thái",
  },
];

type Order = "asc" | "desc";
interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
interface EnhancedTableToolbarProps {
  numSelected: number;
  isOpenConfirmDialogForm: () => void;
  isOpenReviewDialogForm: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, isOpenConfirmDialogForm, isOpenReviewDialogForm } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
            Danh sách yêu cầu mua bảo hiểm
          </Typography>
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
          Danh sách yêu cầu mua bảo hiểm
        </Typography>
      )}
      {numSelected > 0 ? (
        <Stack spacing={3} direction="row">
          <Button
            onClick={() => {
              if (numSelected >= 2) {
                alert("vui lòng chọn 1 yêu cầu bảo hiểm để review và phê duyệt!");
              } else {
                isOpenReviewDialogForm();
              }
            }}
          >
            {"Review"}
          </Button>
          <Tooltip title="More detail">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Loại bỏ">
            <IconButton onClick={isOpenConfirmDialogForm}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function InsuranceApprovalTable() {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("insuranceID");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<Data[]>([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openPolicyDetailDialog, setOpenPolicyDetailDialog] = useState(false);
  const [customerHealthHistory, setCustomerHealthHistory] = useState<any>([]);
  const [customerInfor, setCustomerInfor] = useState<any>({});
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  const [refreshSelectedUserInfor, setRefreshSelectedUserInfor] = useState<boolean>(false);

  const handleConfirmDialog = () => {
    console.log("selected: ", selected);
    if (selected.length === 0) {
      return;
    }

    selected.map(async (policyId) => {
      try {
        const response = await customerPolicyServices.rejectCustomerPolicy(policyId);
        console.log("Response: ", response);
      } catch (error: any) {
        console.log("Error: ", error.message);
      }
    });
    setSelected([]);
    setRefreshTable(!refreshTable);
    setOpenConfirmDialog(false);
    return;
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleClosePolicyDetailDialog = () => {
    setOpenPolicyDetailDialog(false);
  };

  const getCustomerInforByPolicyId = (id: number) => {
    const foundUserPolicy = rows.find((item) => item.policyID === id);
    return foundUserPolicy;
  };

  useEffect(() => {
    void getInsuranceApprovalList();
  }, [refreshTable]);

  useEffect(() => {
    console.log("Giá trị của openPolicyDetailDialog đã thay đổi:", openPolicyDetailDialog);
    if (openPolicyDetailDialog === true) {
      const userInfor = getCustomerInforByPolicyId(selected[0]);
      setCustomerInfor(userInfor);
      console.log("customerInfor :", customerInfor);
      void getCustomerHeathHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshSelectedUserInfor]);

  const getInsuranceApprovalList = async () => {
    try {
      const response = await insuranceApprovalServices.getInsuranceApprovalList();
      console.log("Updated rows", response);
      setRows(response);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getCustomerHeathHistory = async () => {
    try {
      const policyId = selected[0]; // mã chính sách đang chọ
      const foundUserPolicy = getCustomerInforByPolicyId(policyId);
      console.log("foundUserPolicy: ", foundUserPolicy);
      if (foundUserPolicy) {
        const response = await healthHistoryServices.getCustomerHealthHistory(foundUserPolicy.customerID);
        setCustomerHealthHistory(response);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.policyID);
      console.log("deded", newSelected);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (_event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleIssueInsurancePolicyClick = () => {
    void issueInsurancePolicy();
    setOpenPolicyDetailDialog(false);
    setRefreshTable(!refreshTable);
    setSelected([]);
  };

  const issueInsurancePolicy = async () => {
    try {
      const policyTemp = getCustomerInforByPolicyId(selected[0]);
      console.log("dededed: ", policyTemp);
      const body = {
        paymentOption: policyTemp?.paymentOption == "Tháng" ? true : false, // loại thanh toán true: Tháng, false : năm
        insuranceId: policyTemp?.insuranceID,
        description: null,
        status: true,
        sex: policyTemp?.customerSex,
        birthday: policyTemp?.customerBirthday,
        policyId: policyTemp?.policyID,
      };
      const res = await customerPolicyServices.issueCustomerPolicy(body);
      alert(res.message);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const visibleRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%", mx: 3, mb: 5, mt: 2 }}>
      {rows.length != 0 ? (
        <Box>
          <ConfirmDialog
            open={openConfirmDialog}
            onClose={handleCloseConfirmDialog}
            title="Xác nhận"
            message="Bạn có chắc chắn muốn hủy phê duyệt các chính sách đã chọn ?"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onConfirm={handleConfirmDialog}
          />
          <Dialog
            open={openPolicyDetailDialog}
            onClose={handleClosePolicyDetailDialog}
            PaperProps={{
              style: {
                marginTop: "-5vh",
                minHeight: "60vh",
                minWidth: "55vw",
                maxHeight: 650,
              },
            }}
          >
            <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={handleClosePolicyDetailDialog}>
              <Close />
            </IconButton>
            <DialogTitle sx={{ backgroundColor: "#2596be", color: "#fff" }} align="center" mb={1}>
              Thông tin khách hàng
            </DialogTitle>
            <DialogContent>
              <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                  <strong>Khách hàng:</strong>
                  {customerInfor.customerName}
                </Typography>
                <Typography variant="body1">
                  <strong>Giới tính:</strong> {customerInfor.customerSex}
                </Typography>
              </Stack>
              <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                  <strong>Ngày sinh:</strong>
                  {new Date(customerInfor.customerBirthday).toLocaleString().split(",")[0].trim()}
                </Typography>
              </Stack>
              <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                  <strong>Địa chỉ:</strong> {customerInfor.customerAdrress}
                </Typography>
              </Stack>
              <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                  <strong>SĐT:</strong> {customerInfor.customerPhone}
                </Typography>
              </Stack>
              <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                  <strong>Email:</strong> {customerInfor.customerEmail}
                </Typography>
              </Stack>
              <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                  <strong>Ngày bắt đầu:</strong>{" "}
                  {new Date(customerInfor.startDate).toLocaleString().split(",")[0].trim()}
                </Typography>
                <Typography variant="body1">
                  <strong>Ngày kết thúc:</strong>{" "}
                  {new Date(customerInfor.endDate).toLocaleString().split(",")[0].trim()}
                </Typography>
              </Stack>

              <Typography align="center" mb={2} variant="h6">
                Lịch sử sức khỏe
              </Typography>
              <Stack spacing={5} direction="row" sx={{ marginBottom: 2 }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Ngày khám </TableCell>
                        <TableCell align="center">Mã bệnh viện</TableCell>
                        <TableCell align="center">Chuẩn đoán</TableCell>
                        <TableCell align="center">Ghi chú</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customerHealthHistory.map((row: any, index: number) => (
                        <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                          <TableCell align="left">{new Date(row.createdDate).toLocaleString()}</TableCell>
                          <TableCell align="left">{row.hospitalNumber}</TableCell>
                          <TableCell align="left">{row.diagnostic}</TableCell>
                          <TableCell align="left">{row.note}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>
            </DialogContent>
            <DialogActions>
              <DialogActions>
                <Button onClick={handleClosePolicyDetailDialog}>Đóng</Button>
              </DialogActions>
              <Button onClick={handleIssueInsurancePolicyClick}>Phát hành chính sách</Button>
            </DialogActions>
          </Dialog>

          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              isOpenConfirmDialogForm={handleOpenConfirmDialog}
              isOpenReviewDialogForm={() => {
                setRefreshSelectedUserInfor(!refreshSelectedUserInfor);
                setOpenPolicyDetailDialog(true);
              }}
            />
            <TableContainer sx={{ maxHeight: 500 }}>
              <Table sx={{ minWidth: 750 }} stickyHeader aria-label="sticky table" size={dense ? "small" : "medium"}>
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.policyID);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleRowClick(event, row.policyID)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.policyID}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell padding="checkbox" sx={{ width: "6rem" }}>
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.customerName}
                        </TableCell>
                        <TableCell align="center">
                          {new Date(row.customerBirthday).toLocaleString().split(",")[0].trim()}
                        </TableCell>
                        <TableCell align="center">{row.customerPhone}</TableCell>
                        <TableCell align="center">{row.customerSex}</TableCell>
                        <TableCell align="left">{row.insuranceName}</TableCell>
                        <TableCell align="center">{new Date(row.createdDate).toLocaleString()}</TableCell>
                        <TableCell align="center">
                          <Box
                            ml={9}
                            sx={{
                              width: "15px",
                              height: "15px",
                              borderRadius: "50%",
                              backgroundColor: "orange",
                            }}
                          ></Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={
              <Switch
                checked={dense}
                onChange={(event) => {
                  setDense(event.target.checked);
                }}
              />
            }
            label="Dense padding"
          />
        </Box>
      ) : (
        <Box sx={{ height: 300, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography>không có yêu cầu chính sách !</Typography>
        </Box>
      )}
    </Box>
  );
}
