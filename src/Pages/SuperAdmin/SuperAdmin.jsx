import React, { useState } from "react";
import "./SuperAdmin.css";
import { BsListTask } from "react-icons/bs";
import { TbPlayerEject } from "react-icons/tb";
import TableUi from "../TableUi/TableUi";

const SuperAdmin = () => {
  const [tabsView, setTabsView] = useState(1);
  // console.log(tabsView);
  return (
    <div className="super__admin__main__card">
      <span className="all__pages__over__view">Over View</span>
      <div className="tabs__and__tables__main__card__with__pagination">
        <div className="super__admin__tabs__card">
          <div
            onClick={() => setTabsView(1)}
            style={{
              color: tabsView === 1 ? "#ff5c41" : "black",
              background: tabsView === 1 ? "#fafaff" : " #f5f5f8c7",
            }}
          >
            <BsListTask size={20} />
            <span>All Users</span>
          </div>
          <div
            onClick={() => setTabsView(2)}
            style={{
              color: tabsView === 2 ? "#ff5c41" : "black",
              background: tabsView === 2 ? "#fafaff" : " #f5f5f8c7",
            }}
          >
            <TbPlayerEject size={22} />
            <span>Rejected Task</span>
          </div>
        </div>
        {/* tabs close */}
        {tabsView === 1 ? (
          <TableUi tabsView={tabsView} />
        ) : (
          <TableUi tabsView={tabsView} />
        )}
        {/* tables with filter card end */}
      </div>
    </div>
  );
};

export default SuperAdmin;
