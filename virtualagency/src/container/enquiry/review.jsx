
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
        lineItems :[],
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
                    lineItems : response.enqlineItems,
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
        { label: "Division", value: "UAT SG Customer 1 > Singapore", color: "primary" },
        { label: "Client Name", value: "UAT SG Customer 1", color: "success" },
        { label: "Country", value: "Singapore", color: "info" },
        { label: "Client Contact", value: "test(uatsgclient)", color: "warning" },

        { label: "Source", value: "UAT SG Customer 1", color: "danger" },
        { label: "Client Name", value: "Singapore", color: "secondary" },
        { label: "Business Div", value: "Cross Media Singapore Business Div Ltd", color: "dark" },
        { label: "Sales Entity", value: "Cross Media Singapore Business Div Ltd", color: "primary" },

        { label: "Business Unit", value: "Data Marketing", color: "success" },
        { label: "Brand", value: "N/A", color: "info" },
        { label: "Contact Primary", value: "testmanjeet91", color: "warning" },
        { label: "Contact Secondary", value: "Singapore", color: "danger" }
    ];

    const enquiryDetails = [
        { label: "Project No", value: "Test", color: "primary" },
        { label: "Project Name", value: "TestProject", color: "success" },
        { label: "Est. Delivery", value: "18/02/2026", color: "warning" },
        { label: "Date of Brief Received", value: "18/02/2026", color: "danger" },
        { label: "Year", value: "Y2", color: "info" },
        { label: "Project Quote Type", value: "Quote By Total Price", color: "secondary" },
        { label: "SLA Template", value: "PRINT Complex - SG", color: "dark" },

        { label: "Quote", value: "18/02/2026 - 23/02/2026", color: "primary" },
        { label: "Proof", value: "23/02/2026 - 25/02/2026", color: "success" },
        { label: "Production", value: "25/02/2026 - 04/03/2026", color: "warning" },
        { label: "File Copies", value: "04/03/2026 - 11/03/2026", color: "danger" },
        { label: "Invoicing", value: "11/03/2026 - 25/03/2026", color: "info" }
    ];

    const lineItems = [
        {
            itemTitle: "Item 1",
            itemColor: "warning", // header color
            data: [
                { label: "Type of Job", value: "Print" },
                { label: "Item Category", value: "Brochures/Manuals" },
                { label: "Urgent/Non-Urgent Job", value: "Urgent" },
                { label: "Dictated Job", value: "Yes" },
                { label: "Item Type", value: "New Item" },
                { label: "Rate Card", value: formDataList.lineItems.rateCard },
                { label: "Item Name", value: "Testing" },

                { label: "Item Description", value: "Testing" },
                { label: "Is the item produced on FSC or PEFC material?", value: "N/A" },
                { label: "Is the item recyclable?", value: "N/A" },
                { label: "Is this job proposed with sustainability options?", value: "N/A" },
                { label: "Does the item contain recycled material?", value: "N/A" },
                { label: "Is the item designed to be reused?", value: "N/A" },
                { label: "Does the item contain plastic?", value: "No" },
                { label: "Does the item contain recycled plastic?", value: "No" },
                { label: "Weightage of plastic in Kg", value: "-" },
                { label: "Weightage of recycled plastic in Kg", value: "-" },
                { label: "Weightage of recycled material in Kg", value: "1" },
                { label: "Printing Method", value: "Continuous" },
                { label: "Material Used", value: "-" },
                { label: "Catalogue Usage", value: "N/A" },
                { label: "Is this an Innovative Solution?", value: "No" },
                { label: "Quote Type", value: formDataList.lineItems.quoteType},
                { label: "Quantity", value: "100" },
                { label: "Attachment", value: "No Files" },
                { label: "No of version", value: "1" },
                { label: "Specifications", value: "Testing" },
                { label: "Notes/Comments", value: "-" }
            ]
        }
    ];
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
                                title="Step 1: Client Information"
                                icon={<PersonIcon />}
                                color={CommonColors.blue.dark}
                                rightAction={<PButton
                                    label="Edit"
                                    variant="outlined"
                                    size="small"              // 👈 like btn-sm
                                    startIcon={<EditIcon />}  // 👈 icon instead of <i class="fas fa-edit">
                                    //onClick={(e) => handleExitDraft(e)}
                                    sx={{
                                        color: "#fff",
                                        borderColor: "#fff",
                                        "&:hover": {
                                            borderColor: "#fff",
                                            backgroundColor: "rgba(255,255,255,0.1)"
                                        }
                                    }}
                                />
                                }
                            >
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
                                title="Step 2: Enquiry Details"
                                icon={<AssignmentIcon />}
                                color={CommonColors.blue.main}
                                rightAction={<PButton
                                    label="Edit"
                                    variant="outlined"
                                    size="small"              // 👈 like btn-sm
                                    startIcon={<EditIcon />}  // 👈 icon instead of <i class="fas fa-edit">
                                    //onClick={(e) => handleExitDraft(e)}
                                    sx={{
                                        color: "#fff",
                                        borderColor: "#fff",
                                        "&:hover": {
                                            borderColor: "#fff",
                                            backgroundColor: "rgba(255,255,255,0.1)"
                                        }
                                    }}
                                />
                                }
                            >
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
                                title="Step 3: Line Items"
                                icon={< ListAltIcon />}
                                color={CommonColors.green.main}
                                rightAction={<PButton
                                    label="Add"
                                    variant="outlined"
                                    size="small"              // 👈 like btn-sm
                                    startIcon={<AddIcon />}  // 👈 icon instead of <i class="fas fa-edit">
                                    //onClick={(e) => handleExitDraft(e)}
                                    sx={{
                                        color: "#fff",
                                        borderColor: "#fff",
                                        "&:hover": {
                                            borderColor: "#fff",
                                            backgroundColor: "rgba(255,255,255,0.1)"
                                        }
                                    }}
                                />
                                }
                            >
                                {lineItems.map((item, index) => (
                                    <PCard
                                        className="bg-light mt-3"
                                        key={index}
                                        title={item.itemTitle}
                                        icon={<Inventory2Icon />}
                                        color={CommonColors.yellow.main}
                                        rightAction={
                                            <PButton
                                                label="Edit"
                                                variant="outlined"
                                                size="small"
                                                startIcon={<EditIcon />}
                                                sx={{
                                                    color: "#fff",
                                                    borderColor: "#fff",
                                                    "&:hover": {
                                                        borderColor: "#fff",
                                                        backgroundColor: "rgba(255,255,255,0.1)"
                                                    }
                                                }}
                                            />
                                        }
                                    >
                                        <PGrid container className="g-4">

                                            {item.data.map((field, i) => (
                                                <PGrid item xs={12} md={6} xl={3} key={i}>
                                                    <PGrid
                                                        className="p-2 border rounded"
                                                    //style={{ borderLeft: "6px solid #ccc" }} // 👈 you can make dynamic later
                                                    >
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
                        <PGrid item xs={12} sm={12} md={12} className={Labels.margin.mb4}>
                            <PCard
                                title="Step 4: Suppliers"
                                icon={<LocalShippingIcon />}
                                color={CommonColors.yellow.main}
                                rightAction={<PButton
                                    label="Edit"
                                    variant="outlined"
                                    size="small"
                                    startIcon={<EditIcon />}
                                    //onClick={(e) => handleExitDraft(e)}
                                    sx={{
                                        color: "#fff",
                                        borderColor: "#fff",
                                        "&:hover": {
                                            borderColor: "#fff",
                                            backgroundColor: "rgba(255,255,255,0.1)"
                                        }
                                    }}
                                />
                                }
                            >
                                <PGrid container className="g-3">
                                    {formDataList.suppliers.map((item, index) => (
                                        <PGrid item xs={6} md={3} key={index}>
                                            <PGrid className={`border border-${item.color} shadow-sm text-center p-3 rounded`}>
                                                <BusinessIcon
                                                    className={`text-${item.color} mb-2`}
                                                />
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