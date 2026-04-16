import { CommonColors } from "../../utils/constants/colors";
import { FontWeight } from "../../utils/constants/fonts";
import { Labels } from "../../utils/constants/labels";
import PCard from "../PCard/PCard";
import PGrid from "../PGrid/PGrid";
import PTypography from "../PTypography/PTypography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import { useState, Fragment } from "react";
import PButton from "../PButton/PButton";

export const PSummary = ({ sections = [] }) => {
    const [activeStep, setActiveStep] = useState(null);

    const SummaryItem = ({ label, value }) => (
        <PGrid container className={Labels.margin.mb3}>
            <PGrid item xs={12} sm={12} md={6}>
                <PTypography labelText={label} weight={FontWeight.bold} />
            </PGrid>
            <PGrid item xs={12} sm={12} md={6}>
                <PTypography labelText={value || "-"} weight={FontWeight.bold} color={CommonColors.grey.main} />
            </PGrid>
        </PGrid>
    );

    return (
        <PCard>
            {/* HEADER */}
            <PGrid container className="justify-content-center">
                <PTypography
                    labelText={Labels.clientInfo.summary}
                    flag={Labels.fontFlags.subHeader}
                    weight={FontWeight.bold}
                    color={CommonColors.blue.main}
                />
            </PGrid>
            {/* SECTIONS */}
            {sections.map((section, index) => {
                const isOpen = activeStep === section.step;
                return (
                    <Fragment key={section.step}>
                        {/* ROW */}
                        <hr className="my-2" />
                        <PGrid container className="d-flex align-items-center justify-content-between"
                            onClick={() => setActiveStep(isOpen ? null : section.step)} style={{ cursor: "pointer" }}
                        >
                            <PGrid item xs={12} sm={6} md={8}>
                                <PTypography
                                    labelText={`${section.step}. ${section.title}`}
                                    flag={Labels.fontFlags.subHeader}
                                    weight={FontWeight.bold}
                                />
                            </PGrid>

                            <PGrid item xs={12} sm={6} md={4} className="d-flex justify-content-end align-items-center" >
                                {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </PGrid>
                        </PGrid>

                        {/* CONTENT */}
                        {isOpen && (
                            <>
                                <PGrid container className={Labels.margin.mt3}>
                                    {section.items.map((item, i) => (
                                        <SummaryItem
                                            key={i}
                                            label={item.label}
                                            value={item.value}
                                        />
                                    ))}
                                </PGrid>


                                {section.showEdit && (
                                    <PGrid container>
                                        <PGrid item xs={12} className="d-flex justify-content-end align-items-center">
                                            <PButton
                                                label={"Edit"}
                                                variant="contained"
                                                color={CommonColors.grey.main}
                                                startIcon={<EditIcon />}
                                                width={80} />
                                        </PGrid>
                                    </PGrid>
                                )}
                            </>
                        )}
                    </Fragment>
                );
            })}
        </PCard >
    );
};