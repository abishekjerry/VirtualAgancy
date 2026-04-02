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
import { getEnquirySteps, isSuccess, toast } from "../../utils/commonFunction/common";
import { useLanguage } from "../../utils/constants/language";
import { labelRoutes } from "../../navigations/labelRoutes";
import { useNavigate, useLocation } from "react-router-dom";
import { Dashboard_API, EnquiryDetails_API } from "../../utils/api/apiUrl";
import { PostApi } from "../../utils/api/networking";
import { PDraftDialog } from "../../component/PDialog/PDraftDialog";
const EnquiryDetails = () => {
    const { state } = useLocation();
    const { getLabel } = useLanguage();
    const navigate = useNavigate();
    const enquirySteps = getEnquirySteps(getLabel);
    const [allowRedirect, setAllowRedirect] = useState(false);
    const [loading, setLoading] = useState(true);
    const [quoteStartDate, setQuoteStartDate] = useState("");
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        projectNo: "",
        estdeliveryDate: "",
        briefReceivedDate: "",
        projectDescription: "",
        projectQuoteType: "",
        year: "",
        managementFeeType: "",
        hybrid: 2,
        projectAttribute: "",
        slaTemplate: "",
        projectAttributeValue: "",
        yearValue: "",
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
        slaTemplate: "",
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
        slaTemplateData: {},
    });

    useEffect(() => {
        console.log(state,"dewdwhedj");
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
        calculatePlanByQuote(today);
    }, [formDataList.slaTemplateData]);


    const slaTemplateData = async (sla) => {
        try {
            setLoading(true);
            const response = await PostApi(EnquiryDetails_API.GetSlatemplateMaster, {
                SlaId: sla,
            });
            console.log(response);
            setFormDataList(prev => ({
                ...prev,
                slaTemplateData: response,
            }));
        } catch (error) {
            console.error("API Error", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const label = e.target.label || "";
        setFormData((prev) => {
            const data = {
                ...prev,
                [name]: value
            };
            // Extra mappings
            if (name === Labels.enquiryDetails.projectAttribute) {
                data.projectAttributeValue = label;
            }
            if (name === Labels.enquiryDetails.year) {
                data.yearValue = label;
            }
            return data;
        });
        setErrors((prev) => ({
            ...prev,
            [name]: ""   // clear only that field error
        }));
        if (name === Labels.enquiryDetails.slaTemplate) {
            slaTemplateData(value);
        }

    };


    const handleSubmit = async () => {
        const isValid = EnquiryDetailsValidation();
        const id = state?.id > 0 ? state.id : 0;
        if (isValid) {
            try {
                setLoading(true);
                const response = await PostApi(EnquiryDetails_API.AddUpdateEnquiryDetails, {
                    enqId: id,
                    projectNo: formData.projectNo,
                    projectDesc: formData.projectDescription,
                    estdate: formatDate(parseDate(formData.estdeliveryDate)),
                    briefdate: formatDate(parseDate(formData.briefReceivedDate)),
                    modifiedBy: parseInt(localStorage.getItem("agancyUserID")),
                    quoteBy: formData.projectQuoteType,
                    slaId: formData.slaTemplate,
                    managementfeetypeId: formData.managementFeeType,
                    hybridModel: formData.hybrid == 1 ? "Yes" : "No",
                    attribute: formData.projectAttributeValue,
                    year: formData.yearValue,
                    ...dynamicData
                });
                //console.log(response, "Payload")
                if (isSuccess(response)) {
                    setAllowRedirect(true);
                    toast(Labels.status.success, response.data.message);
                    navigate(labelRoutes.lineItems);
                } else {
                    setErrors((prev) => ({
                        ...prev,
                        name: ""
                    }));
                    toast(Labels.status.failure, response.data.message);
                }

            } catch (error) {
                console.log(error);
                toast(Labels.status.failure, Labels.message.somethingWentWrong);
            } finally {
                setLoading(false);
            }
        } else {
            setAllowRedirect(false);
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
    // const { quote, proof, production, fileCopies, invoicing, defQuote, defProof, defProduction
    //     , defFileCopies, defInvoices } = formDataList.slaTemplateData || {};

    const slaData = formDataList.slaTemplateData;
    const phases = [
        { name: getLabel("lbl54"), days: slaData?.quote ?? 5, mdays: slaData?.defQuote ?? 5 },
        { name: getLabel("lbl55"), days: slaData?.proof ?? 5, mdays: slaData?.defProof ?? 5 },
        { name: getLabel("lbl56"), days: slaData?.production ?? 20, mdays: slaData?.defProduction ?? 20 },
        { name: getLabel("lbl57"), days: slaData?.fileCopies ?? 5, mdays: slaData?.defFileCopies ?? 5 },
        { name: getLabel("lbl58"), days: slaData?.invoicing ?? 10, mdays: slaData?.defInvoices ?? 10 }
    ];
    const [phaseDates, setPhaseDates] = useState([]);
    const keys = ["quote", "proof", "production", "filecopies", "invoice"];
    const dynamicData = phaseDates.reduce((acc, item, i) => {
        const key = keys[i];
        acc[`${key}startdate`] = item.startDate;
        acc[`${key}enddate`] = item.endDate;
        acc[`modified${key.charAt(0).toUpperCase() + key.slice(1)}`] = item.mdays;
        return acc;
    }, {});

    const addWorkDays = (startDate, days) => {
        let d = new Date(startDate);
        let daysToAdd = Number(days);
        let count = 0;
        while (count < daysToAdd) {
            d.setDate(d.getDate() + 1);
            // If it's NOT Sunday (0) and NOT Saturday (6), count it as a workday
            if (d.getDay() !== 0 && d.getDay() !== 6) {
                count++;
            }
        }
        return d;
    };
    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const today = formatDate(new Date());
    const parseDate = (dateStr) => {
        const p = dateStr.split(/[\/-]/);
        return p[0].length === 4 ? new Date(p[0], p[1] - 1, p[2]) : new Date(p[2], p[1] - 1, p[0]);
    };

    const calculatePlanByQuote = (selectedDate, updatedPhases = null) => {
        setQuoteStartDate(selectedDate);
        let startDate = parseDate(selectedDate);
        // Initial check: If start date is a weekend, move it to Monday
        while (startDate.getDay() === 0 || startDate.getDay() === 6) {
            startDate.setDate(startDate.getDate() + 1);
        }
        const data = updatedPhases || phases;
        const result = data.map((phase) => {
            const start = new Date(startDate);
            // Calculate the end date skipping weekends
            const end = addWorkDays(start, phase.mdays);
            // Set the start of the NEXT phase to the end of this one
            startDate = new Date(end);
            return {
                ...phase,
                startDate: formatDate(start),
                endDate: formatDate(end),
            };
        });

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

    const handleExitDraft = () => {
        setOpen(true);
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
                                        flag={Labels.flag.auto}
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
                                        flag={Labels.flag.auto}
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
                                        flag={Labels.flag.auto}
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
                                            value={phase.startDate || (index === 0 ? today : "")}
                                            onChange={(e) => {
                                                const selectedDate = e?.target?.value ? e.target.value : formatDate(e);
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

            <PDraftDialog
                open={open}
                onClose={() => setOpen(false)}
                onSave={handleSubmit}
                onDelete={handleSubmit}
            />
        </>

    );
};

export default EnquiryDetails;