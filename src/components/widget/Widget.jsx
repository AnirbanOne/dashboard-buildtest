import { useState, useEffect } from "react";
import axios from "axios";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

function toNormalCase(word) {
  // Convert the word to lowercase
  const lowercaseWord = word.toLowerCase();

  // Capitalize the first letter of the word
  const normalCaseWord = lowercaseWord.charAt(0).toUpperCase() + lowercaseWord.slice(1);

  return normalCaseWord;
}

const Widget = ({ type }) => {
  const [widgetData, setWidgetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/dashboard/widgetdata");
        setWidgetData(response.data);
      } catch (error) {
        console.error("Error fetching widget data:", error);
      }
    };

    fetchData();
  }, []);

 
  let data;
  let diffElement;
  let persign = "%";
  //temporary
  

  switch (type) {
    case "user":
      data = {
        title: "TOTAL SOCIETIES",
        isMoney: false,
        link: "See all users",
        value: widgetData ? widgetData.total_rows : "",
        diff: widgetData ? parseFloat(widgetData.yearly_increase[0].percentage_increase).toFixed(2) : "",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "states":
      data = {
        title: "LEADING STATE",
        isMoney: false,
        value:  widgetData ? toNormalCase(widgetData.state_occurrence.State) : "",
        link: `Total Registrations: ${widgetData ? widgetData.state_occurrence.state_occurrence : ""}`,
        diff: widgetData ? parseFloat(widgetData.state_percentage.percentage).toFixed(2) : "",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "sectors":
      data = {
        title: "LEADING SECTOR",
        isMoney: true,
        value: widgetData ? widgetData.sector_occurrence["Sector Type"] : "",
        diff: widgetData ? parseFloat(widgetData.sector_percentage.percentage).toFixed(2) : "",
        link: `Sector Occurrences: ${
          widgetData ? widgetData.sector_occurrence.sector_occurrence : ""
        }`,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "returns":
      data = {
        title: "RETURNS",
        isMoney: true,
        value: "₹ 1,26,100",
        link: "See details",
        
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  
  if (data) {
    diffElement = (
      <div className="percentage positive">
        {data.diff && <KeyboardArrowUpIcon />}
        {data.diff && data.diff + "%"} 
      </div>
    );
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.value}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {diffElement}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
