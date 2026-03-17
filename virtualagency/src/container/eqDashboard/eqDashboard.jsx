import React, { useState } from "react";
import { Box, Grid, Button, Typography, Container, Paper, IconButton, Tooltip } from "@mui/material";
import PNavbar from "../../component/PNavbar/PNavbar";
import PDropdown from "../../component/PDropdown/PDropdown";
import PDatepicker from "../../component/PDatepicker/PDatepicker";
import PDashboardCard from "../../component/PDashboardCard/PDashboardCard";
import PPieChart from "../../component/PChart/PPieChart";
import PBarChart from "../../component/PChart/PBarChart";
import PLineChart from "../../component/PChart/PLineChart";
import PTable from "../../component/PTable/PTable";
import { Labels } from "../../utils/constants/labels";
import PButton from "../../component/PButton/PButton";
import PTypography from "../../component/PTypography/PTypography";
import { CommonColors } from "../../utils/constants/colors";
import PGrid from "../../component/PGrid/PGrid";
import PCard from "../../component/PCard/PCard";
import ShowChartIcon from "@mui/icons-material/ShowChart"
import BarChartIcon from "@mui/icons-material/BarChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import PToggle from "../../component/PToggle/PToggle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PSearch from "../../component/PSearch/PSearch";
import PTextField from "../../component/PTextField/PTextField";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CheckCircleIcon from '@mui/icons-material/TaskAlt';
import { FontFamily, FontWeight } from '../../utils/constants/fonts'
import { useLanguage } from "../../utils/constants/language";

