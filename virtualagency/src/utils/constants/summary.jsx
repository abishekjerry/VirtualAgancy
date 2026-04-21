
export const getSummarySections = ({ clientInfo = [], enquiryDetails = [], lineItems = [], suppliers = [], getLabel }) => {
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
    {
      step: 3,
      title: getLabel("lbl22"),
      items: lineItems
    },
    {
      step: 4,
      title: getLabel("lbl23"),
      items: suppliers
    }
  ].filter(Boolean);
};

export const getClientInfo = (fields = {}, formData = {}, formDataList = {}, getLabel, getOptionLabel, response = null) => {
  const source = response || formData;
  return [
    { label: getLabel("lbl27"), value: response ? source.entityname : getOptionLabel(formDataList.division, source.division) },
    { label: getLabel("lbl28"), value: response ? source.createdByUser : fields.clientName },
    { label: getLabel("lbl09"), value: response ? source.country : fields.country },
    { label: getLabel("lbl29"), value: response ? source.entityname : fields.entityName },
    { label: getLabel("lbl30"), value: response ? source.bussinessUnit : fields.businessUnit },
    { label: getLabel("lbl91"), value: response ? source.globalBussinessUnit : getOptionLabel(formDataList.globalBUMapping, source.globalBUMapping) },
    { label: getLabel("lbl92"), value: response ? source.aboveorAtmarket : getOptionLabel(formDataList.aboveAtMarket, source.aboveAtMarket) },
    { label: getLabel("lbl33"), value: response ? source.brand : getOptionLabel(formDataList.brand, source.brand) },
    { label: getLabel("lbl35"), value: response ? source.clientContact : getOptionLabel(formDataList.clientContact, source.clientContact) },
    { label: getLabel("lbl34"), value: response ? source.deliveryCountryname : getOptionLabel(formDataList.deliveryCountry, source.deliveryCountry) },
    { label: getLabel("lbl36"), value: response ? source.pmgEntityname : getOptionLabel(formDataList.pmgEntity, source.pmgEntity) }
  ];
};
export const getEnquiryDetails = (formData = {}, dynamicData = {}, formDataList = {}, getLabel, getOptionLabel, response = null) => {
  const source = response || formData;
  return [
    { label: getLabel("lbl42"), value: `${source.projectNo || source.projectNo || "-"}` },
    { label: getLabel("lbl43"), value: response ? source.estdate : source.estdate },
    { label: getLabel("lbl44"), value: response ? source.briefdate : source.briefdate },
    { label: getLabel("lbl45"), value: response ? source.projectDesc : source.projectDesc },
    { label: getLabel("lbl46"), value: response ? source.projectQuotetype : source.projectQuoteType },
    { label: getLabel("lbl47"), value: response ? source.year : source.year },
    { label: getLabel("lbl93"), value: response ? source.managementFeetype : source.managementFeetype },
    { label: getLabel("lbl94"), value: `${source.hybridModel || source.hybrid == 1 ? "Yes" : "No" || "-"}` },
    { label: getLabel("lbl95"), value: response ? source.attribute : source.attribute },
    { label: getLabel("lbl49"), value: `${source.slaTemplatename || getOptionLabel(formDataList.slaTemplate, source.slaTemplate) || "-"}` },
    { label: getLabel("lbl54"), value: `${source.quotestartdate || dynamicData?.quotestartdate || "-"} - ${source.quoteenddate || dynamicData?.quoteenddate || "-"}` },
    { label: getLabel("lbl55"), value: `${source.proofstartdate || dynamicData?.proofstartdate || "-"} - ${source.proofenddate || dynamicData?.proofenddate || "-"}` },
    { label: getLabel("lbl56"), value: `${source.productionstartdate || dynamicData?.productionstartdate || "-"} - ${source.productionenddate || dynamicData?.productionenddate || "-"}` },
    { label: getLabel("lbl57"), value: `${source.filecopiesstartdate || dynamicData?.filecopiesstartdate || "-"} - ${source.filecopiesenddate || dynamicData?.filecopiesenddate || "-"}` },
    { label: getLabel("lbl58"), value: `${source.invoicestartdate || dynamicData?.invoicestartdate || "-"} - ${source.invoiceenddate || dynamicData?.invoiceenddate || "-"}` }
  ];
};

export const getLineneItems = (formData = {}, formDataList = {}, getLabel, getOptionLabel, response = null) => {
  const source = response || formData;
  const lineItemMapping = [
    { key: "printornonprint", label: "lbl62" },
    { key: "tojabc", label: "lbl60" },
    { key: "localRateCard", label: "lbl65" },
    { key: "competbidmandate", label: "lbl96" },
    { key: "competbidcomplaint", label: "lbl97" },
    { key: "competbidexception", label: "lbl98" },
    { key: "exceptionreason", label: "lbl99" },

    { key: "productcategory", label: "lbl61" },
    { key: "subCategory", label: "lbl100" },
    { key: "simplex", label: "lbl101" },
    { key: "tcOapproval", label: "lbl102" },
    { key: "tcOapproved", label: "lbl103" },

    { key: "dictatedJob", label: "lbl63" },
    { key: "itemtype", label: "lbl64" },
    { key: "incoterm", label: "lbl152" },
    { key: "itemName", label: "lbl66" },
    { key: "itemDescription", label: "lbl67" },

    { key: "usingFSCMaterial", label: "lbl70" },
    { key: "oekotexCertification", label: "lbl151" },
    { key: "designedforrecycling", label: "lbl71" },
    { key: "plasticapartfromPLA", label: "lbl75" },
    { key: "proposedwithsustainabilityoption", label: "lbl72" },
    { key: "containrecycledmaterial", label: "lbl73" },
    { key: "containrecycledplastic", label: "lbl76" },
    { key: "weightageofrecycledmaterial", label: "lbl79" },
    { key: "isthisitemdesignedtobereused", label: "lbl74" },

    { key: "rateCard", label: "lbl106" },
    { key: "eauction", label: "lbl110" },
    { key: "promoOSSOrderWindows", label: "lbl107" },
    { key: "regionalname", label: "lbl108" },
    { key: "catalogueUsage", label: "lbl109" },
    { key: "printingMethod", label: "lbl111" },
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

  const items = formDataList?.lineItems?.length ? formDataList.lineItems : response;
  const lineItems = items.map((item, index) => ({
    itemTitle: `Item ${index + 1}`,
    itemColor: "warning",
    data: lineItemMapping.map(field => ({
      label: field.label === "Attachment" ? field.label : getLabel(field.label),
      value: field.key ? item[field.key] ?? "-" : field.value
    }))
  }));

  return lineItems;
};


export const getSuppliers = (formData = [], response = null) => {
  const source = response || formData;
  return source.map(item => ({
    label: "",
    value: item.suppliername || "-"
  }));
};