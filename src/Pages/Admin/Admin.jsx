import React, { useEffect, useState } from "react";
import "./Admin.css";

const Admin = () => {
  const [tabsView, setTabsView] = useState(1);
  return (
    <div className="admin__main__page">
      <span className="all__pages__over__view">Over View</span>
      <div className="district__dashboard__main"></div>
    </div>
  );
};

export default Admin;

{
  /* <div className="tabs__and__tables__main__card__with__pagination">
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

  <TableUi tabsView={tabsView} />
</div>; */
}
