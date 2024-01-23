import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../Header/Header";
import { APIS, headers } from "../../data/header";
import { FaCameraRetro } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import Chart from "react-apexcharts";
import { MdArrowCircleUp } from "react-icons/md";

// import { motion } from "framer-motion";
// import { featureVariants } from "../../data/animation";
// import { Header } from "../Header/Header";

import { useSelector } from "react-redux";

const Home = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  // chart data state start
  const options = {
    labels: ["Assign", "Not Assign"],
    colors: ["green", "#ff6f00"],
  };
  const [update, setUpdate] = useState([60, 40]);

  // corresponding District Cordinator
  const [
    correspondingDistrictCoordinator,
    setCorrespondingDistrictCoordinator,
  ] = useState(null);

  // main states start

  const [initialMainPsData, setInitialMainPsData] = useState([]);

  const [mainCamDataFromApp, setMainCamDataFromApp] = useState([]);
  const [assignPsCount, setAssignPsCount] = useState(0);
  const [notAssignPsCount, setNotAssignPsCount] = useState(0);
  const [assignPsPercentage, setAssignPsPercentage] = useState(0);
  const [notAssignPsPercentage, setNotAssignPsPercentage] = useState(0);

  // initial all cams details fetch from api
  const onGetAllPsDetails = () => {
    APIS.get("/state/all-ps-details-fetch-super-admin", {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        setInitialMainPsData(res.data);
        setMainCamDataFromApp(res.data);
      })
      .catch((e) => {
        console.log(e?.response?.data?.msg);
      });
  };

  useEffect(() => {
    onGetAllPsDetails();
  }, []);
  // initial all cams details fetch from api end

  useEffect(() => {
    let notAssignPs = mainCamDataFromApp.filter((each) => each.assign === "no");
    setNotAssignPsCount(notAssignPs.length);
    let assignPs = mainCamDataFromApp.length - notAssignPs.length;
    setAssignPsCount(assignPs);
    let assignPsPerce = (assignPs / mainCamDataFromApp.length) * 100;
    setAssignPsPercentage(assignPsPerce);
    let notAssignPsPerce =
      (notAssignPs.length / mainCamDataFromApp.length) * 100;
    setNotAssignPsPercentage(notAssignPsPerce);
  }, [mainCamDataFromApp]);

  // chart updated function

  useEffect(() => {
    setUpdate([assignPsPercentage, notAssignPsPercentage]);
  }, [notAssignPsPercentage, assignPsPercentage]);

  // fetch data from header component apply button click

  const onApplyBtnClickToFetchData = (data) => {
    console.log(data);
    let { selectedState, selectedDist } = data;

    if (selectedState !== null && selectedDist !== null) {
      APIS.post(
        "/state/header-apply-btn-click-psc-data",
        { selectedState, selectedDist },
        {
          headers: headers,
        }
      )
        .then((res) => {
          setMainCamDataFromApp(res.data);
        })
        .catch((e) => console.log(e));

      //
      // corresponding district coordinator
      APIS.get(
        `/state/fetch-district-coordinator/${selectedDist}`,

        {
          headers: headers,
        }
      )
        .then((res) => {
          setCorrespondingDistrictCoordinator(res.data);
        })
        .catch((e) => console.log(e));
    }
  };

  console.log(mainCamDataFromApp);

  return (
    <div className="super__admin__main">
      <span className="all__pages__over__view new__over__view">Over View</span>
      <div className="super__admin__second__main">
        <Header
          mainCamDataFromApp={initialMainPsData}
          onApplyBtnClickToFetchData={onApplyBtnClickToFetchData}
        />
        <div
          // initial="offscreen"
          // whileInView={"onscreen"}
          // variants={featureVariants}
          className="super__admin__main__cats__card"
        >
          <div className="chats_first_card">
            <h2>
              Hi,{" "}
              <span
                style={{
                  color: "#ff6f00",
                }}
              >
                {UUU[0]?.name}
              </span>
            </h2>
            <span>In this report you will find yor cams updated</span>
            <div className="all__cam__card">
              <div className="super_admin_car_number_card">
                <div>
                  <div
                    className="icond__back__change"
                    style={{
                      background: "rgb(132, 232, 245)",
                    }}
                  >
                    <FaCameraRetro />
                  </div>
                  <BsThreeDots size={22} />
                </div>
                <div
                  style={{
                    fontFamily: "Courier New, Courier, monospace",
                  }}
                >
                  <h3 style={{ marginLeft: "0px", marginBottom: "10px" }}>
                    {/* {secondMainFromMainCam.length} */}
                    Total Cams
                  </h3>
                  <span>{mainCamDataFromApp.length}</span>
                </div>
                <div
                  className="cam_percentage_card"
                  style={{
                    color: "rgb(132, 232, 245)",
                  }}
                >
                  <MdArrowCircleUp size={20} />
                  <span>100%</span>
                </div>
              </div>
              {/* second */}
              <div className="super_admin_car_number_card">
                <div>
                  <div
                    className="icond__back__change"
                    style={{
                      background: "green",
                    }}
                  >
                    <FaCameraRetro />
                  </div>
                  <BsThreeDots size={22} />
                </div>
                <div
                  style={{
                    fontFamily: "Courier New, Courier, monospace",
                  }}
                >
                  <h3 style={{ marginLeft: "0px", marginBottom: "10px" }}>
                    {/* {onLineStatusNumberState.length} */} Assign PS
                  </h3>
                  <span>{assignPsCount}</span>
                </div>
                <div
                  className="cam_percentage_card"
                  style={{
                    color: "green",
                  }}
                >
                  <MdArrowCircleUp size={20} />
                  {/* {onLineStatusPercentageState.toFixed()} */}
                  <span>{assignPsPercentage?.toFixed(1)}%</span>
                </div>
              </div>
              {/* third */}
              <div className="super_admin_car_number_card">
                <div>
                  <div
                    className="icond__back__change"
                    style={{
                      background: "#ff6f00",
                    }}
                  >
                    <FaCameraRetro />
                  </div>
                  <BsThreeDots size={22} />
                </div>
                <div
                  style={{
                    fontFamily: "Courier New, Courier, monospace",
                  }}
                >
                  <h3 style={{ marginLeft: "0px", marginBottom: "10px" }}>
                    {/* {offLineStatusNumberState} */}Not Assign Ps
                  </h3>
                  <span>{notAssignPsCount}</span>
                </div>
                <div
                  className="cam_percentage_card"
                  style={{
                    color: "#ff6f00",
                  }}
                >
                  <MdArrowCircleUp size={20} />
                  {/* {offLineStatusPercentageState.toFixed()} */}
                  <span>{notAssignPsPercentage?.toFixed(1)}%</span>
                </div>
              </div>
              {/* third end */}
            </div>
          </div>
          <div className="chats_second_card">
            <div className="chart__card">
              <h4>Status of Cameras</h4>
              <Chart
                options={options}
                series={update}
                type="donut"
                width="100%"
              />
            </div>
          </div>
        </div>
        {/* coresponding district coordinator */}
        {correspondingDistrictCoordinator && (
          <>
            {correspondingDistrictCoordinator.length > 0 ? (
              <div className="coresponding__district__main">
                <div className="district__cor__name__card">
                  <span>District Coordinator</span>
                  <span>{correspondingDistrictCoordinator[0]?.name}</span>
                </div>
                <div className="district__cor__name__card">
                  <span>Mobile Number</span>
                  <span>{correspondingDistrictCoordinator[0]?.phone}</span>
                </div>
              </div>
            ) : (
              <div className="coresponding__district__main">
                <h3>No District Coordinator</h3>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
