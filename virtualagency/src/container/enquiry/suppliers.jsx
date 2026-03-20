import { Box, Checkbox } from "@mui/material";
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
import { getEnquirySteps } from "../../utils/commonFunction/common";
import { useLanguage } from "../../utils/constants/language";
import PSearch from "../../component/PSearch/PSearch";
import PTable from "../../component/PTable/PTable";
import { labelRoutes } from "../../navigations/labelRoutes";
import { useNavigate } from "react-router-dom";
const Suppliers = () => {
    const { getLabel } = useLanguage();
    const enquirySteps = getEnquirySteps(getLabel);
    const navigate = useNavigate();
    const [allowRedirect, setAllowRedirect] = useState(false);
    const [showSelected, setShowSelected] = useState(false);
    const [isValidation, setIsValidation] = useState(false);
    const [country, setCountry] = useState("");
    const [print, setPrint] = useState("");
    const [search, setSearch] = useState("");

    const printList = [
        { value: 0, label: "All" },
        { value: 1, label: "Print" },
        { value: 2, label: "POSM" },
        { value: 3, label: "Promo" },
        { value: 4, label: "Print and POSM" },
        { value: 5, label: "Print and Premium" },
        { value: 6, label: "POSM and Premium" }
    ];
    const counties = [
        { value: 1, label: "Singapore" },
        { value: 2, label: "Janpen" },
        { value: 3, label: "China" }
    ]
    const tableData = [
        {
            supplierName: "A & D Printhub Pte Ltd",
            country: "Singapore",
            supplierCode: "",
            countryID: 1,
            capabilityID: 1,
        },
        {
            supplierName: "Advance Printing",
            country: "Singapore",
            supplierCode: "",
            countryID: 1,
            capabilityID: 1,
        },
        {
            supplierName: "ARC Glassware (China) Co., Ltd.",
            country: "China",
            supplierCode: "",
            countryID: 3,
            capabilityID: 1,
        },
        {
            supplierName: "Beijing Xinrui Yucheng Technology and Culture Co.,Ltd",
            country: "China",
            supplierCode: "",
            countryID: 3,
            capabilityID: 1,
        },
        {
            supplierName: "BusAds Pte Ltd",
            country: "Singapore",
            supplierCode: "",
            countryID: 1,
            capabilityID: 1,
        },
        {
            supplierName: "Chin Long Printing",
            country: "Singapore",
            supplierCode: "1002297",
            countryID: 1,
            capabilityID: 2,
        }
    ]
    const tableHeader = [
        { field: "supplierName", header: "Supplier's Name" },
        { field: "country", header: "Country" },
        { field: "supplierCode", header: "Supplier Code" },
    ];

    let filteredData = tableData;

    // Country filter
    if (country) {
        filteredData = filteredData.filter(
            (item) => item.countryID === country
        );
    }

    // Print Capability filter
    if (print) {
        filteredData = filteredData.filter(
            (item) => item.capabilityID === print
        );
    }
    // Search filter
    if (search.trim() !== "") {
        filteredData = filteredData.filter((item) =>
            item.supplierName.toLowerCase().includes(search.toLowerCase())
        );
    }
    const data = filteredData;

    const handleValidationChange = (rows) => {
        setIsValidation(rows.length === 0);
    };
    const handleSubmit = () => {
        if (!isValidation) {
            setAllowRedirect(true);
            setIsValidation(isValidation);
            navigate(labelRoutes.clientInfo); //review
        }
        else {
            setAllowRedirect(false);
            setIsValidation(isValidation);
        }
    };
    return (
        <>
            <Box sx={{ px: 3, py: 3 }}>
                <PGrid container className={Labels.margin.mb3} >
                    <PStepper steps={enquirySteps} activeStep={3} allowRedirect={allowRedirect}></PStepper>
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
                                    <PSearch width="100%" placeholder={"Search a Suplier Name"} onChange={(e) => setSearch(e.target.value)} />
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
                                        label={getLabel("lbl123")}
                                        value={print}
                                        onChange={(e) => setPrint(e.target.value)}
                                        options={printList}
                                        width={Labels.fontSize.xxxxl}
                                        flag={Labels.flag.auto}
                                    />
                                </PGrid>
                            </PGrid>
                            <PGrid container>
                                <PGrid item xs={12} sm={6} md={12} className="d-flex align-items-center gap-2">
                                    <Checkbox
                                        checked={showSelected}
                                        onChange={(e) => setShowSelected(e.target.checked)}
                                        size="small"
                                        className="p-1"
                                    />

                                    <PTypography
                                        labelText="Show selected suppliers only"
                                        flag={Labels.fontFlags.smallText}
                                        color={CommonColors.grey.main}
                                        weight={FontWeight.bold}
                                    />
                                </PGrid>
                            </PGrid>

                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={12}>
                                    <PTable columns={tableHeader} rows={data} showCheckbox={true} isChecked={showSelected} onValidationChange={handleValidationChange} />
                                </PGrid>
                            </PGrid>
                            { isValidation && (
                                <PGrid container className={Labels.margin.mb4}>
                                    <PGrid item xs={12}>
                                        <PTypography
                                            labelText={"Please select at least one supplier to proceed."}
                                            flag={Labels.fontFlags.smallText}
                                            color={CommonColors.red.main}
                                            weight={FontWeight.bold}
                                        />
                                    </PGrid>
                                </PGrid>
                            )}
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

export default Suppliers;