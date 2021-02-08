/** @format */

import React, { useEffect, useState } from "react";
import { dropDownTheme as styles } from "./theme/appTheme";
export default (props) => {
  let [onOverSelected, setOnOverSelected] = useState("");
  let { selectCountry, data = [], state, showDropDown } = props;
  let { dropDown, selectedCountry } = state || {};
  return (
    <>
      {dropDown && <div onClick={showDropDown} style={styles.outerDivStyle} />}
      <div style={{ ...styles.dropdownStyle, display: dropDown ? "block" : "none" }}>
        {data && data.length ? (
          data.map((value, index) => {
            let { cname } = selectedCountry || {};
            let selected = onOverSelected === index;
            let style = {};
            if (selected && cname != value.cname) {
              style = {
                backgroundColor: "#a6a4a40f",
              };
            } else {
              style = {
                backgroundColor: cname === value.cname ? "#11e811" : "white",
              };
            }
            let check = index === data.length - 1;
            return (
              <div
                onMouseOver={() => {
                  setOnOverSelected(index);
                }}
                style={{
                  ...styles.textStyle,
                  color: cname === value.cname ? "white" : "black",
                  borderBottomLeftRadius: check ? 4 : 0,
                  borderBottomRightRadius: check ? 4 : 0,
                  ...style,
                }}
                onClick={() => selectCountry(value)}
              >
                {value.cname}
              </div>
            );
          })
        ) : (
          <div style={{ padding: 5 }}>Please add Country</div>
        )}
      </div>
    </>
  );
};
