
import React from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { Labels } from "../../utils/constants/labels";
import { FontFamily, FontSize } from "../../utils/constants/fonts";
import { CommonColors } from "../../utils/constants/colors";
const PDropdown = ({
  label,
  value,
  onChange,
  options,
  required = false,
  error = false,
  helperText = "",
  width = 200,
  mt = 0.4,
  multiple = false,
}) => {
  const baseSx = {
    width: width ? `${width}px` : "100%",
    mt,

    // ── Label ──────────────────────────────────────────
    "& .MuiInputLabel-root": {
      fontFamily: FontFamily.bold,
      fontSize: FontSize.textField.label,
      color: "#9e9e9e",
      top: "0px",
      "&.Mui-focused": { color: "#62BCD8" },
      "&.Mui-error": { color: "#d32f2f" },
      "&.Mui-disabled": { color: "#bdbdbd" },
    },

    "& .MuiInputLabel-shrink": {
      color: "#62BCD8",
      fontWeight: 600,
      fontSize: "12px",
      lineHeight: 1.2,
      transform: "translate(14px, -6px) scale(1)", // ✅ on border, no gap
      "&.Mui-focused": { color: "#62BCD8" },
      "&.Mui-error": { color: "#d32f2f" },
    },

    // ── Input Root ─────────────────────────────────────
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",                        // ✅ matches screenshot
      backgroundColor: "#fcfbfd",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      fontFamily: FontFamily.bold,
      fontSize: FontSize.textField.input,
      color: "#424242",
      minHeight: "52px",                           // ✅ tall like screenshot
      maxHeight: multiple ? "none" : "52px",
      height: multiple ? "auto" : "52px",

      "& .MuiSelect-select": {
        display: "flex",
        alignItems: multiple ? "flex-start" : "center",
        flexWrap: multiple ? "wrap" : "nowrap",
        gap: multiple ? "4px" : 0,
        padding: multiple ? "8px 14px" : "0 14px",
        minHeight: "52px",
        boxSizing: "border-box",
      },

      "& fieldset": {
        
        borderColor: "1px solid #ccc",
        borderWidth: "1.5px",
      },
      "&:hover fieldset": {
        borderColor: "#42A8C8",
      },
      "&.Mui-focused fieldset": {
        borderColor: "1px solid #ccc",
        borderWidth: "1.5px",
        boxShadow: "0 0 0 3px rgba(98,188,216,0.15)",
      },
      "&.Mui-error fieldset": {
        borderColor: "#d32f2f",
      },
      "&.Mui-disabled": {
        backgroundColor: "#f9f9f9",
        "& fieldset": { borderColor: "#e0e0e0" },
      },
    },

    // ✅ This is the KEY — makes label sit ON the border like your screenshot
    "& .MuiOutlinedInput-notchedOutline": {
      top: 0,
    },
    "& .MuiOutlinedInput-notchedOutline legend": {
      maxWidth: "100%",
      fontSize: "12px",
      padding: "0 4px",
    },

    // ── Helper text ────────────────────────────────────
    "& .MuiFormHelperText-root": {
      fontFamily: FontFamily.bold,
      fontSize: FontSize.textField.error,
      color: CommonColors.textError,
      marginLeft: "2px",
      marginTop: "4px",
    },

    // ── Chips (multi) ──────────────────────────────────
    "& .MuiChip-root": {
      height: "22px",
      fontSize: "11px",
      fontFamily: FontFamily.bold,
      backgroundColor: "#62BCD8",
      color: "white",
      borderRadius: "6px",
      "& .MuiChip-deleteIcon": {
        color: "rgba(255,255,255,0.7)",
        fontSize: "14px",
        "&:hover": { color: "white" },
      },
    },

    // ── Responsive ─────────────────────────────────────
    "@media (max-width: 600px)": {
      width: "100% !important",
      "& .MuiOutlinedInput-root": {
        minHeight: "46px",
        maxHeight: multiple ? "none" : "46px",
        height: multiple ? "auto" : "46px",
      },
    },
  };
  return (
    <FormControl
      fullWidth
      size="small"
      required={required}
      error={error}
      sx={baseSx}
    >
      <InputLabel>{label}</InputLabel>

      <Select value={value} label={label} onChange={onChange}>
        <MenuItem value="">
          <em>-- Choose --</em>
        </MenuItem>

        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default PDropdown;