import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogIns } from "../../action/AuthAction";
const Login = () => {
  const [user, setUser] = useState({
    phonenumber: "",
    password: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [formErrorsConfirmPass, setFormErrorsConfirmPass] = useState({});
  const [isSubmitConfirmPass, setIsSubmitConfirmPass] = useState(false);

  const [forgetPassUser, setForgetPassUser] = useState({
    phonenumber: "",
    password: "",
    confirmpasswor: "",
  });

  const userChangeFonfirmPass = (e) => {
    setForgetPassUser({ ...forgetPassUser, [e.target.name]: e.target.value });
  };

  const [switchPassToForgetPass, setSwitchPassToForgetPass] = useState(true);

  const onForgetPassFun = () => {
    setSwitchPassToForgetPass(!switchPassToForgetPass);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.phonenumber) {
      errors.phonenumber = "phonenumber is required!";
    } else if (isNaN(values.phonenumber)) {
      errors.phonenumber = "Please Enter Only Numbers..!";
    } else if (values.phonenumber.length !== 10) {
      errors.phonenumber = "Phone number must be 10 digits";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    return errors;
  };

  const onLoginDetailsFun = (e) => {
    e.preventDefault();
    setFormErrors(validate(user));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(user);
      dispatch(LogIns(user, navigate));
    }
  };

  const validateConfirmPass = (values) => {
    const errors = {};
    if (!values.phonenumber) {
      errors.phonenumber = "phonenumber is required!";
    } else if (isNaN(values.phonenumber)) {
      errors.phonenumber = "Please Enter Only Numbers..!";
    } else if (values.phonenumber.length !== 10) {
      errors.phonenumber = "Phone number must be 10 digits";
    }
    // password
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Pass must be more than 4 char";
    } else if (values.password.length > 10) {
      errors.password = "Pass can't exceed more than 10 char";
    }

    // confirm password validation

    if (!values.confirmpasswor) {
      errors.confirmpasswor = "Confirm Pass is required";
    } else if (values.password !== values.confirmpasswor) {
      errors.confirmpasswor = "Pass Confirm Pass must be Same";
    }
    return errors;
  };

  const onLoginConfirmPassFun = (e) => {
    e.preventDefault();
    setFormErrorsConfirmPass(validateConfirmPass(forgetPassUser));
    setIsSubmitConfirmPass(true);
    if (
      Object.keys(formErrorsConfirmPass).length === 0 &&
      isSubmitConfirmPass
    ) {
      console.log(forgetPassUser);
    }
  };

  return (
    <div className="login__page__main">
      {switchPassToForgetPass ? (
        <>
          <div className="inputBox login__input__card">
            <p
              style={{
                visibility: "visible",
                color: "#f58b76",
              }}
            >
              {formErrors.phonenumber ? formErrors.phonenumber : "."}
            </p>
            <input
              // onChange={usernameChange}
              type="text"
              required="required"
              name="phonenumber"
              onChange={usernameChange}
              value={user.phonenumber}
            />
            <span>Phone Number</span>
          </div>
          <div className="inputBox login__input__card">
            <p
              style={{
                visibility: "visible",
                color: "#f58b76",
              }}
            >
              {formErrors.password ? formErrors.password : "."}
            </p>
            <input
              // onChange={usernameChange}
              type="text"
              required="required"
              name="password"
              onChange={usernameChange}
              value={user.password}
            />
            <span>Password</span>
          </div>
        </>
      ) : (
        <>
          <div className="inputBox login__input__card">
            <p
              style={{
                visibility: "visible",
                color: "#f58b76",
              }}
            >
              {formErrorsConfirmPass.phonenumber
                ? formErrorsConfirmPass.phonenumber
                : "."}
            </p>
            <input
              type="text"
              required="required"
              name="phonenumber"
              onChange={userChangeFonfirmPass}
              value={forgetPassUser.phonenumber}
            />
            <span>Phone Number</span>
          </div>
          <div className="inputBox login__input__card">
            <p
              style={{
                visibility: "visible",
                color: "#f58b76",
              }}
            >
              {formErrorsConfirmPass.password
                ? formErrorsConfirmPass.password
                : "."}
            </p>
            <input
              onChange={userChangeFonfirmPass}
              type="text"
              required="required"
              name="password"
              value={forgetPassUser.password}
            />
            <span>New Password</span>
          </div>
          <div className="inputBox login__input__card new__input__box__for__mobile">
            <p
              style={{
                visibility: "visible",
                color: "#f58b76",
              }}
            >
              {formErrorsConfirmPass.confirmpasswor
                ? formErrorsConfirmPass.confirmpasswor
                : "."}
            </p>
            <input
              onChange={userChangeFonfirmPass}
              type="text"
              required="required"
              name="confirmpasswor"
              value={forgetPassUser.confirmpasswor}
            />
            <span>Confirm New Password</span>
          </div>
        </>
      )}
      {switchPassToForgetPass ? (
        <div className="button__forgate__pass__card">
          <button
            onClick={onLoginDetailsFun}
            style={{
              cursor: "pointer",
            }}
          >
            Submit
          </button>
          <span onClick={onForgetPassFun}>Forgot Password ......... !</span>
        </div>
      ) : (
        <div className="button__forgate__pass__card">
          <button onClick={onLoginConfirmPassFun}>Update</button>
          <span onClick={onForgetPassFun}>
            Switch to Login Page ......... !
          </span>
        </div>
      )}
    </div>
  );
};

export default Login;
