import React, { useMemo } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Autocomplete,
  TextField
} from "@mui/material";

import { Labels } from "../../utils/constants/labels";
import { FontFamily, FontSize } from "../../utils/constants/fonts";
import { CommonColors } from "../../utils/constants/colors";

const PDropdown = ({
  name = "",
  label,
  value,
  onChange,
  options = [],
  required = false,
  error = false,
  helperText = "",
  width = "",
  mt = 0.4,
  multiple = false,
  flag = ""
}) => {

  const selectedOption = useMemo(
    () => options.find((o) => o.value === value) || null,
    [options, value]
  );

  const baseSx = {
    width: width ? `${width}%` : Labels.fontSize.xxxxl,
    mt,

    "& .MuiInputLabel-root": {
      fontFamily: FontFamily.bold,
      fontSize: FontSize.textField.label,
      color: "#9e9e9e",
      top: "0px",
      "&.Mui-focused": { color: "#62BCD8" },
      "&.Mui-error": { color: "#d32f2f" }
    },

    "& .MuiInputLabel-shrink": {
      color: "#62BCD8",
      fontWeight: 600,
      fontSize: "12px",
      transform: "translate(14px, -6px) scale(1)"
    },

    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: "#fcfbfd",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      fontFamily: FontFamily.bold,
      fontSize: FontSize.textField.input,
      color: "#424242",
      minHeight: "52px",

      "& fieldset": {
        borderColor: helperText ? "#d32f2f" : "#ccc",
        borderWidth: "1.5px"
      },

      "&:hover fieldset": {
        borderColor: "#42A8C8"
      },

      "&.Mui-focused fieldset": {
        borderColor: "#ccc",
        borderWidth: "1.5px",
        boxShadow: "0 0 0 3px rgba(98,188,216,0.15)"
      },

      "&.Mui-error fieldset": {
        borderColor: "#d32f2f"
      }
    },

    "& .MuiFormHelperText-root": {
      fontFamily: FontFamily.bold,
      fontSize: FontSize.textField.error,
      color: CommonColors.textError,
      marginLeft: "2px",
      marginTop: "4px"
    }
  };

  // Shared TextField renderer
  const renderTextField = (params) => (
    <TextField
      {...params}
      label={label}
      required={required}
      error={error}
      helperText={helperText}
    />
  );

  // Autocomplete Mode (Clear icon enabled)
  if (flag === Labels.flag.auto) {
    return (
      <Autocomplete
        options={options}
        value={selectedOption}
        disableClearable={!selectedOption}   // ✅ show clear icon only when value exists
        getOptionLabel={(option) => option?.label || ""}
        onChange={(e, newValue) =>
          onChange({ target: { name, value: newValue?.value || "" } })  // ✅ pass name here
        }
        sx={baseSx}
        renderInput={renderTextField}
      />
    );
  }

  // Normal Select Mode (No clear icon)
  return (
    <FormControl
      fullWidth
      size="small"
      required={required}
      error={error}
      sx={baseSx}
    >
      <InputLabel>{label}</InputLabel>

      <Select value={value} label={label} onChange={onChange} name = {name}>
        <MenuItem value="">
          <em>-- Choose --</em>
        </MenuItem>

        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default PDropdown;