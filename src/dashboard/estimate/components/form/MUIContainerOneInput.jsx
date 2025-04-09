import { Box, TextField, Typography } from "@mui/material"
import { NumericFormat } from "react-number-format";

export const MUIContainerOneInput = ({form, label, priceName}) => {

  const handlePriceChange = (values) => {
    const { floatValue } = values;
    form.setFieldValue(priceName, floatValue);
  };

  return (
    <Box sx={{display: "flex", alignItems: "center", my: 3}}>
      <Typography sx={{width: "120px"}}>
        {label}
      </Typography>
      <Box sx={{width: "100%", display: "flex"}}>
        <NumericFormat
          customInput={TextField}
          thousandSeparator
          prefix="$"
          size="small"
          name={priceName}
          label={`${label} Price`}
          allowNegative={false}
          onValueChange ={handlePriceChange}
          sx={{width: "33%"}}
          value={form.values[priceName]}
        />
      </Box>
    </Box>
  )
}