import { Box, Tooltip, IconButton } from "@mui/material";
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
import { getEnquirySteps } from "../../utils/commonFunction/common"
import AddIcon from "@mui/icons-material/Add"
import { useLanguage } from "../../utils/constants/language";


const ClientInfo = () => {
    const { getLabel } = useLanguage();
    const enquirySteps = getEnquirySteps(getLabel);
    const [division, setDivision] = useState("");
    const [brand, setBrand] = useState("");
    const [clientContact, setClientContact] = useState("");
    const [deliveryCountry, setDeliveryCountry] = useState("");
    const [pmgEntity, setPmgEntity] = useState("");
    const divisionList = [
        { label: "Coca-Cola > Singapore > Pacific Refreshments Pte. Ltd > Marketing > General", value: 1 },
        { label: "Pepsi > India > Varun Beverages > Sales > Retail", value: 2 }
    ];

    const brandList = [
        { label: "Coca-Cola", value: 1 },
        { label: "Sprite", value: 2 },
        { label: "Fanta", value: 3 }
    ];

    const clientContactList = [
        { label: "John Smith", value: 1 },
        { label: "David Lee", value: 2 },
        { label: "Michael Tan", value: 3 }
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
    const [clientName, setClientName] = useState("Coca-Cola");
    const [country, setCountry] = useState("Singapore");
    const [entityName, setEntityName] = useState("Pacific Refreshments Pte. Ltd");
    const [businessUnit, setBusinessUnit] = useState("Marketing");
    const [channel, setChannel] = useState("Coca-Cola");
    const [clientCode, setClientCode] = useState("-");

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "division":
                setDivision(value);
                break;
            case "brand":
                setBrand(value);
                break;
            case "clientContact":
                setClientContact(value);
                break;
            case "deliveryCountry":
                setDeliveryCountry(value);
                break;
            case "pmgEntity":
                setPmgEntity(value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Box sx={{ px: 3, py: 3 }}>
                <PGrid container className={Labels.margin.mb3} >
                    <PStepper steps={enquirySteps} activeStep={0}></PStepper>
                </PGrid>
                <PGrid container className={Labels.margin.mb3} >
                    <PGrid item xs={12} sm={12} md={9}>
                        <PCard>
                            <PGrid container className={Labels.margin.mb3}>
                                <PTypography
                                    labelText={getLabel("lbl25")}
                                    flag={Labels.fontFlags.subHeader}
                                    color={CommonColors.blue.main}
                                    weight={FontWeight.bold}
                                //style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
                                />
                                <PTypography
                                    labelText={getLabel("lbl26")}
                                    flag={Labels.fontFlags.smallText}
                                    color={CommonColors.grey.main}
                                    weight={FontWeight.bold}
                                //style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
                                />
                            </PGrid>

                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={12} md={12}>
                                    <PDropdown
                                        name="division"
                                        label={`${getLabel("lbl27")} ${Labels.symbols.required}`}
                                        value={division}
                                        onChange={handleChange}
                                        options={divisionList}
                                        width={100}
                                    />
                                </PGrid>

                            </PGrid>

                            <PGrid container className={Labels.margin.mb4}>

                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTypography
                                        labelText={getLabel("lbl28")}
                                        weight={FontWeight.bold}
                                    />
                                    <PTypography
                                        labelText="Coca-Cola"
                                    />
                                </PGrid>

                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTypography
                                        labelText={getLabel("lbl29")}
                                        weight={FontWeight.bold}
                                    />
                                    <PTypography
                                        labelText="Singapore"
                                    />
                                </PGrid>

                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTypography
                                        labelText={getLabel("lbl30")}
                                        weight={FontWeight.bold}
                                    />
                                    <PTypography
                                        labelText="Pacific Refreshments Pte. Ltd"
                                    />
                                </PGrid>

                            </PGrid>

                            <PGrid container className={Labels.margin.mb3}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTypography
                                        labelText={getLabel("lbl31")}
                                        weight={FontWeight.bold}
                                    />
                                    <PTypography
                                        labelText={businessUnit}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTypography
                                        labelText={getLabel("lbl09")}
                                        weight={FontWeight.bold}
                                    />
                                    <PTypography
                                        labelText={country}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTypography
                                        labelText={getLabel("lbl32")}
                                        weight={FontWeight.bold}
                                    />
                                    <PTypography
                                        labelText={clientCode}
                                    />
                                </PGrid>

                            </PGrid>
                            <PGrid container className={Labels.margin.mb3}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTypography
                                        labelText={getLabel("lbl91")}
                                        weight={FontWeight.bold}
                                    />
                                    <PTypography
                                        labelText={"Powder & Liquid Beverage"}
                                    />
                                </PGrid>
                            </PGrid>

                            {/* Row 3 */}
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={6}
                                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                                >
                                    <PDropdown
                                        name="brand"
                                        label={`${getLabel("lbl33")} ${Labels.symbols.required}`}
                                        value={brand}
                                        onChange={handleChange}
                                        options={brandList}
                                        width={100}
                                    />
                                    <Tooltip title="Add New Brand" arrow>
                                        <IconButton
                                            sx={{
                                                backgroundColor: "#d5d5d5",
                                                color: "#fff",
                                                width: 30,
                                                height: 30,
                                                marginTop: "9px",
                                                "&:hover": {
                                                    backgroundColor: "#1976d2",
                                                },
                                            }}
                                        //onClick={handleExitDraft}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </PGrid>

                                <PGrid item xs={12} sm={6} md={6}>
                                    <PDropdown
                                        name="deliveryCountry"
                                        label={`${getLabel("lbl34")} ${Labels.symbols.required}`}
                                        value={deliveryCountry}
                                        onChange={handleChange}
                                        options={countryList}
                                        width={100}
                                    />

                                </PGrid>
                            </PGrid >

                            {/* Row 4 */}
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={6} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <PDropdown
                                        name="clientContact"
                                        label={`${getLabel("lbl35")} ${Labels.symbols.required}`}
                                        value={clientContact}
                                        onChange={handleChange}
                                        options={clientContactList}
                                        width={100}
                                    />
                                    <Tooltip title="Add New Contant" arrow>
                                        <IconButton
                                            sx={{
                                                backgroundColor: "#d5d5d5",
                                                color: "#fff",
                                                width: 30,
                                                height: 30,
                                                marginTop: "9px",
                                                "&:hover": {
                                                    backgroundColor: "#1976d2",
                                                },
                                            }}
                                        //onClick={handleExitDraft}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={6}>
                                    <PDropdown
                                        name="pmgEntity"
                                        label={`${getLabel("lbl36")} ${Labels.symbols.required}`}
                                        value={pmgEntity}
                                        onChange={handleChange}
                                        options={pmgEntityList}
                                        width={100}
                                    />
                                </PGrid>
                            </PGrid >
                            <PGrid container className={Labels.margin.mb4}>                             
                                <PGrid item xs={12} sm={6} md={6}>
                                    <PDropdown
                                        name="Above / At Market"
                                        label={`${getLabel("lbl92")} ${Labels.symbols.required}`}
                                        value={pmgEntity}
                                        onChange={handleChange}
                                        options={pmgEntityList}
                                        width={100}
                                    />
                                </PGrid>
                            </PGrid >
                            <hr className="my-4" />

                            <PGrid container className="d-flex align-items-center justify-content-between">

                                {/* Left Button */}
                                <PGrid item xs={12} sm={6} md={8}>
                                    <PButton
                                        label={getLabel("lbl37")}
                                        variant="outlined"
                                        onClick={(e) => handleExitDraft(e)}
                                        width={180}
                                    />
                                </PGrid>

                                {/* Right Buttons */}
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
                        {/* <PCard>
                            <PGrid container>
                                <PTypography
                                    labelText={Labels.clientInfo.summary}
                                    flag={Labels.fontFlags.subHeader}
                                    color={CommonColors.grey.main}
                                    weight={FontWeight.bold}
                                />
                                <hr className="my-4" />
                            </PGrid>

                            <PGrid container>
                                <PTypography
                                    labelText={Labels.clientInfo.clientInformation}
                                    flag={Labels.fontFlags.subHeader}
                                    color={CommonColors.grey.main}
                                    weight={FontWeight.bold}
                                
                                />
                            </PGrid>
                        </PCard> */}
                    </PGrid>
                </PGrid>
            </Box>

        </>
    );
};

export default ClientInfo;