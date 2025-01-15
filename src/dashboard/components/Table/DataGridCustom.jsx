import { Box, Container, TextField, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const DataGridCustom = ({columns, rows, filterKeys, sortProperty, route, ...rest}) => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);

  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
    const lowerCaseValue = searchValue.toLowerCase();

    if(lowerCaseValue) {
      setFilteredRows(
        rows.filter((row) =>
          filterKeys.some((key) =>
            row[key]?.toString().toLowerCase().includes(lowerCaseValue)
          )
        )
      );
    } else {
      setFilteredRows(rows);
    }

  };

  const onClick = (id) => {
    navigate(`/${route}/edit/${id}`)
  }

  return (
    <Container sx={{ width: '90%', maxWidth: "90%", minWidth: "90%", marginBottom: 5 }}>
      <Box>
        <Box sx={{display: "flex", justifyContent: "center", gap: 2, alignItems: "center", marginY: 2}}>
          <Typography>Filter value</Typography>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            sx={{ width: "50%" }}
          />
        </Box>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[15]}
          disableRowSelectionOnClick={true}
          sortModel={[
            {
              field: sortProperty,
              sort: 'asc',
            },
          ]}
          onRowClick={(params) => onClick(params.id)}
          {...rest}
        />
      </Box>
    </Container>
  )
}