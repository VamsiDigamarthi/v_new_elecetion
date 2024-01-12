import React, { useState } from "react";
import "./User.css";
import { LiaAddressCard } from "react-icons/lia";
import { IoIosContact } from "react-icons/io";
import { MdOutlineOtherHouses } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import EditUserDetails from "../EditUserDetails/EditUserDetails";
const User = () => {
  const [openUserModal, setOpenModalUser] = useState(false);

  const onOpenEditUserDetailsModal = () => {
    setOpenModalUser(!openUserModal);
  };

  return (
    <div className="user__main__card">
      <span className="all__pages__over__view">
        Hi There Welcome Back ....!
      </span>
      <div
        style={{
          filter: openUserModal && "blur(20px)",
        }}
        className="user__inner__main__card"
      >
        <div className="user__left__main">
          <div className="user__name__pic__card">
            <div>
              <div>
                <h2>Blinding Light</h2>
                <button onClick={onOpenEditUserDetailsModal}>Edit</button>
              </div>
              <span>Thanks for joining.</span>
              <span> We’re thrilled to have you. </span>
              <span>
                Welcome to{" "}
                <span className="company__info">Brihaspathi Tech Pvt Lmt</span>{" "}
              </span>
              <span>
                Get ready for some amazing deals and updates right here
                .............!
              </span>
            </div>
            {/* user profile card */}
            <div className="user__main__profile">
              <img src="Images/pngwing.com.png" alt="" />
              <img src="Images/remove-back-user.png" alt="" />
            </div>
          </div>
          {/* user all address and details card */}
          <div className="user__all__addresss__details__card">
            <div className="addess__card">
              <span>
                <LiaAddressCard size={25} />
              </span>
              <span>Address</span>
              <span
                style={{
                  textAlign: "center",
                  lineHeight: "1.6",
                  color: "gray",
                }}
              >
                17-3-10 Gannabathulavari Street Bhimavaram – 534201 9440186733
                ch.r.v.v.naidu@gmail.com NA
              </span>
            </div>
            <div className="contact__info">
              <div>
                <span>
                  <IoIosContact size={25} />
                </span>
              </div>
              <span>
                Phone No - <span>9876543210</span>
              </span>
              <span>
                PhonePeNo - <span>9876543210</span>
              </span>

              <span>
                Voter Id - <span>HRGRJN82050602H900</span>
              </span>

              <span>
                Adhar Id - <span>987654321022</span>
              </span>
            </div>
            <div className="other__details">
              <span>
                <MdOutlineOtherHouses size={25} />
              </span>
              <span>Andra Pradesh</span>
              <span>West Godavari</span>
              <span>Narsapuram</span>
              <span>Palakollu</span>
            </div>
          </div>
        </div>
        <div className="user__right__main">
          <img src="Images/adhar.png" alt="" />
          <img src="Images/Voter-Id-removebg-preview.png" alt="" />
        </div>
      </div>
      {openUserModal && (
        <div className="user__edit__modal__main__card">
          <div className="user__modal__inner__card">
            <div className="user__modal__cross__card">
              <span>Edit Your Details</span>
              <RxCross1 onClick={onOpenEditUserDetailsModal} size={20} />
            </div>
            <EditUserDetails />
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
