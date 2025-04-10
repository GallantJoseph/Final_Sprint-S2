import { createContext, useState, useContext } from "react";

export const PCBuildContext = createContext(null);

export const PCBuildProvider = (props) => {
  const [buildItems, setBuildItems] = useState([]);
  return (
    <PCBuildContext.Provider value={{ buildItems, setBuildItems }}>
      {props.children}
    </PCBuildContext.Provider>
  );
};
