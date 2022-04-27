import React, { useState } from "react";

export const ChartContext = React.createContext(null);

const ChartDataProvider = ({ children }) => {
  const [selectedCompanyData, setSelectedCompanyData] = useState("");

  const providerValue = {
    selectedCompanyData,
    setSelectedCompanyData,
  };

  return (
    <ChartContext.Provider value={providerValue}>
      {children}
    </ChartContext.Provider>
  );
};

export default ChartDataProvider;
