import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const OrchidContext = createContext();
const OrchidProvider = ({ children }) => {
  const [orchids, setOrchids] = useState([]);

  const findOrchids = async () => {
    const result = await AsyncStorage.getItem("orchids");
    if (result !== null) {
      const orchidsArray = JSON.parse(result);
      setOrchids(orchidsArray);
    }
  };

  useEffect(() => {
    findOrchids();
  }, []);

  return (
    <OrchidContext.Provider value={{ orchids, setOrchids, findOrchids }}>
      {children}
    </OrchidContext.Provider>
  );
};

export const useOrchids = () => useContext(OrchidContext);

export default OrchidProvider;
