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
import PDatepicker from "../../component/PDatepicker/PDatepicker";
import { getEnquirySteps } from "../../utils/commonFunction/common";
import { useLanguage } from "../../utils/constants/language";
import { labelRoutes } from "../../navigations/labelRoutes";
import { useNavigate } from "react-router-dom";
const EnquiryDetails = () => {
    const { getLabel } = useLanguage();
    const navigate = useNavigate();
    const enquirySteps = getEnquirySteps(getLabel);
    const [allowRedirect, setAllowRedirect] = useState(false);
    const [date, setDate] = useState("");
    const [formData, setFormData] = useState({
        projectNo: "",
        estdeliveryDate: "",
        briefReceivedDate: "",
        projectDescription: "",
        projectQuoteType: "",
        year: "",
        managementFeeType: "",
        hybrid: "",
        projectAttribute: "",
        slaTemplate: ""
    });

    // Single state for all errors
    const [errors, setErrors] = useState({
        projectNo: "",
        estdeliveryDate: "",
        briefReceivedDate: "",
        projectDescription: "",
        projectQuoteType: "",
        year: "",
        managementFeeType: "",
        hybrid: "",
        projectAttribute: "",
        slaTemplate: ""
    });

    const yearList = [
        { label: "Y1", value: 1 },
        { label: "Y2", value: 2 },
        { label: "Y3", value: 3 }
    ];

    const templateList = [
        { label: "Rack Recurring - SG", value: 1 },
        { label: "Rack Recurring - US", value: 2 },
        { label: "Rack Recurring - UK", value: 3 }
    ];

    const quoteTypeList = [
        { label: "Quote of Total price", value: 1 },
        { label: "Quote of Unit price", value: 2 }
    ];

    const countryList = [
        { label: "Singapore", value: 1 },
        { label: "India", value: 2 },
        { label: "Malaysia", value: 3 },
        { label: "Thailand", value: 4 }
    ];

    const pmgEntityList = [
        { label: "PMG Singapore", value: 1 },
        { label: "PMG India", value: 2 },
        { label: "PMG Malaysia", value: 3 }
    ];


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: ""   // clear only that field error
        }));
    };

    const handleSubmit = () => {
        const isValid = EnquiryDetailsValidation();
        if (isValid) {
            setAllowRedirect(isValid);
            navigate(labelRoutes.lineItems);
        }
        else {
            setAllowRedirect(isValid);
        }
    };
    const EnquiryDetailsValidation = () => {
        const requiredFields = [
            Labels.enquiryDetails.projectNo,
            Labels.enquiryDetails.projectDescription,
            Labels.enquiryDetails.briefReceivedDate,
            Labels.enquiryDetails.estdeliveryDate,
            Labels.enquiryDetails.year,
            Labels.enquiryDetails.managementFeeType,
            Labels.enquiryDetails.hybrid,
            Labels.enquiryDetails.projectAttribute,
            Labels.enquiryDetails.slaTemplate,
            Labels.enquiryDetails.projectQuoteType
        ];

        let newErrors = {};

        requiredFields.forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = Labels.commonLabel.required;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const phases = [
        { name: getLabel("lbl54"), days: 5 },
        { name: getLabel("lbl55"), days: 5 },
        { name: getLabel("lbl56"), days: 20 },
        { name: getLabel("lbl57"), days: 5 },
        { name: getLabel("lbl58"), days: 10 }
    ];
    return (
        <>
            <Box sx={{ px: 3, py: 3 }}>
                <PGrid container className={Labels.margin.mb3} >
                    <PStepper steps={enquirySteps} activeStep={1} allowRedirect={allowRedirect}></PStepper>
                </PGrid>
                <PGrid container className={Labels.margin.mb3} >
                    <PGrid item xs={12} sm={12} md={9}>
                        <PCard>
                            <PGrid container className={Labels.margin.mb3}>
                                <PTypography
                                    labelText={getLabel("lbl21")}
                                    flag={Labels.fontFlags.subHeader}
                                    color={CommonColors.blue.main}
                                    weight={FontWeight.bold}
                                />
                                <PTypography
                                    labelText={getLabel("lbl41")}
                                    flag={Labels.fontFlags.smallText}
                                    color={CommonColors.grey.main}
                                    weight={FontWeight.bold}
                                />
                            </PGrid>
                            <PGrid container>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTextField
                                        name={Labels.enquiryDetails.projectNo}
                                        label={`${getLabel("lbl42")} ${Labels.symbols.required}`}
                                        value={formData.projectNo}
                                        onChange={handleChange}
                                        helperText={errors?.projectNo}
                                    />
                                    <PDatepicker
                                        name={Labels.enquiryDetails.estdeliveryDate}
                                        label={`${getLabel("lbl43")} ${Labels.symbols.required}`}
                                        value={formData.estdeliveryDate}
                                        onChange={handleChange}
                                        helperText={errors?.estdeliveryDate}
                                        width={100}
                                    />
                                    <PDatepicker
                                        name={Labels.enquiryDetails.briefReceivedDate}
                                        label={`${getLabel("lbl44")} ${Labels.symbols.required}`}
                                        value={formData.briefReceivedDate}
                                        onChange={handleChange}
                                        helperText={errors?.briefReceivedDate}
                                        width={100}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={8}>
                                    <PTextField
                                        name={Labels.enquiryDetails.projectDescription}
                                        label={`${getLabel("lbl45")} ${Labels.symbols.required}`}
                                        value={formData.projectDescription}
                                        onChange={handleChange}
                                        helperText={errors?.projectDescription}
                                        multiline={true}
                                        rows={4.5}
                                        width={100}
                                    />
                                    <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                        <PDropdown
                                            name={Labels.enquiryDetails.projectQuoteType}
                                            label={`${getLabel("lbl46")} ${Labels.symbols.required}`}
                                            value={formData.projectQuoteType}
                                            onChange={handleChange}
                                            helperText={errors?.projectQuoteType}
                                            options={quoteTypeList}
                                            width={100}
                                        />
                                        <PDropdown
                                            name={Labels.enquiryDetails.year}
                                            label={`${getLabel("lbl47")} ${Labels.symbols.required}`}
                                            value={formData.year}
                                            onChange={handleChange}
                                            helperText={errors?.year}
                                            options={yearList}
                                            width={100}
                                        />
                                    </Box>

                                </PGrid>
                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={Labels.enquiryDetails.managementFeeType}
                                        label={`${getLabel("lbl93")} ${Labels.symbols.required}`}
                                        value={formData.managementFeeType}
                                        onChange={handleChange}
                                        helperText={errors?.managementFeeType}
                                        options={templateList}
                                        width={100}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={Labels.enquiryDetails.hybrid}
                                        label={`${getLabel("lbl94")} ${Labels.symbols.required}`}
                                        value={formData.hybrid}
                                        onChange={handleChange}
                                        helperText={errors?.hybrid}
                                        options={templateList}
                                        width={100}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={Labels.enquiryDetails.projectAttribute}
                                        label={`${getLabel("lbl95")} ${Labels.symbols.required}`}
                                        value={formData.projectAttribute}
                                        onChange={handleChange}
                                        helperText={errors?.projectAttribute}
                                        options={templateList}
                                        width={100}
                                    />
                                </PGrid>
                            </PGrid>
                            <hr className="my-4" />
                            <PGrid container className={Labels.margin.mb4}>
                                <PTypography
                                    labelText={getLabel("lbl48")}
                                    flag={Labels.fontFlags.subHeader}
                                    color={CommonColors.blue.main}
                                    weight={FontWeight.bold}
                                />
                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={12} md={8}>
                                    <PDropdown
                                        name={Labels.enquiryDetails.slaTemplate}
                                        label={`${getLabel("lbl49")} ${Labels.symbols.required}`}
                                        value={formData.slaTemplate}
                                        onChange={handleChange}
                                        helperText={errors?.slaTemplate}
                                        options={templateList}
                                        width={100}
                                    />
                                </PGrid>

                            </PGrid>

                            <PGrid container className="fw-semibold mb-4">
                                <PGrid item md={2} >{getLabel("lbl50")}</PGrid>
                                <PGrid item md={2} className="text-nowrap">{getLabel("lbl51")}</PGrid>
                                <PGrid item md={4} >{getLabel("lbl52")}</PGrid>
                                <PGrid item md={4} >{getLabel("lbl53")}</PGrid>
                            </PGrid>


                            {phases.map((phase, index) => (
                                <PGrid container className="mb-1 align-items-center" key={index}>

                                    <PGrid item md={2} className="mb-3">
                                        {phase.name}
                                    </PGrid>

                                    <PGrid item md={2} className="mb-3">
                                        {phase.days}
                                    </PGrid>

                                    <PGrid item md={4}>
                                        {index === 0 ? (
                                            <PDatepicker
                                                name={`${phase.name}_start`}
                                                width={100}
                                            />
                                        ) : (
                                            <PTextField
                                                name={`${phase.name}_start`}
                                                placeholder="Start Date"
                                            //width={100}
                                            />
                                        )}
                                    </PGrid>

                                    <PGrid item md={4}>
                                        <PTextField
                                            name={`${phase.name}_end`}
                                            placeholder="End Date"
                                        //width={100}
                                        />
                                    </PGrid>

                                </PGrid>
                            ))}

                            <hr className="my-4" />
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

export default EnquiryDetails;