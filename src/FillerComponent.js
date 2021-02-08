/** @format */
import { fields } from "./demoData";
import React from "react";
import { appTheme as styles } from "./theme/appTheme";

export default (props = {}) => {
  let { state, updateFillerValue, submit, handleChange } = props;
  let { showFiller, error, newCountry } = state;
  return (
    <div style={styles.fillerContainerStyle}>
      <div onClick={() => updateFillerValue(true)} style={styles.buttonStyle}>
        Add Country
      </div>
      <div style={{ flexDirection: "column", paddingTop: 10, display: showFiller ? "flex" : "none" }}>
        {fields.map((value) => {
          return (
            <div style={{ paddingBottom: 10 }}>
              <input
                value={newCountry && newCountry[value.name] ? newCountry[value.name] : ""}
                placeholder={value.label}
                type={"text"}
                name={value.name}
                onChange={handleChange}
                style={{ padding: 3, width: 140 }}
              />
            </div>
          );
        })}
        <div style={{ flexDirection: "row", display: "flex" }}>
          <div onClick={submit} style={{ ...styles.buttonStyle, width: 55, fontSize: 14 }}>
            Submit
          </div>
          <div
            onClick={() => updateFillerValue(false)}
            style={{ ...styles.buttonStyle, width: 55, marginLeft: 10, fontSize: 14 }}
          >
            Cancel
          </div>
        </div>
        <div style={{ ...styles.errorStyle, display: error ? "flex" : "none" }}>{error}</div>
      </div>
    </div>
  );
};
