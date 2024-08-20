import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const diseaseNames = [
  "Huyết áp cao (High blood pressure)",
  "Bệnh thận (Kidney disease)",
  "Hen suyễn (Asthma)",
  "Giãn tĩnh mạch",
  "Ung thư (Cancer)",
  "Bệnh tim mạch (Cardiovascular disease)",
  "Alzheimer ",
  "Đái tháo đường (Diabetes)",
  "Bệnh trầm cảm (Depression)",
];

function getStyles(name: string, disease: readonly string[], theme: Theme) {
  return {
    fontWeight: disease.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}
interface MultipleSelectChipProps {
  sendDiseases: (diseases: string[] | string) => void;
}

export default function MultipleSelectChip(props: MultipleSelectChipProps) {
  const theme = useTheme();
  const [disease, setDisease] = useState<string[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendData = (disease: string | string[]) => {
    props.sendDiseases(disease);
  };

  const handleChange = (event: SelectChangeEvent<typeof disease>) => {
    const {
      target: { value },
    } = event;
    setDisease(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    sendData(disease);
  }, [disease, sendData]);

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">Cập nhật bệnh</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          fullWidth
          multiple
          value={disease}
          onChange={handleChange}
          rows={4}
          input={<OutlinedInput id="select-multiple-chip" label="Cập nhật bệnh" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {diseaseNames.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, disease, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
