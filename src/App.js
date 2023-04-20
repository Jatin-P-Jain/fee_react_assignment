import "./styles.css";
import data from "./data.json";
import { useEffect, useState } from "react";

export default function App() {
  const [feeType, setFeeType] = useState("");
  const [nationality, setNationality] = useState("");
  const [courses, setCourses] = useState("");
  const [level, setLevel] = useState("");
  const [amount, setAmount] = useState(0);
  const [isAllCourses, setIsAllCourses] = useState(false);
  const [isAllLevels, setIsAllLevels] = useState(false);
  const [feeTypeList, setFeeTypeList] = useState(Object.keys(data));
  const [nationalityList, setNationalityList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [levelsList, setLevelsList] = useState([]);
  useEffect(() => {
    anyFieldModifyHandler();
  }, [feeType, nationality, courses, level]);
  const anyFieldModifyHandler = () => {
    if (
      feeType !== "" &&
      nationality !== "" &&
      courses !== "" &&
      level !== ""
    ) {
      const amount = data[feeType][nationality][courses][level]["amount"];
      setAmount(amount);
    }
  };
  const feeTypeSelection = (e) => {
    const feeTypeValue = e.target.value;
    setFeeType(feeTypeValue);
    if (feeTypeValue !== "")
      setNationalityList(Object.keys(data[feeTypeValue]));
    else {
      setNationalityList([]);
      setCoursesList([]);
      setLevelsList([]);
    }
  };
  const nationalitySelection = (e) => {
    const nationalityValue = e.target.value;
    setNationality(nationalityValue);
    if (nationalityValue !== "") {
      const courses = Object.keys(data[feeType][nationalityValue]);
      if (courses.length === 1) {
        setIsAllCourses(true);
        setCoursesList(["Medical", "Dental", "Ayurveda"]);
      } else {
        setCoursesList(courses);
      }
    } else {
      setCoursesList([]);
      setLevelsList([]);
    }
  };
  const courseSelection = (e) => {
    const coursesValue = e.target.value;
    setCourses(coursesValue);
    if (coursesValue !== "") {
      const levels = Object.keys(data[feeType][nationality][coursesValue]);
      if (levels.length === 1) {
        setIsAllLevels(true);
        setLevelsList(["UG", "PG", "DIPLOMA", "Ph.D"]);
      } else {
        setLevelsList(levels);
      }
    } else setLevelsList([]);
  };
  const levelSelection = (e) => {
    const levelsValue = e.target.value;
    setLevel(levelsValue);
    if (levelsValue !== "") {
      const amount = data[feeType][nationality][courses][levelsValue]["amount"];
      setAmount(amount);
    }
  };

  return (
    <div className="App">
      <h2>Fill in the below details:</h2>
      <div className="inputContainer">
        <label className="label">Fee Type : </label>
        <select
          className="dropdown"
          onChange={(e) => {
            feeTypeSelection(e);
          }}
        >
          <option value="">Select Fee Type</option>
          {feeTypeList.map((feeType, index) => (
            <option key={index} value={feeType}>
              {feeType}
            </option>
          ))}
        </select>
      </div>
      <div className="inputContainer">
        <label className="label">Nationality : </label>
        <select
          className="dropdown"
          onChange={(e) => {
            nationalitySelection(e);
          }}
          disabled={nationalityList.length === 0}
        >
          <option value="">Select Nationality</option>
          {nationalityList.map((nationality, index) => (
            <option key={index} value={nationality}>
              {nationality}
            </option>
          ))}
        </select>
      </div>
      <div className="inputContainer">
        <label className="label">Course : </label>
        <select
          className="dropdown"
          onChange={(e) => {
            courseSelection(e);
          }}
          disabled={coursesList.length === 0}
        >
          <option value="">Select Course</option>
          {coursesList.map((course, index) => (
            <option key={index} value={isAllCourses ? "ALL_COURSES​" : course}>
              {course}
            </option>
          ))}
        </select>
      </div>
      <div className="inputContainer">
        <label className="label">Level : </label>
        <select
          className="dropdown"
          onChange={(e) => {
            levelSelection(e);
          }}
          disabled={levelsList.length === 0}
        >
          <option value="">Select Level</option>
          {levelsList.map((level, index) => (
            <option key={index} value={isAllLevels ? "ALL_LEVEL​" : level}>
              {level}
            </option>
          ))}
        </select>
      </div>
      <div className="amountContainer">
        <h5 className="amountLabel">Amount To be Paid : </h5>
        {feeType !== "" &&
        nationality !== "" &&
        courses !== "" &&
        level !== "" ? (
          <h4 className="amount">₹ {amount}</h4>
        ) : (
          <i className="amountInfo">Please Select All The Inputs</i>
        )}
      </div>
    </div>
  );
}
