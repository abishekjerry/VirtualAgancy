import { Box, Tooltip, IconButton } from "@mui/material";
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
import { getEnquirySteps, isNotEmpty, isSuccess, toast } from "../../utils/commonFunction/common"
import AddIcon from "@mui/icons-material/Add"
import { useLanguage } from "../../utils/constants/language";
import { labelRoutes } from "../../navigations/labelRoutes";
import { useNavigate, useLocation } from "react-router-dom";
import { ClientInfo_API, Dashboard_API } from "../../utils/api/apiUrl";
import { PostApi } from "../../utils/api/networking";
import PDialog from "../../component/PDialog/PDialog";
import PTextField from "../../component/PTextField/PTextField";
const ClientInfo = () => {
    const { state } = useLocation();
    const { getLabel } = useLanguage();
    const navigate = useNavigate();
    const enquirySteps = getEnquirySteps(getLabel);
    const [allowRedirect, setAllowRedirect] = useState(false);
    const [loading, setLoading] = useState(true);
    const [ccOpenFilter, setCcOpenFilter] = useState(false);
    const [brandOpenFilter, setBrandOpenFilter] = useState(false);
    const [disible, setDisible] = useState(true);
    const [type, setType] = useState("");
    const [formData, setFormData] = useState({
        division: "",
        brand: "",
        deliveryCountry: "",
        clientContact: "",
        pmgEntity: "",
        aboveAtMarket: "",
        brandValue: "",
        aboveAtMarketValue: "",
        jobPosition: "",


        firstName: "",
        lastName: "",
        logonID: "",
        jobTitle: "",
        email: "",
        phone: "",
        receiveNotification: "",
        jobRole: "",
        brandName: ""
    });

    const [fields, setFieldsData] = useState({
        clientName: "",
        country: "",
        entityName: "",
        businessUnit: "",
        channel: "",
        countryCode: "",
        clientCode: "",
        globalBUMapping: ""
    });


    // Single state for all errors
    const [errors, setErrors] = useState({
        division: "",
        brand: "",
        deliveryCountry: "",
        clientContact: "",
        pmgEntity: "",
        aboveAtMarket: "",

        firstName: "",
        logonID: "",
        email: "",
        receiveNotification: "",
        jobRole: "",
        brandName: ""
    });

    const [formDataList, setFormDataList] = useState({
        division: [],
        brand: [],
        deliveryCountry: [],
        clientContact: [],
        pmgEntity: [],
        aboveAtMarket: [],

        receiveNotification: [{ label: "Yes", value: 1 }, { label: "No", value: 2 }],
        jobRole: [{ label: "Admin", value: 1 }, { label: "User", value: 2 }, { label: "Client", value: 3 }],
    });

    const ClientInfoMaster = async (division) => {
        try {
            console.log(division, "division");
            setLoading(false);
            const response = await PostApi(
                `${ClientInfo_API.ClientInfoMaster}?Divisionid=${division}`,
                {}
            );
            // const response = await PostApi(ClientInfo_API.ClientInfoMaster, {
            // });
            setFormDataList(prev => ({
                ...prev,
                brand: response.brands,
                clientContact: response.client,
            }));

        } catch (error) {
            console.error("API Error", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await PostApi(Dashboard_API.Master, {
                });
                setFormDataList(prev => ({
                    ...prev,
                    division: response.division,
                    pmgEntity: response.country,
                    deliveryCountry: response.country,
                }));
            } catch (error) {
                toast(Labels.status.failure, Labels.message.somethingWentWrong);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const aboveAtMarketList = [
        { label: "Above", value: 1 },
        { label: "At Market", value: 2 },

    ];
    const handleChange = async (e) => {
        const { name, value } = e.target;
        const label = e.target.label || "";
        setFormData((prev) => {
            const data = {
                ...prev,
                [name]: value
            };
            // Extra mappings
            if (name === Labels.clientInfo.brand) {
                data.brandValue = label;
            }
            if (name === Labels.clientInfo.aboveAtMarket) {
                data.aboveAtMarketValue = label;
            }
            if (name === Labels.clientInfo.jobRole) {
                data.jobPosition = label;
            }

            return data;
        });

        // Clear errors
        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));

        // Division logic
        if (name === Labels.clientInfo.division) {
            const parts = label.split(">").map(v => v.trim());
            const keys = Object.keys(fields);

            setFieldsData((prev) => {
                const data = { ...prev };
                keys.forEach((key, index) => {
                    data[key] = parts[index] || " - ";
                });
                return data;
            });
            ClientInfoMaster(value);
            setDisible(false);
        }

        let timeoutId;
        if (name === Labels.clientInfo.logonID) {
            clearTimeout(timeoutId);
            if (!value || value.trim() === "") {
                setErrors((prev) => ({
                    ...prev,
                    logonID: ""
                }));
                return;
            }
            timeoutId = setTimeout(async () => {
                try {
                    setLoading(true);

                    const response = await PostApi(ClientInfo_API.CheckforUsername, {
                        Username: value,
                    });

                    if (isSuccess(response)) {
                        setErrors((prev) => ({
                            ...prev,
                            logonID: response?.data,
                        }));
                    } else {
                        setErrors((prev) => ({
                            ...prev,
                            logonID: "",
                        }));
                    }

                } catch (error) {
                    toast(Labels.status.failure, Labels.message.somethingWentWrong);
                } finally {
                    setLoading(false);
                }
            }, 300); // waits 500ms after typing stops
        }
    };

    const handleSubmit = async () => {
        const isValid = ClientInfoValidation();
        const flag = isNotEmpty(state?.id) && state?.id !== 0 ? Labels.flag.Update : Labels.flag.Insert;
        if (isValid) {
            try {
                setLoading(true);
                const response = await PostApi(ClientInfo_API.AddUpdateClientInfo, {
                    divisionid: formData.division,
                    clientContactId: formData.clientContact,
                    createdBy: parseInt(localStorage.getItem("userID")),
                    modifiedBy: parseInt(localStorage.getItem("agancyUserID")),
                    brand: formData.brandValue,
                    deliveryCountryId: formData.deliveryCountry,
                    pMGEntity: formData.pmgEntity,
                    aboveorAtmarket: formData.aboveAtMarketValue,
                    //flag : flag
                });
                if (isSuccess(response)) {
                    setAllowRedirect(true);
                    toast(Labels.status.success, Labels.message.success);
                    navigate(labelRoutes.enquiryDetails);
                } else {
                    setErrors((prev) => ({
                        ...prev,
                        name: ""
                    }));
                    toast(Labels.status.failure, Labels.message.failed);
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

    const ClientInfoValidation = () => {
        const requiredFields = [
            Labels.clientInfo.division,
            Labels.clientInfo.brand,
            Labels.clientInfo.deliveryCountry,
            Labels.clientInfo.clientContact,
            Labels.clientInfo.pmgEntity,
            Labels.clientInfo.aboveAtMarket,
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

    const NewClientContantValidation = () => {
        const requiredFields = [
            Labels.clientInfo.firstName,
            Labels.clientInfo.email,
            Labels.clientInfo.jobRole,
            Labels.clientInfo.receiveNotification,
            Labels.clientInfo.logonID,
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

    const NewBrandValidation = () => {
        const requiredFields = [
            Labels.clientInfo.brandName,
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

    const handleCloseChoose = () => {
        setCcOpenFilter(false);
        setBrandOpenFilter(false);
        setFormData((prev) => ({
            ...prev,
            firstName: "",
            lastName: "",
            logonID: "",
            jobTitle: "",
            email: "",
            phone: "",
            receiveNotification: "",
            jobRole: "",
            brandName: ""
        }));
        setErrors((prev) => ({
            ...prev,
            firstName: "",
            logonID: "",
            email: "",
            receiveNotification: "",
            jobRole: "",
            brandName: ""
        }));
    };

    const handleSendChoose = async () => {
        if (type === "Contant") {
            const isValid = NewClientContantValidation();
            if (isValid) {
                try {
                    setLoading(true);
                    const response = await PostApi(ClientInfo_API.AddUpdateClientContant, {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        logonid: formData.logonID,
                        jobtitle: formData.jobTitle,
                        email: formData.email,
                        phone: formData.phone,
                        jobposition: formData.jobPosition,
                        receivenotification: formData.receiveNotification == 1 ? true : false,
                        divisionid: formData.division
                    });
                    if (isSuccess(response)) {
                        setCcOpenFilter(false);
                        toast(Labels.status.success, Labels.message.success);
                    } else {
                        setErrors((prev) => ({
                            ...prev,
                            name: ""
                        }));
                        setCcOpenFilter(true);
                        toast(Labels.status.failure, Labels.message.failed);
                    }

                } catch (error) {
                    toast(Labels.status.failure, Labels.message.somethingWentWrong);
                } finally {
                    setLoading(false);
                }
            }
        } else {
            const isValid = NewBrandValidation();
            if (isValid) {
                try {
                    setLoading(true);
                    const response = await PostApi(ClientInfo_API.AddUpdateBrand, {
                        brandName: formData.brandName,
                        divisionid: formData.division
                    });
                    if (isSuccess(response)) {
                        setBrandOpenFilter(false);
                        toast(Labels.status.success, Labels.message.success);
                    } else {
                        setErrors((prev) => ({
                            ...prev,
                            name: ""
                        }));
                        setBrandOpenFilter(true);
                        toast(Labels.status.failure, Labels.message.failed);
                    }
                } catch (error) {
                    toast(Labels.status.failure, Labels.message.somethingWentWrong);
                } finally {
                    setLoading(false);
                }
            }
        }
    };
    const handleOpenChoose = (e, name) => {
        setType(name);
        if (name === "Contant") {
            setCcOpenFilter(true);
        } else {
            setBrandOpenFilter(true);
        }
    };
    return (
        <>
            <Box sx={{ px: 3, py: 3 }}>
                <PGrid container className={Labels.margin.mb3} >
                    <PStepper steps={enquirySteps} activeStep={0} allowRedirect={allowRedirect}></PStepper>
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
                                />
                                <PTypography
                                    labelText={getLabel("lbl26")}
                                    flag={Labels.fontFlags.smallText}
                                    color={CommonColors.grey.main}
                                    weight={FontWeight.bold}
                                />
                            </PGrid>

                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={12} md={12}>
                                    <PDropdown
                                        name={Labels.clientInfo.division}
                                        label={`${getLabel("lbl27")} ${Labels.symbols.required}`}
                                        value={formData.division}
                                        onChange={handleChange}
                                        options={formDataList.division}
                                        width={100}
                                        helperText={errors?.division}
                                        flag={Labels.flag.auto}
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
                                        labelText={fields.clientName}
                                        color={CommonColors.grey.main}
                                        weight={FontWeight.bold}
                                    />
                                </PGrid>

                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTypography
                                        labelText={getLabel("lbl29")}
                                        weight={FontWeight.bold}
                                    />
                                    <PTypography
                                        labelText={fields.entityName}
                                        color={CommonColors.grey.main}
                                        weight={FontWeight.bold}
                                    />
                                </PGrid>

                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTypography
                                        labelText={getLabel("lbl30")}
                                        weight={FontWeight.bold}
                                    />
                                    <PTypography
                                        labelText={fields.businessUnit}
                                        color={CommonColors.grey.main}
                                        weight={FontWeight.bold}
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
                                        labelText={fields.channel}
                                        color={CommonColors.grey.main}
                                        weight={FontWeight.bold}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTypography
                                        labelText={getLabel("lbl09")}
                                        weight={FontWeight.bold}
                                    />
                                    <PTypography
                                        labelText={fields.country}
                                        color={CommonColors.grey.main}
                                        weight={FontWeight.bold}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTypography
                                        labelText={getLabel("lbl32")}
                                        weight={FontWeight.bold}
                                    />
                                    <PTypography
                                        labelText={fields.clientCode}
                                        color={CommonColors.grey.main}
                                        weight={FontWeight.bold}
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
                                        labelText={fields.globalBUMapping}
                                        color={CommonColors.grey.main}
                                        weight={FontWeight.bold}
                                    />
                                </PGrid>
                            </PGrid>

                            {/* Row 3 */}
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={6} style={{ display: "flex", alignItems: "center", gap: "8px" }} >
                                    <PDropdown
                                        name={Labels.clientInfo.brand}
                                        label={`${getLabel("lbl33")} ${Labels.symbols.required}`}
                                        value={formData.brand}
                                        onChange={handleChange}
                                        options={formDataList.brand}
                                        width={100}
                                        helperText={errors?.brand}
                                    />

                                    <Tooltip title="Add New Brand" arrow>
                                        <IconButton sx={{ backgroundColor: "#d5d5d5", color: "#fff", width: 30, height: 30, marginTop: "9px", "&:hover": { backgroundColor: "#1976d2" }, }}
                                            onClick={!disible ? (e) => handleOpenChoose(e, "Brand") : undefined}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </PGrid>

                                <PGrid item xs={12} sm={6} md={6}>
                                    <PDropdown
                                        name={Labels.clientInfo.deliveryCountry}
                                        label={`${getLabel("lbl34")} ${Labels.symbols.required}`}
                                        value={formData.deliveryCountry}
                                        onChange={handleChange}
                                        options={formDataList.deliveryCountry}
                                        width={100}
                                        helperText={errors?.deliveryCountry}
                                        flag={Labels.flag.auto}
                                    />

                                </PGrid>
                            </PGrid >

                            {/* Row 4 */}
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={6} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <PDropdown
                                        name={Labels.clientInfo.clientContact}
                                        label={`${getLabel("lbl35")} ${Labels.symbols.required}`}
                                        value={formData.clientContact}
                                        onChange={handleChange}
                                        options={formDataList.clientContact}
                                        width={100}
                                        helperText={errors?.clientContact}
                                    />
                                    <Tooltip title="Add New Contant" arrow>
                                        <IconButton sx={{ backgroundColor: "#d5d5d5", color: "#fff", width: 30, height: 30, marginTop: "9px", "&:hover": { backgroundColor: "#1976d2" }, }}
                                            onClick={!disible ? (e) => handleOpenChoose(e, "Contant") : undefined}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={6}>
                                    <PDropdown
                                        name={Labels.clientInfo.pmgEntity}
                                        label={`${getLabel("lbl36")} ${Labels.symbols.required}`}
                                        value={formData.pmgEntity}
                                        onChange={handleChange}
                                        options={formDataList.pmgEntity}
                                        width={100}
                                        helperText={errors?.pmgEntity}
                                        flag={Labels.flag.auto}
                                    />
                                </PGrid>
                            </PGrid >
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={6}>
                                    <PDropdown
                                        name={Labels.clientInfo.aboveAtMarket}
                                        label={`${getLabel("lbl92")} ${Labels.symbols.required}`}
                                        value={formData.aboveAtMarket}
                                        onChange={handleChange}
                                        options={aboveAtMarketList}
                                        width={100}
                                        helperText={errors?.aboveAtMarket}
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
                </PGrid >
            </Box >

            {/*Add Client Contant*/}
            < PDialog
                open={ccOpenFilter}
                onClose={handleCloseChoose}
                title={"Add New Contact"}
                showCloseIcon={true}
                maxWidth="lg"
                actions={
                    < PGrid container className="d-flex align-items-center justify-content-end gap-2" >
                        <PButton
                            fullWidth
                            label={"Cancel"}
                            variant="outlined"
                            onClick={handleCloseChoose}
                            color={CommonColors.grey.main}
                            width={120}
                        />
                        <PButton
                            fullWidth
                            label={"Save"}
                            variant={Labels.contained}
                            onClick={handleSendChoose}
                            color={CommonColors.green.main}
                            width={120}
                        />
                    </PGrid >
                }

            >
                <PGrid container className={Labels.margin.mb3}>
                    <PGrid item xs={12} sm={6} md={3}>
                        <PTextField
                            name={Labels.clientInfo.firstName}
                            label={`First Name ${Labels.symbols.required}`}
                            value={formData.firstName}
                            onChange={handleChange}
                            helperText={errors?.firstName}
                        />
                    </PGrid>
                    <PGrid item xs={12} sm={6} md={3}>
                        <PTextField
                            name={Labels.clientInfo.lastName}
                            label={`Last Name`}
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </PGrid>
                    <PGrid item xs={12} sm={6} md={3}>
                        <PTextField
                            name={Labels.clientInfo.logonID}
                            label={`Logon ID ${Labels.symbols.required}`}
                            value={formData.logonID}
                            onChange={handleChange}
                            helperText={errors?.logonID}
                        />
                    </PGrid>
                    <PGrid item xs={12} sm={6} md={3}>
                        <PTextField
                            name={Labels.clientInfo.jobTitle}
                            label={`Job Title`}
                            value={formData.jobTitle}
                            onChange={handleChange}
                        />
                    </PGrid>
                </PGrid>
                <PGrid container >
                    <PGrid item xs={12} sm={6} md={3}>
                        <PTextField
                            name={Labels.clientInfo.email}
                            label={`Email ${Labels.symbols.required}`}
                            value={formData.email}
                            onChange={handleChange}
                            helperText={errors?.email}
                        />
                    </PGrid>
                    <PGrid item xs={12} sm={6} md={3}>
                        <PTextField
                            name={Labels.clientInfo.phone}
                            label={`Phone`}
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </PGrid>
                    <PGrid item xs={12} sm={6} md={3}>
                        <PDropdown
                            name={Labels.clientInfo.receiveNotification}
                            label={`Receive Notification  ${Labels.symbols.required}`}
                            value={formData.receiveNotification}
                            onChange={handleChange}
                            options={formDataList.receiveNotification}
                            width={100}
                            helperText={errors?.receiveNotification}
                            disabled={true}
                        />
                    </PGrid>
                    <PGrid item xs={12} sm={6} md={3}>
                        <PDropdown
                            name={Labels.clientInfo.jobRole}
                            label={`Job Role ${Labels.symbols.required}`}
                            value={formData.jobRole}
                            onChange={handleChange}
                            options={formDataList.jobRole}
                            width={100}
                            helperText={errors?.jobRole}
                        />
                    </PGrid>
                </PGrid>
            </PDialog >

            {/*Add New Brand*/}
            < PDialog
                open={brandOpenFilter}
                onClose={handleCloseChoose}
                title={"Add New Brand"}
                showCloseIcon={true}
                actions={
                    < PGrid container className="d-flex align-items-center justify-content-end gap-2" >
                        <PButton
                            fullWidth
                            label={"Cancel"}
                            variant="outlined"
                            onClick={handleCloseChoose}
                            color={CommonColors.grey.main}
                            width={120}
                        />
                        <PButton
                            fullWidth
                            label={"Save"}
                            variant={Labels.contained}
                            onClick={handleSendChoose}
                            color={CommonColors.green.main}
                            width={120}
                        />
                    </PGrid >
                }
            >
                <PGrid>
                    <PTextField
                        name={Labels.clientInfo.brandName}
                        label={`Brand Name ${Labels.symbols.required}`}
                        value={formData.brandName}
                        onChange={handleChange}
                        helperText={errors?.brandName}
                    />
                </PGrid>
            </PDialog >
        </>
    );
};

export default ClientInfo;