const EqDashboard = () => {
  const [date, setDate] = useState("");
  const [chartType, setChartType] = useState("pie");
  const [country, setCountry] = useState("");
  const [user, setUser] = useState("");
  const { getLabel } = useLanguage();

  const cardData = [
    {
      title: getLabel("lbl12"),
      value: 105,
      subtitle: getLabel("lbl16"),
      iconColor: Labels.primary,
      icon: <AssignmentIcon />,
    },
    {
      title: getLabel("lbl13"),
      value: 2,
      subtitle: getLabel("lbl17"),
      iconColor: Labels.primary,
      icon: <PendingActionsIcon />,
    },
    {
      title: getLabel("lbl14"),
      value: 18,
      subtitle: getLabel("lbl18"),
      iconColor: Labels.primary,
      icon: <EmojiEventsIcon />,
    },
    {
      title: getLabel("lbl15"),
      value: 11,
      subtitle: getLabel("lbl18"),
      iconColor: Labels.primary,
      icon: <TaskAltIcon />,
    },
  ];

  const chartData = [
    { name: "Draft", value: 10 },
    { name: "RFQ Sent To Supplier", value: 8 },
    { name: "Quote Sent To Customer", value: 5 },
    { name: "Revised Quote Requested", value: 4 },
    { name: "Chased Customer For Order", value: 7 },
    { name: "Order Raised", value: 9 },
    { name: "Order Confirmed", value: 6 },
    { name: "Awaiting Artwork/Sample", value: 2 }
  ];


  const columns = [
    { field: "enquiryId", header: "Enquiry ID" },
    { field: "projectNumber", header: "Project Number" },
    { field: "projectName", header: "Project Name" },
    { field: "requestedDate", header: "Requested Date" },
    { field: "status", header: "Status" },
    { field: "surveyStatus", header: "Survey Status" },

  ];
  const rows = [
    {
      enquiryId: "ENQ000445",
      projectNumber: "",
      projectName: "",
      requestedDate: "06/01/2026",
      status: "Draft",
      surveyStatus: ""
    },
    {
      enquiryId: "ENQ000428",
      projectNumber: "PH23454",
      projectName: "PH23454",
      requestedDate: "12/08/2025",
      status: "RFQ Sent To Supplier",
      surveyStatus: ""
    },
    {
      enquiryId: "ENQ000403",
      projectNumber: "TestEnqRepeatItem_PH",
      projectName: "TestEnqRepeatItem_PH",
      requestedDate: "17/07/2025",
      status: "Quotes Received From Suppliers",
      surveyStatus: ""
    },
    {
      enquiryId: "ENQ000402",
      projectNumber: "TestingIssue_PH",
      projectName: "TestingIssue_PH",
      requestedDate: "03/07/2025",
      status: "Draft",
      surveyStatus: ""
    },
    {
      enquiryId: "ENQ000401",
      projectNumber: "TestEnquiryNew_PH",
      projectName: "TestEnquiryNew_PH",
      requestedDate: "20/06/2025",
      status: "Quotes Received From Suppliers",
      surveyStatus: ""
    },
    {
      enquiryId: "ENQ000400",
      projectNumber: "test proj",
      projectName: "test proj",
      requestedDate: "10/06/2025",
      status: "Quotes Received From Suppliers",
      surveyStatus: ""
    },
    {
      enquiryId: "ENQ000399",
      projectNumber: "TestClientPage_PH",
      projectName: "TestClientPage_PH",
      requestedDate: "04/06/2025",
      status: "Quote Sent To Customer",
      surveyStatus: ""
    },
    {
      enquiryId: "ENQ000398",
      projectNumber: "test proj",
      projectName: "Test Proj",
      requestedDate: "15/05/2025",
      status: "Quotes Received From Suppliers",
      surveyStatus: ""
    },
    {
      enquiryId: "ENQ000397",
      projectNumber: "test proj",
      projectName: "test proj",
      requestedDate: "15/05/2025",
      status: "Quotes Received From Suppliers",
      surveyStatus: ""
    },
    {
      enquiryId: "ENQ000396",
      projectNumber: "Test proj",
      projectName: "test proj",
      requestedDate: "14/05/2025",
      status: "Draft",
      surveyStatus: ""
    }
  ]
  const chartOptions = [
    {
      label: "Line",
      value: "line",
      icon: <ShowChartIcon fontSize="small" />,
      component: PLineChart
    },
    {
      label: "Bar",
      value: "bar",
      icon: <BarChartIcon fontSize="small" />,
      component: PBarChart
    },
    {
      label: "Pie",
      value: "pie",
      icon: <PieChartIcon fontSize="small" />,
      component: PPieChart
    }
  ];

  const userList = [
    { value: 1, label: "demo sg" },
    { value: 2, label: "Eddie Seah" },
    { value: 3, label: "huikeng tan" }
  ]
  const counties = [
    { value: 1, label: "Thailand" },
    { value: 2, label: "Janpen" },
    { value: 3, label: "India" }
  ]

  const iconStyle = {
    border: "1px solid #e2e8f0",
    color: "#64748b",
    "&:hover": { bgcolor: "#f8fafc" }
  };
  const handleReset = () => {
    console.log("Reset form");
  };

  const handleExport = () => {
    console.log("Export data");
  };

  const handleChoose = () => {
    console.log("Choose selected");
  };

  const icons = [
    { icon: <RestartAltIcon fontSize="small" />, tooltip: "Reset", action: handleReset },
    { icon: <FileDownloadIcon fontSize="small" />, tooltip: "Export", action: handleExport },
    { icon: <CheckCircleIcon fontSize="small" />, tooltip: "Choose", action: handleChoose }
  ];


  const selected = chartOptions.find(c => c.value === chartType);
  const SelectedChart = selected?.component;
  return (
    <>
      <Box sx={{ px: 3, py: 3 }}>
        <PGrid container className={Labels.margin.mb3}>
          <PGrid item xs={12} sm={6} md={7}>
            <PTypography
              labelText={`${getLabel("lbl08")}, ${localStorage.getItem("user")}`}
              weight={FontWeight.bold}
              flag={Labels.fontFlags.subHeader}
              color={CommonColors.red}
              style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
            />
          </PGrid>
          <PGrid item xs={12} sm={6} md={5} className="d-flex align-items-center gap-2">
            <PDatepicker
              value={date}
              onChange={(e) => setDate(e.target.value)}
              width={250}
            />
            <PDatepicker
              value={date}
              onChange={(e) => setDate(e.target.value)}
              width={250}
            />
            <PButton
              label={getLabel("lbl40")}
              onClick={(e) => handleSubmit(e, true)}
              fullWidth
              width={200}

            />
          </PGrid>

        </PGrid>

        <PGrid container className={Labels.margin.mb3}>
          {cardData.map((card, index) => (
            <PGrid key={index} item xs={12} sm={6} md={3} lg={3}>
              <PDashboardCard {...{ ...card, bgColor: CommonColors.bg_violet }} />
            </PGrid>
          ))}
        </PGrid>

        <PGrid container className={Labels.margin.mb3}>
          <PGrid item xs={12} sm={6} md={8}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "flex-end", margin: "6px 0px" }}>
              {icons.map((item, index) => (
                <Tooltip title={item.tooltip} arrow key={index}>
                  <IconButton sx={iconStyle} onClick={item.action}>
                    {item.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          </PGrid>
          <PGrid item xs={12} sm={6} md={4} style={{ display: "flex", flexDirection: "column", gap: "8px", margin: "6px 0px", }}>
            <div style={{ display: "flex", justifyContent: "flex-end", }} >
              <PToggle
                options={chartOptions}
                value={chartType}
                onChange={setChartType}

              />
            </div>
          </PGrid>
        </PGrid>

        <PGrid container spacing={2} className={Labels.margin.mb3} style={{ display: "flex", alignItems: "stretch" }}>

          {/* Table Card Column */}
          <PGrid item xs={12} sm={6} md={8} style={{ display: "flex" }}>
            <PCard style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
              <PGrid container className={Labels.margin.mb3} spacing={1}>
                <PGrid item xs={12} sm={6} md={6}>
                  <PSearch width="100%" placeholder={""} />
                </PGrid>
                <PGrid item xs={12} sm={6} md={3}>
                  <PDropdown
                    label = {getLabel("lbl09")}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    options={counties}
                    width={Labels.fontSize.xxxxl}
                    flag={Labels.flag.auto}
                  />
                </PGrid>
                <PGrid item xs={12} sm={6} md={3}>
                  <PDropdown
                    label= {getLabel("lbl10")}
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    options={userList}
                    width={Labels.fontSize.xxxxl}
                    flag={Labels.flag.auto}
                  />
                </PGrid>
              </PGrid>

              {/* flexGrow ensures the table area fills the card height */}
              <div style={{ flexGrow: 1 }}>
                <PTable columns={columns} rows={rows} />
              </div>
            </PCard>
          </PGrid>

          {/* Chart Card Column */}
          <PGrid item xs={12} sm={6} md={4} style={{ display: "flex" }}>
            <PCard style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {SelectedChart && <SelectedChart data={chartData} />}
              </div>
            </PCard>
          </PGrid>

        </PGrid>
      </Box >
    </>
  );
};

export default EqDashboard;