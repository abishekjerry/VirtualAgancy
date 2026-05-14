import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    Grid,
    Button,
    Divider,
    Avatar
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";
import EventIcon from "@mui/icons-material/Event";
import PGrid from "../../component/PGrid/PGrid";
import PCard from "../../component/PCard/PCard";
import PTypography from "../../component/PTypography/PTypography";
import { Labels } from "../../utils/constants/labels";
import { CommonColors } from "../../utils/constants/colors";
import { FontWeight } from "../../utils/constants/fonts";
import PButton from "../../component/PButton/PButton";
import { useLanguage } from "../../utils/constants/language";
import { useLocation, useNavigate } from "react-router-dom";
import PDropdown from "../../component/PDropdown/PDropdown";
import { getClientInfo, getEnquiryDetails, getLineneItems, getSummarySections } from "../../utils/constants/summary";
import { ClientInfo_API, Dashboard_API, EnquiryDetails_API, Suppliers_API } from "../../utils/api/apiUrl";
import { formatDate, getOptionLabel, isSuccess, parseDate, toast } from "../../utils/commonFunction/common";
import { PSummary } from "../../component/PSumary/PSummary";
import PTable from "../../component/PTable/PTable";
import { PostApi } from "../../utils/api/networking";
import PTextField from "../../component/PTextField/PTextField";
import PDatepicker from "../../component/PDatepicker/PDatepicker";
import PDialog from "../../component/PDialog/PDialog";
import PSearch from "../../component/PSearch/PSearch";

