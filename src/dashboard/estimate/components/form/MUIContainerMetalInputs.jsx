import { useEffect, useState } from "react"
import { NumericFormat } from "react-number-format"
import { Box, TextField, Typography } from "@mui/material"
import { METAL_10_PRICE, METAL_14_PRICE, METAL_18_PRICE } from "../../helpers/constants";

export const MUIContainerMetalInputs = ({form, label, metal, goldenPrice, quiantityName}) => {
  const [metalPrice, setMetalPrice] = useState(0);
  const [total, setTotal] = useState(0);

  const calculateMetal = () => {
    let metalConstant = 0;
    const goldPrice = parseFloat((1 / goldenPrice).toFixed(2));
    switch (metal) {
      case METAL_10_PRICE:
        metalConstant = 0.4166;
        break;
      case METAL_14_PRICE:
        metalConstant = 0.585;
        break;
      case METAL_18_PRICE:
        metalConstant = 0.75;
        break;
      default:
        metalConstant = 0;
        break;
    }
    const finalMetalPrice = (((goldPrice + 60) * 1.25)/20) * metalConstant;
    form.setFieldValue(metal, parseFloat(finalMetalPrice.toFixed(2)));
    return finalMetalPrice.toFixed(2);
  }

  useEffect(() => {
    const price = calculateMetal();
    const quantity = form.values[quiantityName] ?? 0;
    setMetalPrice(price);
    setTotal(price * quantity);
  }, [goldenPrice]);

  const handleQuantitychange = (values) => {
    const { floatValue } = values;
    form.setFieldValue(quiantityName, floatValue);
    const quantity = floatValue ?? 0;
    const price = form.values[metal] ?? 0;
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
          label={`${label} Price`}
          fullWidth
          disabled={true}
          value={metalPrice}
        />
        <NumericFormat
          customInput={TextField}
          name={quiantityName}
          label={`${label} Quantity`}
          size="small"
          allowNegative={false}
          fullWidth
          onValueChange ={handleQuantitychange}
          slotProps={{
            textField: {
              autoComplete: 'off',
            },
            input: {
              autoComplete: 'off',
            }
          }}
          value={form.values[quiantityName]}
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