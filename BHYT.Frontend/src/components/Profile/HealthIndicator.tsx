import { CheckBox } from "@mui/icons-material";
import { Button, Divider, FormControlLabel, TextField, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import MultipleSelectChip from "./MultipleSelectChip";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useStore } from "../../app/store";

import * as healthIndicatorServices from "../../services/healthIndicatorServices";
interface IHealthIndicator {
  customerId: number;
  height?: number;
  weight?: number;
  cholesterol?: number;
  bmi?: number;
  bpm?: number;
  respiratoryRate?: number;
  diseases?: string;
}

export default function HealthIndicator(): JSX.Element {
  const [diseases, setDiseases] = useState<string | string[]>();
  const account = useStore((state) => state.account);
  const [healthIndicator, setHealthIndicator] = useState<IHealthIndicator>();

  const formik = useFormik({
    initialValues: {
      customerId: -1,
      height: 0,
      weight: 0,
      cholesterol: 0,
      bmi: 0,
      bpm: 0, // nhịp tim
      respiratoryRate: 0,
      diseases: "",
    },
    validationSchema: Yup.object({}),

    onSubmit: async (values) => {
      try {
        if (typeof diseases === "string") {
          values.diseases = diseases;
        } else if (Array.isArray(diseases)) {
          values.diseases = diseases.join(", ");
        } else {
          values.diseases = "";
        }
        const res = await healthIndicatorServices.updateHealthIndicator(values);
        alert(res.message);
      } catch (error) {
        console.log("update health indicator failed");
      }
    },
  });

  useEffect(() => {
    if (account) {
      void gethealthIndicator(account.userId);
    }
  }, [account]);

  const gethealthIndicator = async (id: number | string) => {
    try {
      const response = await healthIndicatorServices.getHealthIndicator(id);
      setHealthIndicator(response);
      void formik.setValues({
        customerId: response.customerId || account?.userId,
        height: response.height || 0,
        weight: response.weight || 0,
        cholesterol: response.cholesterol || 0,
        bmi: response.bmi || 0,
        bpm: response.bpm || 0, // nhịp tim
        respiratoryRate: response.respiratoryRate || 0,
        diseases: response.diseases || "",
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const updateDiseases = (diseases: string | string[]) => {
    setDiseases(diseases);
  };
  return (
    <Box
      my={3}
      borderRadius={2}
      p={3}
      boxShadow={"8px 8px 8px rgba(79,79,79,.25)"}
      sx={{
        width: "100%",
        backgroundColor: "#f6f6f6",
      }}
    >
      <Typography variant="h6">Thông tin sức khỏe</Typography>
      <Divider sx={{ width: "100%" }} />
      {healthIndicator && (
        <Container sx={{ marginTop: "3rem", marginBottom: "3rem" }}>
          <Box sx={{ mx: 5 }}>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  type="number"
                  color="secondary"
                  label="Chiều cao (cm)"
                  fullWidth
                  required
                  {...formik.getFieldProps("height")}
                  onChange={formik.handleChange}
                />
                <TextField
                  type="number"
                  color="secondary"
                  label="Cân nặng (kg)"
                  fullWidth
                  required
                  {...formik.getFieldProps("weight")}
                  onChange={formik.handleChange}
                />
                <TextField
                  type="number"
                  color="secondary"
                  label="Cholesterol (mg/dL)"
                  fullWidth
                  {...formik.getFieldProps("cholesterol")}
                  onChange={formik.handleChange}
                />
              </Stack>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  type="number"
                  color="secondary"
                  label="Body Mass Index - BMI (kg/m²)"
                  fullWidth
                  required
                  {...formik.getFieldProps("bmi")}
                  onChange={formik.handleChange}
                />
                <TextField
                  type="number"
                  color="secondary"
                  label="Nhịp tim (BPM)"
                  fullWidth
                  {...formik.getFieldProps("bpm")}
                  onChange={formik.handleChange}
                />
                <TextField
                  type="number"
                  color="secondary"
                  label="Respiratory Rate (lần/phút)"
                  fullWidth
                  {...formik.getFieldProps("respiratoryRate")}
                  onChange={formik.handleChange}
                />
              </Stack>

              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  type="text"
                  label="Bệnh trước đó"
                  multiline
                  rows={2}
                  fullWidth
                  disabled
                  {...formik.getFieldProps("diseases")}
                  onChange={formik.handleChange}
                />
              </Stack>
              <MultipleSelectChip sendDiseases={updateDiseases}></MultipleSelectChip>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4, marginTop: 4 }}>
                <FormControlLabel control={<CheckBox />} label="" />
                <Typography variant="body1">
                  Tôi đồng ý cho BHYT Life Việt Nam sử dụng thông tin được cung cấp trên đây để phê duyệt và phân tích
                  chính sách bảo hiểm <a href="#">Tìm hiểu thêm.</a>
                </Typography>
              </Stack>
              <Button variant="outlined" color="secondary" type="submit" sx={{ px: "4rem", py: 1 }}>
                Cập nhật
              </Button>
            </form>
          </Box>
        </Container>
      )}
    </Box>
  );
}
