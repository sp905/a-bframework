/** @format */

import React from "react";
import { demoData, fields } from "./demoData";
let numberOfLines = { display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };
let styles = {
  buttonStyle: {
    cursor: "pointer",
    border: "1px solid lightgray",
    width: 140,
    padding: 5,
    textAlign: "center",
    borderRadius: 3,
  },
  testimonialTextStyle: {
    paddingLeft: 15,
    paddingBottom: 5,
    paddingTop: 5,
    ...numberOfLines,
  },
};
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
      <div
        style={{
          paddingTop: 15,
          flexDirection: "row",
          flex: 1,
          display: "flex",
          alignItems: "center",
          paddingLeft: 20,
        }}
      >
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
    let { selectedCountry, onOverSelected = "" } = this.state;
    return (
      <>
        {this.state.dropDown && (
          <div
            onClick={() => this.setState({ dropDown: false })}
            style={{
              zIndex: 1,
              backgroundColor: "transparent",
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
            }}
          />
        )}
        <div
          style={{
            display: this.state.dropDown ? "block" : "none",
            position: "absolute",
            backgroundColor: "#f1f1f1",
            minWidth: 140,
            overflow: "auto",
            boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
            zIndex: 2,
          }}
        >
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
                    this.setState({ onOverSelected: index });
                  }}
                  style={{
                    cursor: "pointer",
                    width: 140,
                    padding: 5,
                    // borderRadius:,
                    borderBottomLeftRadius: check ? 4 : 0,
                    borderBottomRightRadius: check ? 4 : 0,
                    color: cname === value.cname ? "white" : "black",
                    ...style,
                    ...numberOfLines,
                  }}
                  onClick={() => this.selectCountry(value)}
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

  fillerContainer = () => {
    let { showFiller, error, newCountry } = this.state;

    return (
      <div style={{ paddingLeft: 15, paddingTop: 45 }}>
        <div onClick={() => this.setState({ showFiller: true })} style={styles.buttonStyle}>
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
                  onChange={this.handleChange}
                  style={{ padding: 3, width: 140 }}
                />
              </div>
            );
          })}
          <div style={{ flexDirection: "row", display: "flex" }}>
            <div onClick={this.submit} style={{ ...styles.buttonStyle, width: 55, fontSize: 14 }}>
              Submit
            </div>
            <div
              onClick={() => this.setState({ showFiller: false })}
              style={{ ...styles.buttonStyle, width: 55, marginLeft: 10, fontSize: 14 }}
            >
              Cancel
            </div>
          </div>
          <div style={{ paddingTop: 5, color: "red", fontWeight: "bold", display: error ? "flex" : "none" }}>
            {error}
          </div>
        </div>
      </div>
    );
  };
  render() {
    let { data = [], selectedCountry } = this.state;
    return (
      <div className="containerStyle">
        {this.headerRender()}

        <div style={{ paddingTop: 20, paddingLeft: 15 }}>
          <div
            style={{ ...styles.buttonStyle, ...numberOfLines }}
            onClick={(event) => {
              this.setState({ dropDown: !this.state.dropDown });
            }}
          >
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