const ProjectEnquiry = () => {
    const { state } = useLocation();
    const { getLabel } = useLanguage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [quoteStartDate, setQuoteStartDate] = useState("");
    const [phaseDates, setPhaseDates] = useState([]);
    const [slaTemplateData, setSlaTemplateData] = useState(null);
    const [search, setSearch] = useState("");

    //Global variable
    const currency = localStorage.getItem("currency");
    const countryName = localStorage.getItem("country");
    const agancyUserID = parseInt(localStorage.getItem("agancyUserID"));
    const id = state?.id > 0 ? state.id : 0;

    //State & list states
    const [formData, setFormData] = useState({
        activeTab: "Job summary",
        status: "",
        sla: true,
        rfq: true,
        line: true,
        job: true,
        suppliers: false
    });
    const [formDataList, setFormDataList] = useState({
        clientInfo: [],
        lineItems: [],
        enquiryDetails: [],
        suppliers: [],
        clientContact: [],
        status: [{ label: "Job Cancelled", value: 1 }],
        data: [],
        tabs: ["Job summary", "Line items", "RFQ", "SLA", "Revised Quotes", "Logs"],
        columns: [{ field: "suppliername", header: "Supplier's Name" }, { field: "country", header: "Country" }, { field: "suppliercode", header: "Supplier Code" },],
        suppliersData: [],
        selectedRows: [],
        statusInfo: []
    });

    //Master function
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await PostApi(Dashboard_API.GetDetails, {
                Enquiryid: id,
            });
            const supplierResponse = await PostApi(Suppliers_API.GetEnqSupplierMaster, {
                currency: currency,
                Country: countryName
            });
            setFormDataList(prev => ({
                ...prev,
                lineItems: response.enqlineItems,
                clientInfo: response.enqClientinfo,
                enquiryDetails: response.enqProjectinfo,
                suppliers: response.supplierinfo,
                suppliersData: supplierResponse,
                statusInfo: [{ label: "Project Enquiry ID", value: response.enqClientinfo?.enqUId || "-" }, { label: "Project Number", value: response.enqProjectinfo?.projectNo || "-" }, { label: "Status", value: response.jobstatus || "-" }]
            }));
            slaTemplate(response.enqProjectinfo.slaId);
            clientInfoMaster(response.enqClientinfo.divisionid);
        } catch (error) {
            toast(Labels.status.failure, Labels.message.somethingWentWrong);
        } finally {
            setLoading(false);
        }
    };

    //Change Function
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
    };


    const columns = [
        { field: "suppliername", header: "Supplier" },
        {
            field: "initialQuote", header: "Ini.Quote ($)",
            ...(formData.rfq ? {}
                : {
                    render: (row) => (
                        <PTextField
                            name={"initialQuote"}
                            value={row.initialQuote || ""}
                            onChange={(e) => handleInputChange(e.target.value, row.id)}
                            width={50}
                        />
                    )
                })
        },
        {
            field: "negQuote", header: "Neg.Quote ($)",
            ...(formData.rfq ? {}
                : {
                    render: (row) => (
                        <PTextField
                            name={"negQuote"}
                            value={row.initialQuote || ""}
                            onChange={(e) => handleInputChange(e.target.value, row.id)}
                            width={50}
                        />
                    )
                })
        },
        {
            field: "negUnitPrice", header: "Neg.unit Price ($)"
            // field: "negUnitPrice", header: "Neg.unit Price ($)",
            // render: (row) => (
            //     <PTextField
            //         name={"negUnitPrice"}
            //         value={row.initialQuote || ""}
            //         onChange={(e) => handleInputChange(e.target.value, row.id)}
            //         width={50}
            //     />
            // ),
        },
        { field: "negUnitPriceFee", header: "Neg.unit Price with MFee ($)" },
        { field: "pmgSellPrice", header: "PMG Sell Price ($)" },
    ]

    const quotes = [
        { field: "enquiryId", header: "Supplier" },
        { field: "enquiryId", header: "Supplier Price ($)" },
        { field: "enquiryId", header: "Date/Time Log" },
    ]

    const logs = [
        { field: "enquiryId", header: "Modified Date" },
        { field: "enquiryId", header: "User ID" },
        { field: "enquiryId", header: "Field" },
        { field: "enquiryId", header: "Old Value" },
        { field: "enquiryId", header: "New Value" },
        { field: "enquiryId", header: "Item Number" },
    ]

    const clientInfo = getClientInfo({}, {}, {}, getLabel, getOptionLabel, formDataList.clientInfo);
    const enquiryDetails = getEnquiryDetails({}, {}, {}, getLabel, getOptionLabel, formDataList.enquiryDetails, true);
    const rawLineItems = getLineneItems({}, formDataList, getLabel, getOptionLabel, formDataList.lineItems);
    const lineItems = rawLineItems.map((item, index) => ({
        subTitle: `${item.itemTitle}`,
        enquiryId: item.enquiryId,
        items: item.items,
    }));
    const sections = getSummarySections({ lineItems, getLabel });

    //SLA Template function
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
    
    const today = formatDate(new Date())
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



    //Edit & cancel section function
    const handleEdit = (e, flag) => {
        setFormData(prev => ({
            ...prev,
            [flag]: false,
        }));
    };
    const handleCancel = async (e, flag) => {
        setFormData(prev => ({
            ...prev,
            [flag]: true,
        }));
    }

    const clientInfoMaster = async (globalBUMapping) => {
        try {
            setLoading(true);
            const response = await PostApi(ClientInfo_API.ClientInfoMaster, {
                Divisionid: globalBUMapping
            });

            setFormDataList(prev => ({
                ...prev,
                clientContact: response.client,
            }));

        } catch (error) {
            console.log(error);
            toast(Labels.status.failure, Labels.message.somethingWentWrong);
        } finally {
            setLoading(false);
        }
    };

    //RFQ Section
    useEffect(() => {
        if (formDataList.suppliers?.length) {
            setFormDataList(prev => ({
                ...prev,
                selectedRows: formDataList.suppliers.map(item => ({
                    supplierId: item.supplierID
                }))
            }));
        }
    }, [formDataList.suppliers]);

    const handleValidationChange = (rows) => {
        const isValid = rows.length > 0;
        setFormDataList(prev => ({
            ...prev,
            selectedRows: rows,
        }));
    };

    let filteredData = formDataList.suppliersData;
    if (search.trim() !== "") {
        filteredData = filteredData.filter((item) =>
            item.suppliername.toLowerCase().includes(search.toLowerCase())
        );
    }
    const data = filteredData;

    const handleSendChoose = async () => {
        const rows = formDataList.selectedRows || [];
        const supplierIds = rows.map(r => r.supplierId).join(",");
        try {
            setLoading(true);
            const payload = {
                EnqId: id,
                SelectedSuppliers: supplierIds,
                ModifiedBy: agancyUserID,
            };
            const response = await PostApi(Suppliers_API.AddUpdateSuppliers, payload);
            if (isSuccess(response)) {
                toast(Labels.status.success, response.data.message);
                setFormData(prev => ({
                    ...prev,
                    suppliers: false,
                }));
            } else {
                toast(Labels.status.failure, response.data.message);
            }
        } catch (error) {
            toast(Labels.status.failure, Labels.message.somethingWentWrong);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box sx={{ px: 1, py: 1 }}>

                <PGrid container className="d-flex align-items-center justify-content-between mb-3">
                    <PGrid item xs={12} md={6} sm={8}>
                        {formDataList.statusInfo.map((item, i) => (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }} key={i}>
                                <PTypography
                                    labelText={`${item.label} :`}
                                    weight={FontWeight.bold}
                                    color={CommonColors.yellow.dark}
                                    flag={Labels.fontFlags.header}
                                />

                                <PTypography
                                    labelText={`${item.value}`}
                                    weight={FontWeight.bold}
                                    color={CommonColors.grey.main}
                                    flag={Labels.fontFlags.subHeader}
                                />
                            </Box>
                        ))}
                    </PGrid>
                    <PGrid item xs={12} sm={6} md={4} className="d-flex justify-content-end gap-2" >
                        <PDropdown
                            name={"status"}
                            value={formData.status}
                            label={"Project status"}
                            onChange={handleChange}
                            options={formDataList.status}
                            width={100}
                            helperText={""}
                        />
                        <PButton
                            label={getLabel("lbl40")}
                            variant="contained"
                            color={CommonColors.green.main}
                            //onClick={(e) => handleSubmit(e, true)}
                            width={150}
                            height={45}
                        />
                    </PGrid>
                </PGrid>

                <PGrid container className={Labels.margin.mb1}>
                    <PGrid item xs={12} sm={6} md={12}>
                        <Box sx={{ background: "#e6f7ed", borderRadius: 2, p: 0, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                            {formDataList.tabs.map((tab, i) => (
                                <PGrid item xs={12} sm={6} md={2} key={i}>
                                    <span className={`d-block text-center p-2 ${formData.activeTab === tab ? "fw-bold text-primary" : "text-muted"}`}
                                        style={{ cursor: "pointer" }} onClick={() =>
                                            setFormData(prev => ({
                                                ...prev,
                                                activeTab: tab
                                            }))
                                        }>
                                        {tab}
                                    </span>
                                </PGrid>
                            ))}
                        </Box>
                    </PGrid>
                </PGrid>

                {formData.activeTab === "Job summary" && (
                    <PCard className={Labels.margin.mb3}>
                        <PGrid container className="d-flex align-items-center justify-content-between mb-3">
                            <PGrid item xs={12} sm={6} md={6}>
                                <PTypography
                                    labelText={"Job summary"}
                                    flag={Labels.fontFlags.subHeader}
                                    color={CommonColors.blue.main}
                                    weight={FontWeight.bold}
                                />
                            </PGrid>
                            <PGrid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className="d-flex justify-content-end gap-2"
                            >
                                {formData.job ? (
                                    <PButton
                                        label={"Edit"}
                                        variant="contained"
                                        color={CommonColors.grey.main}
                                        onClick={(e) => handleEdit(e, "job")}
                                        width={120}
                                    />
                                ) : (
                                    <>
                                        <PButton
                                            label={"Cancel"}
                                            variant="outlined"
                                            color={CommonColors.blue.main}
                                            onClick={(e) => handleCancel(e, "job")}
                                            width={120}
                                        />
                                        <PButton
                                            label={"Save"}
                                            variant="contained"
                                            color={CommonColors.green.main}
                                            onClick={(e) => handleEdit(e, "job")}
                                            width={120}
                                        />
                                    </>
                                )}
                            </PGrid>
                        </PGrid>
                        <Divider sx={{ mb: 2 }} />
                        <PGrid container className={Labels.margin.mb3}>
                            {clientInfo.map((item, i) => (
                                <PGrid item xs={12} md={6} xl={3} key={i}>
                                    {
                                        !formData.job && item.label === getLabel("lbl35") ? (
                                            <PDropdown
                                                name={Labels.clientInfo.clientContact}
                                                label={item.label}
                                                value={formDataList.clientInfo.clientContactId}
                                                onChange={(e) => handleChange(e, item)}
                                                options={formDataList.clientContact}
                                                width={100}
                                            />
                                        ) : (
                                            <PGrid className={`ps-2 mb-4`}>
                                                <PTypography
                                                    labelText={item.label}
                                                    weight={FontWeight.bold}
                                                />
                                                <PTypography
                                                    labelText={item.value}
                                                    color={CommonColors.grey.main}
                                                    weight={FontWeight.bold}
                                                />
                                            </PGrid>
                                        )
                                    }
                                </PGrid>
                            ))}
                        </PGrid>
                        <PGrid container className={Labels.margin.mb3}>
                            {enquiryDetails.map((item, i) => (
                                <PGrid item xs={12} md={6} xl={3} key={i}>
                                    {
                                        !formData.job && item.label === getLabel("lbl42") ? (
                                            <PTextField
                                                name={Labels.enquiryDetails.projectNo}
                                                label={item.label}
                                                value={item.value}
                                                onChange={(e) => handleChange(e, item)}
                                            />

                                        ) : !formData.job && (item.label === getLabel("lbl43") || item.label === getLabel("lbl44")) ? (
                                            <PDatepicker
                                                name={getLabel("lbl43") ? Labels.enquiryDetails.estdeliveryDate : Labels.enquiryDetails.briefReceivedDate}
                                                label={`${item.label}`}
                                                value={item.value}
                                                onChange={(e) => handleChange(e, item)}
                                                //helperText={getLabel("lbl43") ? errors?.estdeliveryDate : errors.briefReceivedDate}
                                                width={100}
                                                allowFuture={true}
                                            />
                                        ) : !formData.job && item.label === getLabel("lbl45") ? (
                                            <PTextField
                                                name={Labels.enquiryDetails.projectDescription}
                                                label={item.label}
                                                value={item.value}
                                                onChange={handleChange}
                                                //helperText={errors?.projectDescription}
                                                multiline={true}
                                                rows={2.0}
                                                width={100}
                                            />
                                        ) : (

                                            <PGrid className={`ps-2 mt-4`}>
                                                <PTypography
                                                    labelText={item.label}
                                                    weight={FontWeight.bold}
                                                />
                                                <PTypography
                                                    labelText={item.value}
                                                    color={CommonColors.grey.main}
                                                    weight={FontWeight.bold}
                                                />
                                            </PGrid>
                                        )}
                                </PGrid>
                            ))}
                        </PGrid>
                    </PCard>
                )}
                {formData.activeTab === "Line items" && (
                    <PCard >
                        <PGrid container className={Labels.margin.mb3}>
                            <PGrid item xs={12} sm={6} md={6}>
                                <PTypography
                                    labelText={"Line Items"}
                                    flag={Labels.fontFlags.subHeader}
                                    color={CommonColors.blue.main}
                                    weight={FontWeight.bold}
                                />
                            </PGrid>
                        </PGrid>
                        <Divider sx={{ mb: 2 }} />
                        <PGrid container className={`${Labels.margin.mb3} ${"p-2"}`}>
                            <PGrid item xs={12} sm={12} md={12}>
                                <PSummary sections={sections} currentStep={3} refreshSummary={fetchData} />
                            </PGrid>
                        </PGrid>

                        <PGrid container className={Labels.margin.mb3}>
                            <PGrid item xs={12} sm={6} md={6}>
                                <PTypography
                                    labelText={"Management Fee"}
                                    flag={Labels.fontFlags.subHeader}
                                    color={CommonColors.blue.main}
                                    weight={FontWeight.bold}
                                />
                            </PGrid>
                            <PGrid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className="d-flex justify-content-end gap-2"
                            >
                                {formData.line ? (
                                    <PButton
                                        label={"Edit"}
                                        variant="contained"
                                        color={CommonColors.grey.main}
                                        onClick={(e) => handleEdit(e, "line")}
                                        width={120}
                                    />
                                ) : (
                                    <>
                                        <PButton
                                            label={"Cancel"}
                                            variant="outlined"
                                            color={CommonColors.blue.main}
                                            onClick={(e) => handleCancel(e, "line")}
                                            width={120}
                                        />
                                        <PButton
                                            label={"Save"}
                                            variant="contained"
                                            color={CommonColors.green.main}
                                            onClick={(e) => handleEdit(e, "line")}
                                            width={120}
                                        />
                                    </>
                                )}
                            </PGrid>
                        </PGrid>
                        <Divider sx={{ mb: 2 }} />
                        <PGrid container className={Labels.margin.mb3}>
                            <PGrid item xs={12} md={12} xl={12} >
                                <PGrid className={`ps-2 mb-4`}>
                                    <PTypography
                                        labelText={"Management Fee (%)"}
                                        weight={FontWeight.bold}
                                    />
                                    {formData.line ? (
                                        <PTypography
                                            labelText={"9.00"}
                                            color={CommonColors.grey.main}
                                            weight={FontWeight.bold}
                                        />) : (
                                        <PTextField
                                            value={""}
                                            onChange={handleChange}
                                            width={20}
                                        />
                                    )}
                                </PGrid>
                            </PGrid>
                        </PGrid>

                    </PCard>
                )}
                {formData.activeTab === "RFQ" && (
                    <PCard className={Labels.margin.mb3}>
                        <PGrid container className={Labels.margin.mb1}>
                            <PGrid item xs={12} sm={6} md={6}>
                                <PTypography
                                    labelText={"Request For Quote (RFQ)"}
                                    flag={Labels.fontFlags.subHeader}
                                    color={CommonColors.blue.main}
                                    weight={FontWeight.bold}
                                />
                            </PGrid>
                        </PGrid>
                        <PGrid container className="d-flex align-items-center justify-content-between mb-3">
                            <PGrid item xs={12} sm={6} md={6}>
                                <PTypography
                                    labelText={"Step 1. Request Quote From Suppliers"}
                                    flag={Labels.fontFlags.subHeader}
                                    color={CommonColors.black.main}
                                    weight={FontWeight.bold}
                                />
                                <PTypography
                                    labelText={"Indicate your preferred supplier for each item."}
                                    flag={Labels.fontFlags.smallText}
                                    color={CommonColors.grey.main}
                                    weight={FontWeight.bold}
                                />
                            </PGrid>
                            <PGrid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className="d-flex justify-content-end gap-2"
                            >
                                {formData.rfq ? (
                                    <PButton
                                        label={"Edit"}
                                        variant="contained"
                                        color={CommonColors.grey.main}
                                        onClick={(e) => handleEdit(e, "rfq")}
                                        width={120}
                                    />
                                ) : (
                                    <>
                                        <PButton
                                            label={"Cancel"}
                                            variant="outlined"
                                            color={CommonColors.blue.main}
                                            onClick={(e) => handleCancel(e, "rfq")}
                                            width={120}
                                        />
                                        <PButton
                                            label={"Save"}
                                            variant="contained"
                                            color={CommonColors.green.main}
                                            onClick={(e) => handleEdit(e, "rfq")}
                                            width={120}
                                        />
                                    </>
                                )}
                            </PGrid>
                        </PGrid>
                        <Divider sx={{ mb: 2 }} />
                        <PGrid container className={Labels.margin.mb4}>
                            <PGrid item xs={12} sm={6} md={12}>
                                <PTable columns={columns} rows={formDataList.suppliers} showCheckbox={true} />
                            </PGrid>
                        </PGrid>
                        <PGrid container className={Labels.margin.mb4}>
                            <PGrid item xs={12} sm={6} md={12}>
                                <PButton
                                    label={"Add Supplier"}
                                    variant="contained"
                                    color={CommonColors.grey.main}
                                    onClick={() => setFormData((prev) => ({
                                        ...prev,
                                        suppliers: true
                                    }))}
                                    width={200}
                                />
                            </PGrid>
                        </PGrid>
                    </PCard>
                )}

                {formData.activeTab === "SLA" && (

                    <Box sx={{ px: 2, py: 2 }}>
                        <PGrid container className={Labels.margin.mb3}>
                            <PGrid item xs={12} sm={6} md={6}>
                                <PTypography
                                    labelText={"Service Level Agreement"}
                                    flag={Labels.fontFlags.subHeader}
                                    color={CommonColors.blue.main}
                                    weight={FontWeight.bold}
                                />
                            </PGrid>
                            <PGrid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className="d-flex justify-content-end gap-2"
                            >
                                {formData.sla ? (
                                    <PButton
                                        label={"Edit"}
                                        variant="contained"
                                        color={CommonColors.grey.main}
                                        onClick={(e) => handleEdit(e, "sla")}
                                        width={120}
                                    />
                                ) : (
                                    <>
                                        <PButton
                                            label={"Cancel"}
                                            variant="outlined"
                                            color={CommonColors.blue.main}
                                            onClick={(e) => handleCancel(e, "sla")}
                                            width={120}
                                        />
                                        <PButton
                                            label={"Save"}
                                            variant="contained"
                                            color={CommonColors.green.main}
                                            onClick={(e) => handleEdit(e, "sla")}
                                            width={120}
                                        />
                                    </>
                                )}
                            </PGrid>
                        </PGrid>
                        <Divider sx={{ mb: 2 }} />
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
                                        disabled={formData.sla}
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
                                        disabled={formData.sla}
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
                    </Box>
                )}
                {formData.activeTab === "Revised Quotes" && (
                    <PCard className={Labels.margin.mb3}>
                        <PGrid container className={Labels.margin.mb4}>
                            <PTypography
                                labelText={"Revised Quotes"}
                                flag={Labels.fontFlags.subHeader}
                                color={CommonColors.blue.main}
                                weight={FontWeight.bold}
                            />
                        </PGrid>
                        <Divider sx={{ mb: 2 }} />
                        <PGrid container className={Labels.margin.mb4}>
                            <PGrid item xs={12} sm={6} md={12}>
                                <PTable columns={quotes} rows={formDataList.data} />
                            </PGrid>
                        </PGrid>
                    </PCard>
                )}
                {formData.activeTab === "Logs" && (
                    <PCard className={Labels.margin.mb3}>
                        <PGrid container className={Labels.margin.mb4}>
                            <PTypography
                                labelText={"Line Items Logs"}
                                flag={Labels.fontFlags.subHeader}
                                color={CommonColors.blue.main}
                                weight={FontWeight.bold}
                            />
                        </PGrid>
                        <Divider sx={{ mb: 2 }} />
                        <PGrid container className={Labels.margin.mb4}>
                            <PGrid item xs={12} sm={6} md={12}>
                                <PTable columns={logs} rows={formDataList.data} />
                            </PGrid>
                        </PGrid>

                        <PGrid container className={Labels.margin.mb4}>
                            <PTypography
                                labelText={"History Logs"}
                                flag={Labels.fontFlags.subHeader}
                                color={CommonColors.blue.main}
                                weight={FontWeight.bold}
                            />
                        </PGrid>
                        <Divider sx={{ mb: 2 }} />
                        <PGrid container className={Labels.margin.mb4}>
                            <PGrid item xs={12} sm={6} md={12}>
                                <PTable columns={logs} rows={formDataList.data} />
                            </PGrid>
                        </PGrid>
                    </PCard>
                )}
            </Box >

            <PDialog
                open={formData.suppliers}
                onClose={() => setFormData((prev) => ({
                    ...prev,
                    suppliers: false
                }))}
                title={"Suppliers"}
                showCloseIcon={true}
                maxWidth="md"
                actions={
                    < PGrid className="d-flex align-items-center justify-content-end gap-2" >
                        <PButton
                            fullWidth
                            label={getLabel("lbl125")}
                            variant="outlined"
                            onClick={() => setFormData((prev) => ({
                                ...prev,
                                suppliers: false
                            }))}
                            color={CommonColors.grey.main}
                            width={120}
                        />
                        <PButton
                            fullWidth
                            label={getLabel("lbl124")}
                            variant={Labels.contained}
                            onClick={handleSendChoose}
                            color={CommonColors.green.main}
                            width={120}
                        />
                    </PGrid >
                }

            >
                <PGrid container className={Labels.margin.mb4}>
                    <PGrid item xs={12} sm={6} md={6}>
                        <PSearch width="100%" placeholder={"Search a Suplier Name"} onChange={(e) => setSearch(e.target.value)} />
                    </PGrid>
                </PGrid>
                <PGrid item xs={12} sm={6} md={12}>
                    <PTable columns={formDataList.columns} rows={data} showCheckbox={true} selectedRows={formDataList.selectedRows} onValidationChange={handleValidationChange} />
                </PGrid>
            </PDialog>
        </>

    );
};

export default ProjectEnquiry;