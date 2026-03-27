import { Box } from "@mui/material";
import PTypography from "../../component/PTypography/PTypography";
import PGrid from "../../component/PGrid/PGrid";
import PDropdown from "../../component/PDropdown/PDropdown";
import { Labels } from "../../utils/constants/labels";
import React, { useState, useEffect } from "react";
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
import { Dashboard_API } from "../../utils/api/apiUrl";
import { PostApi } from "../../utils/api/networking";
const EnquiryDetails = () => {
    const { getLabel } = useLanguage();
    const navigate = useNavigate();
    const enquirySteps = getEnquirySteps(getLabel);
    const [allowRedirect, setAllowRedirect] = useState(false);
    const [loading, setLoading] = useState(true);
    const [quoteStartDate, setQuoteStartDate] = useState("");
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

    const [formDataList, setFormDataList] = useState({
        managementFeeType: [],
        projectAttribute: [],
        year: [],
        slaTemplate: [],
        quoteType: [
            { label: "Quote of Total price", value: 1 },
            { label: "Quote of Unit price", value: 2 }
        ],
        hybird: [
            { label: "Yes", value: 1 },
            { label: "No", value: 2 }
        ],

    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await PostApi(Dashboard_API.Master, {
                    userCountryId: parseInt(localStorage.getItem("countryID")),
                    role: localStorage.getItem("role")
                });
                setFormDataList(prev => ({
                    ...prev,
                    managementFeeType: response.managementFeetype,
                    projectAttribute: response.projectAttribute,
                    year: response.year,
                    slaTemplate: response.sla
                }));
            } catch (error) {
                console.error("API Error", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const templateList = [
        { label: "Rack Recurring - SG", value: 1 },
        { label: "Rack Recurring - US", value: 2 },
        { label: "Rack Recurring - UK", value: 3 }
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
    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(labelRoutes.clientInfo);
        } else {
            navigate(labelRoutes.home); // fallback route
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

    //SLA Date Management Function

    const phases = [
        { name: getLabel("lbl54"), days: 5, mdays: 5 },
        { name: getLabel("lbl55"), days: 5, mdays: 5 },
        { name: getLabel("lbl56"), days: 20, mdays: 20 },
        { name: getLabel("lbl57"), days: 5, mdays: 5 },
        { name: getLabel("lbl58"), days: 10, mdays: 10 }
    ];
    const [phaseDates, setPhaseDates] = useState([]);
    const addDays = (date, days) => {
        const d = new Date(date);
        d.setDate(d.getDate() + Number(days));
        return d;
    };
    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();

        return `${day}/${month}/${year}`;
    };
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split("-");
        return new Date(year, month - 1, day);
    };
    const calculatePlanByQuote = (selectedDate, updatedPhases = null) => {
        setQuoteStartDate(selectedDate);
        let startDate = parseDate(selectedDate);
        const data = updatedPhases || phases;
        const result = data.map((phase) => {
            // Always use mdays, it’s never empty
            const start = new Date(startDate);
            const end = addDays(start, phase.mdays);
            startDate = new Date(end);

            return {
                ...phase,
                startDate: formatDate(start),
                endDate: formatDate(end),
            };
        });
        console.log(result);

        setPhaseDates(result);
    };

    // Handle mdays input change
    const handleModifiedDays = (index, value) => {
        // Allow empty while typing
        if (value === "") {
            const updatedPhases = [...phases];
            updatedPhases[index].mdays = "";
            setPhaseDates(updatedPhases);
            return;
        }
        const num = Number(value.replace(/\D/g, "").replace(/^0+/, ""));
        if (!num) return;
        const updatedPhases = [...phases];
        updatedPhases[index].mdays = num;
        setPhaseDates(updatedPhases);
        calculatePlanByQuote(quoteStartDate, updatedPhases);
    };
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
                                        allowFuture={true}
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
                                </PGrid>
                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDatepicker
                                        name={Labels.enquiryDetails.briefReceivedDate}
                                        label={`${getLabel("lbl44")} ${Labels.symbols.required}`}
                                        value={formData.briefReceivedDate}
                                        onChange={handleChange}
                                        helperText={errors?.briefReceivedDate}
                                        width={100}
                                        allowFuture={true}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={Labels.enquiryDetails.projectQuoteType}
                                        label={`${getLabel("lbl46")} ${Labels.symbols.required}`}
                                        value={formData.projectQuoteType}
                                        onChange={handleChange}
                                        helperText={errors?.projectQuoteType}
                                        options={formDataList.quoteType}
                                        width={100}
                                    />
                                </PGrid>

                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={Labels.enquiryDetails.year}
                                        label={`${getLabel("lbl47")} ${Labels.symbols.required}`}
                                        value={formData.year}
                                        onChange={handleChange}
                                        helperText={errors?.year}
                                        options={formDataList.year}
                                        width={100}
                                    />
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
                                        options={formDataList.managementFeeType}
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
                                        options={formDataList.hybird}
                                        width={100}
                                        disabled={true}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={Labels.enquiryDetails.projectAttribute}
                                        label={`${getLabel("lbl95")} ${Labels.symbols.required}`}
                                        value={formData.projectAttribute}
                                        onChange={handleChange}
                                        helperText={errors?.projectAttribute}
                                        options={formDataList.projectAttribute}
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
                                        options={formDataList.slaTemplate}
                                        width={100}
                                        flag={Labels.flag.auto}
                                    />
                                </PGrid>

                            </PGrid>

                            <PGrid container className="fw-semibold mb-4">
                                <PGrid item md={2} >{getLabel("lbl50")}</PGrid>
                                <PGrid item md={2}>{getLabel("lbl51")}</PGrid>
                                <PGrid item md={2}>{"Modified Period (w/days)"}</PGrid>
                                <PGrid item md={3} >{getLabel("lbl52")}</PGrid>
                                <PGrid item md={3} >{getLabel("lbl53")}</PGrid>
                            </PGrid>


                            {(phaseDates.length ? phaseDates : phases).map((phase, index) => (
                                <PGrid container className="mb-1 align-items-center" key={index}>

                                    <PGrid item md={2} className="mb-3">
                                        {phase.name}
                                    </PGrid>

                                    <PGrid item md={2} className="mb-3">
                                        {phase.days}
                                    </PGrid>
                                    <PGrid item md={2}>
                                        <PTextField
                                            value={phase.mdays}
                                            onChange={(e) => quoteStartDate === "" ? "" : handleModifiedDays(index, e.target.value)}
                                            width={50}
                                        />
                                    </PGrid>

                                    <PGrid item md={3}>
                                        <PDatepicker
                                            name={`${phase.name}_start`}
                                            width={100}
                                            value={phase.startDate || ""}
                                            onChange={(e) => {
                                                const selectedDate = e.target ? e.target.value : e;
                                                if (index === 0) {
                                                    calculatePlanByQuote(selectedDate);
                                                }
                                            }}
                                        />
                                    </PGrid>

                                    <PGrid item md={3}>
                                        <PTextField
                                            name={`${phase.name}_end`}
                                            placeholder="End Date"
                                            value={phase.endDate || ""}
                                            disabled={true}
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