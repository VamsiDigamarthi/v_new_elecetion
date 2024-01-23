import React, { useEffect, useState } from "react";
import "./DetailsPs.css";
import { useSelector } from "react-redux";
import { APIS, headers } from "../../data/header";
import { IoSearch } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
const DetailsPs = () => {
  const UUU = useSelector((state) => state.authReducer.authData);

  const [districtPsDetails, setDistrictPsDetails] = useState([]);

  const [notAssignPsCount, setNotAssignPsCount] = useState(0);

  const [assignPsCount, setAssignPsCount] = useState(0);

  const [scoredUser, setScoreUser] = useState([]);

  const [filterValue, setFilterValue] = useState("");
  const [taskForUser, setTaskForUser] = useState([]);

  // certificates details state

  const [allCertificateModalOpen, setAllCertificateModalOpen] = useState(false);
  const [specificTaskCertificate, setSpecificTaskCertificate] = useState({});

  const onInputChangeWithName = (e) => {
    setFilterValue(e.target.value);
  };

  const scoreUser = () => {
    APIS.get(`/district/score-user/${UUU[0]?.district}`, {
      headers: headers,
    })
      .then((res) => {
        setScoreUser(res.data);
        // console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (UUU) {
      //
      let selectedState = UUU[0]?.state;
      let selectedDist = UUU[0]?.district;

      APIS.post(
        "/state/header-apply-btn-click-psc-data",
        { selectedState, selectedDist },
        {
          headers: headers,
        }
      )
        .then((res) => {
          setDistrictPsDetails(res.data);
        })
        .catch((e) => console.log(e));
      //
    }
    scoreUser();
  }, [UUU]);

  // calculate count

  useEffect(() => {
    let notAssignPs = districtPsDetails.filter((each) => each.assign === "no");
    setNotAssignPsCount(notAssignPs.length);
    let assignPs = districtPsDetails.length - notAssignPs.length;
    setAssignPsCount(assignPs);
  }, [districtPsDetails]);

  // console.log(districtPsDetails);

  const onUserClickFetchTask = (id) => {
    // console.log(id);

    APIS.get(`/user/fetch-task/${id}`, {
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

  // all certificated details modal open func

  const onAllCertificatedDetails = (each) => {
    setAllCertificateModalOpen(true);
    console.log(each);
    setSpecificTaskCertificate(each);
  };

  const closeCertificateDetailsModal = () => {
    setAllCertificateModalOpen(false);
  };

  console.log(specificTaskCertificate);

  return (
    <div className="details__ps__main__card">
      {/* <span className="all__pages__over__view">Over View</span> */}
      <div className="district__coor__ps__details__card">
        <div>
          <h2>Our Ps Details</h2>
          <span>{districtPsDetails.length} Total</span>
        </div>
        <div className="ps_detaisl_inprogras_done_card">
          <div>
            <h2>{assignPsCount}</h2>
            <span>Done</span>
          </div>
          <div>
            <h2>{notAssignPsCount}</h2>
            <span>In-Programs</span>
          </div>
        </div>
      </div>
      {/* user list and display ps details */}
      <div className="users__and__completed__ps_details__main">
        <div className="user__datails__list">
          <div className="user__details__input__card">
            <input
              onChange={onInputChangeWithName}
              type="text"
              placeholder="Enter User Name"
            />
            <div>
              <IoSearch color="#fff" size="25" />
            </div>
          </div>
          <div className="user__display__card">
            {scoredUser
              .filter((each) =>
                filterValue === ""
                  ? each
                  : each.name.toLowerCase().includes(filterValue.toLowerCase())
              )
              .map((each, key) => (
                <div
                  key={key}
                  onClick={() => onUserClickFetchTask(each?.id)}
                  className="each__user"
                >
                  <FaUserAlt size="25" color="rgb(221, 214, 214)" />
                  <div>
                    <span>{each.name}</span>
                    <span>{each.phone}</span>
                  </div>
                  <BiMessageDetail size="20" color="rgb(221, 214, 214)" />
                </div>
              ))}
          </div>
        </div>
        <div className="user__right__side__card">
          <div className="total__kit__return__card">
            <span>
              Total Assign Ps : <span>{taskForUser?.length}</span>
            </span>
            <span>
              Kit Return : <span>56</span>
            </span>
          </div>

          <div className="right__side__ps__details">
            {taskForUser.map((each, key) => (
              <div key={key} className="right__ps__number_dis">
                <div>
                  <span>
                    PS No : <span>{each.PS_No}</span>
                  </span>
                  <span>
                    AC No : <span>{each.AC_No}</span>
                  </span>
                  <span>
                    AC Name : <span>{each.AC_name}</span>
                  </span>
                </div>
                <div className="completed__cer__kit__return">
                  <span onClick={() => onAllCertificatedDetails(each)}>
                    Certificate Details
                  </span>
                  <button>Kit Return </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {allCertificateModalOpen && (
        <div className="certificate__all__main__card">
          <div className="user__modal__cross__card">
            <span>Certificate Details</span>
            <RxCross1 onClick={closeCertificateDetailsModal} size={20} />
          </div>
          <div className="all__certificate__main__card">
            <div className="each__image__card">
              <span>Kit Recevied Image</span>
              {specificTaskCertificate?.kit_start ? (
                <img src={specificTaskCertificate?.kit_start} alt="" />
              ) : (
                <span>Image Not Available</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPs;
