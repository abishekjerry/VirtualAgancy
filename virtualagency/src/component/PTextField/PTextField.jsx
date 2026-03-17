import React, { useEffect, useState } from "react";
import {
    TextField,
    IconButton,
    Tooltip,
    InputAdornment,
} from "@mui/material";
import {
    UploadFile as UploadFileIcon,
    Close as CloseIcon,
    InsertDriveFile as InsertDriveFileIcon,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import { Labels } from "../../utils/constants/labels";
import { FontFamily, FontSize } from "../../utils/constants/fonts";
import { FormControlBaseStyle } from "../../utils/constants/styles";

export default function PTextField({
    inputRef,
    flag,
    label = "",
    value = "",
    onChange,
    onKeyPress,
    eyeIcon,
    onKeyUp,
    disabled = false,
    name = "",
    helperText = "",
    type = "text",
    multiline = false,
    rows = 1,
    color = "#1976d2",
    font = FontFamily.bold,
    sx = {},
    variant = "outlined",
    inputProps = {},
    startIcon,
    width = "",
    maxLength,
    multiple = false,
    defaultFileUrl = "",
    onBlur,
    mt = 0.4
}) {
    const isFile = type === "file";
    const isPassword = flag === Labels.flag.password;
    const [showPassword, setShowPassword] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const internalRef = React.useRef(null);
    const textFieldRef = inputRef || internalRef;
    useEffect(() => {
        if (defaultFileUrl || value) {
            const url = defaultFileUrl || value;
            const name = url.split("/").pop() || "file.png";
            setSelectedFiles([{ name, url }]);
        } else {
            setSelectedFiles([]);
        }
    }, [defaultFileUrl, value]);

    const handleToggleVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        const fileWithPreview = files.map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file),
        }));

        setSelectedFiles(fileWithPreview);
        onChange?.(e);
    };

    const handleClearFiles = () => {
        setSelectedFiles([]);
        const fakeEvent = {
            target: {
                name,
                files: [],
            },
        };
        onChange?.(fakeEvent);
    };
    //const baseSx = FormControlBaseStyle(width, mt);
    const baseSx = {
        width:  width ? `${width}%` : Labels.fontSize.xxxxl,
        mt: 0.4,
        //mt: 1,
        "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            transition: "all 0.3s ease",
            "& fieldset": {
                borderColor: helperText ? "#d32f2f" : "#ccc",
            },
            "&:hover fieldset": {
                borderColor: "#62BCD8",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#62BCD8",
                boxShadow: "0 0 0 3px rgba(98, 188, 216, 0.25)",
            },
        },
        "& .MuiInputLabel-root": {
            fontFamily: FontFamily.bold,
            fontSize: FontSize.textField.label,
            color: "#9e9e9e",
            top: "0px",
            "&.Mui-focused": { color: "#62BCD8" },
            "&.Mui-error": { color: "#d32f2f" },
            "&.Mui-disabled": { color: "#bdbdbd" },
        },
        "& .MuiInputBase-input": {
            fontSize: FontSize.textField.label,
        },
        "& .MuiFormHelperText-root": {
            fontSize: Labels.fontSize.xxs,
            marginLeft: 0,
        },
    };
    if (isFile) {
        return (
            <>
                <TextField
                    name={name}
                    label={label}
                    variant={variant}
                    error={!!helperText}
                    disabled={disabled}
                    onBlur={onBlur}
                    inputRef={textFieldRef}
                    placeholder="ChooseFile"
                    helperText={helperText || " "}
                    sx={baseSx}
                    inputProps={{ readOnly: true }}
                    value={
                        selectedFiles.length > 0
                            ? selectedFiles
                                .map((f) => (f.name.length > 30 ? `${f.name.slice(0, 30)}...` : f.name))
                                .join(", ")
                            : ""
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <UploadFileIcon sx={{ color: disabled ? "#6B7280" : "#62BCD8", mr: -2.2 }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <>
                                {selectedFiles.length > 0 && (
                                    <Tooltip title="Clear">
                                        <IconButton size="small" onClick={handleClearFiles} sx={{ mr: -1 }}>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                <input
                                    disabled={disabled}
                                    hidden
                                    type="file"
                                    name={name}
                                    multiple={multiple}
                                    onChange={handleFileChange}
                                    id={`upload-${name}`}
                                />
                                <label htmlFor={`upload-${name}`}>
                                    <Tooltip title="Upload">
                                        <IconButton component="span" sx={{ ml: 1 }}>
                                            <InsertDriveFileIcon />
                                        </IconButton>
                                    </Tooltip>
                                </label>
                            </>
                        ),
                    }}
                />
            </>
        );
    }
    return (
        <TextField
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            onKeyUp={onKeyUp}
            type={
                isPassword && !showPassword
                    ? Labels.flag.password
                    : type
            }
            multiline={multiline}
            rows={rows}
            disabled={disabled}
            helperText={helperText || " "}
            error={!!helperText}
            variant={variant}
            sx={baseSx}
            inputProps={{ ...inputProps, maxLength }}
            InputProps={{
                startAdornment: startIcon && (
                    <InputAdornment position="start">{startIcon}</InputAdornment>
                ),
                endAdornment: isPassword && (
                    <InputAdornment sx={{ pr: 0.5 }} position="end" >
                        <IconButton onClick={handleToggleVisibility} edge="end" disableRipple
                            sx={{
                                p: 0, m: 0, borderRadius: 0,
                                backgroundColor: "transparent", "&:hover": { backgroundColor: "transparent" }
                                , "&:focus": { backgroundColor: "transparent", outline: "none", }
                                , "&.Mui-focusVisible": { outline: "none", backgroundColor: "transparent" }
                            }}>
                            {showPassword ? <VisibilityOff sx={{ fontSize: eyeIcon || 23, }} /> : <Visibility sx={{ fontSize: eyeIcon || 23 }} />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}