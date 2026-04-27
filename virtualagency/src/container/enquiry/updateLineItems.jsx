import React, { useEffect, useState } from "react";
import PDialog from "../../component/PDialog/PDialog";
import { CommonColors } from "../../utils/constants/colors";
import { Labels } from "../../utils/constants/labels";
import PGrid from "../../component/PGrid/PGrid";
import { useLanguage } from "../../utils/constants/language";
import { allowOnlyNumbers, getOptionLabel, getOptionValue, toast } from "../../utils/commonFunction/common";
import { PostApi } from "../../utils/api/networking";
import { LineItems_API } from "../../utils/api/apiUrl";
import PButton from "../../component/PButton/PButton";
import PTextField from "../../component/PTextField/PTextField";
import PDropdown from "../../component/PDropdown/PDropdown";

const UpdateLineItems = ({ open, onClose, onSubmit, data = {} }) => {
    const { getLabel } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        itemName: "",
        quantity: "",
        itemNameDescription: "",
        globalOrderWindowCatalogueName: "",
        printingMethod: "",
        localCatalogueName: "",
        digitalInnovation: "",
        innovation: "",
        sourcingLocation: "",
        noOfVersion: "",
        specifications: "",
        notesComments: ""
    });

    const [formDataList, setFormDataList] = useState({
        globalOrder: [],
        localCatalog: [],
        sourcingLocation: [],
        printingMethod: [],
        yesNoNa: [{ label: "Yes", value: 1 }, { label: "No", value: 2 }, { label: "N/A", value: 3, selected: true }],
    });

    const LineItemsMaster = async (data) => {
        try {
            setLoading(false);
            const response = await PostApi(LineItems_API.GetEnqLineItemsMaster, {
                TypeOfJob: data
            });
            setFormDataList(prev => ({
                ...prev,
                localCatalog: response.localCatalog,
                globalOrder: response.globalOrder,
                sourcingLocation: response.sourcingLocation,
                printingMethod: response.printingMethod,
            }));

        } catch (error) {
            toast(Labels.status.failure, Labels.message.somethingWentWrong);
        } finally {
            setLoading(false);
        }
    };

    const [errors, setErrors] = useState({
        itemName: "",
        quantity: "",
        itemNameDescription: "",
        globalOrderWindowCatalogueName: "",
        printingMethod: "",
        localCatalogueName: "",
        digitalInnovation: "",
        innovation: "",
        sourcingLocation: "",
        noOfVersion: "",
        specifications: "",
        notesComments: ""
    });

    // ✅ Load data when popup opens
    useEffect(() => {
        const category = getOptionValue(data.items, "Category");
        LineItemsMaster(category);
        const printingMethod = getOptionValue(data.items, "Printing Method");
        const itemName = getOptionValue(data.items, "Item Name");
        const itemNameDescription = getOptionValue(data.items, "Item Name Description");
        const noOfVersion = getOptionValue(data.items, "No.of.version");
        const specifications = getOptionValue(data.items, "Specifications");
        const notesComments = getOptionValue(data.items, "Notes/Comments");
        const digitalInnovation = getOptionValue(data.items, "Digital Innovation");
        const innovation = getOptionValue(data.items, "Innovation");
        const sourcingLocation = getOptionValue(data.items, "Sourcing Location");
        const globalOrderWindowCatalogueName = getOptionValue(data.items, "Global Order Window Catalogue Name");
        const localCatalogueName = getOptionValue(data.items, "Local Catalogue Name");
        const quantity = getOptionValue(data.items, "Quantity");
        console.log(data,"useEffect");
        if (open && data) {
            setFormData(prev => ({
                ...prev,
                itemName: itemName,
                itemNameDescription: itemNameDescription,
                noOfVersion: noOfVersion,
                specifications: specifications,
                notesComments: notesComments,
                sourcingLocation: getOptionValue(formDataList.sourcingLocation, sourcingLocation),
                globalOrderWindowCatalogueName: getOptionValue(formDataList.globalOrder, globalOrderWindowCatalogueName),
                localCatalogueName: getOptionValue(formDataList.localCatalog, localCatalogueName),
                digitalInnovation: getOptionValue(formDataList.yesNoNa, digitalInnovation),
                innovation: getOptionValue(formDataList.yesNoNa, innovation),
                printingMethod: getOptionValue(formDataList.printingMethod, printingMethod),
                quantity: quantity,
            }));
        }
    }, [open, data]);

    const fieldConfig = {
        [Labels.lineItems.noOfVersion]: { type: "number" },
        [Labels.lineItems.quantity]: { type: "number" },
    };

    // ✅ Handle Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        const config = fieldConfig[name];
        const data = config?.type === "number" ? allowOnlyNumbers(value, config?.max) : value;
        setFormData(prev => ({
            ...prev,
            [name]: data
        }));

        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));
    };

    const LineItemsValidation = () => {
        const requiredFields = [
            Labels.lineItems.itemName,
            Labels.lineItems.itemNameDescription,

            // Catalogue Section
            Labels.lineItems.globalOrderWindowCatalogueName,
            Labels.lineItems.localCatalogueName,
            Labels.lineItems.printingMethod,
            Labels.lineItems.digitalInnovation,
            Labels.lineItems.innovation,
            Labels.lineItems.sourcingLocation,

            // Specifications
            Labels.lineItems.noOfVersion,
            Labels.lineItems.specifications,

            //quantity
            Labels.lineItems.quantity,
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

    // ✅ Submit
    const handleSubmit = () => {
        if (!LineItemsValidation()) return;
        onSubmit(formData);
        onClose();
    };

    {/*Update LineItems*/ }
    return (
        < PDialog
            open={open}
            onClose={onClose}
            title={"Update LineItems"}
            showCloseIcon={true}
            maxWidth="lg"
            actions={
                < PGrid className="d-flex align-items-center justify-content-end gap-2" >
                    <PButton
                        fullWidth
                        label={getLabel("lbl125")}
                        variant="outlined"
                        onClick={onClose}
                        color={CommonColors.grey.main}
                        width={120}
                    />
                    <PButton
                        fullWidth
                        label={getLabel("lbl124")}
                        variant={Labels.contained}
                        onClick={handleSubmit}
                        color={CommonColors.green.main}
                        width={120}
                    />
                </PGrid >
            }

        >
            <PGrid container className={Labels.margin.mb4}>
                <PGrid item xs={12} sm={6} md={4}>
                    <PTextField
                        label={`${getLabel("lbl66")} ${Labels.symbols.required}`}
                        value={formData.itemName}
                        onChange={handleChange}
                        helperText={errors?.itemName}
                        name={Labels.lineItems.itemName}
                    />
                    <PTextField
                        label={`${getLabel("lbl87")} ${Labels.symbols.required}`}
                        value={formData.quantity}
                        onChange={handleChange}
                        helperText={errors?.quantity}
                        name={Labels.lineItems.quantity}
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
            <PGrid container className={Labels.margin.mb4}>
                <PGrid item xs={12} sm={6} md={4}>
                    <PDropdown
                        label={`${getLabel("lbl107")} ${Labels.symbols.required}`}
                        value={formData.globalOrderWindowCatalogueName}
                        onChange={handleChange}
                        helperText={errors?.globalOrderWindowCatalogueName}
                        name={Labels.lineItems.globalOrderWindowCatalogueName}
                        options={formDataList.globalOrder}
                        flag={Labels.flag.auto}
                        disabled={true}
                    />
                </PGrid>
                <PGrid item xs={12} sm={6} md={4}>
                    <PDropdown
                        label={`${getLabel("lbl111")} ${Labels.symbols.required}`}
                        value={formData.printingMethod}
                        onChange={handleChange}
                        helperText={errors?.printingMethod}
                        name={Labels.lineItems.printingMethod}
                        options={formDataList.printingMethod}
                        flag={Labels.flag.auto}
                        disabled={true}
                    />
                </PGrid>
                <PGrid item xs={12} sm={6} md={4}>
                    <PDropdown
                        label={`${getLabel("lbl109")} ${Labels.symbols.required}`}
                        value={formData.localCatalogueName}
                        onChange={handleChange}
                        helperText={errors?.localCatalogueName}
                        name={Labels.lineItems.localCatalogueName}
                        options={formDataList.localCatalog}
                        flag={Labels.flag.auto}
                        disabled={true}
                    />
                </PGrid>
            </PGrid>
            <PGrid container className={Labels.margin.mb4}>
                <PGrid item xs={12} sm={6} md={4}>
                    <PDropdown
                        label={`${getLabel("lbl114")} ${Labels.symbols.required}`}
                        value={formData.digitalInnovation}
                        onChange={handleChange}
                        helperText={errors?.digitalInnovation}
                        name={Labels.lineItems.digitalInnovation}
                        options={formDataList.yesNoNa}
                        disabled={true}
                    />
                </PGrid>
                <PGrid item xs={12} sm={6} md={4}>
                    <PDropdown
                        label={`${getLabel("lbl115")} ${Labels.symbols.required}`}
                        value={formData.innovation}
                        onChange={handleChange}
                        helperText={errors?.innovation}
                        name={Labels.lineItems.innovation}
                        options={formDataList.yesNoNa}
                        disabled={true}
                    />
                </PGrid>
                <PGrid item xs={12} sm={6} md={4}>
                    <PDropdown
                        label={`${getLabel("lbl116")} ${Labels.symbols.required}`}
                        value={formData.sourcingLocation}
                        onChange={handleChange}
                        helperText={errors?.sourcingLocation}
                        name={Labels.lineItems.sourcingLocation}
                        options={formDataList.sourcingLocation}
                        flag={Labels.flag.auto}

                    />
                </PGrid>
            </PGrid>
            <PGrid container className={Labels.margin.mb3}>
                <PGrid item xs={12} sm={6} md={4}>
                    <PTextField
                        label={`${getLabel("lbl85")} ${Labels.symbols.required}`}
                        value={formData.noOfVersion}
                        onChange={handleChange}
                        helperText={errors?.noOfVersion}
                        name={Labels.lineItems.noOfVersion}
                    />
                </PGrid>
                <PGrid item xs={12} sm={6} md={4}>
                    <PTextField
                        label={`${getLabel("lbl83")} ${Labels.symbols.required}`}
                        value={formData.specifications}
                        onChange={handleChange}
                        helperText={errors?.specifications}
                        name={Labels.lineItems.specifications}
                        multiline={true}
                        rows={2.5}
                        width={100}
                    />
                </PGrid>
                <PGrid item xs={12} sm={6} md={4}>
                    <PTextField
                        label={`${getLabel("lbl86")}`}
                        value={formData.notesComments}
                        onChange={handleChange}
                        //helperText={errors?.notesComments}
                        name={Labels.lineItems.notesComments}
                        multiline={true}
                        rows={2.5}
                        width={100}
                    />
                </PGrid>
            </PGrid>
        </PDialog >

    );
};

export default UpdateLineItems;