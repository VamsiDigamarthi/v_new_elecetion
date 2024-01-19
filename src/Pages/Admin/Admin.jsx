import React, { useEffect, useState } from "react";
import "./Admin.css";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { APIS, headers } from "../../data/header";
import { BiDetail } from "react-icons/bi";
import { RiEdit2Line } from "react-icons/ri";

import ReactPaginate from "react-paginate";
import { RxCross2 } from "react-icons/rx";
const Admin = () => {
  const [scoreUserData, setScoreUserData] = useState([]);
  const [newScoreUserData, setNewScoreUserData] = useState([]);
  const [inputField, setInputField] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 2;
  const currentItems = newScoreUserData?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(newScoreUserData?.length / 2);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 2) % newScoreUserData?.length;
    setItemOffset(newOffset);
  };

  // open kit status modal and fetck corresponding task state

  const [kitOpenCorrespondingTaskState, setKitOpenCorrecpondingTaskState] =
    useState([]);

  // modals state

  const [kitReturnOpenModal, setKitReturnOpenModal] = useState(false);

  useEffect(() => {
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
  }, []);

  const onInputNameChange = (e) => {
    setInputField(e.target.value);
    const score = scoreUserData.filter((each) =>
      e.target.value === ""
        ? each
        : each.mandal.toLowerCase().includes(inputField.toLowerCase())
    );
    setNewScoreUserData(score);
  };

  const onDetailsUserKitStatus = (id) => {
    setKitReturnOpenModal(true);

    APIS.get(`/fetch-task/${id}`, {
      headers: headers,
    })
      .then((res) => {
        setKitOpenCorrecpondingTaskState(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onDetailsUserKitStatusModalClose = () => {
    setKitReturnOpenModal(false);
  };

  console.log(kitOpenCorrespondingTaskState);

  return (
    <div className="admin__main__page">
      <span className="all__pages__over__view">Over View</span>
      <div className="search__main__card">
        <div className="admin__filter__input">
          <input
            onChange={onInputNameChange}
            type="text"
            placeholder="Enter Mandal"
          />
          <div>
            <HiOutlineLocationMarker size={20} color="#ff5c41" />
          </div>
        </div>
        <button>Search</button>
      </div>
      {/* table */}
      <div
        // style={{
        //   filter:
        //     (assignTaskModalOpen || rejectedTaskModalOpen) && "blur(20px)",
        // }}
        className="table__main__card new__table__main"
      >
        <div className="table__header__card">
          {/* <span>State</span> */}
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
              {/* <span>{each.state}</span> */}
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
                <BiDetail onClick={() => onDetailsUserKitStatus(each?.id)} />
                {/* <MdPayment /> */}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        // style={{
        //   filter:
        //     (assignTaskModalOpen || rejectedTaskModalOpen) && "blur(20px)",
        // }}
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
      {kitReturnOpenModal && (
        <div className="kit__return__main__card">
          <div className="kit__main__modal">
            <div className="kit__close_card">
              <span>Kit Status</span>
              <RxCross2 onClick={onDetailsUserKitStatusModalClose} />
            </div>
            <div className="kit__table__view">
              <div className="kit__table__header">
                <span>AC No</span>
                <span>PS No</span>
                <span>Kit Status</span>
                <span id="kit__table__last__span">Action</span>
              </div>
              {kitOpenCorrespondingTaskState.map((each) => (
                <div className="kit__table__body">
                  <span>{each.AC_No}</span>
                  <span>{each.PS_No}</span>
                  <span>
                    <input id="Not Return" type="radio" />
                    <lable
                      htmlFor="Not Return"
                      checked={each.kitstatus === "Not Return"}
                    >
                      {each.kitstatus}
                    </lable>{" "}
                    <input id="Return" type="radio" />
                    <lable value="Return" htmlFor="Return">
                      Return
                    </lable>
                  </span>
                  <span id="kit__table__last__span">
                    <RiEdit2Line />
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "none",
              }}
              className="kit__payment__method__card"
            >
              <span>Payment </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
