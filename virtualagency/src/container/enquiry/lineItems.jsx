import { Box } from "@mui/material";
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
import PTextField from "../../component/PTextField/PTextField";
import { getEnquirySteps } from "../../utils/commonFunction/common";
import { useLanguage } from "../../utils/constants/language";
const LineItems = () => {
    const { getLabel } = useLanguage();
    const enquirySteps = getEnquirySteps(getLabel);
    const [projectNo, setprojectNo] = useState("");
    const [quoteType, setQuoteType] = useState("");
    const [description, setDescription] = useState("");
    const [typeofJob, setTypeofJob] = useState("");

    const yesNoOptions = [
        { label: "Yes", value: 1 },
        { label: "No", value: 2 },
    ];
    const typeofJobOptions = [
        { label: "Print", value: 1 },
        { label: "Digital", value: 2 },
    ];

    const quoteTypeOptions = [
        { label: "Quote of Quantity", value: 1 },
        { label: "Quote of Quantity & Size", value: 2 }
    ];


    const handleChange = (e) => {
        const { name, value } = e.target;
    };

    return (
        <>
            <Box sx={{ px: 3, py: 3 }}>
                <PGrid container className={Labels.margin.mb3} >
                    <PStepper steps={enquirySteps} activeStep={2}></PStepper>
                </PGrid>
                <PGrid container className={Labels.margin.mb3} >
                    <PGrid item xs={12} sm={12} md={9}>
                        <PCard>
                            {/* Line Items */}
                            <PGrid container className={Labels.margin.mb3}>
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
                                        name={"Type of Job "}
                                        label={`${getLabel("lbl60")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={typeofJobOptions}
                                    //width={230}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Item Category "}
                                        label={`${getLabel("lbl61")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={typeofJobOptions}
                                    //width={230}
                                    />

                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Urgent / Non-Urgent "}
                                        label={`${getLabel("lbl62")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={typeofJobOptions}
                                    //width={230}
                                    />

                                </PGrid>
                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Dictated Job  "}
                                        label={`${getLabel("lbl63")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Item Type  "}
                                        label={`${getLabel("lbl64")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={typeofJobOptions}
                                    //width={230}
                                    />

                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Rate Card "}
                                        label={`${getLabel("lbl65")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />

                                </PGrid>
                            </PGrid>

                            {/* Extra Field only for nestle */}
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Dictated Job  "}
                                        label={`${getLabel("lbl96")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Item Type  "}
                                        label={`${getLabel("lbl97")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={typeofJobOptions}
                                    //width={230}
                                    />

                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Rate Card "}
                                        label={`${getLabel("lbl98")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />

                                </PGrid>
                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Dictated Job  "}
                                        label={`${getLabel("lbl99")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Item Type  "}
                                        label={`${getLabel("lbl100")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={typeofJobOptions}
                                    //width={230}
                                    />

                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Rate Card "}
                                        label={`${getLabel("lbl101")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />
                                </PGrid>
                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Dictated Job  "}
                                        label={`${getLabel("lbl102")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Item Type  "}
                                        label={`${getLabel("lbl103")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={typeofJobOptions}
                                    //width={230}
                                    />

                                </PGrid>
                                {/* <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Rate Card "}
                                        label={`${getLabel("lbl104")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                        //width={230}
                                    />
                                </PGrid> */}
                            </PGrid>

                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTextField
                                        name={"Item Name"}
                                        label={`${getLabel("lbl66")} ${Labels.symbols.required}`}
                                        value={projectNo}
                                    //width={250}
                                    //onChange={this.handleChange}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={8}>
                                    <PTextField
                                        name="itemNameDescription"
                                        label={`${getLabel("lbl67")} ${Labels.symbols.required}`}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        multiline={true}
                                        rows={4.5}
                                        //width={500}
                                    // helperText={errors?.description}
                                    />
                                </PGrid>
                            </PGrid>

                            {/* Sustainability Information */}
                            <hr className="my-4" />
                            <PGrid container className={Labels.margin.mb3}>
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
                                        name={"Produced on FSC or PEFC Material"}
                                        label={`${getLabel("lbl70")} ${Labels.symbols.optional}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={typeofJobOptions}
                                    //width={230}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Is the item recyclable"}
                                        label={`${getLabel("lbl71")} ${Labels.symbols.optional}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Sustainability Option"}
                                        label={`${getLabel("lbl72")} ${Labels.symbols.optional}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />
                                </PGrid>

                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Contains Recycled Material"}
                                        label={`${getLabel("lbl73")} ${Labels.symbols.optional}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Designed to be Reused"}
                                        label={`${getLabel("lbl74")} ${Labels.symbols.optional}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Contains Plastic? "}
                                        label={`${getLabel("lbl75")} ${Labels.symbols.optional}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />
                                </PGrid>


                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Contains Recycled Plastic"}
                                        label={`${getLabel("lbl76")} ${Labels.symbols.optional}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTextField
                                        name={"Weightage of Recycled Material (Kg)"}
                                        label={`${getLabel("lbl79")} ${Labels.symbols.optional}`}
                                        value={projectNo}
                                    //width={250}
                                    //onChange={this.handleChange}
                                    />
                                </PGrid>
                            </PGrid>

                            {/* Catalogue & Sourcing Information */}
                            <hr className="my-4" />
                            <PGrid container className={Labels.margin.mb3}>
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
                                        name={"Produced on FSC or PEFC Material"}
                                        label={`${getLabel("lbl106")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={typeofJobOptions}
                                    //width={230}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Is the item recyclable"}
                                        label={`${getLabel("lbl107")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Sustainability Option"}
                                        label={`${getLabel("lbl108")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />
                                </PGrid>

                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Contains Recycled Material"}
                                        label={`${getLabel("lbl109")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Designed to be Reused"}
                                        label={`${getLabel("lbl110")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PDropdown
                                        name={"Contains Plastic? "}
                                        label={`${getLabel("lbl111")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={230}
                                    />
                                </PGrid>


                            </PGrid>
                            <PGrid container>
                                <PGrid item xs={12} sm={6} md={3}>
                                    <PDropdown
                                        name={"Contains Recycled Plastic"}
                                        label={`${getLabel("lbl112")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={170}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={3}>
                                    <PTextField
                                        name={"Weightage of Recycled Material (Kg)"}
                                        label={`${getLabel("lbl113")} ${Labels.symbols.required}`}
                                        value={projectNo}
                                    //width={170}
                                    //onChange={this.handleChange}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={3}>
                                    <PDropdown
                                        name={"Contains Recycled Plastic"}
                                        label={`${getLabel("lbl114")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={170}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={3}>
                                    <PDropdown
                                        name={"Contains Recycled Plastic"}
                                        label={`${getLabel("lbl115")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={170}
                                    />
                                </PGrid>
                            </PGrid>
                            <PGrid container className={Labels.margin.mb3}>
                                <PGrid item xs={12} sm={6} md={3}>
                                    <PDropdown
                                        name={"Contains Recycled Plastic"}
                                        label={`${getLabel("lbl116")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={170}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={3}>
                                    <PDropdown
                                        name={"Contains Recycled Plastic"}
                                        label={`${getLabel("lbl117")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={170}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={3}>
                                    <PDropdown
                                        name={"Contains Recycled Plastic"}
                                        label={`${getLabel("lbl118")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={170}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={3}>
                                    <PDropdown
                                        name={"Contains Recycled Plastic"}
                                        label={`${getLabel("lbl119")} ${Labels.symbols.required}`}
                                        value={typeofJob}
                                        onChange={handleChange}
                                        options={yesNoOptions}
                                    //width={170}
                                    />
                                </PGrid>
                            </PGrid>

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
                                        name={"No. of Version"}
                                        label={`${getLabel("lbl85")} ${Labels.symbols.required}`}
                                        value={projectNo}
                                    //width={250}
                                    //onChange={this.handleChange}
                                    />
                                </PGrid>

                            </PGrid>
                            <PGrid container className={Labels.margin.mb4}>
                                <PGrid item xs={12} sm={6} md={6}>
                                    <PTextField
                                        name="Specifications"
                                        label={`${getLabel("lbl83")} ${Labels.symbols.required}`}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        multiline={true}
                                        rows={4.5}
                                        width={100}
                                    // helperText={errors?.description}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={6}>
                                    <PTextField
                                        name="Notes / Comments "
                                        label={`${getLabel("lbl86")} ${Labels.symbols.required}`}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        multiline={true}
                                        rows={4.5}
                                        width={100}
                                    // helperText={errors?.description}
                                    />
                                </PGrid>
                            </PGrid>

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
                                        name="Quote Type"
                                        label={`${getLabel("lbl89")} ${Labels.symbols.required}`}
                                        value={quoteType}
                                        onChange={handleChange}
                                        options={quoteTypeOptions}
                                    //width={230}
                                    />
                                </PGrid>
                                <PGrid item xs={12} sm={6} md={4}>
                                    <PTextField
                                        name={"Quantity"}
                                        label={`${getLabel("lbl87")} ${Labels.symbols.required}`}
                                        value={projectNo}
                                    //width={250}
                                    //onChange={this.handleChange}
                                    />
                                </PGrid>
                            </PGrid>
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

        </>
    );
};

export default LineItems;