import { Box, Typography } from "@mui/material";
import {
  METAL_10_PRICE,
  METAL_10_QUANTITY,
  METAL_14_PRICE,
  METAL_14_QUANTITY,
  METAL_18_PRICE,
  METAL_18_QUANTITY,
  METAL_PLATINUM_PRICE,
  METAL_PLATINUM_QUANTITY,
  METAL_SILVER_PRICE,
  METAL_SILVER_QUANTITY,
  METAL_TYPES,
} from "../../helpers/constants";

export default function MUITotalContainer({ form, calculateMUITotal }) {
  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
      {
        !!(form.values[METAL_10_PRICE] * form.values[METAL_10_QUANTITY]) &&
          <Box sx={{display: "flex", justifyContent: "center"}}>
            <Typography>
              Total 10K: {calculateMUITotal(form.values, METAL_TYPES("10")).totalFormatted}
            </Typography>
          </Box>
      }
      {
        !!(form.values[METAL_14_PRICE] * form.values[METAL_14_QUANTITY]) &&
          <Box sx={{display: "flex", justifyContent: "center"}}>
            <Typography>
              Total 14K: {calculateMUITotal(form.values, METAL_TYPES("14")).totalFormatted}
            </Typography>
          </Box>
      }
      {
        !!(form.values[METAL_18_PRICE] * form.values[METAL_18_QUANTITY]) &&
          <Box sx={{display: "flex", justifyContent: "center"}}>
            <Typography>
              Total 18K: {calculateMUITotal(form.values, METAL_TYPES("18")).totalFormatted}
            </Typography>
          </Box>
      }
      {
        !!(form.values[METAL_PLATINUM_PRICE] * form.values[METAL_PLATINUM_QUANTITY]) &&
          <Box sx={{display: "flex", justifyContent: "center"}}>
            <Typography>
              Total Platinum: {calculateMUITotal(form.values, METAL_TYPES("Platinum")).totalFormatted}
            </Typography>
          </Box>
      }
      {
        !!(form.values[METAL_SILVER_PRICE] * form.values[METAL_SILVER_QUANTITY]) &&
          <Box sx={{display: "flex", justifyContent: "center"}}>
            <Typography>
              Total Silver: {calculateMUITotal(form.values, METAL_TYPES("Silver")).totalFormatted}
            </Typography>
          </Box>
      }
    </Box>
  )
}