import React from "react";
import "./Tableui.css";
import { CiFilter } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import ReactPaginate from "react-paginate";
const TableUi = ({ tabsView }) => {
  return (
    <div className="table__card__with__filter">
      <div className="filter__superadmin__card">
        <div className="filter__input">
          <CiFilter size={20} />
          <input type="text" placeholder="Enter Name" />
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
      <div className="table__main__card">
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
          <div>
            <span>ajsdsad</span>
            <span>asdaDS</span>
            <span>ASDAs</span>
            <span>asdas</span>
            <span>asdsa</span>
            <span className="table__header__last__span">kahdsb</span>
            <span className="table__header__last__span">kahdsb</span>
          </div>
          <div>
            <span>ajsdsad</span>
            <span>asdaDS</span>
            <span>ASDAs</span>
            <span>asdas</span>
            <span>asdsa</span>
            <span className="table__header__last__span">kahdsb</span>
            <span className="table__header__last__span">kahdsb</span>
          </div>
          <div>
            <span>ajsdsad</span>
            <span>asdaDS</span>
            <span>ASDAs</span>
            <span>asdas</span>
            <span>asdsa</span>
            <span className="table__header__last__span">kahdsb</span>
            <span className="table__header__last__span">kahdsb</span>
          </div>
          <div>
            <span>ajsdsad</span>
            <span>asdaDS</span>
            <span>ASDAs</span>
            <span>asdas</span>
            <span>asdsa</span>
            <span className="table__header__last__span">kahdsb</span>
            <span className="table__header__last__span">kahdsb</span>
          </div>
          <div>
            <span>ajsdsad</span>
            <span>asdaDS</span>
            <span>ASDAs</span>
            <span>asdas</span>
            <span>asdsa</span>
            <span className="table__header__last__span">kahdsb</span>
            <span className="table__header__last__span">kahdsb</span>
          </div>
          <div>
            <span>ajsdsad</span>
            <span>asdaDS</span>
            <span>ASDAs</span>
            <span>asdas</span>
            <span>asdsa</span>
            <span className="table__header__last__span">kahdsb</span>
            <span className="table__header__last__span">kahdsb</span>
          </div>
          <div>
            <span>ajsdsad</span>
            <span>asdaDS</span>
            <span>ASDAs</span>
            <span>asdas</span>
            <span>asdsa</span>
            <span className="table__header__last__span">kahdsb</span>
            <span className="table__header__last__span">kahdsb</span>
          </div>
          <div>
            <span>ajsdsad</span>
            <span>asdaDS</span>
            <span>ASDAs</span>
            <span>asdas</span>
            <span>asdsa</span>
            <span className="table__header__last__span">kahdsb</span>
            <span className="table__header__last__span">kahdsb</span>
          </div>
        </div>
      </div>
      {/* table card end */}

      <div className="paginations__card__appcss">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          // onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          // pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="paginat"
        />
      </div>
    </div>
  );
};

export default TableUi;
