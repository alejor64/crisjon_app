import { Autocomplete, Box, TextField, Typography } from "@mui/material"
import { CLIENTS } from "../../../../utils/constants"
import { CLIENT_NAME, ESTIMATE_NAME } from "../../helpers/constants";

export const Header = ({form, title}) => {
  const clientsOptions = JSON.parse(sessionStorage.getItem(CLIENTS) || "[]");

  const handleNameChange = (event) => {
    const { value } = event.target;
    form.setFieldValue(ESTIMATE_NAME, value);
  }

  const handleClientChange = (_, client) => {
    form.setFieldValue(CLIENT_NAME, client.value);
  }

  return (
    <Box>
      <Typography sx={{width: "100%", textAlign: "center", fontSize: "20px"}}>{title}</Typography>
      <Box sx={{width: "100%", display: "flex", gap: 4, my: 5}}>
        <Box sx={{width: "50%", display: "flex", alignItems: "center"}}>
          <Typography sx={{width: "120px"}}>Name</Typography>
          <Box sx={{width: "90%"}}>
            <TextField
              label="Estimate"
              size="small"
              fullWidth
              autoComplete="off"
              value={form.values[ESTIMATE_NAME]}
              onChange={handleNameChange}
            />
          </Box>
        </Box>
        <Box sx={{width: "50%", display: "flex", alignItems: "center"}}>
          <Typography sx={{width: "120px"}}>Client</Typography>
          <Box sx={{width: "90%"}}>
            <Autocomplete
              label="Estimate"
              size="small"
              fullWidth
              renderInput={(params) =>
                <TextField {...params} label="Client" autoComplete="off" />
              }
              value={form.values[CLIENT_NAME]}
              options={clientsOptions.sort((a, b) => a.name.localeCompare(b.name)).map(client => ({
                label: client.name,
                value: client.name,
              }))}
              onChange={handleClientChange}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{display: "flex", alignItems: "center", my: 5}}>
        <Typography sx={{width: "120px", fontWeight: 600}}>ITEMS</Typography>
        <Box sx={{width: "100%", display: "flex"}}>
          <Typography sx={{width: "100%", textAlign: "center", fontWeight: 600}}>PRICE</Typography>
          <Typography sx={{width: "100%", textAlign: "center", fontWeight: 600}}>QUANTITY</Typography>
          <Typography sx={{width: "100%", textAlign: "center", fontWeight: 600}}>TOTAL</Typography>
        </Box>
      </Box>
    </Box>
  )
}