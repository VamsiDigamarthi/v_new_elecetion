import React, { useEffect, useState } from "react";
import "./TaskPage.css";
import FileBase64 from "react-file-base64";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { APIS, headers } from "../../data/header";
const TaskPage = () => {
  const [pSacImagesFromTask, setPsAcImagesFromTask] = useState({
    installationImage: "",
    InstallationCertificate: "",
    CompletedCertificate: "",
  });

  const UUU = useSelector((state) => state.authReducer.authData);

  const [taskForUser, setTaskForUser] = useState([]);
  const [psAcId, setPsAcId] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // newly added features

  const [kitStatedImageFromFile, setKitStatedImageFromFile] = useState("");

  const [kitStartedErrorMsg, setKitStartedErrorMsg] = useState("");

  // installation image

  const [instalationImageState, setInstalationImageState] = useState("");

  const [installationImageError, setInstallationImageError] = useState("");

  // inst certificate

  const [instalationCertificateState, setInstalationCertificateState] =
    useState("");

  const [installationCertificateError, setInstallationCertificateError] =
    useState("");

  // completed certificate and kit fitting certificate

  const [completedCertificate, setCompletedCertificate] = useState("");

  const [completedCertificateError, setCompletedCertificateError] =
    useState("");

  // ki fitting certificate

  const [kitFittingCertificate, setkitFittingCertificate] = useState("");

  const [kitFittingCertificateError, setkitFittingCertificateError] =
    useState("");

  //
  // newly added features
  //

  const toggelCertificated = (id) => {
    if (selectedCertificate === id) {
      setSelectedCertificate(null);
    } else {
      setSelectedCertificate(id);
    }
  };

  const fetchAllTask = () => {
    APIS.get(`/user/fetch-task/${UUU[0]?.id}`, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        setTaskForUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchAllTask();
  }, []);

  // const uploadImageAllSuccess = () =>
  //   toast.success("uploaded images successfully...!", {
  //     position: "bottom-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });

  const rejectedTask = () =>
    toast.success("rejected task suddesfully ..!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const acceptedTask = () =>
    toast.success("task accepted suddesfully ..!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const onAcceptedTask = (id) => {
    APIS.put(
      `/user/update-task/${id}`,
      { action: "accepted" },
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        fetchAllTask();
        acceptedTask();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onRejectedTask = (id) => {
    APIS.put(
      `/user/update-task/${id}`,
      { action: "rejected" },
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        fetchAllTask();
        rejectedTask();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // const uploadImageNotSelected = () =>
  //   toast.error("Choose all images compulsory...!", {
  //     position: "bottom-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });

  const uploadImageAllSucceww = () =>
    toast.success("uploaded images successfully...!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const onKitStartedImageSubmit = (id) => {
    if (!kitStatedImageFromFile) {
      setKitStartedErrorMsg("Plase Selected Image");
    } else {
      APIS.put(
        `/user/kit-start-image/upload/${id}`,
        { image: kitStatedImageFromFile },
        {
          headers: headers,
        }
      )
        .then((res) => {
          setKitStartedErrorMsg(null);
          uploadImageAllSucceww();
          setKitStatedImageFromFile("");
          fetchAllTask();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  // kit started

  // insta certificate and img start
  const onInstallationCertificateAndImage = (id) => {
    if (!instalationImageState || !instalationCertificateState) {
      setInstallationImageError("Plase Selecet Installation Img");
      setInstallationCertificateError(
        "Please Selecet Installation Certificate"
      );
    } else {
      APIS.put(
        `/user/installation-certificate-image/${id}`,
        {
          instaCer: instalationCertificateState,
          instaImg: instalationImageState,
        },
        {
          headers: headers,
        }
      )
        .then((res) => {
          setInstallationImageError(null);
          setInstallationCertificateError(null);
          uploadImageAllSucceww();
          setInstalationImageState("");
          setInstalationCertificateState("");
          fetchAllTask();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  // insta certificate and img end

  // completed certifited

  const onCompletedCertificateKitFit = (id) => {
    if (!completedCertificate || !kitFittingCertificate) {
      setCompletedCertificateError("Plase Selecet completed Img");
      setkitFittingCertificateError("Please Selecet kit Fitting img");
    } else {
      APIS.put(
        `/user/completed-certificate-kit-fitting-img/${id}`,
        {
          completedCer: completedCertificate,
          kitFit: kitFittingCertificate,
        },
        {
          headers: headers,
        }
      )
        .then((res) => {
          setCompletedCertificateError(null);
          setkitFittingCertificateError(null);
          uploadImageAllSucceww();
          setCompletedCertificate("");
          setkitFittingCertificate("");
          fetchAllTask();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  // console.log(taskForUser);

  return (
    <div
      style={{
        height: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
        }}
      >
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
      </div>
      <span className="all__pages__over__view">Over View</span>
      <div className="task__inner__page">
        <h4>Your Task ......!</h4>
        {taskForUser.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              height: "100%",
              // border: "2px solid yellow",
              overflowY: "scroll",
            }}
          >
            {taskForUser.map((each, key) => (
              <div key={key} className="task__details__and__upload__image">
                <div className="task__each__card">
                  <div className="ac__ps__name__card">
                    <span>{each.AC_name}</span>
                    <span>{each.PS_name}</span>
                  </div>
                  <div className="ac__ps__number__card">
                    <span>
                      Ac : <span>{each.AC_No}</span>
                    </span>
                    <span>
                      Ps : <span>{each.PS_No}</span>
                    </span>
                  </div>
                  <div className="task__status__card">
                    <span>Status</span>
                    {each.action === "initiated" ? (
                      <div className="accept__rejected">
                        <button onClick={() => onAcceptedTask(each?.id)}>
                          Accept
                        </button>
                        <button onClick={() => onRejectedTask(each?.id)}>
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="initial__button">
                        <button>{each.action}</button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="collaps__and__certificated__card">
                  <div onClick={() => toggelCertificated(key)}>
                    <span>
                      {selectedCertificate === key
                        ? "Close Uploaded File"
                        : "Click to Show Uploaded File"}
                    </span>
                    <span>
                      {selectedCertificate === key ? (
                        <IoIosArrowUp size={20} />
                      ) : (
                        <IoIosArrowDown size={20} />
                      )}
                    </span>
                  </div>
                  <div
                    className={`images__upload__file__card content ${
                      selectedCertificate === key ? "show-collapes" : "content"
                    } `}
                  >
                    {each.action === "accepted" ? (
                      <div className="all__image__uploaded__file__card">
                        {/* kit start card start */}
                        <div className="kit__stared__card">
                          <span className="kit__task__number">
                            Kit Take Image
                          </span>
                          <div className="kit__stated__api__image__card">
                            <img src={each.kit_start} alt="No Data" />
                          </div>

                          <div className="file__input__box">
                            <p
                              style={{
                                visibility: "visible",
                                color: "#f58b76",
                              }}
                            >
                              {kitStartedErrorMsg ? kitStartedErrorMsg : "."}
                            </p>
                            <FileBase64
                              type="file"
                              required="required"
                              multiple={false}
                              style={{ display: "none" }}
                              className="file-card"
                              onDone={({ base64 }) => {
                                setKitStatedImageFromFile(base64);
                              }}
                            />

                            <span>Kit Received Image</span>
                            {kitStatedImageFromFile && (
                              <img
                                className="kit__Started__preview__image"
                                src={kitStatedImageFromFile}
                                alt=""
                              />
                            )}
                          </div>

                          <div className="kit__image__uploaded__button__card">
                            <button
                              onClick={() => onKitStartedImageSubmit(each?.id)}
                            >
                              Upload
                            </button>
                          </div>
                        </div>
                        {/* kit start card start */}
                        {/*  */}
                        {/* second task start */}
                        <div className="kit__stared__card">
                          <span className="kit__task__number">
                            Installation Image , Certificate
                          </span>
                          <div className="kit__stated__api__image__card">
                            <img
                              src={each.installationImage}
                              alt="No instalation Img"
                            />
                          </div>
                          <div className="file__input__box">
                            <p
                              style={{
                                visibility: "visible",
                                color: "#f58b76",
                              }}
                            >
                              {installationImageError
                                ? installationImageError
                                : "."}
                            </p>
                            <FileBase64
                              type="file"
                              required="required"
                              multiple={false}
                              style={{ display: "none" }}
                              className="file-card"
                              onDone={({ base64 }) => {
                                setInstalationImageState(base64);
                              }}
                            />

                            <span>Installation Image</span>
                            {instalationImageState && (
                              <img
                                className="kit__Started__preview__image"
                                src={instalationImageState}
                                alt=""
                              />
                            )}
                          </div>
                          {/* inst certificate  */}
                          <div className="kit__stated__api__image__card">
                            <img
                              src={each.InstallationCertificate}
                              alt="No Instalation img"
                            />
                          </div>

                          <div className="file__input__box">
                            <p
                              style={{
                                visibility: "visible",
                                color: "#f58b76",
                              }}
                            >
                              {installationCertificateError
                                ? installationCertificateError
                                : "."}
                            </p>
                            <FileBase64
                              type="file"
                              required="required"
                              multiple={false}
                              style={{ display: "none" }}
                              className="file-card"
                              onDone={({ base64 }) => {
                                setInstalationCertificateState(base64);
                              }}
                            />

                            <span>Installation Certificate</span>
                            {instalationCertificateState && (
                              <img
                                className="kit__Started__preview__image"
                                src={instalationCertificateState}
                                alt=""
                              />
                            )}
                          </div>

                          {/* button */}
                          <div className="kit__image__uploaded__button__card">
                            <button
                              onClick={() =>
                                onInstallationCertificateAndImage(each?.id)
                              }
                            >
                              Upload
                            </button>
                          </div>
                        </div>
                        {/* second task end */}
                        {/*  */}
                        {/* third task start */}
                        <div className="kit__stared__card">
                          <span className="kit__task__number">
                            Completed Certificate and kit Fitting
                          </span>
                          <div className="kit__stated__api__image__card">
                            <img
                              src={each.CompletedCertificate}
                              alt="No Completed Certificate"
                            />
                          </div>
                          <div className="file__input__box">
                            <p
                              style={{
                                visibility: "visible",
                                color: "#f58b76",
                              }}
                            >
                              {completedCertificateError
                                ? completedCertificateError
                                : "."}
                            </p>
                            <FileBase64
                              type="file"
                              required="required"
                              multiple={false}
                              style={{ display: "none" }}
                              className="file-card"
                              onDone={({ base64 }) => {
                                setCompletedCertificate(base64);
                              }}
                            />

                            <span>Completed Certificate</span>
                            {completedCertificate && (
                              <img
                                className="kit__Started__preview__image"
                                src={completedCertificate}
                                alt=""
                              />
                            )}
                          </div>
                          {/*kit fitting  */}
                          <div className="kit__stated__api__image__card">
                            <img src={each.kit_end} alt="No ki Fitting img" />
                          </div>

                          <div className="file__input__box">
                            <p
                              style={{
                                visibility: "visible",
                                color: "#f58b76",
                              }}
                            >
                              {kitFittingCertificateError
                                ? kitFittingCertificateError
                                : "."}
                            </p>
                            <FileBase64
                              type="file"
                              required="required"
                              multiple={false}
                              style={{ display: "none" }}
                              className="file-card"
                              onDone={({ base64 }) => {
                                setkitFittingCertificate(base64);
                              }}
                            />

                            <span>Kit Fitting Image</span>
                            {kitFittingCertificate && (
                              <img
                                className="kit__Started__preview__image"
                                src={kitFittingCertificate}
                                alt=""
                              />
                            )}
                          </div>

                          {/* button */}
                          <div className="kit__image__uploaded__button__card">
                            <button
                              onClick={() =>
                                onCompletedCertificateKitFit(each?.id)
                              }
                            >
                              Upload
                            </button>
                          </div>
                        </div>
                        {/* third task end */}
                        {/* <div className="image__loaded__value">
                        {each.installationImage ? (
                          <div className="backed__image">
                            <img src={each.installationImage} alt="" />
                          </div>
                        ) : (
                          <div className="file__input__box">
                            <div className="file_single__box">
                              <FileBase64
                                type="file"
                                required="required"
                                multiple={false}
                                style={{ display: "none" }}
                                className="file-card"
                                onDone={({ base64 }) => {
                                  setPsAcImagesFromTask({
                                    ...pSacImagesFromTask,
                                    installationImage: base64,
                                  });
                                  setPsAcId(each?.id);
                                }}
                              />
                              <span>Completed Certificate</span>
                            </div>

                            {psAcId === each.id &&
                              pSacImagesFromTask?.installationImage && (
                                <img
                                  className="upload__file__images"
                                  src={pSacImagesFromTask.installationImage}
                                  alt=""
                                />
                              )}
                          </div>
                        )}
                      </div> */}
                        {/* <div className="image__loaded__value">
                        {each.InstallationCertificate ? (
                          <div className="backed__image">
                            <img src={each.InstallationCertificate} alt="" />
                          </div>
                        ) : (
                          <div className="file__input__box">
                            <div className="file_single__box">
                              <FileBase64
                                type="file"
                                required="required"
                                multiple={false}
                                style={{ display: "none" }}
                                className="file-card"
                                onDone={({ base64 }) => {
                                  setPsAcImagesFromTask({
                                    ...pSacImagesFromTask,
                                    InstallationCertificate: base64,
                                  });
                                  setPsAcId(each?.id);
                                }}
                              />
                              <span>Completed Certificate</span>
                            </div>
                            {psAcId === each.id &&
                              pSacImagesFromTask?.InstallationCertificate && (
                                <img
                                  className="upload__file__images"
                                  src={
                                    pSacImagesFromTask.InstallationCertificate
                                  }
                                  alt=""
                                />
                              )}
                          </div>
                        )}
                      </div>
                      <div className="image__loaded__value">
                        {each.CompletedCertificate ? (
                          <div className="backed__image">
                            <img src={each.CompletedCertificate} alt="" />
                          </div>
                        ) : (
                          <div className="file__input__box">
                            <div className="file_single__box">
                              <FileBase64
                                type="file"
                                required="required"
                                multiple={false}
                                style={{ display: "none" }}
                                className="file-card"
                                onDone={({ base64 }) => {
                                  setPsAcImagesFromTask({
                                    ...pSacImagesFromTask,
                                    CompletedCertificate: base64,
                                  });
                                  setPsAcId(each?.id);
                                }}
                              />
                              <span>Completed Certificate</span>
                            </div>
                            {psAcId === each.id &&
                              pSacImagesFromTask?.CompletedCertificate && (
                                <img
                                  className="upload__file__images "
                                  src={pSacImagesFromTask.CompletedCertificate}
                                  alt=""
                                />
                              )}
                          </div>
                        )}
                      </div> */}
                        {/* {!each.installationImage &&
                      !each.InstallationCertificate &&
                      !each.CompletedCertificate ? (
                        <div className="uploaded__button__show">
                          <button
                            onClick={() => {
                              onUploadAllCertificateBasedOnId(each?.id);
                              setPsAcId(null);
                            }}
                          >
                            Upload
                          </button>
                        </div>
                      ) : (
                        <div></div>
                      )} */}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <h3>No Data Found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskPage;

// {
//   /* <div className="multi__input__card__file">
//                     <div className="file__image__preview__card">
//                       <div className="file__input__box">
//                         <p
//                           style={{
//                             visibility: "visible",
//                             color: "#f58b76",
//                           }}
//                         >
//                           .
//                         </p>
//                         <FileBase64
//                           type="file"
//                           required="required"
//                           multiple={false}
//                           style={{ display: "none" }}
//                           className="file-card"
//                           onDone={({ base64 }) => {
//                             setPsAcId(each.id);
//                             setPsAcImagesFromTask({
//                               ...pSacImagesFromTask,
//                               InstallationCertificate: base64,
//                             });
//                           }}
//                         />
//                         <span>Installation Certificate</span>
//                       </div>

//                       <div className="multi__input__card ">
//                         {psAcId === each.id ||
//                         pSacImagesFromTask?.InstallationCertificate ? (
//                           <img
//                             src={pSacImagesFromTask.InstallationCertificate}
//                             alt=""
//                           />
//                         ) : (
//                           <img src="" alt="" />
//                         )}
//                       </div>
//                     </div>
//                     <div className="file__image__preview__card">
//                       <div className="file__input__box">
//                         <p
//                           style={{
//                             visibility: "visible",
//                             color: "#f58b76",
//                           }}
//                         >
//                           .
//                         </p>
//                         <FileBase64
//                           type="file"
//                           required="required"
//                           multiple={false}
//                           style={{ display: "none" }}
//                           className="file-card"
//                           onDone={({ base64 }) => {
//                             setPsAcId(each.id);
//                             setPsAcImagesFromTask({
//                               ...pSacImagesFromTask,
//                               installationImage: base64,
//                             });
//                             setPsAcId(key);
//                           }}
//                         />
//                         <span>Installation Image</span>
//                       </div>

//                       <div className="multi__input__card ">
//                         {psAcId === each.id ||
//                         pSacImagesFromTask?.installationImage ? (
//                           <img
//                             src={pSacImagesFromTask.installationImage}
//                             alt=""
//                           />
//                         ) : (
//                           <img src="" alt="" />
//                         )}
//                       </div>
//                     </div>

//                     <div className="file__image__preview__card">
//                       <div className="file__input__box">
//                         <p
//                           style={{
//                             visibility: "visible",
//                             color: "#f58b76",
//                           }}
//                         >
//                           .
//                         </p>
//                         <FileBase64
//                           type="file"
//                           required="required"
//                           multiple={false}
//                           style={{ display: "none" }}
//                           className="file-card"
//                           onDone={({ base64 }) => {
//                             setPsAcId(each.id);
//                             setPsAcImagesFromTask({
//                               ...pSacImagesFromTask,
//                               CompletedCertificate: base64,
//                             });
//                             setPsAcId(key);
//                           }}
//                         />
//                         <span>Completed Certificate</span>
//                       </div>

//                       <div className="multi__input__card ">
//                         {psAcId === each.id ||
//                         pSacImagesFromTask?.CompletedCertificate ? (
//                           <img
//                             src={pSacImagesFromTask.CompletedCertificate}
//                             alt=""
//                           />
//                         ) : (
//                           <img src="" alt="" />
//                         )}
//                       </div>
//                     </div>
//                   </div> */
// }
// {
//   /* <div className="accept__or__rejected__card">
//                     {each.action === "accepted" && (
//                       <div key={key} className="upload__file__card">
//                         {each.installationImage ? (
//                           <div>
//                             <img
//                               className="upload__file__images"
//                               src={each.InstallationCertificate}
//                               alt=""
//                             />
//                           </div>
//                         ) : (
//                           <div
//                             style={{
//                               display: "flex",
//                               flexDirection: "column",
//                               gap: "0.3rem",
//                             }}
//                           >
//                             <FileBase64
//                               type="file"
//                               id="imageI"
//                               multiple={false}
//                               style={{ display: "none" }}
//                               className="file-card"
//                               onDone={({ base64 }) => {
//                                 setPsAcImagesFromTask({
//                                   ...pSacImagesFromTask,
//                                   InstallationCertificate: base64,
//                                 });
//                                 setPsAcId(each?.id);
//                               }}
//                             />

//                             <label htmlFor="imageI">
//                               Installation certificate
//                             </label>
//                             {psAcId === each.id &&
//                               pSacImagesFromTask?.InstallationCertificate && (
//                                 <img
//                                   className="upload__file__images"
//                                   src={
//                                     pSacImagesFromTask.InstallationCertificate
//                                   }
//                                   alt=""
//                                 />
//                               )}
//                           </div>
//                         )}
//                         {each.InstallationCertificate ? (
//                           <div>
//                             <img
//                               className="upload__file__images"
//                               src={each.installationImage}
//                               alt=""
//                             />
//                           </div>
//                         ) : (
//                           <div
//                             style={{
//                               display: "flex",
//                               flexDirection: "column",
//                               gap: "0.3rem",
//                             }}
//                           >
//                             <FileBase64
//                               type="file"
//                               id="imagess"
//                               multiple={false}
//                               style={{ display: "none" }}
//                               className="file-card"
//                               onDone={({ base64 }) => {
//                                 setPsAcImagesFromTask({
//                                   ...pSacImagesFromTask,
//                                   installationImage: base64,
//                                 });
//                                 setPsAcId(each?.id);
//                               }}
//                             />

//                             <label htmlFor="imagess">Installation Image</label>
//                             {psAcId === each.id &&
//                               pSacImagesFromTask?.installationImage && (
//                                 <img
//                                   className="upload__file__images"
//                                   src={pSacImagesFromTask.installationImage}
//                                   alt=""
//                                 />
//                               )}
//                           </div>
//                         )}
//                         {each.CompletedCertificate ? (
//                           <div>
//                             <img
//                               className="upload__file__images"
//                               src={each.CompletedCertificate}
//                               alt=""
//                             />
//                           </div>
//                         ) : (
//                           <div
//                             style={{
//                               display: "flex",
//                               flexDirection: "column",
//                               gap: "0.3rem",
//                             }}
//                           >
//                             <FileBase64
//                               type="file"
//                               id="imagess"
//                               multiple={false}
//                               style={{ display: "none" }}
//                               className="file-card"
//                               onDone={({ base64 }) => {
//                                 setPsAcImagesFromTask({
//                                   ...pSacImagesFromTask,
//                                   CompletedCertificate: base64,
//                                 });
//                                 setPsAcId(each?.id);
//                               }}
//                             />
//                             <label htmlFor="image">Completed Certificate</label>
//                             {psAcId === each.id &&
//                               pSacImagesFromTask?.CompletedCertificate && (
//                                 <img
//                                   className="upload__file__images"
//                                   src={pSacImagesFromTask.CompletedCertificate}
//                                   alt=""
//                                 />
//                               )}
//                           </div>
//                         )}
//                         {each.installationImage ? (
//                           ""
//                         ) : (
//                           <button
//                             // onClick={() => {
//                             //   onUploadAllCertificateBasedOnId(each?.id);
//                             //   setPsAcId(null);
//                             // }}
//                             className="upload__files__button__main"
//                           >
//                             Upload
//                           </button>
//                         )}
//                       </div>
//                     )}
//                     <div
//                       style={{
//                         // display: "flex",
//                         justifyContent: "flex-end",
//                         alignItems: "flex-end",
//                         width: "100%",
//                         marginTop: "20px",
//                         textAlign: "end",
//                         display: each.action === "accepted" ? "none" : "block",
//                       }}
//                     >
//                       <button>nothing</button>
//                     </div>
//                   </div> */
// }
