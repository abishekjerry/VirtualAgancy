import React, { useEffect, useState } from "react";
import {
    TextField,
    IconButton,
    Tooltip,
    InputAdornment,
} from "@mui/material";
import {
    UploadFile as UploadFileIcon,
    InsertDriveFile as InsertDriveFileIcon,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import { Labels } from "../../utils/constants/labels";
import { FontFamily, FontSize } from "../../utils/constants/fonts";

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
    variant = "outlined",
    inputProps = {},
    startIcon,
    width = "",
    maxLength,
    minLength,
    multiple = false,
    defaultFileUrl = "",
    onBlur,
    min,
    max
}) {

    const isFile = type === Labels.flag.file;
    const isPassword = flag === Labels.flag.password;

    const [showPassword, setShowPassword] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileError, setFileError] = useState("");

    const internalRef = React.useRef(null);
    const textFieldRef = inputRef || internalRef;

    const allowedExtensions = [
        "pdf", "png", "jpg", "jpeg",
        "doc", "docx", "ppt", "pptx",
        "xls", "xlsx"
    ];

    // ✅ handle default value
    useEffect(() => {
        if (defaultFileUrl || value) {
            const files = Array.isArray(value) ? value : [value];

            const mapped = files.map((file) => {
                if (typeof file === "string") {
                    return {
                        name: file.split("/").pop(),
                        url: file,
                    };
                }
                return file;
            });

            setSelectedFiles(mapped);
        } else {
            setSelectedFiles([]);
        }
    }, [defaultFileUrl, value]);

    const handleToggleVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        let errorMsg = "";
        let updatedFiles = [...selectedFiles];
        const remainingSlots = multiple ? maxLength - selectedFiles.length : 1;
        if (multiple && remainingSlots <= 0) {
            setFileError(`You may upload up to ${maxLength} files of no more than 20 MB each`);
            e.target.value = "";
            return;
        }
        for (let file of files) {
            const ext = file.name.split(".").pop().toLowerCase();
            const isValidType = allowedExtensions.includes(ext);
            // ✅ Updated size validation (1MB to 20MB)
            const isValidSize = file.size >= 0 * 1024 * 1024 && file.size <= 20 * 1024 * 1024;

            if (!isValidType) {
                errorMsg = "Allowed types: .pdf, .png, .jpg, .jpeg, .doc, .docx, .ppt, .pptx, .xls, .xlsx";
                continue;
            }

            if (!isValidSize) {
                errorMsg = "Each file must be between 1 MB and 20 MB";
                continue;
            }

            if (multiple && updatedFiles.length >= maxLength) {
                errorMsg = `You may upload up to ${maxLength} files of no more than 20 MB each`;
                break;
            }

            if (!multiple) {
                updatedFiles = [];
            }

            updatedFiles.push({
                name: file.name,
                size: file.size,
                url: URL.createObjectURL(file),
                file: file,
            });
        }

        if (updatedFiles.length === selectedFiles.length) {
            setFileError(errorMsg);
            e.target.value = "";
            return;
        }

        setSelectedFiles(updatedFiles);
        onChange?.({ target: { name, files: updatedFiles, }, });
        setFileError(errorMsg);
        e.target.value = "";
    };

    const handleClearFiles = () => {
        setSelectedFiles([]);
        onChange?.({
            target: { name, files: [] }
        });
        setFileError("");
    };

    // ✅ STYLES
    const baseSx = {
        width: width ? `${width}%` : "100%",
        mt: 0.4,
        "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            "& fieldset": {
                borderColor: helperText ? "#d32f2f" : "#ccc",
            },
            "&:hover fieldset": {
                borderColor: "#62BCD8",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#62BCD8",
            },
        },
        "& .MuiInputLabel-root": {
            fontFamily: FontFamily.bold,
            fontSize: FontSize.textField.label,
        },
    };

    // ================= FILE INPUT =================
    if (isFile) {
        return (
            <>
                <TextField
                    name={name}
                    label={label}
                    variant={variant}
                    fullWidth
                    disabled={disabled}
                    onBlur={onBlur}
                    inputRef={textFieldRef}
                    placeholder="Choose file"
                    error={!!fileError}
                    helperText={fileError}
                    value=""
                    inputProps={{ readOnly: true }}
                    sx={baseSx}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <UploadFileIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <input
                                    hidden
                                    type="file"
                                    name={name}
                                    multiple={multiple}
                                    disabled={disabled}
                                    onChange={handleFileChange}
                                    id={`upload-${name}`}
                                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                                />
                                <label htmlFor={`upload-${name}`}>
                                    <Tooltip title="Upload">
                                        <IconButton component="span">
                                            <InsertDriveFileIcon />
                                        </IconButton>
                                    </Tooltip>
                                </label>
                            </InputAdornment>
                        ),
                    }}
                />
            </>
        );
    }

    // ================= NORMAL INPUT =================
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
            inputRef={textFieldRef}
            multiline={multiline}
            rows={rows}
            disabled={disabled}
            helperText={helperText || " "}
            error={!!helperText}
            variant={variant}
            sx={baseSx}
            inputProps={{
                ...inputProps,
                min,
                max
            }}
            InputProps={{
                startAdornment: startIcon && (
                    <InputAdornment position="start">{startIcon}</InputAdornment>
                ),
                endAdornment: isPassword && (
                    <InputAdornment position="end">
                        <IconButton onClick={handleToggleVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}