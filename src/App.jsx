import React, { useState } from "react";
import Select from "./components/Select";
import options from "./components/options";


const App = () => {
  // const options = [
  //   "Red", "Orange", "Yellow", "Green", "Blue",
  //   "Indigo", "Violet", "Pink", "Brown", "Black",
  //   "White", "Gray", "Gold", "Silver", "Maroon",
  //   "Cyan", "Lavender", "Turquoise", "Magenta", "Teal"
  // ];
  
  const [selectedValue, setSelectedValue] = useState([]);

  const handleChange = (value) => {
    setSelectedValue(value);
    console.log("Selected Value:", value);
  };

  return (
    <div className="mainDiv">
      {/* <h1>Custom Select Component</h1> */}
      <Select
        label="My Epic Select Component"
        value={selectedValue}
        onChange={handleChange}
        options={options}
        multiple={true} 
        placeholder="Choose an option..."
      />
    </div>
  );
};

export default App;
