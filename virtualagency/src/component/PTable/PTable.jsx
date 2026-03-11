import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TableContainer,
  Box
} from "@mui/material";
import { Labels } from "../../utils/constants/labels";
import { CommonColors } from "../../utils/constants/colors"

const PTable = ({ columns, rows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleOpenAgency = () => {
    window.location.href =
      "https://ebiz.pmgasia.com/iweb/virtualagency/vatest/1.html";
  };

  return (
    <Paper elevation={0} sx={{
      mt: 3, borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0",
      boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    }}
    >    
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8fafc", }} >
              {columns.map((col, index) => (
                <TableCell key={index}
                  sx={{
                    fontWeight: 500,
                    fontSize: Labels.fontSize.xs,
                    color: CommonColors.pTable.violet,
                    py: 2,
                    textWrap: Labels.rap.nowrap
                  }}
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* BODY */}
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleOpenAgency()}
                  sx={{
                    transition: "0.2s ease",
                    "&:hover": {
                      backgroundColor: "#f1f5f9",
                    },
                    backgroundColor:
                      index % 2 === 0 ? "#ffffff" : "#f9fafb",
                  }}
                >
                  {columns.map((col, i) => (
                    <TableCell
                      key={i}
                      sx={{
                        fontSize: Labels.fontSize.xxs,
                        color: CommonColors.pTable.darkGrey,
                        py: 1.8,
                        textWrap: Labels.rap.nowrap
                      }}
                    >
                      {row[col.field]}

                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ borderTop: "1px solid #e2e8f0", }} >
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            ".MuiTablePagination-toolbar": {
              px: 2,
              justifyContent: "flex-end",
              alignItems: "center",
              minHeight: "48px",
            },
            ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
              fontSize: "13px",
              color: "#64748b",
              mb: 0,        // ← removes bottom margin pushing text down
              mt: 0,        // ← removes top margin
            },
            ".MuiTablePagination-select": {
              paddingTop: "0px",      // ← aligns dropdown text
              paddingBottom: "0px",
            },
            ".MuiTablePagination-actions": {
              marginLeft: "8px",
              display: "flex",
              alignItems: "center",   // ← aligns arrow buttons
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default PTable;