import { useEffect, useState } from "react";
import OptionCard from "../components/OptionCard";
import { Container, Grid, Typography } from "@mui/material";
import * as insuranceRegisterServices from "../services/insuranceRegisterServices";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useStore } from "../app/store";
import { Form, Formik } from "formik";
import Select from "../components/FormsUI/Select";
import DateTimePicker from "../components/FormsUI/DateTimePicker";
import * as customerPolicyServices from "../services/customerPolicyServices";
import paymentOption from "../components/data/paymentOption.json";
import endDate from "../components/data/endDate.json";
import Button from "../components/FormsUI/Button";
interface Option {
  id: number;
  guid: string;
  name: string;
  summary: string;
  description: string;
  benefit: string;
  price: number;
}

const FORM_VALIDATION = Yup.object().shape({
  StartDate: Yup.date().required("Yêu cầu nhập trường này"),
  EndDate: Yup.number().required("Yêu cầu nhập trường này"),
  PaymentOption: Yup.number().required("Yêu cầu nhập thông tin này"),
});

function Option(): JSX.Element {
  const { account } = useStore((state) => state);
  const INITIAL_FORM_STATE = {
    StartDate: "",
    EndDate: "",
    PaymentOption: "",
    InsuranceId: "",
  };

  const navigate = useNavigate();
  const [options, setOptions] = useState<Option[]>([]);

  const getInsuranceOption = async () => {
    try {
      const response = await insuranceRegisterServices.getInsuranceTypeList();
      console.log("res: ", response);
      setOptions(response);
    } catch (error: any) {
      alert(error.message);
    }
  };
  const [cardPrice, setCardPrice] = useState();
  const [cardId, setCardId] = useState();
  const handleClickCard = (option: any) => {
    console.log(option);
    setCardPrice(option.price);
    setCardId(option.id);
  };

  useEffect(() => {
    void getInsuranceOption();
  }, []);

  return (
    <Container>
      <Typography variant="h4" fontWeight={600} sx={{ textAlign: "center", marginTop: "20px" }} gutterBottom>
        Chọn loại bảo hiểm
      </Typography>
      <Container maxWidth="md">
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values) => {
            console.log(values);
            const transformEndate = values.StartDate;
            const data = {
              id: 0,
              guid: null,
              customerId: account?.id,
              startDate: values.StartDate,
              createdDate: null,
              endDate: new Date(transformEndate),
              premiumAmount: cardPrice,
              paymentOption: false,
              coverageType: null,
              deductibleAmount: 0,
              benefitId: 0,
              insuranceId: Number(cardId),
              latestUpdate: null,
              description: null,
              status: false,
              company: null,
            };
            console.log("giá trị", data.endDate);
            data.endDate.setMonth(data.endDate.getMonth() + Number(values.EndDate) * 12);
            if (Number(values.PaymentOption) == 0) {
              data.paymentOption = true;
            } else {
              data.paymentOption = false;
            }
            console.log(data);
            try {
              await customerPolicyServices.createCustomerPolicy(data);
              navigate(`/register-insurance-2`);
            } catch (error: any) {
              alert(error.message);
            }
          }}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <DateTimePicker name="StartDate" label="Ngày bắt đầu" />
              </Grid>
              <Grid item xs={6}>
                <Select name="EndDate" label="Thời gian mua bảo hiểm" options={endDate} />
              </Grid>
              <Grid item xs={12}>
                <Select name="PaymentOption" label="Loại chi trả" options={paymentOption} />
              </Grid>
              <Grid container spacing={2} sx={{ padding: "40px" }}>
                {options.map((option) => (
                  <Grid item key={option.guid} xs={12} md={6} lg={4}>
                    <OptionCard option={option} handleClick={() => handleClickCard(option)} />
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={12} sx={{ marginBottom: "50px" }}>
                <Button color="primary">Tiếp theo</Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Container>
    </Container>
  );
}

export default Option;
