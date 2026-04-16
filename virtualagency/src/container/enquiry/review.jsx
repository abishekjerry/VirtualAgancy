
import { Box, Checkbox } from "@mui/material";
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
import { getEnquirySteps, toast } from "../../utils/commonFunction/common";
import { useLanguage } from "../../utils/constants/language";
import { useNavigate, useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddIcon from "@mui/icons-material/Add";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SendIcon from "@mui/icons-material/Send";
import BusinessIcon from "@mui/icons-material/Business";
import SaveIcon from "@mui/icons-material/Save";
import { Dashboard_API } from "../../utils/api/apiUrl";
import { PostApi } from "../../utils/api/networking";

const Review = () => {
    const { getLabel } = useLanguage();
    const enquirySteps = getEnquirySteps(getLabel);
    const { state } = useLocation();
    const navigate = useNavigate();
    const [allowRedirect, setAllowRedirect] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formDataList, setFormDataList] = useState({
        suppliers: [],
        lineItems: [],
        clientInfo: [],
        enquiryDetails : []
    });

    useEffect(() => {
        const id = state?.id > 0 ? state.id : 0;
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await PostApi(Dashboard_API.GetDetails, {
                    Enquiryid: id,
                });
                const supplierColor = ["success", "info", "primary", "warning"];
                const suppliers = response.supplierinfo.map((item, index) => ({
                    name: item.suppliername,
                    color: supplierColor[index % supplierColor.length]
                }));

                setFormDataList(prev => ({
                    ...prev,
                    suppliers: suppliers,
                    lineItems: response.enqlineItems,
                    clientInfo: response.enqClientinfo,
                    enquiryDetails : response.enqProjectinfo
                }));
            } catch (error) {
                toast(Labels.status.failure, Labels.message.somethingWentWrong);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const data = [
        { label: getLabel("lbl27"), value: "UAT SG Customer 1 > Singapore", color: "primary" },
        { label: getLabel("lbl28"), value: formDataList.clientInfo.createdByUser, color: "success" },
        { label: getLabel("lbl09"), value: "Singapore", color: "info" },
        { label: getLabel("lbl29"), value: formDataList.clientInfo.entityname, color: "warning" },

        { label: getLabel("lbl30"), value: formDataList.clientInfo.bussinessUnit , color: "danger" },
        { label: getLabel("lbl91"), value: formDataList.clientInfo.globalBussinessUnit, color: "secondary" },
        { label: getLabel("lbl92"), value: formDataList.clientInfo.aboveorAtmarket, color: "dark" },
        { label: getLabel("lbl33"), value: formDataList.clientInfo.brand, color: "primary" },

        { label: getLabel("lbl34"), value: "Data Marketing", color: "success" },
        { label: getLabel("lbl35"), value: formDataList.clientInfo.clientContact, color: "info" },
        { label: getLabel("lbl36"), value: "testmanjeet91", color: "warning" },

    ];

    const enquiryDetails = [
        { label: getLabel("lbl42"), value: formDataList.enquiryDetails.projectNo , color: "primary" },
        { label: getLabel("lbl43"), value: formDataList.enquiryDetails.estdate, color: "warning" },
        { label: getLabel("lbl44"), value: formDataList.enquiryDetails.briefdate , color: "danger" },
        { label: getLabel("lbl45"), value: formDataList.enquiryDetails.projectDesc , color: "success" },
        { label: getLabel("lbl46"), value: "Y1", color: "info" },
        { label: getLabel("lbl47"), value: formDataList.enquiryDetails.year , color: "secondary" },
        { label: getLabel("lbl93"), value: formDataList.enquiryDetails.managementFeetype, color: "warning" },
        { label: getLabel("lbl94"), value: formDataList.enquiryDetails.hybridModel , color: "danger" },
        { label: getLabel("lbl95"), value: formDataList.enquiryDetails.attribute, color: "info" },
        { label: getLabel("lbl49"), value: formDataList.enquiryDetails.slaTemplatename, color: "dark" },


        { label: getLabel("lbl54"), value: `${formDataList.enquiryDetails.quotestartdate} - ${formDataList.enquiryDetails.quoteenddate}`, color: "primary" },
        { label: getLabel("lbl55"), value: `${formDataList.enquiryDetails.proofstartdate} - ${formDataList.enquiryDetails.proofenddate}`, color: "success" },
        { label: getLabel("lbl56"), value: `${formDataList.enquiryDetails.productionstartdate} - ${formDataList.enquiryDetails.productionenddate}`, color: "warning" },
        { label: getLabel("lbl57"), value: `${formDataList.enquiryDetails.filecopiesstartdate} - ${formDataList.enquiryDetails.filecopiesenddate}`, color: "danger" },
        { label: getLabel("lbl58"), value: `${formDataList.enquiryDetails.invoicestartdate} - ${formDataList.enquiryDetails.invoiceenddate}`, color: "info" }
    ];

    const lineItemMapping = [
        { label: "lbl62", value: "Print" },
        { key: "tojabc", label: "lbl60" },
        { key: "rateCard", label: "lbl65" },
        { key: "competbidmandate", label: "lbl96" },
        { key: "competbidcomplaint", label: "lbl97" },
        { key: "competbidexception", label: "lbl98" },
        { key: "exceptionreason", label: "lbl99" },

        { key: "productcategory", label: "lbl61" },
        { label: "lbl100", value: "Yes" },
        { key: "simplex", label: "lbl101" },
        { key: "tcOapproval", label: "lbl102" },
        { key: "tcOapproved", label: "lbl103" },

        { label: "lbl63", value: "New Item" },
        { label: "lbl64", value: "New Item Values" },
        { label: "lbl152", value: "Others" },
        { key: "itemName",  label: "lbl66" },
        { label: "lbl67", value: "Testing" },

        { key: "usingFSCMaterial",  label: "lbl70"  },
        { key: "oekotexCertification", label: "lbl151" },
        { key: "isthisitemdesignedtobereused", label: "lbl71" },
        { key: "isthisitemdesignedtobereused", label: "lbl75"  },
        { key: "sustainableOptionthatwasrejected", label: "lbl72" },
        { key: "containrecycledmaterial", label: "lbl73" },
        { key: "containrecycledplastic", label: "lbl76" },
        { key: "weightageofrecycledmaterial", label: "lbl79" },
        { key: "isthisitemdesignedtobereused",  label: "lbl74" },

        { label: "lbl106", value: "Yes" },
        { key: "eauction", label: "lbl110" },
        { key: "promoOSSOrderWindows", label: "lbl107" },
        { key: "regionalname", label: "lbl108" },
        { key: "catalogueUsage", label: "lbl109" },
        { label: "lbl111", value: "Continuous" },
        { key: "typeofitem", label: "lbl112" },
        { key: "noofmaterials", label: "lbl113" },
        { key: "digitalInnovation", label: "lbl114" },
        { key: "innovation", label: "lbl115" },
        { key: "sourcinglocation", label: "lbl116" },
        { key: "savingstype", label: "lbl117" },
        { key: "savingsreason", label: "lbl118" },
        { key: "oWlink", label: "lbl119" },

        { key: "quoteType", label: "lbl89" },
        { key: "quoteQtyOrSize", label: "lbl87" },
        { label: "Attachment", value: "No Files" },
        { key: "version", label: "lbl85" },
        { key: "specNote", label: "lbl83" },
        { key: "sNote", label: "lbl86" }
    ];
    const lineItems = formDataList.lineItems.map((item, index) => ({
        itemTitle: `Item ${index + 1}`,
        itemColor: "warning",
        data: lineItemMapping.map(field => ({
            label: field.label === "Attachment" ? field.label : getLabel(field.label),
            value: field.key ? (item[field.key] ? item[field.key] : "-") : field.value
        }))
    }));
    return (
        <>
            <Box sx={{ px: 3, py: 3 }}>
                <PGrid container className={Labels.margin.mb3} >
                    <PStepper steps={enquirySteps} activeStep={4} allowRedirect={allowRedirect}></PStepper>
                </PGrid>
                <PGrid container className={Labels.margin.mb4} >
                    <PGrid item xs={12} sm={12} md={12}>
                        {/*Client Info*/}
                        <PGrid item xs={12} sm={12} md={12} className={Labels.margin.mb4}>
                            <PCard
                                title={`Step 1: ${getLabel("lbl25")}`}
                                icon={<PersonIcon />}
                                color={CommonColors.blue.dark}
                                rightAction={<PButton label="Edit" variant="outlined" size="small" startIcon={<EditIcon />}
                                    //onClick={(e) => handleExitDraft(e)}
                                    sx={{ color: "#fff", borderColor: "#fff", "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.1)" } }}
                                />
                                }>
                                <PGrid container className="g-4">

                                    {data.map((item, i) => (

                                        <PGrid item xs={12} md={6} xl={3} key={i}>
                                            <PGrid className={`border-start border-${item.color} ps-2 mt-2`}>
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
                                        </PGrid>
                                    ))}

                                </PGrid>
                            </PCard>
                        </PGrid>

                        {/*Enquiry Details*/}

                        <PGrid item xs={12} sm={12} md={12} className={Labels.margin.mb4}>
                            <PCard
                                title={`Step 2: ${getLabel("lbl21")}`}
                                icon={<AssignmentIcon />}
                                color={CommonColors.blue.main}
                                rightAction={<PButton label="Edit" variant="outlined" size="small" startIcon={<EditIcon />}
                                    //onClick={(e) => handleExitDraft(e)}
                                    sx={{ color: "#fff", borderColor: "#fff", "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.1)" } }}
                                />
                                }>
                                <PGrid container className="g-4">
                                    {enquiryDetails.map((item, i) => (
                                        <PGrid item xs={12} md={6} xl={3} key={i}>
                                            <PGrid className={`bg-light p-3 rounded border-start border-${item.color}`} style={{ borderLeftWidth: "6px" }}>
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
                                        </PGrid>
                                    ))}
                                </PGrid>
                            </PCard>
                        </PGrid>

                        {/*Line items*/}
                        <PGrid item xs={12} sm={12} md={12} className={Labels.margin.mb4}>
                            <PCard
                                title={`Step 3: ${getLabel("lbl22")}`}
                                icon={< ListAltIcon />}
                                color={CommonColors.green.main}
                                rightAction={<PButton label="Add" variant="outlined" size="small" startIcon={<AddIcon />}
                                    //onClick={(e) => handleExitDraft(e)}
                                    sx={{ color: "#fff", borderColor: "#fff", "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.1)" } }}
                                />
                                }>
                                {lineItems.map((item, index) => (
                                    <PCard
                                        className="bg-light mt-3"
                                        key={index}
                                        title={item.itemTitle}
                                        icon={<Inventory2Icon />}
                                        color={CommonColors.yellow.main}
                                        rightAction={
                                            <PButton label="Edit" variant="outlined" size="small" startIcon={<EditIcon />}
                                                //onClick={(e) => handleExitDraft(e)}
                                                sx={{ color: "#fff", borderColor: "#fff", "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.1)" } }}
                                            />
                                        }>
                                        <PGrid container className="g-4">

                                            {item.data.map((field, i) => (
                                                <PGrid item xs={12} md={6} xl={3} key={i}>
                                                    <PGrid className="p-2 border rounded">
                                                        <PTypography
                                                            labelText={field.label}
                                                            weight={FontWeight.bold}
                                                        />
                                                        <PTypography
                                                            labelText={field.value}
                                                            color={CommonColors.grey.main}
                                                            weight={FontWeight.bold}
                                                        />
                                                    </PGrid>
                                                </PGrid>
                                            ))}

                                        </PGrid>
                                    </PCard>
                                ))}
                            </PCard>

                        </PGrid>

                        {/* Suppliers */}
                        <PGrid item xs={12} sm={12} md={12} className={Labels.margin.mb4}>
                            <PCard
                                title={`Step 4: ${getLabel("lbl23")}`}
                                icon={<LocalShippingIcon />}
                                color={CommonColors.yellow.main}
                                rightAction={<PButton label="Edit" variant="outlined" size="small" startIcon={<EditIcon />}
                                    //onClick={(e) => handleExitDraft(e)}
                                    sx={{ color: "#fff", borderColor: "#fff", "&:hover": { borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.1)" } }}
                                />
                                }>
                                <PGrid container className="g-3">
                                    {formDataList.suppliers.map((item, index) => (
                                        <PGrid item xs={6} md={3} key={index}>
                                            <PGrid className={`border border-${item.color} shadow-sm text-center p-3 rounded`}>
                                                <BusinessIcon className={`text-${item.color} mb-2`} />
                                                <PTypography
                                                    labelText={item.name}
                                                    color={CommonColors.grey.main}
                                                    weight={FontWeight.bold}
                                                />
                                            </PGrid>
                                        </PGrid>
                                    ))}
                                </PGrid>
                            </PCard>
                        </PGrid>

                        <PGrid container className="d-flex align-items-center justify-content-between">
                            <PGrid item xs={12} sm={6} md={6}>
                                <PButton
                                    label={getLabel("lbl37")}
                                    variant="outlined"
                                    onClick={(e) => handleExitDraft(e)}
                                    width={180}
                                    startIcon={<SaveIcon />}
                                />
                            </PGrid>
                            <PGrid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                className="d-flex justify-content-end gap-2"
                            >
                                <PButton
                                    label={getLabel("lbl127")}
                                    variant="contained"
                                    color={CommonColors.green.main}
                                    onClick={(e) => handleSubmit(e, true)}
                                    width={180}
                                    startIcon={<SendIcon />}
                                />
                            </PGrid>
                        </PGrid>

                    </PGrid>
                </PGrid>
            </Box >

        </>
    );
};

export default Review;