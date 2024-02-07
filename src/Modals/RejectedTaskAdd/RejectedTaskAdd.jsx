import React, { useEffect, useState } from "react";
import "./RejectedTaskAdd.css";

import { RxCross1 } from "react-icons/rx";
import { APIS, headers } from "../../data/header";
const RejectedTaskAdd = ({
  closeRejectedTaskModalFun, // modal close function
  signleRejectedTask, // STORE SINGLE TASK
  rejectedTaskApiCall, // ALL REJECTED TASK FETCH API
  registorSucces, // SHOW TOST
}) => {
  // STORE ALL NOT ASSIGN TASK USERS AS REJECTED MANDALS
  const [notAssignUserMandalWise, setNotAssignUserMandalWise] = useState([]);

  // INCASE NOT FOUND EMPLOYESS IN THAT MANDALS STORE REMAINING MANDALS USERS DATA
  const [remainingMandalsUser, setRemainingMandalsUser] = useState([]);

  // STORE UNIQUE MANDALS FROM DISTRICT
  const [uniqueMandals, setUniqueMandals] = useState([]);

  // STORE NOT ASSIGN MANDAL MULTIPLE USERS
  const [
    notAllocatedMandalsClickFetchUserName,
    setNotAllocatedMandalsClickFetchUserName,
  ] = useState([]);

  const [addedTaskUserId, setAddedTaskUserId] = useState(null);
  const [addedTaskUserIdError, setAddedTaskUserIdError] = useState(null);

  useEffect(() => {
    const mandalWiseNotAssignUser = (userData) => {
      console.log(userData);
      let district = userData.district;
      let mandal = userData.mandal;
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
          console.log(res.data);
          setNotAssignUserMandalWise(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    mandalWiseNotAssignUser(signleRejectedTask);
    //
    const notAssignUserButNotAssignMandals = (userData) => {
      let district = userData.district;
      APIS.get(
        `/district/users/notassigntask/butnotassign/mandal/${district}`,
        {
          headers: headers,
        }
      )
        .then((res) => {
          // console.log(res.data);
          setRemainingMandalsUser(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    notAssignUserButNotAssignMandals(signleRejectedTask);
  }, [signleRejectedTask]);

  // FILTER THE UNIQUE MANDALS FROM SCORED USERS
  useEffect(() => {
    let unique_values = [
      ...new Set(remainingMandalsUser.map((item) => item.mandal)),
    ];
    setUniqueMandals(unique_values);
  }, [remainingMandalsUser]);

  // FILTER THE USERS FROM SELECETED MANDALS
  const onNotAllocatedMandalChangeFun = (e) => {
    setNotAllocatedMandalsClickFetchUserName([]);
    const unAssignMandalSingle = remainingMandalsUser.filter(
      (each) => each.mandal.toLowerCase() === e.target.value.toLowerCase()
    );
    setNotAllocatedMandalsClickFetchUserName(unAssignMandalSingle);
    setAddedTaskUserId(unAssignMandalSingle[0]?.id);
  };

  // STORED USER ID TO ASSIGN TASK
  const onNotAllocatedMandalUserChange = (e) => {
    // console.log(e.target.value);
    setAddedTaskUserId(e.target.value);
  };

  const onTaskUserIdFun = (e) => {
    setAddedTaskUserId(e.target.value);
  };

  const onTaskAddedBtnFun = () => {
    // console.log(addedTaskUserId);
    // console.log(signleRejectedTask);
    if (addedTaskUserId) {
      setAddedTaskUserIdError("");
      APIS.post(
        `/district/add-rejected-task-user/${addedTaskUserId}`,
        {
          ...signleRejectedTask,
        },
        {
          headers: headers,
        }
      )
        .then((res) => {
          console.log(res.data);
          registorSucces(res?.data);
          closeRejectedTaskModalFun(false);
          rejectedTaskApiCall();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setAddedTaskUserIdError("Please Select Any Name");
    }
  };

  // console.log(remainingMandalsUser);

  return (
    <div className="rejected__task__all__main__card">
      <div className="main__modal__card__certificate">
        <div className="user__modal__cross__card">
          <span>Rejected Tasks</span>
          <RxCross1 onClick={closeRejectedTaskModalFun} size={20} />
        </div>
        <div className="rejected_task_ps_ac_number_display_card">
          <div className="task__single__card__num">
            <span>Location</span>
            <span>{signleRejectedTask?.location}</span>
          </div>
          <div className="task__single__card__num">
            <span>Mandal</span>
            <span>{signleRejectedTask?.mandal}</span>
          </div>
          <div className="task__single__card__num">
            <span>PS No</span>
            <span>{signleRejectedTask?.PS_No}</span>
          </div>
          <div className="task__single__card__num">
            <span>PS Address</span>
            <span>{signleRejectedTask?.PS_name.toLowerCase()}</span>
          </div>
        </div>
        {notAssignUserMandalWise.length > 0 ? (
          <div className="rejected__mandal__user__display__task__modal__card">
            <h3>List Of All Users </h3>
            {addedTaskUserIdError && <span>{addedTaskUserIdError}</span>}
            <div className="rejected__mandal__wise__list__of__users__card">
              <select onChange={onTaskUserIdFun}>
                <option disabled hidden selected>
                  SELECT NAME
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
          <div className="rejected__task__nomore__user__found__card">
            <h2
              style={{
                textAlign: "center",
                borderBottom: "2px solid orange",
              }}
            >
              This mandals no employee found
            </h2>
            <div className="not__allocated__mandal__wise__list__of__users__card">
              <select onChange={onNotAllocatedMandalChangeFun}>
                <option disabled hidden selected>
                  SELECT MANDALS
                </option>
                {uniqueMandals?.map((each, key) => (
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
      </div>
    </div>
  );
};

export default RejectedTaskAdd;
