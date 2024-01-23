import React, { useEffect, useState } from "react";
import "./SignUp.css";
import FileBase64 from "react-file-base64";
import { stateWiseData } from "../../data/statedata";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { headers } from "../../data/header";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    state: "",
    dist: "",
    assembly: "",
    address: "",
    phonepe: "",
    voteridnumber: "",
    adharnumber: "",
    mandal: "",
    password: "",
    phone: "",
    voterIdImage: "",
    adharIdImage: "",
    otp: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [stateWiseDistState, setStateWiseDistState] = useState([]);

  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name) {
      errors.name = "name is required!";
    }
    if (!values.state) {
      errors.state = "state is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.dist) {
      errors.dist = "District is required!";
    }
    if (!values.mandal) {
      errors.mandal = "Mandal number is required!";
    }

    if (!values.adharnumber) {
      errors.adharnumber = "adhar number number is required!";
    }

    if (!values.voterIdImage) {
      errors.voterIdImage = "Adhar Card Front side is required!";
    }
    if (!values.adharIdImage) {
      errors.adharIdImage = "Adhar Card Back side is required!";
    }

    if (!values.address) {
      errors.address = "address is required!";
    }
    if (!values.phone) {
      // console.log(values?.phone.length);
      errors.phone = "phone number is required!";
    } else if (!/^[0-9]{1,}$/.test(values?.phone)) {
      errors.phone = "phone number must be numeric characters";
    } else if (values?.phone.length !== 10) {
      errors.phone = "phone number must be 10 characters";
    }
    if (!values.phonepe) {
      errors.phonepe = "phonepe number is required!";
    } else if (!/^[0-9]{1,}$/.test(values.phonepe)) {
      errors.phonepe = "phonepe number must be numeric characters";
    } else if (values.phonepe.length !== 10) {
      errors.phonepe = "phonepe number must be 10 characters";
    }

    if (!values.otp) {
      errors.otp = "Please Enter Otp";
    }

    return errors;
  };

  useEffect(() => {
    if (user.state !== "") {
      const newDist = stateWiseData.filter((each) => each.state === user.state);
      setStateWiseDistState(newDist[0].dist);
    }
  }, [user.state]);

  const API = axios.create({
    baseURL: "http://localhost:5000",
  });

  const onSubmitRegisterDataFn = (e) => {
    e.preventDefault();
    setFormErrors(validate(user));
    setIsSubmit(true);
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      API.post("/auth/register", user, {
        headers: headers,
      })
        .then((res) => {
          console.log(res.data);
          registorSucces();
          setIsSubmit(false);
          setUser({
            name: "",
            email: "",
            state: "",
            dist: "",
            assembly: "",
            address: "",
            phonepe: "",
            voteridnumber: "",
            adharnumber: "",
            mandal: "",
            password: "",
            phone: "",
            voterIdImage: "",
            adharIdImage: "",
            otp: "",
          });
        })
        .catch((e) => {
          console.log(e?.response?.data?.msg);
          errorMsgApi(e?.response?.data?.msg);
        });
    }
  };
  //   console.log(user);

  const registorSucces = () =>
    toast.success("Registration suddesfully ..!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const errorMsgApi = (msg) =>
    toast.warning(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <div className="signup__tabs__down__ui__card">
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
      />
      <div className="multi__input__card">
        <div className="inputBox">
          <p
            style={{
              visibility: "visible",
              color: "#f58b76",
            }}
          >
            {formErrors.name ? formErrors.name : "."}
          </p>
          <input
            onChange={usernameChange}
            type="text"
            name="name"
            required="required"
            value={user.name}
          />
          <span>Name as Per Adhar Card</span>
        </div>
        <div className="inputBox">
          <p
            style={{
              visibility: "visible",
              color: "#f58b76",
            }}
          >
            {formErrors.email ? formErrors.email : "."}
          </p>
          <input
            onChange={usernameChange}
            type="text"
            name="email"
            required="required"
            value={user.email}
          />
          <span>Email</span>
        </div>
      </div>
      <div className="multi__input__card">
        <div className="inputBox">
          <p
            style={{
              visibility: "visible",
              color: "#f58b76",
            }}
          >
            {formErrors.state ? formErrors.state : "."}
          </p>
          <select name="state" onChange={usernameChange}>
            <option disabled hidden selected>
              STATE
            </option>
            {stateWiseData.map((each, key) => (
              <option value={each.state} key={key}>
                {each.state}
              </option>
            ))}
          </select>
        </div>
        <div className="inputBox">
          <p
            style={{
              visibility: "visible",
              color: "#f58b76",
            }}
          >
            {formErrors.dist ? formErrors.dist : "."}
          </p>
          <select name="dist" onChange={usernameChange}>
            <option disabled hidden selected>
              DISTRICT
            </option>
            {stateWiseDistState?.map((each, key) => (
              <option value={each.name} key={key}>
                {each.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="multi__input__card">
        <div className="inputBox">
          <p
            style={{
              visibility: "hidden",
              color: "#f58b76",
            }}
          >
            {formErrors.adharnumber ? formErrors.adharnumber : "."}
          </p>
          <input
            onChange={usernameChange}
            type="text"
            name="adharnumber"
            required="required"
            value={user.adharnumber}
          />
          <span>Adhar Number</span>
        </div>
        <div className="inputBox">
          <p
            style={{
              visibility: "visible",
              color: "#f58b76",
            }}
          >
            {formErrors.mandal ? formErrors.mandal : "."}
          </p>
          <input
            onChange={usernameChange}
            type="text"
            required="required"
            name="mandal"
            value={user.mandal}
          />
          <span>Mandal</span>
        </div>
      </div>

      <div className="multi__input__card">
        <div className="inputBox">
          <p
            style={{
              visibility: "visible",
              color: "#f58b76",
            }}
          >
            {formErrors.phone ? formErrors.phone : "."}
          </p>
          <input
            onChange={usernameChange}
            type="text"
            name="phone"
            required="required"
            value={user.phone}
          />
          <span>Phone Number</span>
        </div>
        <div className="inputBox">
          <p
            style={{
              visibility: "visible",
              color: "#f58b76",
            }}
          >
            {formErrors.phonepe ? formErrors.phonepe : "."}
          </p>
          <input
            onChange={usernameChange}
            type="text"
            required="required"
            name="phonepe"
            value={user.phonepe}
          />
          <span>UPI Number</span>
        </div>
      </div>

      {/*  */}
      {/*  */}
      {/* file uploads main card */}
      <div className="multi__input__card__file">
        <div className="file__image__preview__card">
          <div className="file__input__box">
            <p
              style={{
                visibility: "visible",
                color: "#f58b76",
              }}
            >
              {formErrors.voterIdImage ? formErrors.voterIdImage : "."}
            </p>
            <FileBase64
              type="file"
              required="required"
              multiple={false}
              style={{ display: "none" }}
              className="file-card"
              onDone={({ base64 }) => {
                setUser({
                  ...user,
                  voterIdImage: base64,
                });
              }}
            />
            <span>Adhar Id Frontside</span>
          </div>
          <div className="multi__input__card ">
            {user.voterIdImage ? (
              <img src={user.voterIdImage} alt="" />
            ) : (
              <img src="" alt="" />
            )}
          </div>
        </div>
        <div className="file__image__preview__card">
          <div className="file__input__box">
            <p
              style={{
                visibility: "visible",
                color: "#f58b76",
              }}
            >
              {formErrors.adharIdImage ? formErrors.adharIdImage : "."}
            </p>
            <FileBase64
              type="file"
              required="required"
              multiple={false}
              style={{ display: "none" }}
              className="file-card"
              onDone={({ base64 }) => {
                setUser({
                  ...user,
                  adharIdImage: base64,
                });
              }}
            />
            <span>Adhar Id Backside</span>
          </div>
          <div className="multi__input__card ">
            {user.adharIdImage ? (
              <img src={user.adharIdImage} alt="" />
            ) : (
              <img src="" alt="" />
            )}
          </div>
        </div>
      </div>

      {/*  */}
      {/*  */}

      <div className="text__are__card">
        <p
          style={{
            visibility: "visible",
            color: "#f58b76",
          }}
        >
          {formErrors.address ? formErrors.address : "."}
        </p>

        <textarea
          cols="50"
          placeholder="Enter Your Address"
          rows="5"
          required="required"
          onChange={usernameChange}
          name="address"
          value={user.address}
        ></textarea>
      </div>
      <div className="inputBox text__are__card">
        <p
          style={{
            visibility: "visible",
            color: "#f58b76",
          }}
        >
          {formErrors.password ? formErrors.password : "."}
        </p>
        <input
          onChange={usernameChange}
          type="text"
          required="required"
          name="password"
          value={user.password}
        />
        <span>Password</span>
      </div>
      {/* <div>
        <span>Send OTP</span>
      </div> */}
      <div className="inputBox text__are__card">
        <p
          style={{
            visibility: "visible",
            color: "#f58b76",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {formErrors.otp ? formErrors.otp : "."}
          <p
            style={{
              color: "lightslategray",
            }}
          >
            Send OTP
          </p>
        </p>
        <input
          onChange={usernameChange}
          type="text"
          required="required"
          name="otp"
          value={user.otp}
        />
        <span>OTP</span>
      </div>
      <button
        style={{
          cursor: "pointer",
        }}
        onClick={onSubmitRegisterDataFn}
      >
        Submit
      </button>
    </div>
  );
};

export default SignUp;

// {
//   /* <div className="multi__input__card">
//   <div className="inputBox">
//     <p
//       style={{
//         visibility: "visible",
//         color: "#f58b76",
//       }}
//     >
//       {formErrors.voteridnumber ? formErrors.voteridnumber : "."}
//     </p>
//     <input
//       onChange={usernameChange}
//       type="text"
//       name="voteridnumber"
//       required="required"
//       value={user.voteridnumber}
//     />
//     <span>Voter Id Number</span>
//   </div>
//   <div className="inputBox">
//     <p
//       style={{
//         visibility: "hidden",
//         color: "#f58b76",
//       }}
//     >
//       {formErrors.adharnumber ? formErrors.adharnumber : "."}
//     </p>
//     <input
//       onChange={usernameChange}
//       type="text"
//       name="adharnumber"
//       required="required"
//       value={user.adharnumber}
//     />
//     <span>Adhar Number</span>
//   </div>
// </div> */
// }
