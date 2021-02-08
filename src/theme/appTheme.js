let numberOfLines = { display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };
const appTheme={
    buttonStyle: {
      cursor: "pointer",
      border: "1px solid lightgray",
      width: 140,
      padding: 5,
      textAlign: "center",
      borderRadius: 3,
      ...numberOfLines,
    },
    testimonialTextStyle: {
      paddingLeft: 15,
      paddingBottom: 5,
      paddingTop: 5,
      ...numberOfLines,
    },
    headerContainerStyle: {
      paddingTop: 15,
      flexDirection: "row",
      flex: 1,
      display: "flex",
      alignItems: "center",
      paddingLeft: 20,
    },
    errorStyle: { paddingTop: 5, color: "red", fontWeight: "bold" },
    fillerContainerStyle: { paddingLeft: 15, paddingTop: 45 },
  };

  const dropDownTheme = {
    outerDivStyle: {
      zIndex: 1,
      backgroundColor: "transparent",
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
    dropdownStyle: {
      position: "absolute",
      backgroundColor: "#f1f1f1",
      minWidth: 140,
      overflow: "auto",
      boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
      zIndex: 2,
    },
    textStyle: {
      cursor: "pointer",
      width: 140,
      padding: 5,
      ...numberOfLines,
    },
  };
  export {appTheme,dropDownTheme}