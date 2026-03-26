import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import "./PCard.css";
import { CommonColors } from "../../utils/constants/colors";

export default function PCard({
  title,
  icon,          // ✅ new (optional)
  rightAction,   // ✅ new (optional)
  onBackClick,
  children,
  className = "",
  color
}) {
  return (
    <div className={`pcard-container ${className}`}>

      {title && (
        <div className={`pcard-header ${icon || rightAction ? "text-white px-3 py-2 d-flex justify-content-between align-items-center" : ""}`}
          style={icon || rightAction ? { margin: "-15px -15px 10px -15px", backgroundColor: color || "#1565C0" } : {}} >
          <div className="d-flex align-items-center gap-2">
            {!icon && <div className="pcard-side" />}
            {icon && icon}
            <h2 className={`pcard-title ${icon || rightAction ? "text-white mb-0" : ""}`}> {title} </h2>
          </div>
          {(rightAction || onBackClick) ? (
            <div className="pcard-side pcard-back-button-wrapper">
              {rightAction ? (
                rightAction
              ) : onBackClick ? (
                <IconButton onClick={onBackClick} className={icon || rightAction ? "text-white" : "pcard-back-button"}>
                  <ArrowBackIcon />
                </IconButton>
              ) : null}
            </div>
          ) : (
            <div className="pcard-side" />
          )}
        </div>
      )}
      <div className="pcard-content">
        {children}
      </div>
    </div>
  );
}