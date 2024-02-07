import React, { useEffect, useState } from "react";
import "./AssignTaskAdmin.css";
import { ToastContainer, toast } from "react-toastify";
import { CiFilter } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import ReactPaginate from "react-paginate";
import { APIS, headers } from "../../data/header";
import { useSelector } from "react-redux";
import { GoTasklist } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { allpsAddedtoUser } from "../../util/showmessages";
const AssignTaskAdmin = ({ changeModeOfTask }) => {
  const UUU = useSelector((state) => state.authReducer.authData);

  // STORE ALL PS-DETAILS AS DIST COOR
  const [psAcDetailsBasedOnDistrictCoor, setPsAcDetailsBasedOnDistrictCoor] =
    useState([]);

  // STORE THE UNIQUE LOCATIONS FROM PS-DETAILS
  const [psDetailsUniqueLocations, setPsDetailsUniqueLocations] = useState([]);

  // LOCATION BASED FILTER ALL PS-NUMBERS STORE
  const [taskOpenFilterData, setTaskOpenFilterData] = useState([]);

  const [userInputChange, setUserInputChange] = useState("");

  // OPEN TASK ASSIGN MODAL STATE
  const [openTaskAssignModal, setOpenTaskAssignModal] = useState(false);

  // STORE USERS SPECIFIC DISTRICT AND MANDALS
  const [notAssignUserMandalWise, setNotAssignUserMandalWise] = useState(null);

  // ASSIGN MANDALS USER STORE ID BECAUSE ASSIGN TASK CORRESPONDING ID
  const [addedTaskUserId, setAddedTaskUserId] = useState(null);
  const [addedTaskUserIdError, setAddedTaskUserIdError] = useState(null);

  // STORE SCORED USERS IN SPECIFIC DISRICT
  const [notAllocatedMandalsUser, setNotAllocatedMandalsUser] = useState([]);

  // FILTERING ALL DISTRICT USERS TO NOT ASSIGN MANDALS
  const [
    notAllocatedMandalsUserFilterData,
    setNotAllocatedMandalsUserFilterData,
  ] = useState([]);

  // AFTER FILTERING NOT ASSIGN MANDAL USERS AND STORES THE UNIQUE MANDALS TO SHOW DROPDOWN
  const [notAllocatedUniqueMandals, setNotAllocatedUniqueMandals] = useState(
    []
  );

  // STORE NOT ASSIGN MANDAL MULTIPLE USERS
  const [
    notAllocatedMandalsClickFetchUserName,
    setNotAllocatedMandalsClickFetchUserName,
  ] = useState([]);

  // AFTER SET UNIQUE LOCATIONS THIS ALL STATE ARE STORE PAGINATION AND LOCATION DATA
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 8;
  const currentItems = psDetailsUniqueLocations?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(psDetailsUniqueLocations?.length / 8);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 8) % psDetailsUniqueLocations?.length;
    setItemOffset(newOffset);
  };

  // ENTER MANDALS FILTERING DATA
  const onInputNameChange = (e) => {
    setUserInputChange(e.target.value);
  };

  //  INITIALLY FETCH ALL SCORED USER IN SPECIFIC DISTRICT
  const notAssignUserButNotAssignMandals = () => {
    APIS.get(
      `/district/users/notassigntask/butnotassign/mandal/${UUU[0]?.district}`,
      {
        headers: headers,
      }
    )
      .then((res) => {
        console.log(res.data);
        setNotAllocatedMandalsUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // INITIALLY FETCH ALL PS-DETAILS FROM DATABSE
  const onPsDetailsBasedOnDistrict = () => {
    let district = UUU[0]?.district;
    APIS.get(`/district/district-coor-ps-ac-number/${district}`, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        setPsAcDetailsBasedOnDistrictCoor(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    onPsDetailsBasedOnDistrict();
    notAssignUserButNotAssignMandals();
  }, []);

  //  AFTER ALL DISTRICT COOR PS-DETAILS FILTER THE UNIQUE LOCATIONS
  useEffect(() => {
    const key = "Location";
    const arrayUniqueByKey = [
      ...new Map(
        psAcDetailsBasedOnDistrictCoor.map((item) => [item[key], item])
      ).values(),
    ];
    setPsDetailsUniqueLocations(arrayUniqueByKey);
  }, [psAcDetailsBasedOnDistrictCoor]);

  // FETCH THE USERS CORRESPONDING DISTRICT AND MANDAL
  const mandalWiseNotAssignUser = (userData) => {
    // console.log(userData);
    let district = userData.District;
    let mandal = userData.Mandal;
    APIS.post(
      "/district/users/notassigntask/mandalwise",
      {
        district,
        mandal,
      },
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        setNotAssignUserMandalWise(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /*
     TABLE ACTION CLICK CALL THIS FUNCTION
     AND FILTER THE CORRESPONDING LOCATIONS ALL PS NUMBER
     AND FETCH USER IS COORESPONDING DISTRICT SPECIFIED MANDALS
     AND FETCH USERS FROM NOT ASSIGN MANDALS ALSO
  */
  const onOpenTaskModalFun = (name) => {
    setOpenTaskAssignModal(true);
    changeModeOfTask();
    const allPsNumbers = psAcDetailsBasedOnDistrictCoor.filter(
      (each) => each.Location === name?.Location
    );
    setTaskOpenFilterData(allPsNumbers);
    // console.log(allPsNumbers);
    mandalWiseNotAssignUser(name);
    notAssignUserButNotAssignMandals();
  };

  const onTaskModalCloseFun = () => {
    setOpenTaskAssignModal(false);
    setAddedTaskUserId(null);
    changeModeOfTask();
    setNotAllocatedMandalsClickFetchUserName([]);
  };

  // IF ASSIGN MANDALS USER PRESENT SELECTED DROPDOWN THIS FUNCTION WILL CALL
  const onTaskUserIdFun = (e) => {
    setAddedTaskUserId(e.target.value);
  };

  /*
    AFTER EMPLOYEE NAME SELECTED AND CLICK TO `add task` BTN CLICK THIS FUNCTION WILL CALL
    AFTER SUCCESS FETCH ALL PS-DETAILS BECAUSE SHOW THE COLOR OF PS's THIS IS ASSIGN 
    AFTER SUCCESS FETCH NOT ASSIGNED USER AGAIN TO SHOW THE ANOTHER LOCATIONS
  */
  const onTaskAddedBtnFun = () => {
    if (addedTaskUserId) {
      setAddedTaskUserIdError("");
      APIS.post(
        `/district/add-task-user/${addedTaskUserId}`,
        {
          taskOpenFilterData,
        },
        {
          headers: headers,
        }
      )
        .then((res) => {
          allpsAddedtoUser(res?.data); // call the tost
          setOpenTaskAssignModal(false); // modal close state
          changeModeOfTask(); //side bar blur effect remove
          onPsDetailsBasedOnDistrict();
          notAssignUserButNotAssignMandals();
          // setNotAssignUserMandalWise(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setAddedTaskUserIdError("Please Select Any Name");
    }
  };

  /*
     AFTER FETCHING ALL SCORED BEAT USERS IN SPECIFIC MANDALS CALL THIS FUNCTION
     AND FILTER THE UNIQUE MANDALS FROM PS-DETAILS `220`
     AND FILTER THE ASSIGNED UNIQUE MANDALS TO ALL SCORED USERS NOT ASSIGN MANDALS `226`
     AND AFTER FILTER NOT ASSIGNED MANDALS SET UNIQUE MANDALS `231`
  */
  useEffect(() => {
    let unique_values = [
      ...new Set(psAcDetailsBasedOnDistrictCoor.map((item) => item.Mandal)),
    ];
    const lowerMandal = unique_values.map((element) => {
      return element.toLowerCase();
    });
    const notAssignMandalsFilter = notAllocatedMandalsUser.filter(
      (each) => !lowerMandal.includes(each.mandal.toLowerCase())
    );
    setNotAllocatedMandalsUserFilterData(notAssignMandalsFilter);
    const notAssignMandalsUnique = [
      ...new Set(notAssignMandalsFilter.map((each) => each.mandal)),
    ];
    setNotAllocatedUniqueMandals(notAssignMandalsUnique);
  }, [notAssignUserMandalWise]);

  /*
    NOT ASSIGN MANDALS CLICK CALL THIS FUNCTIONS
    AND FILTER THERE CORRESPONDING MANDALS USERS
    AND STORE THE FILTER USER ALL ARRAY IN `notAllocatedMandalsClickFetchUserName`
    AND STORE INITIAL USER `addedTaskUserId`
  */
  const onNotAllocatedMandalChangeFun = (e) => {
    setNotAllocatedMandalsClickFetchUserName([]);
    const unAssignMandalSingle = notAllocatedMandalsUserFilterData.filter(
      (each) => each.mandal.toLowerCase() === e.target.value.toLowerCase()
    );
    setNotAllocatedMandalsClickFetchUserName(unAssignMandalSingle);
    setAddedTaskUserId(unAssignMandalSingle[0]?.id);
  };

  const onNotAllocatedMandalUserChange = (e) => {
    // console.log(e.target.value);
    setAddedTaskUserId(e.target.value);
  };

  return (
    <div className="admin__assign__task__main__card">
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
      <div
        style={{
          filter: openTaskAssignModal && "blur(10px)",
        }}
        className="filter__superadmin__card"
      >
        <div className="filter__input">
          <CiFilter size={20} />
          <input
            onChange={onInputNameChange}
            type="text"
            placeholder="Enter Mandal"
          />
          <div>
            <VscSettings size={20} color="#ff5c41" />
          </div>
        </div>
      </div>
      {/* table start */}
      <div
        style={{
          filter: openTaskAssignModal && "blur(10px)",
        }}
        className="table__main__card"
      >
        <div className="table__header__card">
          <span>District</span>
          <span>Locations</span>
          <span>PS No</span>
          <span>Mandal</span>
          <span>PS Address</span>
          <span className="table__header__last__span">Action</span>
        </div>
        <div className="table__body__card">
          {currentItems
            ?.filter((each) =>
              userInputChange === ""
                ? each
                : each.Location.toLowerCase().includes(
                    userInputChange.toLowerCase()
                  )
            )
            .map((each, key) => (
              <div
                style={{
                  color: each.assign === "yes" && "#ee8673",
                }}
                key={key}
                className="table__inner__body"
              >
                <span>{each.District}</span>
                <span>{each.Location}</span>
                <span>{each.PS_No}</span>
                <span>{each.Mandal}</span>
                <span>
                  {each.PS_Name_and_Address.toLowerCase().slice(0, 80)}
                </span>
                <button
                  disabled={each.assign === "yes" && "true"}
                  onClick={() => onOpenTaskModalFun(each)}
                  className="table__action"
                  style={{
                    color: each.assign === "yes" && "#ee8673",
                  }}
                >
                  <GoTasklist size={20} />
                </button>
              </div>
            ))}
        </div>
      </div>
      {/* table end */}
      <div
        style={{
          filter: openTaskAssignModal && "blur(10px)",
        }}
        className="paginations__card__appcss"
      >
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className="paginat"
        />
      </div>
      {openTaskAssignModal && (
        <div className="task__asign_modal_main_card">
          <div className="task__inner__card">
            <div className="user__modal__cross__card">
              <span>Assign Task</span>
              <RxCross1 onClick={onTaskModalCloseFun} size={20} />
            </div>
            <div
              style={{
                textAlign: "center",
                borderBottom: "2px solid #c56c5c",
                paddingBottom: "10px",
              }}
            >
              {taskOpenFilterData.length > 0 && (
                <span
                  style={{
                    fontSize: "20px",
                    color: " #c56c5c",
                    // borderBottom: "2px solid #c56c5c",
                  }}
                >
                  This Location Have Multiple Ps
                </span>
              )}
            </div>
            <div className="location_ps_ac_number_display_card">
              <div className="task__single__card__num">
                <span>Location</span>
                <span>{taskOpenFilterData[0]?.Location}</span>
              </div>
              <div className="task__single__card__num">
                <span>Mandal</span>
                <span>{taskOpenFilterData[0]?.Mandal}</span>
              </div>
              <div className="task__single__card__num">
                <span>Ps Numbers</span>
                <select>
                  {taskOpenFilterData?.map((each, key) => (
                    <option key={key}>{each.PS_No}</option>
                  ))}
                </select>
              </div>
              <div className="task__single__card__num">
                <span>PS Address</span>
                {/* <span>{taskOpenFilterData[0]?.PS_Name_and_Address}</span> */}
                <select>
                  {taskOpenFilterData?.map((each, key) => (
                    <option key={key}>{each.PS_Name_and_Address}</option>
                  ))}
                </select>
              </div>
            </div>
            {/*  display Mandal And  */}
            {/* add existing mandals user card start */}
            {notAssignUserMandalWise?.length > 0 ? (
              <div className="mandal__user__display__task__modal__card">
                <h3>List Of All Users </h3>
                {addedTaskUserIdError && <span>{addedTaskUserIdError}</span>}
                <div className="mandal__wise__list__of__users__card">
                  <select onChange={onTaskUserIdFun}>
                    <option disabled hidden selected>
                      SELECT NAME OF EMPLOYEE
                    </option>
                    {notAssignUserMandalWise?.map((each, key) => (
                      <option value={each.id} key={key}>
                        {each.name}
                      </option>
                    ))}
                  </select>
                  <button onClick={onTaskAddedBtnFun}>Add Task</button>
                </div>
              </div>
            ) : (
              <div className="mandal__wise__nouser__main__card">
                <h2>Not Available Employees This Mandal</h2>
                <div className="not__allocated__mandal__wise__list__of__users__card">
                  <select onChange={onNotAllocatedMandalChangeFun}>
                    <option disabled hidden selected>
                      SELECT MANDALS
                    </option>
                    {notAllocatedUniqueMandals?.map((each, key) => (
                      <option value={each} key={key}>
                        {each}
                      </option>
                    ))}
                  </select>
                  <select onChange={onNotAllocatedMandalUserChange}>
                    <option disabled hidden selected>
                      SELECT EMPLOYEE NAME
                    </option>
                    {notAllocatedMandalsClickFetchUserName?.map((each, key) => (
                      <option key={key} value={each.id}>
                        {each.name}
                      </option>
                    ))}
                  </select>
                  <button onClick={onTaskAddedBtnFun}>Add Task</button>
                </div>
              </div>
            )}
            {/* add existing mandals user card end */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignTaskAdmin;
