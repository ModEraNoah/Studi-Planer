import { useState } from "react";
import Navbar from "./Navbar";
import Overview from "./Overview";
import { Route, Routes } from "react-router-dom";
import CalenderMain from "./calender/CalenderMain";

const headings: { id: string; text: string }[] = [
  { id: "overview", text: "Overview" },
  { id: "calender", text: "Calender" },
  { id: "tour", text: "Tour" },
  { id: "blog", text: "Blog" },
  { id: "help", text: "Help" },
];

function App() {
  const [activeHeading, changeActiveHeading] = useState(
    window.location.pathname.substring(1)
  );
  return (
    <>
      <Navbar
        headings={headings}
        activeHeading={activeHeading}
        onChange={changeActiveHeading}
      />
      <Routes>
        <Route path="/overview" element={<Overview />} />
        <Route path="/calender" element={<CalenderMain />} />
      </Routes>
    </>
  );
}

export default App;
