import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "./FormsUI/TextField";
import Select from "./FormsUI/Select";
import DateTimePicker from "./FormsUI/DateTimePicker";
import Checkbox from "./FormsUI/Checkbox";
import Button from "./FormsUI/Button";
// import {Button} from "@mui/material";
import countries from "./data/countries.json";
import gender from "./data/gender.json";
import { useStore } from "../app/store";
import * as insuranceRegisterServices from "../services/insuranceRegisterServices";

const FORM_VALIDATION = Yup.object().shape({
  fullName: Yup.string().required("Yêu cầu nhập thông tin này"),

  sex: Yup.string().required("Yêu cầu nhập thông tin này"),
  birthday: Yup.date().required("Yêu cầu nhập trường này"),
  email: Yup.string().email("Email không hợp lệ").required("Yêu cầu nhập thông tin này"),
  phone: Yup.number().integer().typeError("Vui lòng nhập số điện thoại hợp lệ").required("Yêu cầu nhập thông tin này"),
  addressLine1: Yup.string().required("Yêu cầu nhập thông tin này"),
  addressLine2: Yup.string(),
  city: Yup.string().required("Yêu cầu nhập thông tin này"),
  state: Yup.string().required("Yêu cầu nhập thông tin này"),
  country: Yup.string().required("Yêu cầu nhập thông tin này"),
  message: Yup.string(),
  termsOfService: Yup.boolean()
    .oneOf(
      [true],
      "Bạn đã đọc rõ và chấp nhận cung cấp thông tin. Chúng tôi cam kết không cung cấp thông tin của bạn cho bên thứ ba"
    )
    .required(
      "Bạn đã đọc rõ và chấp nhận cung cấp thông tin. Chúng tôi cam kết không cung cấp thông tin của bạn cho bên thứ ba"
    ),
});

function InsuranceForm1(): JSX.Element {
  const navigate = useNavigate();
  const { account } = useStore((state) => state);

  const INITIAL_FORM_STATE = {
    id: account?.id,
    fullName: "",
    sex: 0,
    birthday: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    message: "",
    termsOfService: false,
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
            id: values.id,
            fullName: values.fullName,
            sex: Number(values.sex),
            birthday: values.birthday,
            email: values.email,
            phone: values.phone,
            address: values.addressLine1 + ", " + values.city + ", " + values.country,
            bankNumber: "",
            bank: "",
          };
          console.log(data);
          try {
            await insuranceRegisterServices.createInsuranceRegister(data);
            navigate(`/option`);
          } catch (error: any) {
            alert(error.message);
          }
        }}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Thông tin cá nhân</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField name="fullName" label="Họ và tên" />
            </Grid>

            <Grid item xs={6}>
              <Select name="sex" label="Giới tính" options={gender} />
            </Grid>

            <Grid item xs={6}>
              <DateTimePicker name="birthday" label="Ngày sinh" />
            </Grid>

            <Grid item xs={12}>
              <TextField name="email" label="Email" />
            </Grid>

            <Grid item xs={12}>
              <TextField name="phone" label="Số điện thoại" />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Địa chỉ</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField name="addressLine1" label="Địa chỉ" />
            </Grid>

            <Grid item xs={12}>
              <TextField name="addressLine2" label="Địa chỉ khác" />
            </Grid>

            <Grid item xs={6}>
              <TextField name="city" label="Thành phố" />
            </Grid>

            <Grid item xs={6}>
              <TextField name="state" label="Tỉnh" />
            </Grid>

            <Grid item xs={12}>
              <Select name="country" label="Quốc gia" options={countries} />
            </Grid>

            <Grid item xs={12}>
              <TextField name="message" label="Khác" multiline={true} rows={4} />
            </Grid>

            <Grid item xs={12}>
              <Checkbox
                name="termsOfService"
                legend="Yêu cầu về điều khoản"
                label="Tôi đồng ý chấp nhận các điều khoản về cung cấp thông tin cá nhân."
              />
            </Grid>

            <Grid item xs={12} sx={{ marginBottom: "50px" }}>
              <Button color="primary">Tiếp theo</Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
}
export default InsuranceForm1;
