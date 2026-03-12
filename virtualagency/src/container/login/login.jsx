import PTypography from "../../component/PTypography/PTypography";
import PTextField from "../../component/PTextField/PTextField";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from "@mui/icons-material/Lock";
import PButton from "../../component/PButton/PButton";
import { Labels } from "../../utils/constants/labels";
import React, { Component } from "react";
import LoginImg from "../../utils/assets/images/Login.png";
import "./login.css";
import { CommonColors } from "../../utils/constants/colors";
import PContainer from "../../component/PContainer/PContainer";
import PDialog from "../../component/PDialog/PDialog";
import { allowOnlyAlphabets, validatePassword, validateName } from "../../utils/commonFunction/common";
import { userDetails, clearUserDetails } from "../../redux/actionType/actionType";
import { connect } from "react-redux";
import { AppNavigation } from "../../navigations/appNavigation";
import { labelRoutes } from "../../navigations/labelRoutes";
import Logo from "../../utils/assets/Navbar/Logo.svg";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      openRecover: false,
      resetUsername: "",
      newPassword: "",
      confirmPassword: "",
      isForgetPassword: false,
      errors: {}
    };
  };
  componentDidMount() {
    this.props.navigate(labelRoutes.dashboard);
  }

  handleOpenRecover = () => {
    this.setState({ openRecover: true });
  };

  handleCloseRecover = () => {
    this.setState({ openRecover: false });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSendRecover = () => {
    this.setState({ openRecover: false });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case Labels.loginPage.userName:
        const name = allowOnlyAlphabets(value);
        this.setState((prev) => ({
          userName: name,
          errors: {
            ...prev.errors,
            userName: name ? validateName(name) : "",
          },
        }));
        break;

      case Labels.loginPage.password:
        this.setState((prev) => ({
          password: value,
          errors: {
            ...prev.errors,
            password: value ? validatePassword(value) : "",
          },
        }));
        break;

      case Labels.loginPage.newPassword:
        this.setState((prev) => ({
          newPassword: value,
          errors: {
            ...prev.errors,
            newPassword: value ? validatePassword(value) : "",
            confirmPassword:
              prev.confirmPassword && value !== prev.confirmPassword
                ? Labels.loginPage.passwordDoNotMatch
                : "",
          },
        }));
        break;

      case Labels.loginPage.confirmPassword:
        this.setState((prev) => ({
          confirmPassword: value,
          errors: {
            ...prev.errors,
            confirmPassword:
              value !== prev.newPassword ? Labels.loginPage.passwordDoNotMatch : "",
          },
        }));
        break;

      default:
        break;
    }
  };
  handleSubmit = async (e, isLogin) => {
    e.preventDefault();
    if (isLogin) {
      this.props?.navigate(labelRoutes.dashboard);
    }
    //   if (!this.loginValidation()) return;
    //   const res = await PostApi(Login_Api.verifyUserDetails, {
    //     userName: this.state.userName,
    //     password: encryptPassword(this.state.password),
    //   });
    //   console.log(res, "res");
    //   if (isSuccess(res)) {
    //     localStorage.setItem("token", res?.data?.token);
    //     localStorage.setItem("user", JSON.stringify(res?.data?.user));
    //     this.props.setUser(res?.data?.user);
    //     this.props.setIsLoggedIn(true);
    //   } else {
    //     this.setState((prev) => ({
    //       errors: { ...prev.errors, password: res?.message || "Login failed" },
    //     }));
    //   }
    // } else {
    //   if (isSuccess(res)) {
    //     this.setState({ isLogin: true });
    //   } else {
    //     this.setState((prev) => ({
    //       errors: { ...prev.errors, password: res?.message || "Login failed" },
    //     }));
    //   }

    // }
  }
  async componentDidUpdate(prevProps, prevState) {
    if (this.state.isLogin !== prevState.isLogin) {
      this.props.history.push("/");
    }
  }

  render() {
    const { errors, onChange, onSubmit } = this.props;
    const { resetUsername, isForgetPassword, newPassword, confirmPassword, showPassword } = this.state;

    return (
      <>
        <div className="login-container">

          <div className="login-right">
            <img
              src={LoginImg}
              alt="Login"
              className="login-image"
            />
          </div>

          {/*  */}
          {isForgetPassword ? (
            <div className="login-left">
              <div className="login-box">

                <img src={Logo} alt="Logo" style={{ height: 60, margin: 10 }} />

                <PTextField
                  name={Labels.loginPage.newPassword}
                  label={Labels.loginPage.newPassword}
                  value={newPassword}
                  helperText={this.state.errors?.newPassword}
                  startIcon={<LockIcon sx={{ color: "#9CA3AF" }} />}
                  flag= {Labels.flag.password}
                  onChange={this.handleChange}
                />

                <PTextField
                  name={Labels.loginPage.confirmPassword}
                  label={Labels.loginPage.confirmPassword}
                  value={confirmPassword}
                  helperText={this.state.errors?.confirmPassword}
                  startIcon={<LockIcon sx={{ color: "#9CA3AF" }} />}
                  flag= {Labels.flag.password}
                  onChange={this.handleChange}
                />

                <PButton
                  type="submit"
                  label={Labels.buttonLabel.changePassword}
                  fullWidth
                  onClick={(e) => this.handleSubmit(e, true)}
                />

              </div>
            </div>
          ) : (

            <div className="login-left">
              <div className="login-box">
                <img src={Logo} alt="Logo" style={{ height: 60, margin: 10 }} />
                <PTextField
                  name={Labels.loginPage.userName}
                  label={Labels.loginPage.userName}
                  value={this.state.userName}
                  helperText={this.state.errors?.userName}
                  startIcon={<PersonIcon sx={{ color: "#9CA3AF" }} />}
                  onChange={this.handleChange}
                />

                <PTextField
                  name={Labels.loginPage.password}
                  label={Labels.loginPage.password}
                  value={this.state.password}
                  helperText={this.state.errors?.password}
                  startIcon={<LockIcon sx={{ color: "#9CA3AF" }} />}
                  flag= {Labels.flag.password}
                  onChange={this.handleChange}
                />

                <div className="forgot-password">
                  <PTypography
                    labelText={Labels.loginPage.forgotPassword}
                    color={CommonColors.primaryBlue}
                    flag={Labels.xs}
                    onClick={this.handleOpenRecover}
                  />
                </div>

                <PButton
                  type="submit"
                  label={Labels.buttonLabel.login}
                  fullWidth
                  onClick={(e) => this.handleSubmit(e, true)}
                />

              </div>
            </div>

          )}
        </div>

        {/* 🔥 MOVE DIALOG HERE (Outside container) */}
        <PDialog
          open={this.state.openRecover}
          onClose={this.handleCloseRecover}
          title={Labels.recoverPassword}
          actions={
            <>
              <PButton
                fullWidth
                label={Labels.buttonLabel.backToLogin}
                variant="text"
                onClick={this.handleCloseRecover}
              />

              <PButton
                fullWidth
                label={Labels.buttonLabel.submit}
                variant={Labels.contained}
                onClick={this.handleSendRecover}
              />
            </>
          }
        >
          <PContainer>
            <PTextField
              name={Labels.loginPage.userName}
              label={Labels.loginPage.userName}
              value={resetUsername}
              onChange={this.handleChange}
            />
          </PContainer>
        </PDialog>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userDetails.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    saveUserDetails: (user) => {
      dispatch({ type: userDetails, payload: user });
    },
    clearUserData: () => dispatch({ type: clearUserDetails }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation(Login));

