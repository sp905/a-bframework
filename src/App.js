/** @format */

import React from "react";
import { demoData } from "./demoData";
import DropDownComponent from "./DropDownComponent";
import FillerComponent from "./FillerComponent";
import { appTheme as styles } from "./theme/appTheme";
export default class App extends React.Component {
  state = { data: [], newCountry: {} };
  componentDidMount() {
    let { data = [] } = this.state;
    if (!data.length) {
      data.push(...demoData);
    }
  }
  headerRender = () => {
    return (
      <div style={styles.headerContainerStyle}>
        <img src={require("../src/image/user.png")} />
        <div style={{ paddingLeft: 10 }}>A/B testing framework</div>
      </div>
    );
  };
  submit = (event) => {
    event.preventDefault();
    let { newCountry = {}, data = [] } = this.state;
    let { cname, population, area, president, gdp } = newCountry;
    if (cname && population && area && gdp) {
      data.push({ cname, population, area, president, gdp });
      this.setState({ data, error: null, showFiller: false, newCountry: {} });
    } else {
      this.setState({ error: "Please fill all fields" });
    }
  };
  handleChange = (e) => {
    let { name, value } = e.target;
    let { newCountry = {} } = this.state;
    newCountry[name] = value;
    this.setState({ newCountry });
  };
  selectCountry = (value) => {
    this.setState({ selectedCountry: value, dropDown: false });
  };
  dropDownRenderItem = (data) => {
    return (
      <DropDownComponent
        selectCountry={this.selectCountry}
        showDropDown={this.showDropDown}
        state={this.state}
        data={data}
      />
    );
  };
  updateFillerValue=(value)=>{
    this.setState({ showFiller: value})
  }
  fillerContainer = () => {
    return (
      <FillerComponent
        state={this.state}
        handleChange={this.handleChange}
        updateFillerValue={this.updateFillerValue}
        submit={this.submit}
      />
    );
  };
  showDropDown = () => {
    this.setState({ dropDown: !this.state.dropDown });
  };
  render() {
    let { data = [], selectedCountry } = this.state;
    return (
      <div className="containerStyle">
        {this.headerRender()}
        <div style={{ paddingTop: 20, paddingLeft: 15 }}>
          <div style={styles.buttonStyle} onClick={this.showDropDown}>
            {`${selectedCountry && selectedCountry.cname ? selectedCountry.cname : "Select Country"}`}
          </div>
          {this.dropDownRenderItem(data)}
        </div>
        <div
          style={{
            display: selectedCountry ? "flex" : "none",
            flexDirection: "column",
          }}
          className="contentStyle"
        >
          <div style={{ ...styles.testimonialTextStyle, alignItems: "center", display: "flex" }}>
            Name :
            <span style={{ ...styles.testimonialTextStyle, color: "red", fontWeight: "bold" }}>
              {selectedCountry && selectedCountry.cname}{" "}
            </span>
          </div>
          <div style={styles.testimonialTextStyle}>
            {`Population : ${selectedCountry && selectedCountry.population}`}
          </div>
          <div style={styles.testimonialTextStyle}> {`Area : ${selectedCountry && selectedCountry.area}`}</div>
          <div style={styles.testimonialTextStyle}>{`President : ${selectedCountry && selectedCountry.president}`}</div>
          <div style={styles.testimonialTextStyle}>{`Gdp : ${selectedCountry && selectedCountry.gdp}`}</div>
        </div>
        {this.fillerContainer()}
      </div>
    );
  }
}
