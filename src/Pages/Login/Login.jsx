import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogIns } from "../../action/AuthAction";
import { APIS, headers } from "../../data/header";
import { ToastContainer } from "react-toastify";
import { errorMsgApi, seonOtp } from "../../util/showmessages";
const Login = () => {
  // STORE THE USERS INFORMATION
  const [user, setUser] = useState({
    phone: "",
  });

  // THIS BOTH ARE USED TO NAVIGATION HOME PAGE
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // AFTER SENDING OTP SWITCH TO LOGIN FORM TO OTP ENTER FORM
  const [sendOtpUiDesign, setSendOtpUiDesign] = useState(false);

  // WHENE USER ENTER THERE INFORMATION THAT CORRESPONDING DATA STORE FUNCTION
  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // BOTH STATES ARE FROM VALIDATION USING
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // FORM VALIDATIONS FROM USERS DATA
  const validate = (values) => {
    const errors = {};

    if (!values.phone) {
      errors.phone = "phonenumber is required!";
    } else if (isNaN(values.phone)) {
      errors.phone = "Please Enter Only Numbers..!";
    } else if (values.phone.length !== 10) {
      errors.phone = "Phone number must be 10 digits";
    }
    return errors;
  };
  // AFTER VALIDATION COMPLETED SEND THE OTP FUNCTION
  const onLoginDetailsFun = (e) => {
    e.preventDefault();
    setFormErrors(validate(user));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("submited Button");
      dispatch(LogIns(user, navigate));
      // APIS.post("/auth/new-login", user, { headers: headers })
      //   .then(() => {
      //     setIsSubmit(false);
      //     setSendOtpUiDesign(true);
      //     seonOtp();
      //   })
      //   .catch((e) => {
      //     console.log(e?.response?.data?.msg);
      //     errorMsgApi(e?.response?.data?.msg);
      //   });
    }
  };
  // USER ENTER THERE OTP IN INPUT FIELD
  const onChangeOtpFromInput = (e) => {
    setUser({ ...user, otp: e.target.value });
  };

  // AFTER OTP SEND SUBMITTED LOGIN FORM
  const onSubmitOtpFunc = () => {
    dispatch(LogIns(user, navigate));
  };

  return (
    <div className="login__page__main">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="tost_new"
      />
      {sendOtpUiDesign ? (
        <div className="send__otp__main__card">
          <h3>Enter Your OTP</h3>

          <input
            type="text"
            maxLength="4"
            placeholder="Please Enter 4 Digit Otp"
            onChange={onChangeOtpFromInput}
          />
          <div onClick={onSubmitOtpFunc} className="otp_submit_btn">
            <button>Submit Otp</button>
          </div>
        </div>
      ) : (
        <>
          <div className="inputBox login__input__card">
            <p
              style={{
                visibility: "visible",
                color: "#f58b76",
              }}
            >
              {formErrors.phone ? formErrors.phone : "."}
            </p>
            <input
              // onChange={usernameChange}
              type="text"
              required="required"
              name="phone"
              onChange={usernameChange}
              value={user.phone}
            />
            <span>Phone Number</span>
          </div>

          <div className="button__forgate__pass__card">
            <button
              onClick={onLoginDetailsFun}
              style={{
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
