import React, { useEffect, useState } from "react";
import "./TaskPage.css";
import FileBase64 from "react-file-base64";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import axios from "axios";

const taskArr = [
  {
    id: 1,
    acname: "Kalawakutty",
    psaddress: "Zilla Parishad High School, 8th Class,Raviched",
    acnumber: "80",
    psnumber: "20",
    status: "initiated",
  },
  {
    id: 2,
    acname: "Kalawakutty",
    psaddress: "Zilla Parishad High School, 8th Class,Raviched",
    acnumber: "80",
    psnumber: "20",
    status: "Accepted Task",
  },
  {
    id: 3,
    acname: "Kalawakutty",
    psaddress: "Zilla Parishad High School, 8th Class,Raviched",
    acnumber: "80",
    psnumber: "20",
    status: "Rejected Task",
  },
  {
    id: 4,
    acname: "Kalawakutty",
    psaddress: "Zilla Parishad High School, 8th Class,Raviched",
    acnumber: "80",
    psnumber: "20",
    status: "Rejected Task",
  },
];

let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");

headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
headers.append("Access-Control-Allow-Credentials", "true");

headers.append("GET", "POST", "PUT", "DELETE", "OPTIONS");

const TaskPage = () => {
  const [pSacImagesFromTask, setPsAcImagesFromTask] = useState({
    installationImage: "",
    InstallationCertificate: "",
    CompletedCertificate: "",
  });

  const [taskForUser, setTaskForUser] = useState([]);
  const [psAcId, setPsAcId] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const toggelCertificated = (id) => {
    if (selectedCertificate === id) {
      setSelectedCertificate(null);
    } else {
      setSelectedCertificate(id);
    }
  };

  const fetchAllTask = () => {
    const API = axios.create({
      baseURL: "http://localhost:5002",
    });

    API.get(`/fetch-task/1`, {
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

  // console.log(psAcId);
  // console.log(pSacImagesFromTask);
  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <span className="all__pages__over__view">Over View</span>
      <div className="task__inner__page">
        <h4>Your Task ......!</h4>
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
                      <button>Accept</button>
                      <button>Reject</button>
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
                      <div className="image__loaded__value">
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
                      </div>
                      <div className="image__loaded__value">
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
                      </div>
                      {!each.installationImage &&
                      !each.InstallationCertificate &&
                      !each.CompletedCertificate ? (
                        <div className="uploaded__button__show">
                          <button>Upload</button>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
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
