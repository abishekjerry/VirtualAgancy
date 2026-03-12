import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PStepper({ steps = [] }) {

  const navigate = useNavigate();
  const location = useLocation();

  const activeIndex = steps.findIndex(
    (step) => step.url === location.pathname
  );

  return (
    <>
        
      <div className="p-stepper">
        
        {steps.map((step, index) => (
          <React.Fragment key={index}>

            <div
              className="p-step"
              onClick={() => navigate(step.url)}
            >
              <div
                className={`p-circle ${
                  index === activeIndex ? "active" : ""
                }`}
              >
                {index + 1}
              </div>

              <div
                className={`p-label ${
                  index === activeIndex ? "active" : ""
                }`}
              >
                {step.text}
              </div>
            </div>

            {index !== steps.length - 1 && (
              <div className="p-line"></div>
            )}

          </React.Fragment>
        ))}

      </div>

      {/* CSS inside component */}
      <style>{`

        .p-stepper{
          display:flex;
          align-items:center;
          justify-content:space-between;
          max-width:700px;
          margin:auto;
          padding:20px 0;
        }

        .p-step{
          text-align:center;
          cursor:pointer;
        }

        .p-circle{
          width:36px;
          height:36px;
          border-radius:50%;
          border:2px solid #9CA3AF;
          display:flex;
          align-items:center;
          justify-content:center;
          font-weight:600;
          color:#6B7280;
          margin:auto;
        }

        .p-circle.active{
          border-color:#EF4444;
          color:#EF4444;
        }

        .p-label{
          margin-top:8px;
          font-size:14px;
          color:#6B7280;
        }

        .p-label.active{
          color:#EF4444;
        }

        .p-line{
          flex:1;
          height:2px;
          background:#9CA3AF;
          margin:0 10px 25px;
        }

      `}</style>
    </>
  );
}