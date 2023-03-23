import { useState } from "react";
import "./filterBar.scss";

export const FilterBar = ({ initialValues, setInitialValues, film }) => {
  const [radioCheck, setRadioCheck] = useState(true);
  return (
    <div className="filter-bar w-100">
      <div className="group">
        <div className="w-100 d-flex justify-content-center align-items-center p-4">
          <select
            as="select"
            name="sortBy"
            className="form-select"
            onChange={(e) => {
              setInitialValues({ ...initialValues, sortBy: e.target.value });
            }}
          >
            <optgroup label="Sort By">
              {film &&
                Object.keys(film)?.map((e, i) => (
                  <option key={i} value={e}>
                    {e}
                  </option>
                ))}
            </optgroup>
          </select>
        </div>
      </div>
      <div className="group">
        <div className="w-100 d-flex justify-content-center align-items-center p-4">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            onChange={(e) => {
              setInitialValues({
                ...initialValues,
                filterValue: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className="group">
        <div className="">
          <label className="text-sm form-radio" id="sortBy">
            <input
              name="sortOrder"
              value="DESC"
              type="radio"
              className="form-radio"
              checked={radioCheck}
              onChange={(e) => {
                setRadioCheck(true);
                setInitialValues({
                  ...initialValues,
                  sortOrder: e.target.value,
                });
              }}
            />
            DESC
          </label>
        </div>
        <div className="mx-2">
          <label className="text-sm form-radio" id="sortBy">
            <input
              className="form-radio"
              name="sortOrder"
              value="ASC"
              type="radio"
              onChange={(e) => {
                setRadioCheck(false);
                setInitialValues({
                  ...initialValues,
                  sortOrder: e.target.value,
                });
              }}
            />
            ASC
          </label>
        </div>
      </div>
    </div>
  );
};
