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
import { calculateMUITotal } from "../../helpers/common";

export default function MUITotalContainer({ form }) {
  const is10K = !!(form.values[METAL_10_PRICE] * form.values[METAL_10_QUANTITY]);
  const is14K = !!(form.values[METAL_14_PRICE] * form.values[METAL_14_QUANTITY]);
  const is18K = !!(form.values[METAL_18_PRICE] * form.values[METAL_18_QUANTITY]);
  const isPlatinum = !!(form.values[METAL_PLATINUM_PRICE] * form.values[METAL_PLATINUM_QUANTITY]);
  const isSilver = !!(form.values[METAL_SILVER_PRICE] * form.values[METAL_SILVER_QUANTITY]);

  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
      {
        is10K &&
          <Box sx={{display: "flex", justifyContent: "center"}}>
            <Typography>
              Total 10K: {calculateMUITotal(form.values, METAL_TYPES("10")).totalFormatted}
            </Typography>
          </Box>
      }
      {
        is14K &&
          <Box sx={{display: "flex", justifyContent: "center"}}>
            <Typography>
              Total 14K: {calculateMUITotal(form.values, METAL_TYPES("14")).totalFormatted}
            </Typography>
          </Box>
      }
      {
        is18K &&
          <Box sx={{display: "flex", justifyContent: "center"}}>
            <Typography>
              Total 18K: {calculateMUITotal(form.values, METAL_TYPES("18")).totalFormatted}
            </Typography>
          </Box>
      }
      {
        isPlatinum &&
          <Box sx={{display: "flex", justifyContent: "center"}}>
            <Typography>
              Total Platinum: {calculateMUITotal(form.values, METAL_TYPES("Platinum")).totalFormatted}
            </Typography>
          </Box>
      }
      {
        isSilver &&
          <Box sx={{display: "flex", justifyContent: "center"}}>
            <Typography>
              Total Silver: {calculateMUITotal(form.values, METAL_TYPES("Silver")).totalFormatted}
            </Typography>
          </Box>
      }
      {
        (!is10K && !is14K && !is18K && !isPlatinum && !isSilver) &&
          <Box sx={{display: "flex", justifyContent: "center"}}>
            <Typography>
              Customer Metal: {calculateMUITotal(form.values).totalFormatted}
            </Typography>
          </Box>
      }
    </Box>
  )
}