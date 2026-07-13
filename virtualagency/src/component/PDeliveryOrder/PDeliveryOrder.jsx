import React, { useCallback, useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    Grid,
    Button,
    Divider,
    Avatar, Tooltip
} from "@mui/material";
import PTable from "../PTable/PTable";
import PGrid from "../PGrid/PGrid";
import PTypography from "../PTypography/PTypography";
import PCard from "../PCard/PCard";
import { Labels } from "../../utils/constants/labels";
import { CommonColors } from "../../utils/constants/colors";
import { FontWeight } from "../../utils/constants/fonts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PButton from "../PButton/PButton";
import { useLanguage } from "../../utils/constants/language";
import PTextField from "../PTextField/PTextField";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";

const PDeliveryOrder = () => {
    const [loading, setLoading] = useState(true);
    const { getLabel } = useLanguage();
    const [formData, setFormData] = useState({
        company: "",
        addressOne: "",
        addressTwo: "",
        addressThree: "",
        deptName: "",
        contactNo: "",
        remarks: "",
        id: 0
    });
    const [errors, setErrors] = useState({
        company: "",
        addressOne: "",
        addressTwo: "",
        addressThree: "",
        deptName: "",
        contactNo: "",
        remarks: ""
    });


    const handleChange = (e, row) => {
        const { name, value, label } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: ""   // clear only that field error
        }));
    }

    const handleEdit = (row) => {
        setFormData(row); // Load the selected row into the text fields
    };

    const [formDataList, setFormDataList] = useState({
        deliveryOrder: [{ field: "company", header: "Company Name" }, { field: "addressOne", header: "Address Line1" }
            , { field: "addressTwo", header: "Address Line2" }, { field: "addressThree", header: "Address Line3" }
            , { field: "deptName", header: "Name/Dept" }, { field: "contactNo", header: "Contact No" }, {
            field: "id", header: "", render: (row) => (
                <EditIcon onClick={() => handleEdit(row)} style={{ cursor: "pointer" }} color={CommonColors.yellow.main} variant="outlined"/>)
        }],

        data: [{
            id: 2,
            company: "XYZ",
            addressOne: "Coimbatore",
            contactNo: "9123456789",
            deptName : "Order"
        }]
    })


    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     try {
    //         setLoading(true);
    //         // const response = await PostApi(Dashboard_API.GetDetails, {
    //         //     Enquiryid: id,
    //         // });
    //     } catch (error) {
    //         toast(Labels.status.failure, Labels.message.somethingWentWrong);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSave = (e) => {

        setFormData({
            company: "",
            addressOne: "",
            addressTwo: "",
            addressThree: "",
            deptName: "",
            contactNo: "",
            remarks: "",
            id: 0
        });
    }
    return (
        <>
            <PCard className={Labels.margin.mb3}>
                <PGrid container className={Labels.margin.mb1}>
                    <PGrid item xs={12} sm={6} md={6}>
                        <PTypography
                            labelText={`${"Delivery Order"}`}
                            flag={Labels.fontFlags.subHeader}
                            color={CommonColors.blue.main}
                            weight={FontWeight.bold}
                        />
                    </PGrid>
                </PGrid>
                <Divider sx={{ mb: 2 }} />
                <PGrid container className={Labels.margin.mb4}>
                    <PGrid item xs={12} sm={6} md={7}>
                        <PTextField
                            label={`${"Company Name"} ${Labels.symbols.required}`}
                            value={formData.company}
                            onChange={handleChange}
                            helperText={errors?.company}
                            name={Labels.deliveryOrder.company}
                        />
                    </PGrid>
                    <PGrid item xs={12} sm={6} md={1} className={Labels.margin.mt3}>
                        <PButton
                            label={"Search"}
                            variant="outlined"
                            //onClick={(e) => handleExitDraft(e)}
                            width={95}
                            startIcon={<SearchIcon />}
                        />

                    </PGrid>
                </PGrid>
                <PGrid container className={Labels.margin.mb4}>
                    <PGrid item xs={12} sm={6} md={4}>
                        <PTextField
                            label={`${"Address Line1"} ${Labels.symbols.required}`}
                            value={formData.addressOne}
                            onChange={handleChange}
                            helperText={errors?.addressOne}
                            name={Labels.deliveryOrder.addressOne}
                        />
                    </PGrid>
                    <PGrid item xs={12} sm={6} md={4}>
                        <PTextField
                            label={`${"Name/Dept"} ${Labels.symbols.required}`}
                            value={formData.deptName}
                            onChange={handleChange}
                            helperText={errors?.deptName}
                            name={Labels.deliveryOrder.deptName}
                        />
                    </PGrid>
                </PGrid>
                <PGrid container className={Labels.margin.mb4}>
                    <PGrid item xs={12} sm={6} md={4}>
                        <PTextField
                            label={`${"Address Line2"}`}
                            value={formData.addressTwo}
                            onChange={handleChange}
                            helperText={errors?.addressTwo}
                            name={Labels.deliveryOrder.addressTwo}
                        />
                    </PGrid>
                    <PGrid item xs={12} sm={6} md={4}>
                        <PTextField
                            label={`${"Contact No"} ${Labels.symbols.required}`}
                            value={formData.contactNo}
                            onChange={handleChange}
                            helperText={errors?.contactNo}
                            name={Labels.deliveryOrder.contactNo}
                        />
                    </PGrid>

                </PGrid>
                <PGrid container className={Labels.margin.mb2}>
                    <PGrid item xs={12} sm={6} md={4}>
                        <PTextField
                            label={`${"Address Line3"}`}
                            value={formData.addressThree}
                            onChange={handleChange}
                            helperText={errors?.addressThree}
                            name={Labels.deliveryOrder.addressThree}
                        />
                    </PGrid>
                    <PGrid item xs={12} sm={6} md={4}>
                        <PTextField
                            label={`${"Remarks"}`}
                            value={formData.remarks}
                            onChange={handleChange}
                            helperText={errors?.remarks}
                            name={Labels.deliveryOrder.remarks}
                        />
                    </PGrid>
                </PGrid>

                <PGrid container className={Labels.margin.mb4}>
                    <PGrid item xs={12} sm={12} md={12} className="d-flex justify-content-end gap-2" >
                        <PButton
                            label={formData.id ? "Update Delivery Order" : "Save Delivery Order"}
                            variant="contained"
                            color={CommonColors.green.main}
                            onClick={(e) => handleSave(e, true)}
                            width={200}
                        />
                    </PGrid>
                </PGrid>
                <Divider sx={{ mb: 2 }} />

                <PGrid container className={Labels.margin.mb4}>
                    <PGrid item xs={12} sm={6} md={12}>
                        <PTable columns={formDataList.deliveryOrder} rows={formDataList.data} />
                    </PGrid>
                </PGrid>

            </PCard>
        </>
    )
}

export default PDeliveryOrder;