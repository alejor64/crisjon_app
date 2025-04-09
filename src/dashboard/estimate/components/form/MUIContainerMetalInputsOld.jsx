import { Autocomplete, Box, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { METAL_PRICE, METAL_QUANTITY, METAL_TYPE } from "../../helpers/constants";

const options = [
  {label: "10k", value: "10k"},
  {label: "14k", value: "14k"},
  {label: "18k", value: "18k"},
]

export default function MUIContainerMetalInputsOld({form}) {
  
  return (
    <Box sx={{display: "flex", alignItems: "center", my: 3}}>
      <Box sx={{width: "120px"}}>
        <Autocomplete
          renderInput={(params) =>
            <TextField
              {...params}
              label="Metal Type"
              autoComplete="off"
              size="small"
              fullWidth
              />
          }
          options={options}
          sx={{width: "90%"}}
          value={form.values[METAL_TYPE]}
          disabled={true}
        />
      </Box>
      <Box sx={{width: "100%", display: "flex", gap: 1}}>
        <NumericFormat
          customInput={TextField}
          thousandSeparator
          decimalScale={2}
          prefix="$"
          size="small"
          label={`Metal Price`}
          fullWidth
          disabled={true}
          value={form.values[METAL_PRICE]}
        />
        <NumericFormat
          customInput={TextField}
          allowNegative={false}
          isAllowed={(values) => {
            const { floatValue } = values;
            return floatValue === undefined || (Number.isInteger(floatValue) && floatValue >= 0);
          }}
          size="small"
          label={`Metal Quantity`}
          fullWidth
          disabled={true}
          value={form.values[METAL_QUANTITY]}
        />
        <NumericFormat
          customInput={TextField}
          thousandSeparator
          decimalScale={2}
          prefix="$"
          size="small"
          label={`Total`}
          fullWidth
          disabled={true}
          value={form.values[METAL_PRICE] * form.values[METAL_QUANTITY]}
        />
      </Box>
    </Box>
  )
}