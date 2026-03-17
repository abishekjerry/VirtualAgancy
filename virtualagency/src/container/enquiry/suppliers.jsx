import { Box } from "@mui/material";
import PTypography from "../../component/PTypography/PTypography";
import PGrid from "../../component/PGrid/PGrid";
import PDropdown from "../../component/PDropdown/PDropdown";
import { Labels } from "../../utils/constants/labels";
import React, { useState } from "react";
import { FontWeight } from "../../utils/constants/fonts";
import PCard from "../../component/PCard/PCard";
import { CommonColors } from "../../utils/constants/colors";
import PButton from "../../component/PButton/PButton";
import PStepper from "../../component/PStepper/PStepper";
import PTextField from "../../component/PTextField/PTextField";
import { getEnquirySteps } from "../../utils/commonFunction/common";
import { useLanguage } from "../../utils/constants/language";
import PSearch from "../../component/PSearch/PSearch";
const LineItems = () => {
    const { getLabel } = useLanguage();
    const enquirySteps = getEnquirySteps(getLabel);
    const [country, setCountry] = useState("");
    const [print, setPrint] = useState("");
    const printList = [
        { value: 1, label: "All" },
        { value: 2, label: "Print" },
        { value: 3, label: "POSM" },
        { value: 4, label: "Promo" },
        { value: 5, label: "Print and POSM" },
        { value: 6, label: "Print and Premium" },
        { value: 7, label: "POSM and Premium" }
    ];
    const counties = [
        { value: 1, label: "Thailand" },
        { value: 2, label: "Janpen" },
        { value: 3, label: "India" }
    ]


    const handleChange = (e) => {
        const { name, value } = e.target;
    };

    return (
        <>
            <Box sx={{ px: 3, py: 3 }}>
                <PGrid container className={Labels.margin.mb3} >
                    <PStepper steps={enquirySteps} activeStep={4}></PStepper>
                </PGrid>
                <PGrid container className={Labels.margin.mb3} >
                    <PGrid item xs={12} sm={12} md={9}>
                        <PCard>
                            {/* Line Items */}
                            <PGrid container className={Labels.margin.mb3}>
                                <PTypography
                                    labelText={getLabel("lbl23")}
                                    flag={Labels.fontFlags.subHeader}
                                    color={CommonColors.blue.main}
                                    weight={FontWeight.bold}
                                />
                                <PTypography
                                    labelText={getLabel("lbl90")}
                                    flag={Labels.fontFlags.smallText}
                                    color={CommonColors.grey.main}
                                    weight={FontWeight.bold}
                                />
                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={6}>
                                    <PSearch width="100%" placeholder={"Search a Suplier Name"} />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={3}>
                                    <PDropdown
                                        label={getLabel("lbl09")}
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        options={counties}
                                        width={Labels.fontSize.xxxxl}
                                        flag={Labels.flag.auto}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={3}>
                                    <PDropdown
                                        label={"Print Capability"}
                                        value={print}
                                        onChange={(e) => setPrint(e.target.value)}
                                        options={printList}
                                        width={Labels.fontSize.xxxxl}
                                        flag={Labels.flag.auto}
                                    />
                                </PGrid>
                            </PGrid>


                            <PGrid container className="d-flex align-items-center justify-content-between">
                                <PGrid item xs={12} sm={6} md={8}>
                                    <PButton
                                        label={getLabel("lbl37")}
                                        variant="outlined"
                                        onClick={(e) => handleExitDraft(e)}
                                        width={180}
                                    />
                                </PGrid>
                                <PGrid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    className="d-flex justify-content-end gap-2"
                                >
                                    <PButton
                                        label={getLabel("lbl38")}
                                        variant="contained"
                                        color={CommonColors.grey.main}
                                        onClick={(e) => handleBack(e)}
                                        width={120}
                                    />

                                    <PButton
                                        label={getLabel("lbl39")}
                                        variant="contained"
                                        color={CommonColors.green.main}
                                        onClick={(e) => handleSubmit(e, true)}
                                        width={120}
                                    />
                                </PGrid>
                            </PGrid>
                        </PCard>
                    </PGrid>
                    <PGrid item xs={12} sm={12} md={3}>
                    </PGrid>
                </PGrid>
            </Box>

        </>
    );
};

export default LineItems;