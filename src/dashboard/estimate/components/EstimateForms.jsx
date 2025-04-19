import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { Formik,Form } from "formik"
import { Alert, Box, Grid2, Button as MUIButton, Typography, useTheme } from "@mui/material"
import { MUIContainerInputs, MUIContainerMetalInputs, MUIContainerOneInput } from "./form"
import { estimateSchema } from "./form/schema"
import {
  ASSEMBLING_PRICE,
  ASSEMBLING_QUANTITY,
  CAD,
  CASTING_PRICE,
  CASTING_QUANTITY,
  CLEANING_PRICE,
  CLEANING_QUANTITY,
  COLOR_STONES,
  DIAMOND_PRICE,
  DIAMOND_QUANTITY,
  ENGRAVING_PRICE,
  ENGRAVING_QUANTITY,
  FINDINGS_PRICE,
  FINDINGS_QUANTITY,
  INITIAL_VALUES,
  METAL_10_PRICE,
  METAL_10_QUANTITY,
  METAL_14_PRICE,
  METAL_14_QUANTITY,
  METAL_18_PRICE,
  METAL_18_QUANTITY,
  METAL_PLATINUM_PRICE,
  METAL_PLATINUM_QUANTITY,
  METAL_QUANTITY,
  METAL_SILVER_PRICE,
  METAL_SILVER_QUANTITY,
  PICTURE_PRICE,
  PICTURE_QUANTITY,
  POLISHING_PRICE,
  POLISHING_QUANTITY,
  RHODIOUM_PRICE,
  RHODIOUM_QUANTITY,
  SETTING_CENTER_STONE,
  STONE_PRICE,
  STONE_QUANTITY,
  WAX_PRICE,
  WAX_QUANTITY
} from "../helpers/constants"
import { Header } from "./form/Header"
import MUIContainerMetalInputsOld from "./form/MUIContainerMetalInputsOld"
import MUITotalContainer from "./form/MUITotalContainer"
import { calculateMUITotal } from "../helpers/common"

