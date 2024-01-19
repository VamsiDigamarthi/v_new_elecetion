import React, { useEffect, useState } from "react";
import "./Tableui.css";
import { CiFilter } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import ReactPaginate from "react-paginate";
import { APIS, headers } from "../../data/header";
import { RxCross1 } from "react-icons/rx";
import { BiDetail } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { MdPayment } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
const TableUi = ({ tabsView }) => {
  const [scoreUserData, setScoreUserData] = useState([]);
  const [inputField, setInputField] = useState("");

  const [newScoreUserData, setNewScoreUserData] = useState([]);

  const [taskDetails, setTaskDetails] = useState({
    psname: "",
    acname: "",
    psnumber: "",
    acnumber: "",
  });

  const onChangeTaskInput = (e) => {
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
  };

  // open modals state

  const [assignTaskModalOpen, setAssignTaskModalOpen] = useState(false);

  const [assignTaskUserId, setAssignTaskUserId] = useState(null);

  const [rejectedTaskModalOpen, setRejectedTaskModalOpen] = useState(false);

  // pagination code

  //
  const [taskIdFromAddedUser, setTaskIdFromAddedUser] = useState(null);
  // rejecte task user list

  const [userBasedNotRejected, setUserBasedNotRejected] = useState([]);

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 2;
  const currentItems = newScoreUserData?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(newScoreUserData?.length / 2);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 2) % newScoreUserData?.length;
    setItemOffset(newOffset);
  };

  // pagination code end

  // rejected task fetch data

  const onRejectedTaskFetchApi = () => {
    APIS.get("/rejected-task-data", {
      headers: headers,
    })
      .then((res) => {
        console.log(res.data);
        setScoreUserData(res.data);
        setNewScoreUserData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (tabsView === 1) {
      APIS.get("/score-user", {
        headers: headers,
      })
        .then((res) => {
          setScoreUserData(res.data);
          setNewScoreUserData(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      onRejectedTaskFetchApi();
    }
  }, [tabsView]);

  // input field change

  const onInputNameChange = (e) => {
    setInputField(e.target.value);
    const score = scoreUserData.filter((each) =>
      e.target.value === ""
        ? each
        : each.mandal.toLowerCase().includes(inputField.toLowerCase())
    );
    setNewScoreUserData(score);
  };

  // tesk modal open

  const openTaskModal = (id) => {
    // console.log(id);
    setAssignTaskModalOpen(true);
    setAssignTaskUserId(id);
  };

  const closeTaskModal = () => {
    setAssignTaskModalOpen(false);
  };

  // task added to user

  const onTaskAddToUser = (e) => {
    e.preventDefault();
    APIS.post(`/add-task-user/${assignTaskUserId}`, taskDetails, {
      headers: headers,
    })
      .then((res) => {
        console.log(res.data);
        registorSucces();
        setAssignTaskModalOpen(false);
        setTaskDetails({
          psname: "",
          acname: "",
          psnumber: "",
          acnumber: "",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const registorSucces = () =>
    toast.success("task added successfully ...!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const rejectedTaskAddedNewUser = () =>
    toast.success("task added successfully ...!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const onCloseRejectedTask = (values) => {
    setRejectedTaskModalOpen(false);
  };

  const onOpenRejectedTask = (values) => {
    setRejectedTaskModalOpen(true);

    setTaskIdFromAddedUser(values.taskID);

    let acname = values?.acname;
    let userId = values?.id;
    APIS.get(
      `/rejected-user-data-fetch-basedon-acname/${acname}/user/${userId}`,
      {
        headers: headers,
      }
    )
      .then((res) => {
        setUserBasedNotRejected(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onTaskAssignRejectTaskBasedOnId = (id) => {
    // console.log(id);
    const newObj = {
      userId: id,
      id: taskIdFromAddedUser,
    };
    APIS.put("/rejected-task-update-specific-user", newObj, {
      headers: headers,
    })
      .then((res) => {
        // setUserBasedNotRejected(res.data);
        rejectedTaskAddedNewUser();
        onRejectedTaskFetchApi();
        setRejectedTaskModalOpen(false);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  // console.log(userBasedNotRejected);
  // console.log(currentItems);
  return (
    <div className="table__card__with__filter">
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
          filter:
            (assignTaskModalOpen || rejectedTaskModalOpen) && "blur(20px)",
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
        {tabsView === 1 && (
          <div className="filter__selecet__and__button__card">
            <select>
              <option>select score</option>
              <option>2</option>
              <option>2</option>
              <option>2</option>
            </select>
            <button>Clear</button>
          </div>
        )}
      </div>
      {/* tables ui */}
      {tabsView === 1 ? (
        <div
          style={{
            filter:
              (assignTaskModalOpen || rejectedTaskModalOpen) && "blur(20px)",
          }}
          className="table__main__card"
        >
          <div className="table__header__card">
            <span>State</span>
            <span>District Name</span>
            <span>Mandal</span>
            <span>Name</span>
            <span>Phone</span>
            <span className="table__header__last__span">Score</span>
            <span className="table__header__last__span">Action</span>
          </div>
          <div className="table__body__card">
            {currentItems.map((each, key) => (
              <div key={key}>
                <span>{each.state}</span>
                <span>{each.district}</span>
                <span>{each.mandal}</span>
                <span>{each.name}</span>
                <span>{each.phone}</span>
                <span className="table__header__last__span">{each.score}</span>
                <span
                  className="table__header__last__span"
                  style={{
                    display: "flex",
                    gap: "1rem",
                  }}
                >
                  <BiDetail onClick={() => openTaskModal(each?.id)} />
                  <MdPayment />
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            filter:
              (assignTaskModalOpen || rejectedTaskModalOpen) && "blur(20px)",
          }}
          className="table__main__card"
        >
          <div className="table__header__card">
            <span>AC name</span>
            <span>AC No</span>
            <span
              style={{
                width: "30%",
              }}
            >
              PS name
            </span>
            <span>PS No</span>
            <span>Action</span>
            {/* <span className="table__header__last__span">Score</span> */}
            <span className="table__header__last__span">Action</span>
          </div>
          <div className="table__body__card">
            {currentItems.map((each, key) => (
              <div key={key}>
                <span>{each.AC_name}</span>
                <span>{each.AC_No}</span>
                <span
                  style={{
                    width: "30%",
                  }}
                >
                  {each.PS_name}
                </span>
                <span>{each.PS_No}</span>
                <span>{each.action}</span>
                {/* <span className="table__header__last__span">{each.score}</span> */}
                <span
                  className="table__header__last__span"
                  style={{
                    display: "flex",
                    gap: "1rem",
                  }}
                >
                  <BiDetail
                    onClick={() =>
                      onOpenRejectedTask({
                        id: each?.user_id,
                        taskID: each.id,
                        acname: each?.AC_name,
                      })
                    }
                  />
                  {/* <MdPayment /> */}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* table card end */}

      <div
        style={{
          filter:
            (assignTaskModalOpen || rejectedTaskModalOpen) && "blur(20px)",
        }}
        className="paginations__card__appcss"
      >
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="paginat"
        />
      </div>
      {assignTaskModalOpen && (
        <div className="user__edit__modal__main__card">
          <div className="user__modal__inner__card">
            <div className="user__modal__cross__card">
              <span>Assign Task</span>
              <RxCross1 onClick={closeTaskModal} size={20} />
            </div>
            <form onSubmit={onTaskAddToUser} className="task__form__card">
              <input
                onChange={onChangeTaskInput}
                type="text"
                placeholder="AC Name"
                name="acname"
              />
              <input
                onChange={onChangeTaskInput}
                type="text"
                placeholder="Ac Number"
                name="acnumber"
              />
              <input
                onChange={onChangeTaskInput}
                type="text"
                placeholder="PS Name"
                name="psname"
              />
              <input
                onChange={onChangeTaskInput}
                type="text"
                placeholder="Ps Number"
                name="psnumber"
              />
              <button type="submit">Add Task</button>
            </form>
          </div>
        </div>
      )}
      {rejectedTaskModalOpen && (
        <div className="user__edit__modal__main__card">
          <div className="rejected__task__modal__card">
            <div className="user__modal__cross__card">
              <span>Assign Task</span>
              <RxCross1 onClick={onCloseRejectedTask} size={20} />
            </div>
            <div className="user__rej__id__task">
              <div className="rejecte__heade__table">
                <span>Name</span>
                <span>Mandal</span>
                <span>AC NAme</span>
                <span>Action</span>
              </div>
              {userBasedNotRejected.map((each, key) => (
                <div key={key} className="user__ac__rejected__list">
                  <span>{each.name.slice(0, 12)}</span>
                  <span>{each.mandal.slice(0, 12)}</span>
                  <span>{each.assembly.slice(0, 12)}</span>
                  <span>
                    <FaPlus
                      onClick={() => onTaskAssignRejectTaskBasedOnId(each?.id)}
                      color="#ff5c41"
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableUi;
