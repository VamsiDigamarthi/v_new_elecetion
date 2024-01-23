import React, { useEffect, useState } from "react";
import "./Header.css";

const Header = ({ mainCamDataFromApp, onApplyBtnClickToFetchData }) => {
  const [state, setState] = useState([]);

  const [disticts, setDisticts] = useState(null);

  const [selectedState, setSelectedState] = useState("");

  const [selectedDist, setSelectedDist] = useState(null);

  const selectSate = (e) => {
    setDisticts([]);

    // filter all district based on state
    const allDistrict = mainCamDataFromApp.filter(
      (each) => each.State === e.target.value
    );

    // filter unique district
    const uniqueDistrict = [
      ...new Set(allDistrict.map((item) => item.District)),
    ];
    setSelectedState(e.target.value);
    setSelectedDist(uniqueDistrict[0]);

    setDisticts(uniqueDistrict);
  };

  const selectDistName = (e) => {
    setSelectedDist(e.target.value);
  };

  const onApplyBtnClick = () => {
    onApplyBtnClickToFetchData({ selectedState, selectedDist });
  };

  useEffect(() => {
    const unique = [...new Set(mainCamDataFromApp?.map((item) => item.State))];
    setState(unique);
  }, [mainCamDataFromApp]);

  return (
    <div className="header__main">
      <div>
        <select onChange={selectSate}>
          <option disabled selected hidden>
            select state
          </option>

          {state.map((each, key) => (
            <option key={key}>{each}</option>
          ))}
        </select>
        <select value={selectedDist} onChange={selectDistName}>
          <option disabled selected hidden>
            select disct
          </option>
          {disticts?.map((each, key) => (
            <option key={key}>{each}</option>
          ))}
        </select>
        <button onClick={onApplyBtnClick}>Apply</button>
      </div>
    </div>
  );
};

export default Header;
