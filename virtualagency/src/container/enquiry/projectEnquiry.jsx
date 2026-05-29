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
import { formatDate, getOptionLabel, isNotEmpty, isSuccess, parseDate, toast } from "../../utils/commonFunction/common";
import { PSummary } from "../../component/PSumary/PSummary";
import PTable from "../../component/PTable/PTable";
import { PostApi } from "../../utils/api/networking";
import PTextField from "../../component/PTextField/PTextField";
import PDatepicker from "../../component/PDatepicker/PDatepicker";
import PDialog from "../../component/PDialog/PDialog";
import PSearch from "../../component/PSearch/PSearch";
import { PiArrowSquareUpLeftLight } from "react-icons/pi";

const ProjectEnquiry = () => {
    const { state } = useLocation();
    const { getLabel } = useLanguage();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [quoteStartDate, setQuoteStartDate] = useState("");
    const [phaseDates, setPhaseDates] = useState([]);
    const [slaTemplateData, setSlaTemplateData] = useState(null);
    const [supplierRows, setSupplierRows] = useState([]);

    //Global variable
    const currency = localStorage.getItem("currency");
    const countryName = localStorage.getItem("country");
    const agancyUserID = parseInt(localStorage.getItem("agancyUserID"));
    const userID = parseInt(localStorage.getItem("userID"))
    const userName = localStorage.getItem("user")
    const id = state?.id > 0 ? state.id : 0;
    const actionFlag = isNotEmpty(state?.id) && state?.id !== 0 ? Labels.flag.Update : Labels.flag.Insert;
    //State & list states
    const [formData, setFormData] = useState({
        activeTab: "Job summary",
        status: "",
        sla: false,
        rfq: false,
        line: false,
        job: false,
        suppliers: false,
        calculateFlag: false,
        validateFlag: false,
        marginFlag: false,
        isCalculate: true,
        quote: "",
        search: "",

        //editable state
        clientContact: "",
        projectNo: "",
        estdeliveryDate: "",
        briefReceivedDate: "",
        projectDescription: ""
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
        supplierMaster: [],
        selectedRows: [],
        statusInfo: [],
        calculateRows: [{ field: "cost", header: "Cost ($)" }, { field: "sell", header: "Sell ($)" }, { field: "margin", header: "Margin ($)" }, { field: "markupPercent", header: "Markup (%)" }, { field: "marginPercent", header: "Margin (%)" }],
        calculateSupplierRows: [{ field: "cost", header: "Supplier Name" }, { field: "sell", header: "Item Name" }, { field: "margin", header: "Margin ($)" }, { field: "markup", header: "Supplier type" }, { field: "margin", header: "SMETA accredited" }
            , { field: "margin", header: "GMP accredited" }, { field: "markup", header: "Nature of supplier" },
        ],
        selectedSupplierRows: [],
        extraInfo: [],
        calculateRowsData: []
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
                supplierMaster: supplierResponse,
                statusInfo: [{ label: "Enquiry ID", value: response.enqClientinfo?.enqUId || "-" }, { label: "Project Number", value: response.enqProjectinfo?.projectNo || "-" }],
                extraInfo: [
                    { label: "Created Date", value: response.enqProjectinfo?.estdate || "-" },
                    { label: getLabel("lbl10"), value: userName || "-" },
                    { label: "Enquiry Id", value: response.enqClientinfo?.enqUId || "-" }
                ]
            }));
            setFormData(prev => ({
                ...prev,
                quote: response.enqProjectinfo?.quoteBy
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
    };

    const quotes = [
        { field: "suppliername", header: "Supplier" },
        { field: "enquiry", header: "Supplier Price ($)" },
        { field: "enquiry", header: "Date/Time Log" },
    ]

    const historyLogs = [
        { field: "enquiryId", header: "Modified Date" },
        { field: "enquiryId", header: "User ID" },
        { field: "enquiryId", header: "Field" },
        { field: "enquiryId", header: "Old Value" },
        { field: "enquiryId", header: "New Value" },
        { field: "enquiryId", header: "Item Number" },
    ]

    const lineItemslogs = [
        { field: "enquiryId", header: "Modified Date" },
        { field: "enquiryId", header: "User ID" },
        { field: "enquiryId", header: "Field" },
        { field: "enquiryId", header: "Old Value" },
        { field: "enquiryId", header: "New Value" },
    ]


    const clientInfo = getClientInfo({}, {}, {}, getLabel, getOptionLabel, formDataList.clientInfo, formDataList.extraInfo);
    const enquiryDetails = getEnquiryDetails({}, {}, {}, getLabel, getOptionLabel, formDataList.enquiryDetails, false);
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

    const today = formatDate(new Date())
    const keys = ["quote", "proof", "production", "filecopies", "invoice"];
    const dynamicData = phaseDates.reduce((acc, item, i) => {
        const key = keys[i];
        acc[`${key}startdate`] = item.startDate;
        acc[`${key}enddate`] = item.endDate;
        acc[`modified${key.charAt(0).toUpperCase() + key.slice(1)}`] = item.mdays;
        return acc;
    }, {});

    //Edit & cancel section function
    const handleEdit = (e, flag) => {
        setFormData(prev => ({
            ...prev,
            [flag]: true,
            validateFlag: flag == "rfq" ? true : false
        }));
    };
    const handleCancel = async (e, flag) => {
        setFormData(prev => ({
            ...prev,
            [flag]: false,
            calculateFlag: flag == "rfq" ? true : false
        }));
    }
    const handleCalculate = async (e, flag) => {
        setFormData(prev => ({
            ...prev,
            marginFlag: true
        }));
        calculateValues(formDataList.selectedSupplierRows);
    }

    const calculateValues = (rows) => {
        const cost = rows.reduce((a, b) => a + Number(b.negQuote || 0), 0).toFixed(2);
        const sell = rows.reduce((a, b) => a + Number(b.pmgSellPrice || 0), 0).toFixed(2);
        const margin = (Number(sell) - Number(cost)).toFixed(2);
        setFormDataList(prev => ({
            ...prev,
            calculateRowsData: [{
                cost: cost,
                sell: sell,
                margin: margin,
                markupPercent: ((margin / cost) * 100).toFixed(2),
                marginPercent: ((margin / sell) * 100).toFixed(2)
            }]
        }));
    };


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

    const handleRFQ = (rows) => {
        const isValid = rows.length > 0;
        setFormDataList(prev => ({
            ...prev,
            selectedSupplierRows: rows,
        }));
        setFormData(prev => ({
            ...prev,
            isCalculate: isValid === true ? false : true
        }))
    };

    let filteredData = formDataList.supplierMaster;
    if (formData.search.trim() !== "") {
        filteredData = filteredData.filter((item) =>
            item.suppliername.toLowerCase().includes(formData.search.toLowerCase())
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

    const renderEditableField = (field) => ({
        render: (row) => (
            <PTextField
                name={field}
                value={row[field] || ""}
                onChange={(e) => handleInputChange(e.target.value.replace(/[^0-9.]/g, ""), row.rowId, row.enquiryId, field)}
                width={90}
            />
        )
    });
    useEffect(() => {
        if (supplierRows.length === 0) {
            let count = 0;
            const group = rawLineItems.flatMap((item) =>
                formDataList.suppliers.map((s, index) => ({
                    ...s,
                    groupName: item.itemTitle,
                    enquiryId: item.enquiryId,
                    rowId: index + 1
                }))
            );
            setSupplierRows(group);
        }
    }, [formDataList.suppliers]);

    const handleInputChange = (value, rowId, enquiryId, field) => {
        setSupplierRows(prev => {
            const update = prev.map(item => item.rowId === rowId && item.enquiryId === enquiryId &&
                !((field === "negQuote" && +value >= +item.initialQuote) || (field === "negUnitPrice" && +value >= +item.iniUnitPrice) || +value < 0)
                ? { ...item, [field]: value } : item);
            setFormData(form => ({
                ...form,
                validateFlag: !update.every(x => x.initialQuote || x.iniUnitPrice)
            }));
            return update;
        });
    };

    const suppliers = rawLineItems.map((item) => ({
        isSubTitle: true,
        subTitle: `${item.itemTitle}`,
        items: supplierRows.filter(s => s.groupName === item.itemTitle)
    }));
    const isQuote = formData.quote == 1 && formData.rfq;
    const isUnit = formData.quote == 2 && formData.rfq;

    const rfqSupplier = [
        { field: "suppliername", header: "Supplier" },
        {
            field: "initialQuote",
            header: "Ini.Quote ($)",
            ...(isQuote && renderEditableField("initialQuote"))
        },
        {
            field: "negQuote",
            header: "Neg.Quote ($)",
            ...(isQuote && renderEditableField("negQuote"))
        },
        {
            field: "iniUnitPrice",
            header: "Ini.unit Price ($)",
            ...(isUnit && renderEditableField("iniUnitPrice"))
        },
        {
            field: "negUnitPrice",
            header: "Neg.unit Price ($)",
            ...(isUnit && renderEditableField("negUnitPrice"))
        },
        { field: "negUnitPriceFee", header: "Neg.unit Price with MFee ($)" },
        { field: "pmgSellPrice", header: "PMG Sell Price ($)", rowSpan: true }
    ];

    //Action button function
    const renderActionButtons = (flag) => (
        formData[flag] ? (
            <>
                <PButton
                    label={getLabel("lbl125")}
                    variant="outlined"
                    color={CommonColors.blue.main}
                    onClick={() => handleCancel(null, flag)}
                    width={120}
                />

                <PButton
                    label={getLabel("lbl124")}
                    variant="contained"
                    color={CommonColors.green.main}
                    onClick={() => handleSubmit(null, flag)}
                    width={120}
                    disabled={formData.validateFlag}
                />
            </>

        ) : (
            <PButton
                label="Edit"
                variant="contained"
                color={CommonColors.grey.main}
                onClick={() => handleEdit(null, flag)}
                width={120}
            />
        )
    );

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            ...(formDataList.clientInfo?.clientContactId && {
                clientContact: formDataList.clientInfo.clientContactId
            }),
            ...(formDataList.enquiryDetails?.projectNo && {
                projectNo: formDataList.enquiryDetails.projectNo
            }),
            ...(formDataList.enquiryDetails?.projectDesc && {
                projectDescription: formDataList.enquiryDetails.projectDesc
            }),
            ...(formDataList.enquiryDetails?.estdate && {
                estdeliveryDate: formDataList.enquiryDetails.estdate
            }),
            ...(formDataList.enquiryDetails?.briefdate && {
                briefReceivedDate: formDataList.enquiryDetails.briefdate
            }),
        }));
    }, [formDataList.clientInfo, formDataList.enquiryDetails]);


    const handleSubmit = async (e, flag) => {
        let activeTab = "";
        let requests = [];
        const clientInfo = {
            enqId: id,
            divisionid: formDataList.clientInfo.divisionid,
            clientContactId: formData.clientContact,
            createdBy: userID,
            modifiedBy: agancyUserID,
            brand: formDataList.clientInfo.brand,
            deliveryCountryId: formDataList.clientInfo.deliveryCountryId,
            pMGEntity: formDataList.clientInfo.pmgEntity,
            aboveorAtmarket: formDataList.clientInfo.aboveorAtmarket,
            Action: actionFlag,
        };
        const enquiryDetails = {
            enqId: id,
            projectNo: flag === "job" ? formData.projectNo : formDataList.enquiryDetails.projectNo,
            projectDesc: flag === "job" ? formData.projectDescription : formDataList.enquiryDetails.projectDesc,
            estdate: flag === "job" ? formatDate(parseDate(formData.estdeliveryDate)) : formDataList.enquiryDetails.estdate,
            briefdate: flag === "job" ? formatDate(parseDate(formData.briefReceivedDate)) : formDataList.enquiryDetails.briefdate,
            modifiedBy: agancyUserID,
            quoteBy: formDataList.enquiryDetails.quoteBy,
            slaId: formDataList.enquiryDetails.slaId,
            managementfeetypeId: formDataList.enquiryDetails.managementfeetypeId,
            hybridModel: formDataList.enquiryDetails.hybridModel,
            attribute: formDataList.enquiryDetails.attribute,
            year: formDataList.enquiryDetails.year,
            ...dynamicData
        };
        if (flag === "sla") {
            activeTab = "SLA";
            requests.push(PostApi(EnquiryDetails_API.AddUpdateEnquiryDetails, enquiryDetails));
        }
        if (flag === "job") {
            activeTab = "Job summary";
            requests.push(PostApi(ClientInfo_API.AddUpdateClientInfo, clientInfo),
                PostApi(EnquiryDetails_API.AddUpdateEnquiryDetails, enquiryDetails));
        }
        if (flag === "rfq") {
            activeTab = "RFQ";
            setSupplierRows(prev => prev.map(item => {
                const iniUnitPrice = (+item.iniUnitPrice || (+item.initialQuote || 0) / 5);
                const negUnitPrice = (+item.negUnitPrice || (+item.negQuote || 0) / 5);
                return {
                    ...item,
                    iniUnitPrice: iniUnitPrice.toFixed(2),
                    negUnitPrice: negUnitPrice.toFixed(2),
                    initialQuote: (iniUnitPrice * 5).toFixed(2),
                    negQuote: (negUnitPrice * 5).toFixed(2),
                    negUnitPriceFee: (negUnitPrice + 0.01).toFixed(2),
                    pmgSellPrice: ((negUnitPrice + 0.01) * 5).toFixed(2)
                };
            })
            );
            handleCancel(null, flag)
            fetchData();
        }
        if (flag === "sla" || flag === "job") {
            try {
                setLoading(true);
                const response = await Promise.all(requests);
                const successCount = response.filter(item => item?.status === true).length;
                const message = successCount > 1 ? Labels.message.updatedSuccessfully : response?.[0]?.data?.message;
                const status = successCount === response.length ? Labels.status.success : Labels.status.failure;
                toast(status, message);
                setFormData(prev => ({
                    ...prev,
                    activeTab,
                }))
                handleCancel(null, flag)
                fetchData();
            } catch (error) {
                toast(Labels.status.failure, Labels.message.somethingWentWrong);
            } finally {
                setLoading(false);
            }
        }

    };

    return (
        <>
            <Box sx={{ px: 1, py: 1 }}>
                <PGrid container className={Labels.margin.mb1}>
                    <PGrid item xs={12} md={12} sm={12}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, flexWrap: "wrap", p: 2 }}>
                            {formDataList.statusInfo.map((item, i) => (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }} key={i}>
                                    <PTypography
                                        labelText={`${item.label} :`}
                                        weight={FontWeight.bold}
                                        color={CommonColors.blue.main}
                                        flag={Labels.fontFlags.header}
                                    />
                                    <PTypography
                                        labelText={`${item.value}`}
                                        weight={FontWeight.bold}
                                        color={CommonColors.black.main}
                                        flag={Labels.fontFlags.subHeader}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </PGrid>
                </PGrid>

                <PGrid container className={Labels.margin.mb3}>
                    <PGrid item xs={12} md={12} sm={12}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, flexWrap: "wrap"}}>
                            <PDropdown
                                name={"status"}
                                value={formData.status}
                                label={"Project status"}
                                onChange={handleChange}
                                options={formDataList.status}
                                width={27}
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
                        </Box>
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
                            <PGrid item xs={12} sm={6} md={6} className="d-flex justify-content-end gap-2">
                                {renderActionButtons("job")}
                            </PGrid>
                        </PGrid>
                        <Divider sx={{ mb: 2 }} />
                        <PGrid container className={Labels.margin.mb3}>
                            {clientInfo.map((item, i) => (
                                <PGrid item xs={12} md={6} xl={3} key={i}>
                                    {
                                        formData.job && item.label === getLabel("lbl35") ? (
                                            <PDropdown
                                                name={Labels.clientInfo.clientContact}
                                                label={item.label}
                                                value={formData.clientContact}
                                                onChange={(e) => handleChange(e)}
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
                                        formData.job && item.label === getLabel("lbl42") ? (
                                            <PTextField
                                                name={Labels.enquiryDetails.projectNo}
                                                label={item.label}
                                                value={formData.projectNo}
                                                onChange={(e) => handleChange(e)}
                                            />

                                        ) : formData.job && (item.label === getLabel("lbl43") || item.label === getLabel("lbl44")) ? (
                                            <PDatepicker
                                                name={
                                                    getLabel("lbl43") === item.label
                                                        ? Labels.enquiryDetails.estdeliveryDate
                                                        : getLabel("lbl44") === item.label
                                                            ? Labels.enquiryDetails.briefReceivedDate
                                                            : ""
                                                }
                                                label={item.label}
                                                value={
                                                    getLabel("lbl43") === item.label
                                                        ? formData.estdeliveryDate
                                                        : getLabel("lbl44") === item.label
                                                            ? formData.briefReceivedDate
                                                            : null
                                                }
                                                onChange={handleChange}
                                                width={100}
                                                allowFuture
                                                maxDate={getLabel("lbl44") === item.label ? formData.estdeliveryDate : null}
                                                minDate={getLabel("lbl43") === item.label ? today : null}
                                            />
                                        ) : formData.job && item.label === getLabel("lbl45") ? (
                                            <PTextField
                                                name={Labels.enquiryDetails.projectDescription}
                                                label={item.label}
                                                value={formData.projectDescription}
                                                onChange={handleChange}
                                                multiline={true}
                                                rows={2.0}
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
                                <PSummary sections={sections} currentStep={3} refreshSummary={fetchData} showFlag={false} />
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
                            <PGrid item xs={12} sm={6} md={6} className="d-flex justify-content-end gap-2">
                                {renderActionButtons("line")}
                            </PGrid>
                        </PGrid>
                        <Divider sx={{ mb: 2 }} />
                        <PGrid container className={Labels.margin.mb3}>
                            <PGrid item xs={12} sm={6} md={2} >
                                <PGrid className={`ps-2 mb-4`}>
                                    <PTypography
                                        labelText={"Management Fee (%)"}
                                        weight={FontWeight.bold}
                                    />
                                    {formData.line ? (
                                        <PTextField
                                            value={"9.00"}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        <PTypography
                                            labelText={"9.00"}
                                            color={CommonColors.grey.main}
                                            weight={FontWeight.bold}
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
                            <PGrid item xs={12} sm={6} md={6} className="d-flex justify-content-end gap-2">
                                {formData.calculateFlag ? <></> : renderActionButtons("rfq")}
                            </PGrid>
                        </PGrid>
                        <Divider sx={{ mb: 2 }} />
                        <PGrid container className={Labels.margin.mb4}>
                            <PGrid item xs={12} sm={6} md={12}>
                                <PTable columns={rfqSupplier} rows={suppliers} showCheckbox={true} selectedRows={formDataList.selectedSupplierRows} onValidationChange={handleRFQ} disabled={formData.rfq} />
                            </PGrid>
                        </PGrid>
                        <PGrid container className={Labels.margin.mb4}>
                            {formData.calculateFlag ? (
                                <PGrid item xs={12} sm={12} md={12} className="d-flex justify-content-end gap-2">
                                    <PButton
                                        label={"Calculate Project Savings"}
                                        variant="contained"
                                        color={CommonColors.grey.main}
                                        onClick={() => handleCalculate(null, "calculate")}
                                        width={250}
                                        disabled={formData.isCalculate}
                                    />
                                    <PButton
                                        label={"Re-calculate Project Savings"}
                                        variant="contained"
                                        color={CommonColors.red.main}
                                        onClick={() => handleCalculate(null, "reCalculate")}
                                        width={250}
                                    />
                                </PGrid>
                            ) : (
                                <PGrid item xs={12} sm={6} md={6}>
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
                            )}
                        </PGrid>
                        {formData.marginFlag ? (
                            <>
                                <PGrid container className={Labels.margin.mb4}>
                                    <PGrid item xs={12} sm={6} md={12}>
                                        <PTable columns={formDataList.calculateRows} rows={formDataList.calculateRowsData} />
                                    </PGrid>
                                </PGrid>
                                <PGrid container className={Labels.margin.mb4}>
                                    <PGrid item xs={12} sm={6} md={12}>
                                        <PTable columns={formDataList.calculateSupplierRows} rows={formDataList.data} />
                                    </PGrid>
                                </PGrid>
                            </>
                        ) : (<></>)}
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
                            <PGrid item xs={12} sm={6} md={6} className="d-flex justify-content-end gap-2">
                                {renderActionButtons("sla")}
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
                                        disabled={formData.sla ? false : true}
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
                                        disabled={formData.sla ? false : true}
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
                                <PTable columns={quotes} rows={suppliers} />
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
                                <PTable columns={lineItemslogs} rows={formDataList.data} />
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
                                <PTable columns={historyLogs} rows={formDataList.data} />
                            </PGrid>
                        </PGrid>
                    </PCard>
                )}
            </Box >

            <PDialog
                open={formData.suppliers}
                onClose={() => setFormData((prev) => ({
                    ...prev,
                    suppliers: false,
                    search: ""
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
                            label={"Send invite to supplier"}
                            variant={Labels.contained}
                            onClick={handleSendChoose}
                            color={CommonColors.green.main}
                            width={200}
                        />
                    </PGrid >
                }

            >
                <PGrid container className={Labels.margin.mb4}>
                    <PGrid item xs={12} sm={6} md={6}>
                        <PSearch width="100%" placeholder={"Search a Suplier Name"}
                            onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                search: e.target.value
                            }))} />
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