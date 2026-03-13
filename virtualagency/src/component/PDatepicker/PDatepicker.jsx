import React, { useEffect, useRef } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { FormControlBaseStyle } from "../../utils/constants/styles";

export default function PDatepicker({
  label = "",
  value = "",
  onChange,
  width,
  helperText = "",
  disabled = false,
  name = "",
  inputRef,
  placeholder = "DD-MM-YYYY",
  mt = 0.4,
}) {
  const internalRef = useRef(null);
  const textFieldRef = inputRef || internalRef;
  const flatpickrRef = useRef(null);

  // Initialize flatpickr
  useEffect(() => {
    if (!textFieldRef.current) return;

    flatpickrRef.current = flatpickr(textFieldRef.current, {
      dateFormat: "d-m-Y",
      defaultDate: value || null,
      allowInput: true,
      maxDate: "today",
      clickOpens: true,
      onChange: function (selectedDates, dateStr) {
        if (onChange) {
          onChange({
            target: {
              name: name,
              value: dateStr,
            },
          });
        }
      },
    });

    return () => {
      flatpickrRef.current?.destroy();
    };
  }, []);

  const handleIconClick = () => {
    flatpickrRef.current?.open();
  };

  const baseSx = FormControlBaseStyle(width, mt);
  // Same styling as PTextField
  // const baseSx = {
  //   width: width || Labels.fontSize.xxxxl,
  //   mt: 1,
  //   "& .MuiOutlinedInput-root": {
  //     borderRadius: "12px",
  //     backgroundColor: "#ffffff",
  //     transition: "all 0.3s ease",
  //     "& fieldset": {
  //       borderColor: helperText ? "#d32f2f" : "#62BCD8",
  //     },
  //     "&:hover fieldset": {
  //       borderColor: "#62BCD8",
  //     },
  //     "&.Mui-focused fieldset": {
  //       borderColor: "#62BCD8",
  //       boxShadow: "0 0 0 3px rgba(98, 188, 216, 0.25)",
  //     },
  //   },
  //   "& .MuiInputBase-input": {
  //     fontSize: Labels.fontSize.xs,
  //     fontFamily: FontFamily.regular,
  //   },
  //   "& .MuiFormHelperText-root": {
  //     fontSize: Labels.fontSize.xxs,
  //     marginLeft: 0,
  //   },
  // };

  return (
    <TextField
      name={name}
      label={label}
      inputRef={textFieldRef}
      defaultValue={value}
      disabled={disabled}
      placeholder={placeholder}
      helperText={helperText || " "}
      error={!!helperText}
      variant="outlined"
      sx={baseSx}
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{
              marginRight: 0,   // remove default spacing
            }}
          >
            <IconButton
              onClick={handleIconClick}
              disabled={disabled}
              sx={{
                backgroundColor: "#0d6efd",
                color: "#fff",
                borderRadius: "0 12px 12px 0",
                height: "49px",
                width: "40px",
                padding: 0,
                marginRight: "-14px", // push icon to edge
                marginTop:"4px",
                "&:hover": { backgroundColor: "#0b5ed7" },
              }}
            >
              <CalendarTodayIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}