import React from "react";
import Header from "src/view/shared/Header";
import TabBottomNavigator from "./TabBottomNavigator";
import "./styles/style.css";
import Footer from "../shared/Footer";
function LayoutPage(props) {
  return (
    <div className="">
      <Header />
      
      <div className="children__content">{props.children}</div>
      <TabBottomNavigator />
    </div>
  );
}

export default LayoutPage;
