import { Box, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { NumericFormat } from "react-number-format"

export const MUIContainerInputs = ({form, priceName, quiantityName, label, allowDecimal = false}) => {
  const currentPrice = form.values[priceName] ?? 0;
  const currentQuantity = form.values[quiantityName] ?? 0;
  const [total, setTotal] = useState(currentPrice * currentQuantity);

  const handlePriceChange = (values) => {
    const { floatValue } = values;
    form.setFieldValue(priceName, floatValue);
    const price = floatValue ?? 0;
    const quantity = form.values[quiantityName] ?? 0;
    setTotal(price * quantity);
  };

  const handleQuantitychange = (values) => {
    const { floatValue } = values;
    form.setFieldValue(quiantityName, floatValue);
    const quantity = floatValue ?? 0;
    const price = form.values[priceName] ?? 0;
    setTotal(price * quantity);
  }

  return (
    <Box sx={{display: "flex", alignItems: "center", my: 3}}>
      <Typography sx={{width: "120px"}}>
        {label}
      </Typography>
      <Box sx={{width: "100%", display: "flex", gap: 1}}>
        <NumericFormat
          customInput={TextField}
          thousandSeparator
          decimalScale={2}
          prefix="$"
          size="small"
          name={priceName}
          label={`${label} Price`}
          onValueChange ={handlePriceChange}
          fullWidth
          allowNegative={false}
          value={form.values[priceName]}
          slotProps={{
            textField: {
              autoComplete: 'off',
            },
            input: {
              autoComplete: 'off',
            }
          }}
        />
        <NumericFormat
          customInput={TextField}
          name={quiantityName}
          label={`${label} Quantity`}
          onValueChange ={handleQuantitychange}
          size="small"
          allowNegative={false}
          isAllowed={(values) => {
            if (!allowDecimal) {
              const { floatValue } = values;
              return floatValue === undefined || (Number.isInteger(floatValue) && floatValue >= 0);
            }
            return true;
          }}
          fullWidth
          value={form.values[quiantityName]}
          slotProps={{
            textField: {
              autoComplete: 'off',
            },
            input: {
              autoComplete: 'off',
            }
          }}
        />
        <NumericFormat
          customInput={TextField}
          thousandSeparator
          valueIsNumericString
          allowNegative={false}
          prefix="$"
          size="small"
          name={`${label}Total`}
          label={`${label} Total`}
          disabled={true}
          decimalScale={2}
          value={total}
          fullWidth
        />
      </Box>
    </Box>
  )
}