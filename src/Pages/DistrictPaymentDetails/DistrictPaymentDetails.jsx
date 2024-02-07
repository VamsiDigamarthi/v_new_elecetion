import React, { useEffect, useState } from "react";
import "./DistrictPaymentDetails.css";
import { APIS, headers } from "../../data/header";
import { useSelector } from "react-redux";
const DistrictPaymentDetails = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [paymentUser, setPaymentUser] = useState([]);

  // STORE SORT PAYMENT NOT RECEVIED USER FIRST
  const [sortedUser, setSortedUser] = useState([]);

  useEffect(() => {
    APIS.get(`/district/payment/not/received/${UUU[0]?.district}`, {
      headers: headers,
    })
      .then((res) => {
        setPaymentUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    const value = paymentUser.sort((a, b) =>
      a.pay_mode_user > b.pay_mode_user
        ? 1
        : b.pay_mode_user > a.pay_mode_user
        ? -1
        : 0
    );
    console.log(value);
    // setSortedUser()
    setSortedUser(value);
  }, [paymentUser]);

  console.log(paymentUser);

  return (
    <div className="district__coor__payment">
      <div className="all__payment__users__main">
        {sortedUser?.map((each, key) => (
          <div key={key} className="payment__recevied__single__user__card">
            <div>
              <span>{each?.name}</span>
            </div>
            <span>
              Phone Number <span>{each?.phone}</span>
            </span>
            <span>
              UPI Number <span>{each?.phonepe}</span>
            </span>
            <span>Payment Completed</span>
            <button
              style={{
                background:
                  each?.pay_mode_user === "true" &&
                  each?.payment_text_user === "true"
                    ? "rgb(19, 216, 19)"
                    : "rgb(216, 58, 19)",
              }}
            >
              {each?.pay_mode_user === "true" &&
              each?.payment_text_user === "true"
                ? "Payment Recevied"
                : "Payment Not Recevied"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistrictPaymentDetails;
