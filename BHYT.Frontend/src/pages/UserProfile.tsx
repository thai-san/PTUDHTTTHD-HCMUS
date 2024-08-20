import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/system";
import GeneralProfile from "../components/Profile/GenneralInfor";
import HealthIndicator from "../components/Profile/HealthIndicator";
import InsurancePolicies from "../components/Profile/InsurancePolicies";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function UserProfile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", height: "100%" }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          width: "250px",
          marginTop: "50px",
          marginBottom: "50px",
          marginRight: "50px",
        }}
      >
        <Tab label="Thôn tin chung" {...a11yProps(0)} />
        <Tab label="Chỉ số sức khỏe" {...a11yProps(1)} />
        <Tab label="Bảo hiểm của tôi" {...a11yProps(2)} />
        <Tab label="Tài khoản" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <GeneralProfile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HealthIndicator />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <InsurancePolicies />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Box height={"80vh"} mt={5}>
          Đổi mật khẩu j đó vô đây bỏ link tới /.......
        </Box>
      </TabPanel>
    </Box>
  );
}
