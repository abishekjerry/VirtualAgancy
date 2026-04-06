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
import { getEnquirySteps } from "../../utils/commonFunction/common";
import { useLanguage } from "../../utils/constants/language";
import { labelRoutes } from "../../navigations/labelRoutes";
import { useNavigate } from "react-router-dom";
import { Dashboard_API } from "../../utils/api/apiUrl";
import { PostApi } from "../../utils/api/networking";
import { PDraftDialog } from "../../component/PDialog/PDraftDialog";
const LineItems = () => {
    const { getLabel } = useLanguage();
    const navigate = useNavigate();
    const [allowRedirect, setAllowRedirect] = useState(false);
    const enquirySteps = getEnquirySteps(getLabel);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const yesNoOptions = [
        { label: "Yes", value: 1 },
        { label: "No", value: 2 },
    ];
    const typeofJobOptions = [
        { label: "Print", value: 1 },
        { label: "Digital", value: 2 },
    ];

    const [formDataList, setFormDataList] = useState({
        typeOfJob: [{ label: "Strategic", value: 1 }, { label: "Tactical", value: 2 }, { label: "Operational", value: 3 }, { label: "Non-Addressable", value: 4 }],
        category: [],
        yesOrNo: [{ label: "Yes", value: 1 }, { label: "No", value: 2 }],
        simplex: [{ label: "Non-Simplex", value: 1 }, { label: "Simplex", value: 2 }, { label: "Not Applicable", value: 3 }],
        quoteType: [{ label: "Quote of Quantity", value: 1 }, { label: "Quote of Quantity & Size 2D", value: 2 }, { label: "Quote of Quantity & Size 3D", value: 3 }],
    });

    const [formData, setFormData] = useState({
        category: "",
        typeOfJob: "",
        rateCard: "",
        competitiveBiddingMandatory: "",
        competitiveBiddingCompliant: "",
        competitiveBiddingExceptionFormSigned: "",
        exceptionsReasonCode: "",
        itemCategory: "",
        subCategory: "",
        simplex: "",
        tcoApprovalRequired: "",
        tcoApproved: "",
        dictatedJob: "",
        itemType: "",
        itemName: "",
        itemNameDescription: "",

        // Sustainability Information
        fscOrPefcMaterial: "",
        recyclable: "",
        sustainabilityOption: "",
        recycledMaterial: "",
        designedToBeReused: "",
        containsPlastic: "",
        containsRecycledPlastic: "",
        recycledMaterialWeightKg: "",

        // Catalogue Section
        ratecardCatalogueItemDeclined: "",
        globalOrderWindowCatalogueName: "",
        regionalOrderWindowCatalogue: "",
        localCatalogueName: "",
        eAuction: "",
        printingMethod: "",
        typeOfItem: "",
        noOfMaterials: "",
        digitalInnovation: "",
        innovation: "",
        sourcingLocation: "",
        savingsType: "",
        savingsReason: "",
        owWithLink: "",

        // Specifications
        noOfVersion: "",
        specifications: "",
        notesComments: "",

        // Quantity
        quantityType: "",
        quantity: "",
        length: "",
        width: "",
        depth: "",
        files: ""
    });

    const [errors, setErrors] = useState({
        category: "",
        typeOfJob: "",
        rateCard: "",
        competitiveBiddingMandatory: "",
        competitiveBiddingCompliant: "",
        competitiveBiddingExceptionFormSigned: "",
        exceptionsReasonCode: "",
        itemCategory: "",
        subCategory: "",
        simplex: "",
        tcoApprovalRequired: "",
        tcoApproved: "",
        dictatedJob: "",
        itemType: "",
        itemName: "",
        itemNameDescription: "",

        // Sustainability Information
        fscOrPefcMaterial: "",
        recyclable: "",
        sustainabilityOption: "",
        recycledMaterial: "",
        designedToBeReused: "",
        containsPlastic: "",
        containsRecycledPlastic: "",
        recycledMaterialWeightKg: "",

        // Catalogue Section
        ratecardCatalogueItemDeclined: "",
        globalOrderWindowCatalogueName: "",
        regionalOrderWindowCatalogue: "",
        localCatalogueName: "",
        eAuction: "",
        printingMethod: "",
        typeOfItem: "",
        noOfMaterials: "",
        digitalInnovation: "",
        innovation: "",
        sourcingLocation: "",
        savingsType: "",
        savingsReason: "",
        owWithLink: "",

        // Specifications
        noOfVersion: "",
        specifications: "",
        notesComments: "",

        // Quantity
        quantityType: "",
        quantity: "",
        length: "",
        width: "",
        depth: "",
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await PostApi(Dashboard_API.Master, {
                });
                setFormDataList(prev => ({
                    ...prev,
                    category: response.typeofJob,
                }));
            } catch (error) {
                toast(Labels.status.failure, Labels.message.somethingWentWrong);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log();
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: ""   // clear only that field error
        }));

        console.log(formData.files);
    };

    const handleSubmit = () => {
        const isValid = LineItemsValidation();
        if (isValid) {
            setAllowRedirect(isValid);
            navigate(labelRoutes.suppliers);
        }
        else {
            setAllowRedirect(isValid);
        }
    };
    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(labelRoutes.enquiryDetails);
        } else {
            navigate(labelRoutes.home); // fallback route
        }
    };
    const LineItemsValidation = () => {
        const requiredFields = [
            Labels.lineItems.category,
            Labels.lineItems.typeOfJob,
            Labels.lineItems.rateCard,
            Labels.lineItems.competitiveBiddingMandatory,
            Labels.lineItems.competitiveBiddingCompliant,
            Labels.lineItems.competitiveBiddingExceptionFormSigned,
            Labels.lineItems.exceptionsReasonCode,
            Labels.lineItems.itemCategory,
            Labels.lineItems.subCategory,
            Labels.lineItems.simplex,
            Labels.lineItems.tcoApprovalRequired,
            Labels.lineItems.tcoApproved,
            Labels.lineItems.dictatedJob,
            Labels.lineItems.itemType,
            Labels.lineItems.itemName,
            Labels.lineItems.itemNameDescription,

            // Sustainability Information
            Labels.lineItems.fscOrPefcMaterial,
            Labels.lineItems.recyclable,
            Labels.lineItems.sustainabilityOption,
            Labels.lineItems.recycledMaterial,
            Labels.lineItems.designedToBeReused,
            Labels.lineItems.containsPlastic,
            Labels.lineItems.containsRecycledPlastic,
            Labels.lineItems.recycledMaterialWeightKg,

            // Catalogue Section
            Labels.lineItems.ratecardCatalogueItemDeclined,
            Labels.lineItems.globalOrderWindowCatalogueName,
            Labels.lineItems.regionalOrderWindowCatalogue,
            Labels.lineItems.localCatalogueName,
            Labels.lineItems.eAuction,
            Labels.lineItems.printingMethod,
            Labels.lineItems.typeOfItem,
            Labels.lineItems.noOfMaterials,
            Labels.lineItems.digitalInnovation,
            Labels.lineItems.innovation,
            Labels.lineItems.sourcingLocation,
            Labels.lineItems.savingsType,
            Labels.lineItems.savingsReason,
            Labels.lineItems.owWithLink,

            // Specifications
            Labels.lineItems.noOfVersion,
            Labels.lineItems.specifications,

            // Quantity
            Labels.lineItems.quantityType,
            Labels.lineItems.quantity,
            Labels.lineItems.width,
            Labels.lineItems.depth,
            Labels.lineItems.length,
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

    //Quote of Quantity 
    const type = Number(formData.quantityType);
    const flatSize = type === 3 ? (+formData.length || 0) * (+formData.width || 0) * (+formData.depth || 0) : (+formData.length || 0) * (+formData.width || 0);
    const totalSize = flatSize * (+formData.quantity || 0);
    const handleExitDraft = () => {
        setOpen(true);
    };

    return (
        <>
            <Box sx={{ px: 3, py: 3 }}>
                <PGrid container className={Labels.margin.mb4} >
                    <PStepper steps={enquirySteps} activeStep={2} allowRedirect={allowRedirect}></PStepper>
                </PGrid>
                <PGrid container className={Labels.margin.mb4} >
                    <PGrid item xs={12} sm={12} md={9}>
                        <PCard>
                            {/* Line Items */}
                            <PGrid container className={Labels.margin.mb4}>
                                <PTypography
                                    labelText={getLabel("lbl22")}
                                    flag={Labels.fontFlags.subHeader}
                                    color={CommonColors.blue.main}
                                    weight={FontWeight.bold}
                                />
                                <PTypography
                                    labelText={getLabel("lbl59")}
                                    flag={Labels.fontFlags.smallText}
                                    color={CommonColors.grey.main}
                                    weight={FontWeight.bold}
                                />
                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl62")} ${Labels.symbols.required}`}
                                        value={formData.category}
                                        onChange={handleChange}
                                        helperText={errors?.category}
                                        name={Labels.lineItems.category}
                                        options={formDataList.category}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl60")} ${Labels.symbols.required}`}
                                        value={formData.typeOfJob}
                                        onChange={handleChange}
                                        helperText={errors?.typeOfJob}
                                        name={Labels.lineItems.typeOfJob}
                                        options={formDataList.typeOfJob}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl65")} ${Labels.symbols.required}`}
                                        value={formData.rateCard}
                                        onChange={handleChange}
                                        helperText={errors?.rateCard}
                                        name={Labels.lineItems.rateCard}
                                        options={formDataList.yesOrNo}
                                        disabled={true}
                                    />
                                </PGrid>
                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl96")} ${Labels.symbols.required}`}
                                        value={formData.competitiveBiddingMandatory}
                                        onChange={handleChange}
                                        helperText={errors?.competitiveBiddingMandatory}
                                        name={Labels.lineItems.competitiveBiddingMandatory}
                                        options={formDataList.yesOrNo}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl97")} ${Labels.symbols.required}`}
                                        value={formData.competitiveBiddingCompliant}
                                        onChange={handleChange}
                                        helperText={errors?.competitiveBiddingCompliant}
                                        name={Labels.lineItems.competitiveBiddingCompliant}
                                        options={formDataList.yesOrNo}
                                    />

                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl98")} ${Labels.symbols.required}`}
                                        value={formData.competitiveBiddingExceptionFormSigned}
                                        onChange={handleChange}
                                        helperText={errors?.competitiveBiddingExceptionFormSigned}
                                        name={Labels.lineItems.competitiveBiddingExceptionFormSigned}
                                        options={formDataList.yesOrNo}

                                    />

                                </PGrid>
                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl99")} ${Labels.symbols.required}`}
                                        value={formData.exceptionsReasonCode}
                                        onChange={handleChange}
                                        helperText={errors?.exceptionsReasonCode}
                                        name={Labels.lineItems.exceptionsReasonCode}
                                        options={yesNoOptions}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl61")} ${Labels.symbols.required}`}
                                        value={formData.itemCategory}
                                        onChange={handleChange}
                                        helperText={errors?.itemCategory}
                                        name={Labels.lineItems.itemCategory}
                                        options={typeofJobOptions}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl100")} ${Labels.symbols.required}`}
                                        value={formData.subCategory}
                                        onChange={handleChange}
                                        helperText={errors?.subCategory}
                                        name={Labels.lineItems.subCategory}
                                        options={typeofJobOptions}

                                    />
                                </PGrid>
                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown

                                        label={`${getLabel("lbl101")} ${Labels.symbols.required}`}
                                        value={formData.simplex}
                                        onChange={handleChange}
                                        helperText={errors?.simplex}
                                        name={Labels.lineItems.simplex}
                                        options={formDataList.simplex}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown

                                        label={`${getLabel("lbl102")} ${Labels.symbols.required}`}
                                        value={formData.tcoApprovalRequired}
                                        onChange={handleChange}
                                        helperText={errors?.tcoApprovalRequired}
                                        name={Labels.lineItems.tcoApprovalRequired}
                                        options={formDataList.yesOrNo}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl103")} ${Labels.symbols.required}`}
                                        value={formData.tcoApproved}
                                        onChange={handleChange}
                                        helperText={errors?.tcoApproved}
                                        name={Labels.lineItems.tcoApproved}
                                        options={formDataList.yesOrNo}
                                    />
                                </PGrid>
                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl63")} ${Labels.symbols.required}`}
                                        value={formData.dictatedJob}
                                        onChange={handleChange}
                                        helperText={errors?.dictatedJob}
                                        name={Labels.lineItems.dictatedJob}
                                        options={yesNoOptions}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl64")} ${Labels.symbols.required}`}
                                        value={formData.itemType}
                                        onChange={handleChange}
                                        helperText={errors?.itemType}
                                        name={Labels.lineItems.itemType}
                                        options={typeofJobOptions}

                                    />

                                </PGrid>
                                {/* <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Rate Card "}
                                        label={`${getLabel("lbl104")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                        
                                    />
                                </PGrid> */}
                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTextField
                                        label={`${getLabel("lbl66")} ${Labels.symbols.required}`}
                                        value={formData.itemName}
                                        onChange={handleChange}
                                        helperText={errors?.itemName}
                                        name={Labels.lineItems.itemName}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={8}>
                                    <PTextField
                                        label={`${getLabel("lbl67")} ${Labels.symbols.required}`}
                                        value={formData.itemNameDescription}
                                        onChange={handleChange}
                                        helperText={errors?.itemNameDescription}
                                        name={Labels.lineItems.itemNameDescription}
                                        multiline={true}
                                        rows={4.5}
                                    />
                                </PGrid>
                            </PGrid>

                            {/* Sustainability Information */}
                            <hr className="my-4" />
                            <PGrid container className={Labels.margin.mb4}>
                                <PTypography
                                    labelText={getLabel("lbl68")}
                                    flag={Labels.fontFlags.subHeader}
                                    color={CommonColors.blue.main}
                                    weight={FontWeight.bold}
                                />
                                <PTypography
                                    labelText={getLabel("lbl69")}
                                    flag={Labels.fontFlags.smallText}
                                    color={CommonColors.grey.main}
                                    weight={FontWeight.bold}
                                />

                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown

                                        label={`${getLabel("lbl70")} ${Labels.symbols.optional}`}
                                        value={formData.fscOrPefcMaterial}
                                        onChange={handleChange}
                                        helperText={errors?.fscOrPefcMaterial}
                                        name={Labels.lineItems.fscOrPefcMaterial}
                                        options={formDataList.yesOrNo}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl71")} ${Labels.symbols.optional}`}
                                        value={formData.recyclable}
                                        onChange={handleChange}
                                        helperText={errors?.recyclable}
                                        name={Labels.lineItems.recyclable}
                                        options={formDataList.yesOrNo}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl72")} ${Labels.symbols.optional}`}
                                        value={formData.sustainabilityOption}
                                        onChange={handleChange}
                                        helperText={errors?.sustainabilityOption}
                                        name={Labels.lineItems.sustainabilityOption}
                                        options={formDataList.yesOrNo}

                                    />
                                </PGrid>

                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl73")} ${Labels.symbols.optional}`}
                                        value={formData.recycledMaterial}
                                        onChange={handleChange}
                                        helperText={errors?.recycledMaterial}
                                        name={Labels.lineItems.recycledMaterial}
                                        options={formDataList.yesOrNo}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl74")} ${Labels.symbols.optional}`}
                                        value={formData.designedToBeReused}
                                        onChange={handleChange}
                                        helperText={errors?.designedToBeReused}
                                        name={Labels.lineItems.designedToBeReused}
                                        options={formDataList.yesOrNo}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl75")} ${Labels.symbols.optional}`}
                                        value={formData.containsPlastic}
                                        onChange={handleChange}
                                        helperText={errors?.containsPlastic}
                                        name={Labels.lineItems.containsPlastic}
                                        options={formDataList.yesOrNo}

                                    />
                                </PGrid>


                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl76")} ${Labels.symbols.optional}`}
                                        value={formData.containsRecycledPlastic}
                                        onChange={handleChange}
                                        helperText={errors?.containsRecycledPlastic}
                                        name={Labels.lineItems.containsRecycledPlastic}
                                        options={formDataList.yesOrNo}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTextField
                                        label={`${getLabel("lbl79")} ${Labels.symbols.optional}`}
                                        value={formData.recycledMaterialWeightKg}
                                        onChange={handleChange}
                                        helperText={errors?.recycledMaterialWeightKg}
                                        name={Labels.lineItems.recycledMaterialWeightKg}
                                    //width={250}
                                    //onChange={this.handleChange}
                                    />
                                </PGrid>
                            </PGrid>

                            {/* Catalogue & Sourcing Information */}
                            <hr className="my-4" />
                            <PGrid container className={Labels.margin.mb4}>
                                <PTypography
                                    labelText={getLabel("lbl104")}
                                    flag={Labels.fontFlags.subHeader}
                                    color={CommonColors.blue.main}
                                    weight={FontWeight.bold}
                                />
                                <PTypography
                                    labelText={getLabel("lbl105")}
                                    flag={Labels.fontFlags.smallText}
                                    color={CommonColors.grey.main}
                                    weight={FontWeight.bold}
                                />

                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl106")} ${Labels.symbols.required}`}
                                        value={formData.ratecardCatalogueItemDeclined}
                                        onChange={handleChange}
                                        helperText={errors?.ratecardCatalogueItemDeclined}
                                        name={Labels.lineItems.ratecardCatalogueItemDeclined}
                                        options={formDataList.yesOrNo}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl107")} ${Labels.symbols.required}`}
                                        value={formData.globalOrderWindowCatalogueName}
                                        onChange={handleChange}
                                        helperText={errors?.globalOrderWindowCatalogueName}
                                        name={Labels.lineItems.globalOrderWindowCatalogueName}
                                        options={yesNoOptions}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl108")} ${Labels.symbols.required}`}
                                        value={formData.regionalOrderWindowCatalogue}
                                        onChange={handleChange}
                                        helperText={errors?.regionalOrderWindowCatalogue}
                                        name={Labels.lineItems.regionalOrderWindowCatalogue}
                                        options={yesNoOptions}

                                    />
                                </PGrid>

                            </PGrid>
                            <PGrid container className={Labels.margin.mb3}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl109")} ${Labels.symbols.required}`}
                                        value={formData.localCatalogueName}
                                        onChange={handleChange}
                                        helperText={errors?.localCatalogueName}
                                        name={Labels.lineItems.localCatalogueName}
                                        options={yesNoOptions}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl110")} ${Labels.symbols.required}`}
                                        value={formData.eAuction}
                                        onChange={handleChange}
                                        helperText={errors?.eAuction}
                                        name={Labels.lineItems.eAuction}
                                        options={formDataList.yesOrNo}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl111")} ${Labels.symbols.required}`}
                                        value={formData.printingMethod}
                                        onChange={handleChange}
                                        helperText={errors?.printingMethod}
                                        name={Labels.lineItems.printingMethod}
                                        options={yesNoOptions}

                                    />
                                </PGrid>
                            </PGrid>
                            <PGrid container className={Labels.margin.mb3}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl112")} ${Labels.symbols.required}`}
                                        value={formData.typeOfItem}
                                        onChange={handleChange}
                                        helperText={errors?.typeOfItem}
                                        name={Labels.lineItems.typeOfItem}
                                        options={yesNoOptions}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTextField
                                        label={`${getLabel("lbl113")} ${Labels.symbols.required}`}
                                        value={formData.noOfMaterials}
                                        onChange={handleChange}
                                        helperText={errors?.noOfMaterials}
                                        name={Labels.lineItems.noOfMaterials}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl114")} ${Labels.symbols.required}`}
                                        value={formData.digitalInnovation}
                                        onChange={handleChange}
                                        helperText={errors?.digitalInnovation}
                                        name={Labels.lineItems.digitalInnovation}
                                        options={formDataList.yesOrNo}

                                    />
                                </PGrid>
                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl115")} ${Labels.symbols.required}`}
                                        value={formData.innovation}
                                        onChange={handleChange}
                                        helperText={errors?.innovation}
                                        name={Labels.lineItems.innovation}
                                        options={formDataList.yesOrNo}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl116")} ${Labels.symbols.required}`}
                                        value={formData.sourcingLocation}
                                        onChange={handleChange}
                                        helperText={errors?.sourcingLocation}
                                        name={Labels.lineItems.sourcingLocation}
                                        options={yesNoOptions}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl117")} ${Labels.symbols.required}`}
                                        value={formData.savingsType}
                                        onChange={handleChange}
                                        helperText={errors?.savingsType}
                                        name={Labels.lineItems.savingsType}
                                        options={yesNoOptions}

                                    />
                                </PGrid>

                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl118")} ${Labels.symbols.required}`}
                                        value={formData.savingsReason}
                                        onChange={handleChange}
                                        helperText={errors?.savingsReason}
                                        name={Labels.lineItems.savingsReason}
                                        options={yesNoOptions}

                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl119")} ${Labels.symbols.required}`}
                                        value={formData.owWithLink}
                                        onChange={handleChange}
                                        helperText={errors?.owWithLink}
                                        name={Labels.lineItems.owWithLink}
                                        options={formDataList.yesOrNo}

                                    />
                                </PGrid>
                            </PGrid>


                            {/* Spacifications */}
                            <hr className="my-4" />
                            <PGrid container className={Labels.margin.mb4}>
                                <PTypography
                                    labelText={getLabel("lbl83")}
                                    flag={Labels.fontFlags.subHeader}
                                    color={CommonColors.blue.main}
                                    weight={FontWeight.bold}
                                />
                                <PTypography
                                    labelText={getLabel("lbl84")}
                                    flag={Labels.fontFlags.smallText}
                                    color={CommonColors.grey.main}
                                    weight={FontWeight.bold}
                                />

                            </PGrid>
                            <PGrid container>
                                <PGrid item xs={12} sm={6} md={6}>
                                    <PTextField
                                        label={`${getLabel("lbl85")} ${Labels.symbols.required}`}
                                        value={formData.noOfVersion}
                                        onChange={handleChange}
                                        helperText={errors?.noOfVersion}
                                        name={Labels.lineItems.noOfVersion}
                                    />
                                </PGrid>

                            </PGrid>
                            <PGrid container className={Labels.margin.mb3}>
                                <PGrid item xs={12} sm={6} md={6}>
                                    <PTextField
                                        label={`${getLabel("lbl83")} ${Labels.symbols.required}`}
                                        value={formData.specifications}
                                        onChange={handleChange}
                                        helperText={errors?.specifications}
                                        name={Labels.lineItems.specifications}
                                        multiline={true}
                                        rows={4.5}
                                        width={100}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={6}>
                                    <PTextField
                                        label={`${getLabel("lbl86")}`}
                                        value={formData.notesComments}
                                        onChange={handleChange}
                                        //helperText={errors?.notesComments}
                                        name={Labels.lineItems.notesComments}
                                        multiline={true}
                                        rows={4.5}
                                        width={100}
                                    />
                                </PGrid>
                            </PGrid>

                            {/* Quantity */}
                            <hr className="my-4" />
                            <PGrid container className={Labels.margin.mb4}>
                                <PTypography
                                    labelText={getLabel("lbl87")}
                                    flag={Labels.fontFlags.subHeader}
                                    color={CommonColors.blue.main}
                                    weight={FontWeight.bold}
                                />
                                <PTypography
                                    labelText={getLabel("lbl88")}
                                    flag={Labels.fontFlags.smallText}
                                    color={CommonColors.grey.main}
                                    weight={FontWeight.bold}
                                />

                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={12} md={4}>
                                    <PDropdown
                                        label={`${getLabel("lbl89")} ${Labels.symbols.required}`}
                                        value={formData.quantityType}
                                        onChange={handleChange}
                                        helperText={errors?.quantityType}
                                        name={Labels.lineItems.quantityType}
                                        options={formDataList.quoteType}

                                    />
                                </PGrid>
                                {[1, 2, 3].includes(type) && (
                                    <PGrid item xs={12} sm={6} md={4}>
                                        <PTextField
                                            label={`${getLabel("lbl87")} ${Labels.symbols.required}`}
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            helperText={errors?.quantity}
                                            name={Labels.lineItems.quantity}
                                        />
                                    </PGrid>
                                )}
                                {[2, 3].includes(type) && (
                                    <PGrid item xs={12} sm={6} md={4}>
                                        <PTextField
                                            label={`Flat Size - L(m) ${Labels.symbols.required}`}
                                            value={formData.length}
                                            onChange={handleChange}
                                            helperText={errors?.length}
                                            name={Labels.lineItems.length}
                                        />
                                    </PGrid>
                                )}
                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                {[2, 3].includes(type) && (
                                    <PGrid item xs={12} sm={6} md={4}>
                                        <PTextField
                                            label={`Flat Size - W(m) ${Labels.symbols.required}`}
                                            value={formData.width}
                                            onChange={handleChange}
                                            helperText={errors?.width}
                                            name={Labels.lineItems.width}
                                        />
                                    </PGrid>
                                )}
                                {type === 3 && (
                                    <PGrid item xs={12} sm={6} md={4}>
                                        <PTextField
                                            label={`Flat Size - D/H(m) ${Labels.symbols.required}`}
                                            value={formData.depth}
                                            onChange={handleChange}
                                            helperText={errors?.depth}
                                            name={Labels.lineItems.depth}
                                        />
                                    </PGrid>
                                )}
                            </PGrid>
                            {[2, 3].includes(type) && (
                                <PGrid container className={Labels.margin.mb3}>
                                    <PGrid item xs={12} sm={12} md={4}>
                                        <PTypography
                                            labelText={type == 2 ? "Flat Size (SQM)" : "Flat Size (Cu.M)"}
                                            weight={FontWeight.bold}
                                        />
                                        <PTypography
                                            labelText={flatSize}
                                            color={CommonColors.grey.main}
                                            weight={FontWeight.bold}
                                        />
                                    </PGrid>
                                    <PGrid item xs={12} sm={12} md={4}>
                                        <PTypography
                                            labelText={type == 2 ? "Total Size (SQM)" : "Total Size (Cu.M)"}
                                            weight={FontWeight.bold}
                                        />
                                        <PTypography
                                            labelText={totalSize}
                                            color={CommonColors.grey.main}
                                            weight={FontWeight.bold}
                                        />
                                    </PGrid>
                                </PGrid>
                            )}

                            {[1, 2, 3].includes(type) && (
                                <PGrid container className={Labels.margin.mb4}>
                                    <PGrid item xs={12} sm={12} md={6}>
                                        <PTextField
                                            value={formData.files}
                                            onChange={handleChange}
                                            name={Labels.lineItems.files}
                                            type={Labels.flag.file}
                                            multiple={true}
                                            maxLength={5}
                                        />
                                        {/* <PTypography
                                            labelText={"You may attach up to 5 files of no more than 20mb each.."}
                                            flag={Labels.fontFlags.smallText}
                                            color={CommonColors.grey.main}
                                            weight={FontWeight.bold}
                                        />
                                        <PTypography
                                            labelText={"Type: .pdf .png .jpg .jpeg .doc .docx .ppt .pptx .xls .xls"}
                                            flag={Labels.fontFlags.smallText}
                                            color={CommonColors.grey.main}
                                            weight={FontWeight.bold}
                                        /> */}
                                    </PGrid>

                                    <PGrid item xs={12} sm={12} md={6} className="d-flex justify-content-end gap-2 mb-1">
                                        <PButton
                                            label={"Add New Item"}
                                            variant="outlined"
                                            onClick={(e) => handleSubmit(e, true)}
                                            width={180}
                                            height={50}
                                            color={CommonColors.blue.main}
                                        />
                                    </PGrid>


                                </PGrid>



                            )}
                        
                            {/* Button Section */}
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

export default LineItems;