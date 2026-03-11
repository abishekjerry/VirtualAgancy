import React, { useEffect, useRef } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Labels } from "../../utils/constants/labels";
const PDatepicker = ({ value, onChange, width = 100 }) => {
  const inputRef = useRef(null);
  const flatpickrRef = useRef(null);

  useEffect(() => {
    flatpickrRef.current = flatpickr(inputRef.current, {
      dateFormat: "d-m-Y",
      defaultDate: value || "today",
      allowInput: true,
      maxDate: "today",
      clickOpens: true,
      onChange: function (selectedDates, dateStr) {
        if (onChange) onChange(dateStr);
      }
    });

    return () => {
      if (flatpickrRef.current) {
        flatpickrRef.current.destroy();
      }
    };
  }, []);

  const handleIconClick = () => {
    flatpickrRef.current?.open();
  };

  return (
    <TextField
      size= {Labels.size.small}
      inputRef={inputRef}
      defaultValue={value}
      placeholder="DD-MM-YYYY"
      sx={{
        width,
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px", // Bootstrap style
          paddingRight: "0px",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ced4da",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#86b7fe",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#0d6efd",
          borderWidth: "1px",
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleIconClick}
              sx={{
                backgroundColor: "#0d6efd",
                color: "#fff",
                borderRadius: "0 8px 8px 0", // Only right side rounded
                height: "100%",
                padding: "8px",
                "&:hover": {
                  backgroundColor: "#0b5ed7",
                },
              }}
            >
              <CalendarTodayIcon fontSize= {Labels.size.small}/>
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PDatepicker;