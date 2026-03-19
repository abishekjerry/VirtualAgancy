import React, { useState, useEffect , useRef} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TableContainer,
  Box,
  Checkbox
} from "@mui/material";
import { Labels } from "../../utils/constants/labels";
import { CommonColors } from "../../utils/constants/colors";

const PTable = ({ columns, rows, onClick, isChecked = false, showCheckbox = false , onValidationChange}) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState([]);
  const isPageLoad = useRef(false); // track first interaction
  
  useEffect(() => {
    if (isPageLoad.current && onValidationChange) {
      onValidationChange(selectedRows);
    }
  }, [selectedRows, onValidationChange]);
  
  // Parent Select All
  const handleRowSelect = (index) => {
    isPageLoad.current = true
    setSelectedRows((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Show only selected rows when global checkbox checked
  const filteredRows = isChecked
    ? rows.filter((_, index) => selectedRows.includes(index))
    : rows;

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 3,
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
      }}
    >
      <TableContainer>
        <Table>

          {/* HEADER */}
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8fafc" }}>
              {columns.map((col, index) => (
                <TableCell
                  key={index}
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

          <TableBody>
            {filteredRows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  align="center"
                  sx={{
                    py: 3,
                    fontSize: Labels.fontSize.xxs,
                    color: CommonColors.pTable.darkGrey
                  }}
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const originalIndex = rows.indexOf(row);
                  return (
                    <TableRow
                      key={originalIndex}
                      onClick={() => onClick && onClick(row)}
                      sx={{
                        transition: "0.2s ease",
                        cursor: onClick ? "pointer" : "default",
                        "&:hover": { backgroundColor: "#f1f5f9" },
                        backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb",
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
                          {showCheckbox && i === 0 ? (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1
                              }}
                            >
                              <Checkbox
                                size="small"
                                checked={selectedRows.includes(originalIndex)}
                                onChange={() => handleRowSelect(originalIndex)}
                                sx={{ p: 0.5 }}
                              />

                              {row[col.field]}
                            </Box>
                          ) : (
                            row[col.field]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
            )}
          </TableBody>

        </Table>
      </TableContainer>

      {/* PAGINATION */}
      <Box sx={{ borderTop: "1px solid #e2e8f0" }}>
        <TablePagination
          component="div"
          count={filteredRows.length}
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
              mb: 0,
              mt: 0,
            },
            ".MuiTablePagination-select": {
              paddingTop: "0px",
              paddingBottom: "0px",
            },
            ".MuiTablePagination-actions": {
              marginLeft: "8px",
              display: "flex",
              alignItems: "center",
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default PTable;