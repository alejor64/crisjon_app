import { Box, Container, TextField, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const DataGridCustom = ({columns, rows, filterKeys, sortProperty, route, ...rest}) => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || '';
  const [searchText, setSearchText] = useState(filter);

  const filteredRows = useMemo(() => {
    if (!filter) return rows;
    const lowerCaseValue = filter.toLowerCase();

    return rows.filter((row) =>
      filterKeys.some((key) =>
        row[key]?.toString().toLowerCase().includes(lowerCaseValue)
      )
    );
  }, [rows, filter, filterKeys]);

  const handleSearch = (value) => {
    setSearchText(value);
    setSearchParams(value ? { filter: value } : {});
  };

  const onClick = (id) => {
    navigate(`/${route}/edit/${id}?filter=${filter}`);
  };

  return (
    <Container sx={{ width: '90%', maxWidth: "90%", minWidth: "90%", marginBottom: 5 }}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, alignItems: "center", marginY: 2 }}>
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