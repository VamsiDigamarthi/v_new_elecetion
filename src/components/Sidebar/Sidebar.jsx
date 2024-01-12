import React, { useState } from "react";
import "./Sidebad.css";
import { MdOutlineHomeWork } from "react-icons/md";
import { TbDeviceIpadMinus } from "react-icons/tb";
import { AiOutlineAccountBook } from "react-icons/ai";
import { TbClearAll } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { BsListTask } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
export const Sidebar = ({ children }) => {
  const [leftOpenState, setLeftOpenState] = useState(false);
  const location = useLocation();
  const pathValue = location.pathname;
  const onSidebarOpenWheneHamClick = () => {
    setLeftOpenState(true);
  };

  const onSidebarCloseWheneHamClick = () => {
    setLeftOpenState(false);
  };

  // side left container

  const sideLeftContainer = {
    display: leftOpenState && "block",
    position: leftOpenState && "absolute",
    top: leftOpenState && "0px",
    left: leftOpenState && "0px",
    zIndex: leftOpenState && "3000000",
    width: leftOpenState && "56%",
    height: leftOpenState && "100vh",
    background: leftOpenState && "#fffffc",
  };
  // side right container

  const sideRightContainer = {
    background: pathValue === "/register" && "transparent",
    padding: pathValue === "/register" && "0px",
    // padding: (pathValue === "/register" || pathValue === "/learning") && "0px",
    width: pathValue === "/register" && "100%",
    // height: height <= 800 && "225vh",
    // overflowY: pathValue === "/learning" && "hidden",
  };

  return (
    <>
      <div className="main__side__bar">
        {pathValue !== "/register" && (
          <div style={sideLeftContainer} className="left__side__bar">
            <div className="logo__imgh__card">
              <img
                src="Images/imgbin-logo-icon-design-legal-name-others-Aec96Bx7TkZEsTVsgGQpwUTp2_t-removebg-preview.png"
                alt=""
              />
              <div>
                <span>Company</span>
                <span>Brihaspathi Tech</span>
              </div>
            </div>
            <div className="left__side__bar__icons__card">
              <div>
                <Link to="/" className="all__links">
                  <MdOutlineHomeWork /> <span>Home</span>
                </Link>
              </div>
            </div>
            <div className="left__side__bar__icons__card">
              <div>
                <Link to="super-admin" className="all__links">
                  <TbDeviceIpadMinus />
                  <span>Super-Admin</span>
                </Link>
              </div>
            </div>
            <div className="left__side__bar__icons__card">
              <div>
                <Link to="/admin" className="all__links">
                  <AiOutlineAccountBook />
                  <span>Admin</span>
                </Link>
              </div>
            </div>
            <div className="left__side__bar__icons__card">
              <div>
                <Link to="/user" className="all__links">
                  <FiUsers />
                  <span>User</span>
                </Link>
              </div>
            </div>
            <div className="left__side__bar__icons__card">
              <div>
                <Link to="/learning" className="all__links">
                  <TbClearAll />
                  <span>Learning</span>
                </Link>
              </div>
            </div>
            <div className="left__side__bar__icons__card">
              <div>
                <Link to="/tasks" className="all__links">
                  <BsListTask />
                  <span>Our Tasks</span>
                </Link>
              </div>
            </div>
            <div className="left__side__bar__icons__card left__side__bar__logout__card">
              <div>
                <CgLogOut />
                <span>LogOut</span>
              </div>
            </div>
          </div>
        )}
        {pathValue !== "/register" && (
          <>
            {!leftOpenState ? (
              <div
                onClick={onSidebarOpenWheneHamClick}
                className="side__bar__hamicon__card"
              >
                <GiHamburgerMenu size={20} />
              </div>
            ) : (
              <div
                onClick={onSidebarCloseWheneHamClick}
                className="side__bar__hamicon__card"
              >
                <RxCross2 size={20} color="red" />
              </div>
            )}
          </>
        )}
        <main style={sideRightContainer} className="right__side__bar">
          {children}
        </main>
      </div>
    </>
  );
};