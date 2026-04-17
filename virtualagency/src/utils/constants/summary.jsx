
export const getSummarySections = ({ clientInfo = [], enquiryDetails = [], lineItems = [] , suppiers = [], getLabel}) => {
  return [
    clientInfo.length > 0 && {
      step: 1,
      title: getLabel("lbl25"),
      items: clientInfo
    },

    enquiryDetails.length > 0 && {
      step: 2,
      title: getLabel("lbl21"),
      items: enquiryDetails
    },

    lineItems.length > 0 && {
      step: 3,
      title: "Line Items",
      items: lineItems
    },
    suppiers.length > 0 && {
      step: 4,
      title: "Line Items",
      items: lineItems
    }
  ].filter(Boolean);
};

export const getClientInfo = (fields = {}, formData = {}, formDataList = {}, getLabel, getOptionLabel, response = null) => {
    const source = response || formData;
    return [
        { label: getLabel("lbl27"), value: response ? source.entityname : getOptionLabel(formDataList.division, source.division)},
        { label: getLabel("lbl28"), value: response ? source.createdByUser : fields.clientName },
        { label: getLabel("lbl09"), value: response ? source.country : fields.country },
        { label: getLabel("lbl29"), value: response ? source.entityname : fields.entityName },
        { label: getLabel("lbl30"), value: response ? source.bussinessUnit : fields.businessUnit },
        { label: getLabel("lbl91"), value: response ? source.globalBussinessUnit : getOptionLabel(formDataList.globalBUMapping, source.globalBUMapping) },
        { label: getLabel("lbl92"), value: response ? source.aboveorAtmarket : getOptionLabel(formDataList.aboveAtMarket, source.aboveAtMarket)},
        { label: getLabel("lbl33"), value: response ? source.brand : getOptionLabel(formDataList.brand, source.brand) },
        { label: getLabel("lbl35"), value: response ? source.clientContact : getOptionLabel(formDataList.clientContact, source.clientContact)},
        { label: getLabel("lbl34"), value: response ? source.deliveryCountryname : getOptionLabel(formDataList.deliveryCountry, source.deliveryCountry) },
        { label: getLabel("lbl36"), value: response ? source.pmgEntityname : getOptionLabel(formDataList.pmgEntity, source.pmgEntity)}
    ];
};
export const getEnquiryDetails = ( formData = {}, formDataList = {}, getLabel, getOptionLabel, response = null) => {
    const source = response || formData;
    return [
        { label: getLabel("lbl42"), value: source.projectNo},
        { label: getLabel("lbl43"), value: source.estdate },
        { label: getLabel("lbl44"), value: source.briefdate },
        { label: getLabel("lbl45"), value: source.projectDesc },
        { label: getLabel("lbl46"), value: source.projectQuoteType },
        { label: getLabel("lbl47"), value: source.year },
        { label: getLabel("lbl93"), value: source.managementFeeType },
        { label: getLabel("lbl94"), value: source.hybrid == 1 ? "Yes" : "No" },
        { label: getLabel("lbl95"), value: source.attribute },
        { label: getLabel("lbl49"), value: getOptionLabel(formDataList.slaTemplate, source.slaTemplate) },
        { label: getLabel("lbl54"), value: `${""} - ${""}` },
        { label: getLabel("lbl55"), value: `${""} - ${""}` },
        { label: getLabel("lbl56"), value: `${""} - ${""}` },
        { label: getLabel("lbl57"), value: `${""} - ${""}` },
        { label: getLabel("lbl58"), value: `${""} - ${""}` }
    ];
};