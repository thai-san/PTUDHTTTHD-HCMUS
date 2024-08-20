import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "./FormsUI/TextField";
import Select from "./FormsUI/Select";
import Checkbox from "./FormsUI/Checkbox";
import Button from "./FormsUI/Button";
import disease1 from "./data/disease1.json";
import { useStore } from "../app/store";
import * as healHistoryServices from "../services/healthHistoryServices";

const FORM_VALIDATION = Yup.object().shape({
  height: Yup.number().required("Yêu cầu nhập thông tin này"),
  weight: Yup.number().required("Yêu cầu nhập thông tin này"),
  BMI: Yup.number().required("Yêu cầu nhập thông tin này"),
  pulse: Yup.number().required("Yêu cầu nhập thông tin này"),
  bloodPressure1: Yup.number().required("Yêu cầu nhập thông tin này"),
  bloodPressure2: Yup.number().required("Yêu cầu nhập thông tin này"),
  // disease1: Yup.string(),
  // disease2: Yup.string(),
  choice1: Yup.string().required("Vui lòng chọn thông tin"),
  choice2: Yup.string().required("Vui lòng chọn thông tin"),
  pregnant: Yup.string(),
  drug: Yup.string(),
  termsOfInformation: Yup.boolean()
    .oneOf([true], "Bạn cam kết thông tin là hoàn toàn chính xác")
    .required("Vui lòng cam kết thông tin"),
});

function InsuranceForm2(): JSX.Element {
  // const [selectState, setSelectState ] = useState('');
  const nagivate = useNavigate();
  const { account } = useStore((state) => state);

  // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     // Lấy giá trị hiện tại từ thành phần input
  //     const newValue: string = event.target.value;
  //     console.log(newValue)
  //     // Cập nhật state với giá trị mới
  //     setSelectState(newValue);
  //   };

  const INITIAL_FORM_STATE = {
    customerId: account?.id,
    height: "",
    weight: "",
    BMI: "",
    pulse: "",
    bloodPressure1: "",
    bloodPressure2: "",
    choice1: "",
    choice2: "",
    drug: "",
    pregnant: "",
  };

  return (
    <Container maxWidth="md">
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={async (values) => {
          console.log(values);
          const data = {
            customerId: values.customerId,
            height: Number(values.height),
            weight: Number(values.weight),
            bmi: Number(values.BMI),
            cholesterol: 0,
            bpm: 0,
            respiratoryRate: Number(values.pulse),
            bloodPressure: values.bloodPressure1 + "/" + values.bloodPressure2,
            diseases: values.choice2,
            drug: values.drug,
            pregnant: values.pregnant,
          };
          console.log(data);
          try {
            await healHistoryServices.postCustomerHealthHistory(data);
          } catch (error: any) {
            alert(error.message);
          }
          nagivate("/");
        }}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Tiền sử gia đình: </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography paragraph={true}>
                Có ai trong gia đình ông (bà) mắc một trong các bệnh: truyền nhiễm, tim mạch, đái tháo đường, lao, hen
                phế quản, ung thư, động kinh, rối loạn tâm thần, bệnh khác: (Nếu &quot;có&quot; đề nghị ghi cụ thể tên
                bệnh)
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Select
                name="choice1"
                label="Lựa chọn"
                options={disease1}
                // onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Tiền sử bản thân: </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography paragraph={true}>
                Ông (bà) đã/đang mắc bệnh, tình trạng bệnh nào sau đây không: Bệnh truyền nhiễm, bệnh tim mạch, đái tháo
                đường, lao, hen phế quản, ung thư, động kinh, rối loạn tâm thần, bệnh khác.(Nếu &quot;có&quot; đề nghị
                ghi cụ thể tên bệnh)
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Select name="choice2" label="Lựa chọn" options={disease1} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Câu hỏi khác (Nếu có): </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography paragraph={true}>
                Ông (bà) có đang điều trị bệnh gì không? Nếu có, xin hãy liệt kê các thuốc đang dùng và liều lượng:
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField name="drug" label="Thông tin" multiline={true} rows={3} />
            </Grid>
            <Grid item xs={12}>
              <Typography paragraph={true}>Tiền sử thai sản (Đối với phụ nữ):</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField name="pregnant" label="Thông tin" multiline={true} rows={3} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Phiếu sức khỏe</Typography>
            </Grid>

            <Grid item xs={4}>
              <TextField name="height" label="Chiều cao" />
            </Grid>

            <Grid item xs={4}>
              <TextField name="weight" label="Cân nặng" />
            </Grid>

            <Grid item xs={4}>
              <TextField name="BMI" label="Chỉ số BMI" />
            </Grid>

            <Grid item xs={12}>
              <TextField name="pulse" label="Mạch đập(Lần/Phút)" />
            </Grid>

            <Grid item xs={12}>
              <Typography>Huyết áp</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={5}>
                  <TextField name="bloodPressure1" label="Huyết áp" />
                </Grid>

                <Grid item xs={2}>
                  <Typography textAlign="center">/</Typography>
                </Grid>

                <Grid item xs={5}>
                  <TextField name="bloodPressure2" label="mmHg" />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ color: "red" }}>
                Các thông tin còn lại về phiếu khám lâm sàng vui lòng gửi về Địa chỉ tòa nhà 1, số 15, phường Bến Nghé,
                quận 1, Thành phố Hồ Chí Minh hoặc chi nhánh nào gần bạn nhất. Chúng tôi sẽ liên hệ và hỗ trợ trong vòng
                1-2 ngày trong thời gian làm việc.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Checkbox
                name="termsOfInformation"
                legend="Yêu cầu về thông tin"
                label="Tôi xin cam đoan những điều khai trên đây hoàn toàn đúng với sự thật theo sự hiểu biết của tôi."
              />
            </Grid>

            <Grid item xs={12} sx={{ marginBottom: "50px" }}>
              <Button color="primary">Hoàn thành</Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
}

export default InsuranceForm2;
