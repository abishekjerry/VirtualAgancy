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

export const PSummary = ({ sections = [], currentStep = 1 }) => {

    const [activeStep, setActiveStep] = useState(currentStep);
    const [activeItemIndex, setActiveItemIndex] = useState({ 3: 0 });

    const visibleSections = sections.filter(
        (section) => section.step <= currentStep
    );

    const SummaryItem = ({ label, value }) => (
        <PGrid container className={Labels.margin.mb3}>
            {label === "" ? (
                <PGrid item xs={12} sm={12} md={12}>
                    <PTypography
                        labelText={value || "-"}
                        weight={FontWeight.bold}
                        color={CommonColors.grey.main}
                    />
                </PGrid>
            ) : (
                <>
                    <PGrid item xs={12} sm={12} md={6}>
                        <PTypography labelText={label} weight={FontWeight.bold} />
                    </PGrid>

                    <PGrid item xs={12} sm={12} md={6}>
                        <PTypography
                            labelText={value || "-"}
                            weight={FontWeight.bold}
                            color={CommonColors.grey.main}
                        />
                    </PGrid>
                </>
            )}
        </PGrid>
    );

    return (
        <PCard>

            <PGrid container className="justify-content-center">
                <PTypography
                    labelText={Labels.clientInfo.summary}
                    flag={Labels.fontFlags.subHeader}
                    weight={FontWeight.bold}
                    color={CommonColors.blue.main}
                />
            </PGrid>

            {visibleSections.map((section) => {
                const isOpen = activeStep === section.step;

                return (
                    <Fragment key={section.step}>
                        <hr className="my-2" />
                        <PGrid
                            container
                            className="d-flex align-items-center justify-content-between"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                const newStep = isOpen ? null : section.step;
                                setActiveStep(newStep);

                                if (newStep === 3) {
                                    setActiveItemIndex({ 3: 0 });
                                } else {
                                    setActiveItemIndex({});
                                }
                            }}
                        >
                            <PGrid item xs={12} sm={6} md={8}>
                                <PTypography
                                    labelText={`${section.step}. ${section.title}${[3, 4].includes(section.step) ? ` (${section.items?.length || 0})` : ""}`}
                                    flag={Labels.fontFlags.subHeader}
                                    weight={FontWeight.bold}
                                />
                            </PGrid>

                            <PGrid item xs={12} sm={6} md={4} className="d-flex justify-content-end align-items-center">
                                {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </PGrid>
                        </PGrid>

                        {/* CONTENT */}
                        {isOpen && (
                            <PGrid container className={Labels.margin.mt1}>

                                {section.step === 3 ? (
                                    section.items?.map((item, i) => {
                                        const isItemOpen = activeItemIndex[3] === i;

                                        return (
                                            <Fragment key={i}>
                                                <hr className="my-3" />
                                                <PGrid
                                                    container
                                                    className="d-flex align-items-center justify-content-between"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() =>
                                                        setActiveItemIndex((prev) => ({
                                                            ...prev,
                                                            3: prev[3] === i ? null : i
                                                        }))
                                                    }
                                                >
                                                    <PGrid item xs={12} sm={6} md={8}>
                                                        <PTypography
                                                            labelText={item.subTitle}
                                                            weight={FontWeight.bold}
                                                            flag={Labels.fontFlags.subHeader}
                                                        />
                                                    </PGrid>

                                                    <PGrid item xs={12} sm={6} md={4} className="d-flex justify-content-end align-items-center">
                                                        {isItemOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                    </PGrid>
                                                </PGrid>

                                                {isItemOpen && (
                                                    <>
                                                        <PGrid container className="mt-2">
                                                            {(item.items || []).map((subItem, j) => (
                                                                <SummaryItem
                                                                    key={j}
                                                                    label={subItem.label}
                                                                    value={subItem.value}
                                                                />
                                                            ))}
                                                        </PGrid>

                                                        {section.step < currentStep && (
                                                            <PGrid container>
                                                                <PGrid item xs={12} className="d-flex justify-content-end">
                                                                    <PButton
                                                                        label="Edit"
                                                                        variant="contained"
                                                                        color={CommonColors.grey.main}
                                                                        startIcon={<EditIcon />}
                                                                        width={80}
                                                                        onClick={section.onEdit}
                                                                    />
                                                                </PGrid>
                                                            </PGrid>
                                                        )}
                                                    </>
                                                )}
                                            </Fragment>
                                        );
                                    })
                                ) : (
                                    <>
                                        {(section.items || []).map((item, i) => (
                                            <SummaryItem
                                                key={i}
                                                label={item.label}
                                                value={item.value}
                                            />
                                        ))}

                                        {section.step < currentStep && (
                                            <PGrid container>
                                                <PGrid item xs={12} className="d-flex justify-content-end">
                                                    <PButton
                                                        label="Edit"
                                                        variant="contained"
                                                        color={CommonColors.grey.main}
                                                        startIcon={<EditIcon />}
                                                        width={80}
                                                        onClick={section.onEdit}
                                                    />
                                                </PGrid>
                                            </PGrid>
                                        )}
                                    </>
                                )}

                            </PGrid>
                        )}
                    </Fragment>
                );
            })}
        </PCard>
    );
};