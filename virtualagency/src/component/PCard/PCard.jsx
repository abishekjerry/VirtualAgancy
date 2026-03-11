import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import "./PCard.css";
export default function PCard({ title, onBackClick, children, className = "" }) {
  return (
    <div className={`pcard-container ${className}`}>
      {title && (
        <div className="pcard-header">
          <div className="pcard-side" />
          <h2 className="pcard-title">{title}</h2>
          {onBackClick ? (
            <div className="pcard-side pcard-back-button-wrapper">
              <IconButton onClick={onBackClick} className="pcard-back-button">
                <ArrowBackIcon />
              </IconButton>
            </div>
          ) : (
            <div className="pcard-side" />
          )}
        </div>
      )}
      <div className="pcard-content">{children}</div>
    </div>
  );
}