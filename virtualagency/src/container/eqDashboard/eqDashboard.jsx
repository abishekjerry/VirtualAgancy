import React, { useState, useEffect, useMemo } from "react";
import { Box, IconButton, Tooltip, Skeleton } from "@mui/material";
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
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CheckCircleIcon from '@mui/icons-material/TaskAlt';
import { FontFamily, FontWeight } from '../../utils/constants/fonts'
import { useLanguage } from "../../utils/constants/language";
import { Dashboard_API } from "../../utils/api/apiUrl";
import { PostApi } from "../../utils/api/networking";
import { exportToExcel, isSuccess } from "../../utils/commonFunction/common";
import { useNavigate } from "react-router-dom";
import { labelRoutes } from "../../navigations/labelRoutes";
import PDialog from "../../component/PDialog/PDialog";

const EqDashboard = () => {
  const navigate = useNavigate();
  const { getLabel } = useLanguage();
  const [openFilter, setOpenFilter] = useState("");
  //const [chartType, setChartType] = useState("pie");
  const [country, setCountry] = useState([]);
  const [filter, setFilter] = useState(false);
  const [rows, setRows] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [chartOrginalData, setChartOrginalData] = useState([]);
  const [formData, setFormData] = useState({
    country: "",
    user: "",
    startDate: "",
    endDate: "",
    search: "",
    chartType: "pie",
    status: ""
  });
  const [errors, setErrors] = useState({
    startDate: "",
    endDate: "",
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await PostApi(Dashboard_API.Master, {
        });
        setCountry(response.country)
        const res = await PostApi(Dashboard_API.Dashboard, {
          userCountryId: 12,
          createdName: 0,
          enqUId: "",
          projectNo: "",
          startDate: "",
          endDate: "",
          statusId: "",
          role: "Admin",
          jobposition: "",
          client: "",
          username: localStorage.getItem("user"),
        });

        if (isSuccess(res)) {
          const data = res?.data;
          setSummary(data.summary || {});
          const formattedRows = (data.detailed || []).map(item => ({
            enquiryId: item.enquiryId,
            projectNumber: item.projectNo,
            projectName: item.projectDesc,
            requestedDate: item.serverTime,
            status: item.statusName,
            surveyStatus: item.surveyStatusName,
            countryID: item.pmgEntity,
            userID: item.clientId,
            jobStatusID: item.status,
            date: item.serverTime,
            id: item.id,
            stepID: item.stepId,
          }));
          setRows(formattedRows);
          const formattedChartData = (data.summary?.jobStatus || []).map(
            ({ statusName, enquiryCount, statusId }) => ({
              name: statusName,
              value: enquiryCount,
              id: statusId
            })
          );
          setChartData(formattedChartData);
          setChartOrginalData(formattedChartData);
        }
      } catch (error) {
        console.error("API Error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // empty dependency: run only once on mount

  const columns = [
    { field: "enquiryId", header: "Enquiry ID" },
    { field: "projectNumber", header: "Project Number" },
    { field: "projectName", header: "Project Name" },
    { field: "requestedDate", header: "Requested Date" },
    { field: "status", header: "Status" },
    { field: "surveyStatus", header: "Survey Status" },
  ];

  const cardData = [
    {
      title: getLabel("lbl12"),
      value: summary.active || 0,
      subtitle: getLabel("lbl16"),
      iconColor: Labels.primary,
      icon: <AssignmentIcon />,
    },
    {
      title: getLabel("lbl13"),
      value: summary.approval || 0,
      subtitle: getLabel("lbl17"),
      iconColor: Labels.primary,
      icon: <PendingActionsIcon />,
    },
    {
      title: getLabel("lbl14"),
      value: summary.awarded || 0,
      subtitle: getLabel("lbl18"),
      iconColor: Labels.primary,
      icon: <EmojiEventsIcon />,
    },
    {
      title: getLabel("lbl15"),
      value: summary.completed || 0,
      subtitle: getLabel("lbl18"),
      iconColor: Labels.primary,
      icon: <TaskAltIcon />,
    },
  ];

  const chartOptions = [
    { label: "Line", value: "line", icon: <ShowChartIcon fontSize="small" /> },
    { label: "Bar", value: "bar", icon: <BarChartIcon fontSize="small" /> },
    { label: "Pie", value: "pie", icon: <PieChartIcon fontSize="small" /> }
  ];

  // Map chartType string to component
  const chartComponents = {
    line: PLineChart,
    bar: PBarChart,
    pie: PPieChart
  };

  const SelectedChart = chartComponents[formData.chartType];

  const userList = [
    { value: 1, label: "demo sg" },
    { value: 2, label: "Eddie Seah" },
    { value: 3, label: "huikeng tan" }
  ]


  const iconStyle = {
    border: "1px solid #e2e8f0",
    color: "#64748b",
    "&:hover": { bgcolor: "#f8fafc" }
  };

  const handleOnClick = (payload) => {
    setFormData((prev) => ({
      ...prev,
      status: prev.status === payload.id ? "" : Number(payload.id)
    }));
  };

  const data = useMemo(() => {
    let result = [...rows]; // copy original rows

    // status filter
    if (formData.status !== "") {
      result = result.filter(
        (item) => item.jobStatusID === Number(formData.status)
      );
    }

    // country filter
    if (formData.country !== "") {
      result = result.filter(
        (item) => item.countryID === Number(formData.country)
      );
    }

    // user filter
    if (formData.user !== "") {
      result = result.filter(
        (item) => item.userID === Number(formData.user)
      );
    }

    if (filter) {
      // Date Filter
      if (formData.startDate !== "" && formData.endDate !== "") {
        result = result.filter(
          (item) =>
            new Date(item.date) >= new Date(formData.startDate) &&
            new Date(item.date) <= new Date(formData.endDate)
        );
      }
    }


    // search filter
    if (formData.search?.trim()) {
      const search = formData.search.toLowerCase();
      result = result.filter((item) =>
        item.enquiryId?.toLowerCase().includes(search) ||
        item.projectName?.toLowerCase().includes(search) ||
        item.projectNumber?.toLowerCase().includes(search)
      );
    }

    return result;

  }, [rows, formData]);

  const handleReset = () => {
    setErrors((prev) => ({
      ...prev,
      startDate: "",
      endDate: ""
    }));

    setFormData((prev) => ({
      ...prev,
      startDate: "",
      endDate: "",
      country: "",
      user: "",
      search: "",
      status: ""
    }));

    setChartData(chartOrginalData);
  };

  const handleExport = () => {
    // Format data for export
    const exportData = rows.map((item) => ({
      "Enquiry ID": item.enquiryId,
      "Project Name": item.projectName,
      "Project Number": item.projectNumber,
      "Status": item.jobStatusName,
      "Country": item.countryName,
      "User": item.userName,
    }));
    exportToExcel(exportData, Labels.reportName.enquiryReport);
  };

  const handleOpenChoose = () => {
    setOpenFilter(true);
  };

  const handleCloseChoose = () => {
    setOpenFilter(false);
    setErrors((prev) => ({
      ...prev,
      startDate: "",
      endDate: ""
    }));

    setFormData((prev) => ({
      ...prev,
      startDate: "",
      endDate: "",
      country: "",
      user: "",
      search: "",
      status: ""
    }));
    setChartData(chartOrginalData);
  };

  const handleSendChoose = () => {
    const isValid = FliterValidation();
    if (isValid) {
      //setFilter(true);
      setOpenFilter(false);
    }
  };
  const FliterValidation = () => {
    const requiredFields = [
      Labels.dashboard.startDate,
      Labels.dashboard.endDate
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
    //setFilter(false);
  };


  const icons = [
    { icon: <RestartAltIcon fontSize="small" />, tooltip: "Reset", action: handleReset },
    { icon: <FileDownloadIcon fontSize="small" />, tooltip: "Export", action: handleExport },
    { icon: <CheckCircleIcon fontSize="small" />, tooltip: "Choose", action: handleOpenChoose }
  ];

  const stepRoutes = {
    1: labelRoutes.clientInfo,
    2: labelRoutes.enquiryDetails,
    3: labelRoutes.lineItems,
    4: labelRoutes.suppliers,
  }

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
        </PGrid>

        <PGrid container className={Labels.margin.mb3}>
          {loading ? (
            cardData.map((card, index) => (
              <PGrid key={index} item xs={12} sm={6} md={3} lg={3}>
                <Skeleton
                  variant="rectangular"
                  height={130}
                  sx={{ borderRadius: 2 }}
                />
              </PGrid>
            ))
          ) : (
            cardData.map((card, index) => (
              <PGrid key={index} item xs={12} sm={6} md={3} lg={3}>
                <PDashboardCard {...{ ...card, bgColor: CommonColors.bg_violet }} />
              </PGrid>
            ))
          )}
        </PGrid>

        <PGrid container className={Labels.margin.mb3}>
          <PGrid item xs={12} sm={6} md={8}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, justifyContent: "flex-end", margin: "6px 0px" }}>
              {icons.map((item, index) => (
                <Tooltip title={item.tooltip} arrow key={index}>
                  <IconButton sx={iconStyle} onClick={item.action} disabled={loading}>
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
                value={formData.chartType}
                onChange={(value) => setFormData((prev) => ({ ...prev, chartType: value }))}
                disabled={loading}
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
                  <PSearch width="100%" placeholder={"Seach by Enquiry ID, Project Number, Project Name"} onChange={(e) => setFormData({ ...formData, search: e.target.value })} value={formData.search} />
                </PGrid>
                <PGrid item xs={12} sm={6} md={3}>
                  <PDropdown
                    label={getLabel("lbl09")}
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    options={country}
                    width={Labels.fontSize.xxxxl}
                    flag={Labels.flag.auto}
                  />
                </PGrid>
                <PGrid item xs={12} sm={6} md={3}>
                  <PDropdown
                    label={getLabel("lbl10")}
                    value={formData.user}
                    onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                    options={userList}
                    width={Labels.fontSize.xxxxl}
                    flag={Labels.flag.auto}
                  />
                </PGrid>
              </PGrid>

              {/* flexGrow ensures the table area fills the card height */}
              <div style={{ flexGrow: 1 }}>
                {loading ? (
                  <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
                ) : (
                  <PTable
                    columns={columns}
                    rows={data}
                    onClick={(row) => {
                      console.log(row);
                      navigate(stepRoutes[row.stepID], {
                        state: { id: row.id }
                      });
                    }}
                  />
                )};
              </div>
            </PCard>
          </PGrid>

          {/* Chart Card Column */}
          <PGrid item xs={12} sm={6} md={4} style={{ display: "flex" }}>
            <PCard style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {loading ? (
                  <Skeleton variant="rectangular" height={350} width="100%" sx={{ borderRadius: 2 }} />
                ) : (
                  SelectedChart && chartData.length > 0 && (
                    <SelectedChart data={chartData} onSliceClick={handleOnClick} />
                  )
                )}
              </div>
            </PCard>
          </PGrid>

        </PGrid>
      </Box >

      <PDialog
        open={openFilter}
        onClose={handleCloseChoose}
        //title={Labels.recoverPassword}
        actions={
          <>
            <PButton
              fullWidth
              label={getLabel("lbl123")}
              variant="outlined"
              onClick={handleCloseChoose}
            />

            <PButton
              fullWidth
              label={getLabel("lbl40")}
              variant={Labels.contained}
              onClick={handleSendChoose}
            />
          </>
        }
      >
        <PGrid>
          <PGrid item xs={12} sm={6} md={5}>
            <PDatepicker
              name={Labels.dashboard.startDate}
              label={getLabel("lbl120")}
              value={formData.startDate}
              onChange={handleChange}
              width={250}
              helperText={errors?.startDate}
            />
          </PGrid>
          <PGrid item xs={12} sm={6} md={5}>
            <PDatepicker
              name={Labels.dashboard.endDate}
              label={getLabel("lbl121")}
              value={formData.endDate}
              onChange={handleChange}
              width={250}
              helperText={errors?.endDate}
            />
          </PGrid>
        </PGrid>
      </PDialog>
    </>
  );
};

export default EqDashboard;