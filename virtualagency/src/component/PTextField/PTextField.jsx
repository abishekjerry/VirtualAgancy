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
    const isFile = type === Labels.flag.file;
    const isPassword = flag === Labels.flag.password;
    const [showPassword, setShowPassword] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileError, setFileError] = useState("");
    const internalRef = React.useRef(null);
    const textFieldRef = inputRef || internalRef;
    const allowedExtensions = ["pdf", "png", "jpg", "jpeg", "doc", "docx", "ppt", "pptx", "xls", "xlsx"];
    useEffect(() => {
        if (defaultFileUrl || value) {
            const url = defaultFileUrl || value;
            let fileName = "file.png";
            if (typeof url === "string") {
                fileName = url.split("/").pop() || "file.png";
            } else if (url?.name) {
                fileName = url.name;
            }
            setSelectedFiles([{ name: fileName, url }]);
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
        let updatedFiles = [...selectedFiles, ...files];
        if (updatedFiles.length > maxLength) {
            setFileError(`You may attach up to ${maxLength} files only`);
            e.target.value = "";
            return;
        }
        updatedFiles = updatedFiles
            .filter(file => {
                const ext = file.name.split(".").pop().toLowerCase();
                const isValidType = allowedExtensions.includes(ext);
                const isValidSize = file.size <= (multiple ? 20 * 1024 * 1024 : 2 * 1024 * 1024);
                if (!isValidType || !isValidSize) {
                    errorMsg = multiple
                        ? "You may upload up to 5 files (max 20MB each). Allowed types: .pdf, .png, .jpg, .jpeg, .doc, .docx, .ppt, .pptx, .xls, .xlsx"
                        : "File must be under 2MB. Allowed types: .pdf, .png, .jpg, .jpeg, .doc, .docx, .ppt, .pptx, .xls, .xlsx";
                }
                return isValidType && isValidSize;
            })
            .map(file => ({
                name: file.name,
                url: file.url || URL.createObjectURL(file),
                file: file.file || file
            }));

        setSelectedFiles(updatedFiles);

        onChange?.({
            target: { name, files: updatedFiles.map(f => f.file) }
        });
        setFileError(errorMsg);
        e.target.value = "";
    };

    const handleClearFiles = (index) => {
        let updatedFiles;
        if (index !== undefined) {
            updatedFiles = selectedFiles.filter((_, i) => i !== index);
        } else {
            updatedFiles = [];
        }
        setSelectedFiles(updatedFiles);
        onChange?.({
            target: { name, files: updatedFiles.map(f => f.file) }
        });
        setFileError("");
        if (!index && textFieldRef?.current) {
            textFieldRef.current.value = "";
        }
    };
    //const baseSx = FormControlBaseStyle(width, mt);
    const baseSx = {
        width: width ? `${width}%` : Labels.fontSize.xxxxl,
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
                {/* <TextField
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
                /> */}
                <TextField
                    name={name}
                    label={label}
                    variant={variant}
                    fullWidth
                    disabled={disabled}
                    onBlur={onBlur}
                    inputRef={textFieldRef}
                    placeholder={"Choose file"}
                    error={!!fileError}
                    helperText={fileError || " "}
                    value={""}
                    // selectedFiles.length > 0 ? selectedFiles
                    //     .map((f) =>
                    //         f.name.length > 30
                    //             ? `${f.name.slice(0, 30)}...`
                    //             : f.name
                    //     )
                    //     .join(", ")
                    //     : ""

                    inputProps={{ readOnly: true }}
                    sx={{
                        ...baseSx,
                        "& .MuiInputBase-input": {
                            paddingRight: "8px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        },
                        "& .MuiInputAdornment-root": {
                            marginLeft: "4px"
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <UploadFileIcon
                                    sx={{
                                        color: disabled ? "#6B7280" : "#62BCD8"
                                    }}
                                />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <>
                                    {/* {selectedFiles.length > 0 && (
                                        <Tooltip title="Clear">
                                            <IconButton size="small" onClick={handleClearFiles}>
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    )} */}

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
                                </>
                            </InputAdornment>
                        )
                    }}
                />

                {selectedFiles.length > 0 && (
                    <div style={{ marginTop: 8 }}>
                        {selectedFiles.map((file, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "8px 12px",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "10px",
                                    marginBottom: "8px",
                                    background: "#fafafa",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 500,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        maxWidth: "80%"
                                    }}
                                >
                                    {file.name}
                                </span>

                                <IconButton size="small" onClick={() => handleClearFiles(index)}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </div>
                        ))}
                    </div>
                )}
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