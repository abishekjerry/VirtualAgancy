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
import { formatDate, getEnquirySteps, getOptionLabel, getOptionValue, isNotEmpty, isSuccess, parseDate, toast } from "../../utils/commonFunction/common";
import { useLanguage } from "../../utils/constants/language";
import { labelRoutes } from "../../navigations/labelRoutes";
import { useNavigate, useLocation } from "react-router-dom";
import { Dashboard_API, EnquiryDetails_API } from "../../utils/api/apiUrl";
import { PostApi } from "../../utils/api/networking";
import { PDraftDialog } from "../../component/PDialog/PDraftDialog";
import { PSummary } from "../../component/PSumary/PSummary";
import { getClientInfo, getEnquiryDetails, getSummarySections } from "../../utils/constants/summary";
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
        hybrid: "",
        projectAttribute: "",
        slaTemplate: "",
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
            { label: "Quote By Total Price", value: 1 },
            { label: "Quote By Unit Price", value: 2 }
        ],
        hybird: [
            { label: "Yes", value: 1 },
            { label: "No", value: 2, selected: true }
        ],

        clientInfo: [],
        enquiryDetails: []
    });

    const flag = isNotEmpty(state?.id) && state?.id !== 0 ? Labels.flag.Update : Labels.flag.Insert;
    const id = state?.id > 0 ? state.id : 0;
    const [slaTemplateData, setSlaTemplateData] = useState(null)
    const [phaseDates, setPhaseDates] = useState([]);

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
               await GetData(response);
            } catch (error) {
                toast(Labels.status.failure, Labels.message.somethingWentWrong);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        
    }, []);


    // useEffect(() => {
    //     const { projectAttribute, year, enquiryDetails } = formDataList;
    //     if (projectAttribute?.length && year?.length && enquiryDetails?.attribute && enquiryDetails?.year) {
    //         setFormData(prev => ({
    //             ...prev,
    //             projectAttribute: getOptionValue(projectAttribute, enquiryDetails.attribute),
    //             //year: getOptionValue(year, enquiryDetails.year)
    //         }));
    //     }

    // }, [formDataList]);


    const defaultSla = formDataList?.slaTemplate?.[0]?.value ?? null;
    useEffect(() => {
        if (formDataList?.slaTemplate?.length && !formData.slaTemplate) {
            const slaId = formDataList?.enquiryDetails?.slaId ?? defaultSla;
            const hybrid = formDataList?.enquiryDetails?.hybridModel ? getOptionValue(formDataList.hybird, data.enqProjectinfo.hybridModel) : 2;
            const managementfeetypeId = formDataList?.enquiryDetails?.managementfeetypeId ? data.enqProjectinfo.managementfeetypeId : 8;
            setFormData(prev => ({
                ...prev,
                slaTemplate: slaId,
                hybrid: hybrid,
                managementFeeType : managementfeetypeId
            }));
            slaTemplate(slaId);
        }
    }, [formDataList.slaTemplate, formDataList.enquiryDetails]);

    //useEffect(() => {
    const GetData = async (response) => {
        try {
            if (id !== 0) {
                const data = await PostApi(Dashboard_API.GetDetails, {
                    Enquiryid: id,
                });
                setFormDataList(prev => ({
                    ...prev,
                    clientInfo: data.enqClientinfo,
                    enquiryDetails: data.enqProjectinfo
                }))
                // Update state
                setFormData(prev => ({
                    ...prev,
                    projectNo: data.enqProjectinfo.projectNo,
                    estdeliveryDate: data.enqProjectinfo.estdate,
                    briefReceivedDate: data.enqProjectinfo.briefdate,
                    projectDescription: data.enqProjectinfo.projectDesc,
                    projectQuoteType: getOptionValue(formDataList.quoteType, data.enqProjectinfo.projectQuotetype),
                    year: getOptionValue(response.year, data.enqProjectinfo.year),
                    managementFeeType: data.enqProjectinfo.managementfeetypeId,
                    hybrid: getOptionValue(formDataList.hybird, data.enqProjectinfo.hybridModel),
                    projectAttribute: getOptionValue(response.projectAttribute, data.enqProjectinfo.attribute),
                    slaTemplate: data?.enqProjectinfo?.slaId,
                }));
                localStorage.setItem("enquiryID", data?.enqClientinfo?.enqUId);
            }
        } catch (error) {
            toast(Labels.status.failure, Labels.message.somethingWentWrong);
        } finally {
            setLoading(false);
        }
    };
    //}, []);


    const slaTemplate = async (sla) => {
        try {
            setLoading(true);
            const response = await PostApi(EnquiryDetails_API.GetSlatemplateMaster, { SlaId: sla, Enqid: id });
            setSlaTemplateData(response);
        } catch (error) {
            toast(Labels.status.failure, Labels.message.somethingWentWrong);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!slaTemplateData) return;
        const slaData = slaTemplateData;
        const initialPhases = [
            { name: getLabel("lbl54"), days: slaData?.defQuote, mdays: slaData?.quote },
            { name: getLabel("lbl55"), days: slaData?.defProof, mdays: slaData?.proof },
            { name: getLabel("lbl56"), days: slaData?.defProduction, mdays: slaData?.production },
            { name: getLabel("lbl57"), days: slaData?.defFileCopies, mdays: slaData?.fileCopies },
            { name: getLabel("lbl58"), days: slaData?.defInvoices, mdays: slaData?.invoicing }
        ];
        setPhaseDates(initialPhases);
        const startDate = formDataList?.enquiryDetails?.quotestartdate ? formDataList.enquiryDetails.quotestartdate : today;
        calculatePlanByQuote(startDate, initialPhases);
    }, [slaTemplateData]);

    const handleChange = (e) => {
        const { name, value, label } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: ""   // clear only that field error
        }));
        if (name === Labels.enquiryDetails.slaTemplate) {
            slaTemplate(value);
        }

    };

    const handleSubmit = async () => {
        const isValid = EnquiryDetailsValidation();
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
                    attribute: getOptionLabel(formDataList.projectAttribute, formData.projectAttribute),
                    year: getOptionLabel(formDataList.year, formData.year),
                    ...dynamicData
                });
                if (isSuccess(response)) {
                    setAllowRedirect(true);
                    toast(Labels.status.success, response.data.message);
                    setTimeout(() => {
                        navigate(labelRoutes.lineItems, {
                            state: { id: response.data.enqId }
                        });
                    }, 500);
                } else {
                    setErrors((prev) => ({
                        ...prev,
                        name: ""
                    }));
                    toast(Labels.status.failure, response.data.message);
                }

            } catch (error) {
                toast(Labels.status.failure, Labels.message.somethingWentWrong);
            } finally {
                setLoading(false);
            }
        } else {
            setAllowRedirect(false);
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
            //Labels.enquiryDetails.projectAttribute,
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

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(labelRoutes.clientInfo, {
                state: { id: id }
            });
        } else {
            navigate(labelRoutes.home); // fallback route
        }
    };

    const handleExitDraft = () => {
        setOpen(true);
    };

    //SLA Date Management Function
    const today = formatDate(new Date());
    const keys = ["quote", "proof", "production", "filecopies", "invoice"];
    const dynamicData = phaseDates.reduce((acc, item, i) => {
        const key = keys[i];
        acc[`${key}startdate`] = item.startDate;
        acc[`${key}enddate`] = item.endDate;
        acc[`modified${key.charAt(0).toUpperCase() + key.slice(1)}`] = item.mdays;
        return acc;
    }, {});

    const calculatePlanByQuote = (selectedDate, updatedPhases = null, startIndex = 0) => {
        setQuoteStartDate(selectedDate);
        let data = updatedPhases || phaseDates;
        let updated = [...data];
        let startDate = startIndex === 0 ? parseDate(selectedDate) : parseDate(updated[startIndex].startDate);
        // skip weekends
        while (startDate.getDay() === 0 || startDate.getDay() === 6) {
            startDate.setDate(startDate.getDate() + 1);
        }
        for (let i = startIndex; i < updated.length; i++) {
            if (i !== startIndex) {
                startDate = parseDate(updated[i - 1].endDate);
            }
            let tempStart = new Date(startDate);
            let endDate = new Date(tempStart);
            let mdays = updated[i].mdays ?? updated[i].days;
            let count = 0;
            while (count < mdays) {
                endDate.setDate(endDate.getDate() + 1);
                if (endDate.getDay() !== 0 && endDate.getDay() !== 6) {
                    count++;
                }
            }
            updated[i] = {
                ...updated[i],
                startDate: formatDate(tempStart),
                endDate: formatDate(endDate)
            };
            startDate = new Date(endDate);
        }
        setPhaseDates(updated);
    };

    const handleModifiedDays = (index, value) => {
        if (value === "") {
            const updated = [...phaseDates];
            updated[index] = { ...updated[index], mdays: "" };
            setPhaseDates(updated);
            return;
        }
        const num = Number(value);
        if (isNaN(num) || num <= 0) return;
        const updated = phaseDates.map((item, i) =>
            i === index ? { ...item, mdays: num } : item
        );
        setPhaseDates(updated);
        calculatePlanByQuote(updated[0]?.startDate || today, updated, index);
    };

    const handleStartDateChange = (index, selectedDate) => {
        let updated = [...phaseDates];
        if (index > 0 && parseDate(selectedDate) < parseDate(updated[index - 1].endDate)) return;
        updated[index] = { ...updated[index], startDate: selectedDate };
        setPhaseDates(updated);
        calculatePlanByQuote(updated[0]?.startDate || today, updated, index);
    };

    const clientInfo = getClientInfo({}, {}, {}, getLabel, getOptionLabel, formDataList.clientInfo);
    const enquiryDetails = getEnquiryDetails(formData, dynamicData, formDataList, getLabel, getOptionLabel, id ? formDataList.enquiryDetails : null);
    const sections = getSummarySections({ clientInfo, enquiryDetails, getLabel });
    return (
        <>
            <Box sx={{ px: 3, py: 3 }}>
                <PGrid container className={Labels.margin.mb4} >
                    <PStepper steps={enquirySteps} activeStep={1} allowRedirect={allowRedirect}></PStepper>
                </PGrid>
                <PGrid container className={Labels.margin.mb4} >
                    <PGrid item xs={12} sm={12} md={9}>
                        <PCard>
                            <PGrid container className={Labels.margin.mb4}>
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
                            <PGrid container className={Labels.margin.mb4}>
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
                                        minDate={today}
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
                                        maxDate={formData.estdeliveryDate}
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
                                {/* <PGrid item xs={12} sm={6} md={4}>
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
                                </PGrid> */}
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
                                <PGrid item md={2}>{getLabel("lbl140")}</PGrid>
                                <PGrid item md={3} >{getLabel("lbl52")}</PGrid>
                                <PGrid item md={3} >{getLabel("lbl53")}</PGrid>
                            </PGrid>
                            {phaseDates.map((phase, index) => (
                                <PGrid container className="mb-1 align-items-center" key={index}>

                                    <PGrid item md={2} className="mb-3">
                                        {phase.name}
                                    </PGrid>

                                    <PGrid item md={2} className="mb-3">
                                        {phase.days}
                                    </PGrid>

                                    <PGrid item md={2}>
                                        <PTextField
                                            value={phase.mdays ?? ""}
                                            onChange={(e) => handleModifiedDays(index, e.target.value)}
                                            width={50}
                                        />
                                    </PGrid>

                                    <PGrid item md={3}>
                                        <PDatepicker
                                            name={`${phase.name}_start`}
                                            width={100}
                                            value={phase.startDate || (index === 0 ? today : "")}

                                            minDate={
                                                index === 0
                                                    ? parseDate(today)
                                                    : parseDate(phaseDates[index - 1]?.endDate)
                                            }

                                            onChange={(e) => {
                                                const selectedDate = e?.target?.value
                                                    ? e.target.value
                                                    : formatDate(e);

                                                if (index === 0) {
                                                    calculatePlanByQuote(selectedDate, phaseDates, 0);
                                                } else {
                                                    handleStartDateChange(index, selectedDate);
                                                }
                                            }}
                                            allowFuture={true}
                                        />
                                    </PGrid>

                                    <PGrid item md={3}>
                                        <PTextField
                                            name={`${phase.name}_end`}
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
                        <PSummary sections={sections} currentStep={2} />
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