export const EstimateForms = ({ title, estimate, goldenPriceInDB, buttonText, updateOrder = false, createOrUpdate }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const {_id, __v, ...rest} = estimate || {};
  const goldenPrice = estimate?.goldenPrice || goldenPriceInDB;
  const showAlert =
    !!estimate?.[METAL_QUANTITY]
    && !estimate?.[METAL_10_QUANTITY]
    && !estimate?.[METAL_14_QUANTITY]
    && !estimate?.[METAL_18_QUANTITY]
    && !estimate?.[METAL_PLATINUM_QUANTITY]
    && !estimate?.[METAL_SILVER_QUANTITY];
 
  const handleClearAll = (form) => {
    form.handleReset();
  }

  const onSubmit = async (values) => {
    try {
      const body = {
        ...values,
        totalPrice: calculateMUITotal(values).total,
      }
      const estimateId = estimate?._id;
      const response = await createOrUpdate({body, updateOrder, estimateId})
      Swal.fire({
        title: 'Success!',
        text: response.msn,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        navigate(`/estimate/edit/${response.estimatedPrice._id}`)
      })
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: `Something went wrong`,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          ...INITIAL_VALUES,
          ...rest,
          goldenPrice: parseFloat(goldenPrice),
        }}
        validationSchema={estimateSchema}
        onSubmit={async (values) => {
          onSubmit(values);
        }}
      >
        {form => (
          <Form>
            <Grid2 sx={{my: 4}}>
              <Header form={form} title={title} />
              <MUIContainerOneInput form={form} priceName={CAD} label="CAD" />
              <MUIContainerInputs form={form} priceName={WAX_PRICE} quiantityName={WAX_QUANTITY} label="WAX" />
              <MUIContainerInputs form={form} priceName={CASTING_PRICE} quiantityName={CASTING_QUANTITY} label="Casting" />
              <Box sx={{display: "flex", justifyContent: "center", mt: 5, mb: 2}}>
                <Typography>METAL (Weight - dwt)</Typography>
              </Box>
              {
                showAlert &&
                  <>
                    <MUIContainerMetalInputsOld form={form} />
                    <Alert
                      severity="info"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        border: `1px solid ${theme.palette.primary.main}`,
                        mb: 4,
                      }}
                    >
                      This estimate should be updated with the new Metal Weight format
                    </Alert>
                  </>
              }
              <MUIContainerMetalInputs form={form} label="10K" metal={METAL_10_PRICE} goldenPrice={goldenPrice} quiantityName={METAL_10_QUANTITY} />
              <MUIContainerMetalInputs form={form} label="14K" metal={METAL_14_PRICE} goldenPrice={goldenPrice} quiantityName={METAL_14_QUANTITY} />
              <MUIContainerMetalInputs form={form} label="18K" metal={METAL_18_PRICE} goldenPrice={goldenPrice} quiantityName={METAL_18_QUANTITY} />
              <MUIContainerInputs form={form} priceName={METAL_PLATINUM_PRICE} quiantityName={METAL_PLATINUM_QUANTITY} label="Platinum" allowDecimal={true} />
              <MUIContainerInputs form={form} priceName={METAL_SILVER_PRICE} quiantityName={METAL_SILVER_QUANTITY} label="Silver" allowDecimal={true} />
              <Box sx={{display: "flex", justifyContent: "center", mt: 5, mb: 2}}>
                <Typography>LABOR</Typography>
              </Box>
              <MUIContainerInputs form={form} priceName={STONE_PRICE} quiantityName={STONE_QUANTITY} label="Setting Stones" />
              <MUIContainerOneInput form={form} priceName={SETTING_CENTER_STONE} label="Setting Center Stone" />
              <MUIContainerInputs form={form} priceName={CLEANING_PRICE} quiantityName={CLEANING_QUANTITY} label="Cleaning" />
              <Box sx={{display: "flex", justifyContent: "center", mt: 5, mb: 2}}>
                <Typography>DIAMONDS (Weight - Carats)</Typography>
              </Box>
              <MUIContainerInputs form={form} priceName={DIAMOND_PRICE} quiantityName={DIAMOND_QUANTITY} label="Diamond" allowDecimal={true} />
              <MUIContainerOneInput form={form} priceName={COLOR_STONES} label="Color Stones" />
              <MUIContainerInputs form={form} priceName={POLISHING_PRICE} quiantityName={POLISHING_QUANTITY} label="Polishing" />
              <MUIContainerInputs form={form} priceName={ASSEMBLING_PRICE} quiantityName={ASSEMBLING_QUANTITY} label="Assembling" />
              <MUIContainerInputs form={form} priceName={FINDINGS_PRICE} quiantityName={FINDINGS_QUANTITY} label="Findings" />
              <MUIContainerInputs form={form} priceName={RHODIOUM_PRICE} quiantityName={RHODIOUM_QUANTITY} label="Rhodioum" />
              <MUIContainerInputs form={form} priceName={ENGRAVING_PRICE} quiantityName={ENGRAVING_QUANTITY} label="Engraving" />
              <MUIContainerInputs form={form} priceName={PICTURE_PRICE} quiantityName={PICTURE_QUANTITY} label="Picture" />
              <Box>
                <MUITotalContainer form={form} />
                <Box sx={{display: "flex", justifyContent: "space-evenly", my: 3}}>
                  <MUIButton
                    variant="contained"
                    color="error"
                    onClick={() => handleClearAll(form)}
                    disabled={!form.dirty || form.isSubmitting}
                  >
                    Reset values
                  </MUIButton>
                  <MUIButton
                    variant="contained"
                    type="submit"
                    disabled={!form.dirty || form.isSubmitting}
                  >
                    {buttonText}
                  </MUIButton>
                </Box>
              </Box>
            </Grid2>
          </Form>
        )}
      </Formik>
    </>
  )
}
