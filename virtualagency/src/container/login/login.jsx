import React, { useState, useEffect } from "react";
import PTypography from "../../component/PTypography/PTypography";
import PTextField from "../../component/PTextField/PTextField";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import PButton from "../../component/PButton/PButton";
import { Labels } from "../../utils/constants/labels";
import LoginImg from "../../utils/assets/images/Login.png";
import "./login.css";
import { CommonColors } from "../../utils/constants/colors";
import PContainer from "../../component/PContainer/PContainer";
import PDialog from "../../component/PDialog/PDialog";
import {
  allowOnlyAlphabets,
  validatePassword,
  validateName, isSuccess
} from "../../utils/commonFunction/common";
import { userDetails, clearUserDetails } from "../../redux/actionType/actionType";
import { connect } from "react-redux";
import { AppNavigation } from "../../navigations/appNavigation";
import { labelRoutes } from "../../navigations/labelRoutes";
import Logo from "../../utils/assets/Navbar/Logo.svg";
import { PostApi } from "../../utils/api/networking";
import { Account_API, Dashboard_API } from "../../utils/api/apiUrl";

function Login(props) {
  const { navigate } = props;
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [openRecover, setOpenRecover] = useState(false);
  const [resetUsername, setResetUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    navigate(labelRoutes.home);
  }, []);

  const handleOpenRecover = () => {
    setOpenRecover(true);
  };

  const handleCloseRecover = () => {
    setOpenRecover(false);
  };

  const handleSendRecover = () => {
    setOpenRecover(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case Labels.loginPage.userName:
        const nameValue = value;
        setUserName(nameValue);
        setErrors((prev) => ({
          ...prev,
          userName: nameValue ? validateName(nameValue) : "",
        }));
        break;

      case Labels.loginPage.password:
        setPassword(value);
        setErrors((prev) => ({
          ...prev,
          password: "",
        }));
        break;

      case Labels.loginPage.newPassword:
        setNewPassword(value);
        setErrors((prev) => ({
          ...prev,
          newPassword: value ? validatePassword(value) : "",
          confirmPassword:
            confirmPassword && value !== confirmPassword
              ? Labels.loginPage.passwordDoNotMatch
              : "",
        }));
        break;

      case Labels.loginPage.confirmPassword:
        setConfirmPassword(value);
        setErrors((prev) => ({
          ...prev,
          confirmPassword:
            value !== newPassword ? Labels.loginPage.passwordDoNotMatch : "",
        }));
        break;

      default:
        break;
    }
  };

  const handleLogin = async (e, isLogin) => {
    e.preventDefault();
    if (!loginValidation()) return;
    const res = await PostApi(Account_API.Login, {
      userName: userName,
      password: password,
    });
    if (isLogin) {
      if (isSuccess(res)) {
        localStorage.setItem("user", res?.data?.username);
        localStorage.setItem("email", res?.data?.email);
        localStorage.setItem("agancyUserID", res?.data?.fkID);
        localStorage.setItem("userID", res?.data?.userID);
        navigate(labelRoutes.dashboard);
      } else {
        setErrors((prev) => ({
          ...prev,
          password: res?.data || "Login failed",
        }));
      }
    } else {
      if (isSuccess(res)) {
        setIsLogin(true);
      } else {
        setErrors((prev) => ({
          ...prev,
          password: res?.data || "Login failed",
        }));
      }
    }
  };

  const loginValidation = () => {
    let errors = {};
    if (!userName) errors.userName = Labels.commonLabel.required;
    if (!password) errors.password = Labels.commonLabel.required;
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
      <div className="login-container">
        <div className="login-right">
          <img src={LoginImg} alt="Login" className="login-image" />
        </div>

        {isForgetPassword ? (
          <div className="login-left">
            <div className="login-box">
              <img src={Logo} alt="Logo" style={{ height: 80, margin: 10 }} />

              <PTextField
                name={Labels.loginPage.newPassword}
                label={Labels.loginPage.newPassword}
                value={newPassword}
                helperText={errors?.newPassword}
                startIcon={<LockIcon sx={{ color: "#9CA3AF" }} />}
                flag={Labels.flag.password}
                onChange={handleChange}
              />

              <PTextField
                name={Labels.loginPage.confirmPassword}
                label={Labels.loginPage.confirmPassword}
                value={confirmPassword}
                helperText={errors?.confirmPassword}
                startIcon={<LockIcon sx={{ color: "#9CA3AF" }} />}
                flag={Labels.flag.password}
                onChange={handleChange}
              />

              <PButton
                type="submit"
                label={Labels.buttonLabel.changePassword}
                fullWidth
                onClick={(e) => handleLogin(e, true)}
              />
            </div>
          </div>
        ) : (

          <div className="login-left">
            <div className="login-box">
              <img src={Logo} alt="Logo" style={{ height: 80, margin: 10 }} />

              <PTextField
                name={Labels.loginPage.userName}
                label={Labels.loginPage.userName}
                value={userName}
                helperText={errors?.userName}
                startIcon={<PersonIcon sx={{ color: "#9CA3AF" }} />}
                onChange={handleChange}
              />

              <PTextField
                name={Labels.loginPage.password}
                label={Labels.loginPage.password}
                value={password}
                helperText={errors?.password}
                startIcon={<LockIcon sx={{ color: "#9CA3AF" }} />}
                flag={Labels.flag.password}
                onChange={handleChange}
              />

              <div className="forgot-password">
                <PTypography
                  labelText={Labels.loginPage.forgotPassword}
                  color={CommonColors.primary}
                  flag={Labels.xs}
                  onClick={handleOpenRecover}
                />
              </div>

              <PButton
                type="submit"
                label={Labels.buttonLabel.login}
                fullWidth
                onClick={(e) => handleLogin(e, true)}
              />
            </div>
          </div>
        )}
      </div>

      <PDialog
        open={openRecover}
        onClose={handleCloseRecover}
        title={Labels.recoverPassword}
        actions={
          <>
            <PButton
              fullWidth
              label={Labels.buttonLabel.backToLogin}
              variant="text"
              onClick={handleCloseRecover}
            />

            <PButton
              fullWidth
              label={Labels.buttonLabel.submit}
              variant={Labels.contained}
              onClick={handleSendRecover}
            />
          </>
        }
      >
        <PContainer>
          <PTextField
            name={Labels.loginPage.userName}
            label={Labels.loginPage.userName}
            value={resetUsername}
            onChange={(e) => setResetUsername(e.target.value)}
          />
        </PContainer>
      </PDialog>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.userDetails.user,
});

const mapDispatchToProps = (dispatch) => ({
  saveUserDetails: (user) =>
    dispatch({ type: userDetails, payload: user }),
  clearUserData: () => dispatch({ type: clearUserDetails }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavigation(Login));