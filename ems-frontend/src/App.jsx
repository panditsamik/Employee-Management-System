import { Routes, Route } from "react-router-dom";
import "./App.css";
import DepartmentComponent from "./components/DepartmentComponent";
import EmployeeComponent from "./components/EmployeeComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListDepartmentComponent from "./components/ListDepartmentComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";

function App() {
  return (
    <>
      <HeaderComponent />
      <br></br>
      <Routes>
        <Route path="/" element={<ListEmployeeComponent />} />

        <Route path="/employees" element={<ListEmployeeComponent />} />

        <Route path="/add-employee" element={<EmployeeComponent />} />

        <Route path="/edit-employee/:id" element={<EmployeeComponent />} />

        <Route path="/departments" element={<ListDepartmentComponent />} />

        <Route path="/add-department" element={<DepartmentComponent />} />

        <Route path="/edit-department/:id" element={<DepartmentComponent />} />
      </Routes>
      <br></br>
      <br></br>
      <FooterComponent />
    </>
  );
}

export default App;
