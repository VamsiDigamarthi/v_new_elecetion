import React, { useEffect, useState } from "react";
import "./Payment.css";
import { APIS, headers } from "../../data/header";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
const Payment = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [initialPaymentMode, setInitialPaymentMode] = useState(null);

  const [districtCoordinatorDetails, setDistrictCoordinatorDetails] = useState(
    []
  );

  const initialPaymentData = () => {
    APIS.get(`/payment/payment-mode-admin-to-user/${UUU[0]?.id}`, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        setInitialPaymentMode(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // fetch district coordinator

  // console.log(UUU);

  const onDistrictCoordinator = () => {
    APIS.get(
      `/state/fetch-district-coordinator/${UUU[0]?.district}/state/${UUU[0]?.state}`,
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        setDistrictCoordinatorDetails(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    initialPaymentData();
    onDistrictCoordinator();
  }, []);

  // console.log(initialPaymentMode);

  // const initialPaymentMode = [
  //   {
  //     pay_mode_admin: "true",
  //     pay_mode_user: "false",
  //     payment_text_user: "true",
  //   },
  // ];

  const onPaymentModeAccepted = () => {
    APIS.put(
      `/payment/payment-mode-user-update/${UUU[0]?.id}`,
      { paymentmode: "true", paymentText: "true" },
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        initialPaymentData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onPaymentModeRejected = () => {
    APIS.put(
      `/payment/payment-mode-user-update-two-mode/${UUU[0]?.id}`,
      { paymentuserMode: "false", paymentText: "true" },
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        initialPaymentData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onConfirmPayment = () => {
    APIS.put(
      `/payment/payment-mode-user-confirm/${UUU[0]?.id}`,
      { paymentuserMode: "true" },
      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        initialPaymentData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // console.log(districtCoordinatorDetails);

  return (
    <div className="payment__method__main__card">
      <h2>Our Payment Details</h2>
      <div className="payment__inner__card">
        {initialPaymentMode && (
          <>
            {initialPaymentMode[0]?.pay_mode_admin === "false" &&
            initialPaymentMode[0]?.pay_mode_user === "false" &&
            initialPaymentMode[0]?.payment_text_user === "false" ? (
              <div className="payment__initial__question__card">
                <h2>Waiting For Your Payment</h2>
                <span>First Completed Your Task</span>
              </div>
            ) : (
              <>
                {initialPaymentMode[0]?.pay_mode_admin === "true" &&
                initialPaymentMode[0]?.pay_mode_user === "false" &&
                initialPaymentMode[0]?.payment_text_user === "false" ? (
                  <div className="payment__succecc__question__card">
                    <h3>Have You Recevied Your Payment</h3>
                    {/* <span>Have You Recevied Your Payment</span> */}
                    <div className="payment__buttons">
                      <button onClick={onPaymentModeAccepted}>Yes</button>
                      <button onClick={onPaymentModeRejected}>No</button>
                    </div>
                  </div>
                ) : (
                  <>
                    {initialPaymentMode[0]?.pay_mode_admin === "true" &&
                    initialPaymentMode[0]?.pay_mode_user === "false" &&
                    initialPaymentMode[0]?.payment_text_user === "true" ? (
                      <div className="payment__text__display__district__details__card">
                        <div className="district__details__show__card">
                          <h2>Please Contact Your District Coordinator</h2>
                          <div className="payment__account__details">
                            <span>Name</span>
                            <span>{districtCoordinatorDetails[0]?.name}</span>
                          </div>
                          <div className="payment__account__details">
                            <span>Phone Number</span>
                            <span>{districtCoordinatorDetails[0]?.phone}</span>
                          </div>
                          <span
                            style={{
                              color: "lightslategray",
                            }}
                          >
                            If Your Recevied Payment Please Confirm Otherwise
                          </span>
                          <span
                            style={{
                              color: "lightslategray",
                            }}
                          >
                            You Con't Download Your Certificate
                          </span>
                          <div className="ditrict__confirm__card">
                            <button onClick={onConfirmPayment}>Confirm</button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="paymet__all_done__card">
                        <div className="payment__successfully_card">
                          <span className="tic_success__card">
                            <TiTick size="20" color="#fff" />
                          </span>
                          <h4
                            style={{
                              color: "#0ac914",
                            }}
                          >
                            Payment Successfully ..!
                          </h4>
                          <div className="payment__account__details">
                            <span>Amount Pay</span>
                            <span>2000 /-</span>
                          </div>
                          <div className="payment__account__details">
                            <span>UPI No</span>
                            <span>{UUU[0]?.phonepe}</span>
                          </div>
                          <span>
                            Go To Certificate Page
                            <Link to="/certificate">Click here</Link>
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
